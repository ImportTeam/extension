/**
 * Content Script Entry Point
 *
 * 책임:
 * 1. Checkout 페이지 감지
 * 2. 모든 상품 데이터 추출 (상품명, 가격, 카드혜택 등)
 * 3. Background에 데이터 저장 요청
 * 4. Auto Popup 트리거
 */

import {
  CoupangParser,
  AmazonParser,
  EbayParser,
  FallbackParser,
  type ParsedData,
} from './parsers';

// 🛑 Iframe 가드: 메인 페이지에서만 실행
if (window.self !== window.top) {
  // Iframe 상세 정보 로깅 (디버깅용)
  const iframeUrl = window.location.href;
  const iframeHost = window.location.hostname;
  const iframePathname = window.location.pathname;
  console.debug('[ContentScript:iframe] 📍 Iframe detected', {
    context: 'iframe',
    url: iframeUrl,
    host: iframeHost,
    pathname: iframePathname,
    selfIsTop: window.self === window.top,
  });
  // Iframe에서는 조용히 종료
}

console.log('[ContentScript] ✅ Content script initialized in main frame');

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

function detectCheckoutPage() {
  const url = window.location.href;

  if (CoupangParser.isCheckoutPage(url)) {
    return { site: 'coupang', isCheckout: true };
  }
  if (AmazonParser.isCheckoutPage(url)) {
    return { site: 'amazon', isCheckout: true };
  }
  if (EbayParser.isCheckoutPage(url)) {
    return { site: 'ebay', isCheckout: true };
  }

  return { site: 'unknown', isCheckout: false };
}

function selectParser(site: string) {
  switch (site) {
    case 'coupang':
      return new CoupangParser();
    case 'amazon':
      return new AmazonParser();
    case 'ebay':
      return new EbayParser();
    default:
      return null;
  }
}

function extractPaymentInfo(): ParsedData | null {
  const { site, isCheckout } = detectCheckoutPage();

  if (!isCheckout) {
    console.log('[ContentScript] Not a checkout page');
    return null;
  }

  console.log(`[ContentScript] Checkout detected: ${site}`);

  const siteParser = selectParser(site);
  if (siteParser) {
    const result = siteParser.parse(document);
    if (result) {
      return result;
    }
  }

  console.log('[ContentScript] Trying fallback...');
  const fallbackParser = new FallbackParser();
  return fallbackParser.parse(document);
}

function sendToBackground(paymentInfo: ParsedData) {
  chrome.runtime.sendMessage(
    {
      type: 'SAVE_PRODUCT_DATA',
      data: paymentInfo,
      url: window.location.href,
      timestamp: Date.now(),
    },
    (response: any) => {
      if (response?.success) {
        console.log('[ContentScript] ✅ Data saved, triggering popup...', {
          responseSuccess: response.success,
          savedAmount: response.savedData?.amount,
          savedCurrency: response.savedData?.currency,
        });
        
        // 🎪 Auto Popup 트리거 (SubPopup을 새 윈도우로 열기)
        console.log('[ContentScript] 🎪 Opening Auto Popup (SubPopup window)');
        chrome.runtime.sendMessage(
          {
            type: 'OPEN_AUTO_POPUP',
          },
          (popupResponse: any) => {
            if (popupResponse?.success) {
              console.log('[ContentScript] ✅ Auto Popup window opened');
            } else {
              console.warn('[ContentScript] ⚠️ Failed to open Auto Popup:', popupResponse?.error);
            }
          }
        );
      } else {
        console.error('[ContentScript] ❌ Background error:', {
          error: response?.error,
          message: response?.message,
        });
      }
    }
  );
}

function init() {
  console.log('[ContentScript] Initializing...');

  // 이중 안전장치: init 실행 시에도 iframe 체크
  if (window.self !== window.top) {
    console.debug('[ContentScript] Skipping - running in iframe context');
    return;
  }

  const paymentInfo = extractPaymentInfo();

  if (!paymentInfo) {
    console.warn('[ContentScript] Failed to extract');
    return;
  }

  console.log('[ContentScript] Extracted data:', paymentInfo);
  console.log('[ContentScript] Sending to background...');
  sendToBackground(paymentInfo);
}

/**
 * iframe 로드 감지 및 재파싱
 * 
 * 목표: 사용자가 "혜택보기" 클릭 후 iframe 로드 시
 * 기프트카드, 쿠팡캐시 등 동적 데이터 파싱
 */
function setupDynamicContentObserver() {
  // MutationObserver: iframe 추가 감지
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

    if (hasNewIframe) {
      console.log('[ContentScript] 🔄 New iframe detected, re-parsing dynamic content...');
      
      // 500ms 대기 (iframe 콘텐츠 로드 완료 대기)
      setTimeout(() => {
        const paymentInfo = extractPaymentInfo();
        
        if (paymentInfo) {
          console.log('[ContentScript] ✅ Dynamic content re-parsed:', paymentInfo);
          
          // Background에 업데이트 메시지 전송
          chrome.runtime.sendMessage(
            {
              type: 'UPDATE_PRODUCT_DATA',
              data: paymentInfo,
              timestamp: Date.now(),
              source: 'dynamic-iframe',
            },
            (response: any) => {
              if (response?.success) {
                console.log('[ContentScript] ✅ Dynamic data updated in storage');
              }
            }
          );
        }
      }, 500);

      // 한 번 감지 후 observer 제거 (무한 반복 방지)
      observer.disconnect();
    }
  });

  // 옵션: DOM 변경 감시 설정
  observer.observe(document.body, {
    childList: true,      // 자식 노드 추가/삭제 감지
    subtree: true,        // 전체 트리 감지
    attributes: false,    // 속성 변경은 감시 안함 (성능)
  });

  console.log('[ContentScript] 📡 Dynamic content observer started');
}

// 🚀 초기 로드 시 즉시 실행 (DOMContentLoaded 또는 즉시)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init();
    setupDynamicContentObserver();
  });
} else {
  init();
  setupDynamicContentObserver();
}
