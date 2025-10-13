# Content Script & Overlay 구현 가이드

> Shadow DOM 기반 격리된 UI 및 페이지 감지

## 목차
- [개요](#개요)
- [Content Script](#content-script)
- [Shadow DOM Overlay](#shadow-dom-overlay)
- [메시지 통신](#메시지-통신)

## 개요

### 역할
- Checkout 페이지 감지
- DOM에서 기본 정보 추출
- Shadow DOM으로 격리된 Overlay 표시
- Background와 메시지 통신

### 제약사항
- Lightweight: 무거운 계산은 Background로 위임
- Isolated: Shadow DOM으로 스타일 충돌 방지
- Secure: DOMPurify로 sanitize

## Content Script

**파일**: `src/content/index.ts`

```typescript
import { mountOverlay } from './overlay';
import { detectCheckoutPage, extractBasicInfo } from './parsers/baseParser';
import DOMPurify from 'dompurify';

/**
 * Main entry point
 */
function init() {
  // Check if checkout page
  if (!detectCheckoutPage(window.location.href)) {
    return;
  }

  console.log('[PayWise] Checkout page detected');

  // Extract basic info
  const info = extractBasicInfo(document);
  
  if (!info) {
    console.warn('[PayWise] Failed to extract info');
    return;
  }

  // Mount overlay (loading state)
  mountOverlay({ loading: true });

  // Request calculation from background
  chrome.runtime.sendMessage({
    type: 'CALCULATE_PAYMENT',
    data: {
      amount: info.amount,
      currency: info.currency,
      methods: info.methods,
      url: window.location.href
    }
  }, (response) => {
    if (response?.success) {
      // Update overlay with recommendation
      mountOverlay({
        loading: false,
        recommendation: response.data
      });
    } else {
      // Show error
      mountOverlay({
        loading: false,
        error: response?.error || 'Unknown error'
      });
    }
  });
}

/**
 * Detect checkout page
 */
export function detectCheckoutPage(url: string): boolean {
  const checkoutPatterns = [
    /coupang\.com\/checkout/,
    /order\.pay\.naver\.com/,
    /checkout\.gmarket\.co\.kr/
  ];

  return checkoutPatterns.some(pattern => pattern.test(url));
}

/**
 * Extract basic info from DOM
 */
export function extractBasicInfo(doc: Document) {
  // Try site-specific parsers first
  const parsers = [
    new CoupangParser(),
    new NaverParser(),
    new GmarketParser(),
    new FallbackParser()
  ];

  for (const parser of parsers) {
    const result = parser.parse(doc);
    if (result && result.confidence > 0.5) {
      return result;
    }
  }

  return null;
}

// Run on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

## Shadow DOM Overlay

**파일**: `src/content/overlay.tsx`

```typescript
import React from 'react';
import { createRoot } from 'react-dom/client';
import DOMPurify from 'dompurify';

type OverlayProps = {
  loading?: boolean;
  recommendation?: any;
  error?: string;
};

/**
 * Overlay Component
 */
function Overlay({ loading, recommendation, error }: OverlayProps) {
  if (loading) {
    return (
      <div className="paywise-overlay loading">
        <div className="spinner" />
        <p>최적 결제 수단 분석 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="paywise-overlay error">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (recommendation) {
    return (
      <div className="paywise-overlay">
        <h3>💳 추천 결제 수단</h3>
        <div className="recommendation">
          <div className="method">{recommendation.method}</div>
          <div className="savings">
            {recommendation.savings}원 절약
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/**
 * Mount overlay with Shadow DOM
 */
export function mountOverlay(props: OverlayProps) {
  // Check if already mounted
  let container = document.getElementById('paywise-root');
  
  if (!container) {
    // Create container
    container = document.createElement('div');
    container.id = 'paywise-root';
    document.body.appendChild(container);

    // Attach Shadow DOM (closed mode for security)
    const shadow = container.attachShadow({ mode: 'closed' });

    // Create style element
    const style = document.createElement('style');
    style.textContent = `
      :host {
        all: initial;
        display: block;
      }

      .paywise-overlay {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 2px solid #4f46e5;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        max-width: 320px;
      }

      .paywise-overlay.loading {
        text-align: center;
      }

      .spinner {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #4f46e5;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 12px;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .paywise-overlay h3 {
        margin: 0 0 12px 0;
        font-size: 16px;
        font-weight: 600;
        color: #1f2937;
      }

      .recommendation {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .method {
        font-size: 18px;
        font-weight: 700;
        color: #4f46e5;
      }

      .savings {
        font-size: 14px;
        color: #059669;
        font-weight: 600;
      }

      .error {
        color: #dc2626;
      }
    `;

    shadow.appendChild(style);

    // Create React root
    const reactRoot = document.createElement('div');
    shadow.appendChild(reactRoot);

    // Store root for updates
    (container as any).__root = createRoot(reactRoot);
  }

  // Render
  const root = (container as any).__root;
  root.render(<Overlay {...props} />);
}
```

## 메시지 통신

### Content → Background

```typescript
// Request calculation
chrome.runtime.sendMessage({
  type: 'CALCULATE_PAYMENT',
  data: {
    amount: 50000,
    currency: 'KRW',
    methods: ['card', 'paypal']
  }
}, (response) => {
  console.log('Response:', response);
});
```

### Background → Content

```typescript
// Background
chrome.tabs.sendMessage(tabId, {
  type: 'UPDATE_RECOMMENDATION',
  data: recommendation
});

// Content
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'UPDATE_RECOMMENDATION') {
    mountOverlay({
      loading: false,
      recommendation: msg.data
    });
  }
});
```

## 다음 단계

- [Background Worker 구현](./background-worker.md)
- [Parser 전략](./parser-strategy.md)
