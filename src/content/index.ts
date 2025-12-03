/**
 * Content Script Entry Point
 *
 * 책임:
 * 1. Checkout 페이지 감지
 * 2. 모든 상품 데이터 추출 (상품명, 가격, 카드혜택 등)
 * 3. Background에 데이터 저장 요청
 * 4. Auto Popup 트리거
 */

import { CoupangParser, AmazonParser, EbayParser, FallbackParser, BaseParser, ElevenStreetParser } from './parsers';
import { ParsedProductInfo } from '../shared/types';
import {
  mountToggleBar,
  updateToggleBar,
  type ToggleProductData,
} from './ui/toggleBar';
import { setupElevenStreetBenefitWatcher, type BenefitRefreshHandler } from './elevenStreetBenefits';

const isMainFrame = window.self === window.top;

if (!isMainFrame) {
  console.debug('[ContentScript] Skipping iframe context');
} else {
  console.log('[ContentScript] ✅ Content script initialized in main frame');
}

/**
 * 디바운스 헬퍼: DOM 변경 중 반복 실행 방지
 * (현재는 MutationObserver를 사용하지 않으므로 미사용)
 */
// function debounce<T extends (...args: any[]) => any>(
//   func: T,
//   wait: number
// ): (...args: Parameters<T>) => void {
//   let timeout: NodeJS.Timeout | null = null;
//   return function executedFunction(...args: Parameters<T>) {
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       timeout = null;
//       func(...args);
//     }, wait);
//   };
// }

// Type guard: Check if URL is Coupang checkout page
function detectCheckoutPage(url: string): { site: string; isCheckout: boolean } | null {
  console.log('[Content] 🔍 Detecting checkout page for URL:', url);

  if (CoupangParser.isCheckoutPage(url)) {
    console.log('[Content] ✅ Detected Coupang checkout page');
    return { site: 'coupang', isCheckout: true };
  }
  if (ElevenStreetParser.isProductPage(url)) {
    console.log('[Content] ✅ Detected 11번가 product page');
    return { site: '11st', isCheckout: true };
  }
  if (AmazonParser.isCheckoutPage(url)) {
    console.log('[Content] ✅ Detected Amazon checkout page');
    return { site: 'amazon', isCheckout: true };
  }
  if (EbayParser.isCheckoutPage(url)) {
    console.log('[Content] ✅ Detected eBay checkout page');
    return { site: 'ebay', isCheckout: true };
  }
  console.log('[Content] ❌ No checkout page detected');
  return null;
}

// Main parser delegation
function getParser(site: string): BaseParser {
  console.log(`[Content] 📦 Creating parser for site: ${site}`);
  switch (site) {
    case 'coupang':
      return new CoupangParser();
    case '11st':
      return new ElevenStreetParser();
    case 'amazon':
      return new AmazonParser();
    case 'ebay':
      return new EbayParser();
    default:
      return new FallbackParser();
  }
}

interface ExtractionResult {
  paymentInfo: ParsedProductInfo;
  site: string;
}

function extractPaymentInfo(): ExtractionResult | null {
  const url = window.location.href;
  console.log('[Content] 🚀 Starting payment info extraction for URL:', url);
  
  const checkoutInfo = detectCheckoutPage(url);
  
  if (!checkoutInfo) {
    console.log('[Content] ❌ Not a checkout page, skipping extraction');
    return null;
  }

  const { site, isCheckout } = checkoutInfo;
  console.log(`[Content] ✅ Checkout detected: ${site}, isCheckout: ${isCheckout}`);

  const siteParser = getParser(site);
  console.log(`[Content] 📝 Using parser: ${siteParser.siteName}`);
  
  if (!siteParser) {
    console.error(`[Content] ❌ No parser found for site: ${site}`);
    return null;
  }

  let result = siteParser.parse(document);
  
  if (result) {
    console.log('[Content] ✅ Parse successful:', {
      title: result.title?.substring(0, 50),
      amount: result.amount,
      hasCardBenefits: !!result.cardBenefits,
    });
  } else {
    console.warn('[Content] ⚠️ Parse returned null, trying fallback...');
    const fallbackParser = new FallbackParser();
    result = fallbackParser.parse(document);
    if (!result) {
      return null;
    }
  }
  
  return { paymentInfo: result, site };
}

function sendToBackground(paymentInfo: ParsedProductInfo, site: string): void {
  chrome.runtime.sendMessage(
    {
      type: 'SAVE_PRODUCT_DATA',
      data: paymentInfo,
      url: window.location.href,
      timestamp: Date.now(),
    },
    (response: { success: boolean; savedData?: { amount: number; currency: string }; error?: string; message?: string }) => {
      if (response?.success) {
        console.log('[ContentScript] ✅ Data saved', {
          responseSuccess: response.success,
          savedAmount: response.savedData?.amount,
          savedCurrency: response.savedData?.currency,
        });

        // UI 토글 최신 데이터 반영
        updateToggleBar({ ...paymentInfo, site } as ToggleProductData);
      } else {
        console.error('[ContentScript] ❌ Background error:', {
          error: response?.error,
          message: response?.message,
        });
      }
    }
  );
}

function notifyBenefitRefresh(paymentInfo: ParsedProductInfo, site: string, source: string): void {
  updateToggleBar({ ...paymentInfo, site } as ToggleProductData);
  console.log('[ContentScript] ✅ Re-parsed after', source, paymentInfo);

  chrome.runtime.sendMessage(
    {
      type: 'UPDATE_PRODUCT_DATA',
      data: paymentInfo,
      timestamp: Date.now(),
      source,
    },
    (response: { success: boolean }) => {
      if (response?.success) {
        console.log('[ContentScript] ✅ Updated benefit data in storage');
      }
    }
  );
}

function reparsePaymentInfo(source: string): boolean {
  const extractionResult = extractPaymentInfo();
  if (!extractionResult) {
    console.warn('[ContentScript] ❌ Benefit reparse skipped (no data)');
    return false;
  }

  const { paymentInfo, site } = extractionResult;
  notifyBenefitRefresh(paymentInfo, site, source);
  return true;
}

const benefitRefreshHandler: BenefitRefreshHandler = (source) => {
  reparsePaymentInfo(source);
};

function init(): void {
  console.log('[ContentScript] Initializing...');

  // 이중 안전장치: init 실행 시에도 iframe 체크
  if (window.self !== window.top) {
    console.debug('[ContentScript] Skipping - running in iframe context');
    return;
  }

  const extractionResult = extractPaymentInfo();

  if (!extractionResult) {
    console.warn('[ContentScript] Failed to extract');
    return;
  }

  const { paymentInfo, site } = extractionResult;

  console.log('[ContentScript] Extracted data:', paymentInfo);
  mountToggleBar({ ...paymentInfo, site } as ToggleProductData);
  console.log('[ContentScript] Sending to background...');
  sendToBackground(paymentInfo, site);
}

/**
 * iframe 로드 감지 및 재파싱
 * 
 * 목표: 사용자가 "혜택보기" 클릭 후 iframe 로드 시
 * 기프트카드, 쿠팡캐시 등 동적 데이터 파싱
 */
function setupDynamicContentObserver(): void {
  let hasProcessedBenefits = false;
  
  // MutationObserver: iframe 및 동적 콘텐츠 감지
  const observer = new MutationObserver((mutations) => {
    // iframe이 추가되었는지 확인
    const hasNewIframe = mutations.some((mutation) => {
      return (
        mutation.addedNodes.length > 0 &&
        Array.from(mutation.addedNodes).some((node) => {
          return (
            (node as Element).tagName === 'IFRAME' ||
            (node instanceof Element && node.querySelector('iframe'))
          );
        })
      );
    });

    // 11번가: .benefit 요소가 추가되었는지 확인
    const hasBenefitContent = !hasProcessedBenefits && mutations.some((mutation) => {
      return (
        mutation.addedNodes.length > 0 &&
        Array.from(mutation.addedNodes).some((node) => {
          if (node instanceof Element) {
            // .benefit 클래스 또는 그 안에 dt/dd가 있는지 확인
            return node.classList?.contains('benefit') || 
                   node.querySelector?.('.benefit') ||
                   (node.closest?.('.other_benefits') && (node.querySelector?.('dt') || node.querySelector?.('dd')));
          }
          return false;
        })
      );
    });

    // .other_benefits 내부에 콘텐츠가 채워졌는지 확인
    const benefitElement = document.querySelector('.other_benefits .benefit dt');
    const shouldReparse = hasNewIframe || (hasBenefitContent && benefitElement);

    if (shouldReparse) {
      const reason = hasNewIframe ? 'iframe' : 'benefit-content';
      console.log(`[ContentScript] 🔄 Dynamic content detected (${reason}), re-parsing...`);
      
      if (hasBenefitContent) {
        hasProcessedBenefits = true; // 중복 처리 방지
      }

      // 500ms 대기 (콘텐츠 로드 완료 대기)
      setTimeout(() => {
        const refreshed = reparsePaymentInfo(`dynamic-${reason}`);
        if (!refreshed) {
          console.warn('[ContentScript] ❌ Dynamic reparse produced no result');
        }
      }, 500);

      // iframe 감지 후에만 observer 제거 (benefit은 계속 감시)
      if (hasNewIframe) {
        observer.disconnect();
      }
    }
  });

  // 옵션: DOM 변경 감시 설정
  observer.observe(document.body, {
    childList: true,      // 자식 노드 추가/삭제 감지
    subtree: true,        // 전체 트리 감지
    attributes: false,    // 속성 변경은 감시 안함 (성능)
  });

  console.log('[ContentScript] 📡 Dynamic content observer started');
  
  // 11번가: "추가 혜택" 버튼 클릭 감지하여 강제 재파싱
  setupElevenStreetBenefitWatcher(benefitRefreshHandler);
}


// 🚀 초기 로드 시 즉시 실행 (DOMContentLoaded 또는 즉시)
if (isMainFrame) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      setupDynamicContentObserver();
    });
  } else {
    init();
    setupDynamicContentObserver();
  }
}
