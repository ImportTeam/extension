import { CoupangParser, AmazonParser, EbayParser, FallbackParser, BaseParser, ElevenStreetParser } from './parsers';
import { ParsedProductInfo } from '../shared/types';
import { mountToggleBar, updateToggleBar, type ToggleProductData } from './ui/toggleBar';
import { setupElevenStreetBenefitWatcher, type BenefitRefreshHandler } from './elevenStreetBenefits';

const isMainFrame = window.self === window.top;
let hasRun = false;

function detectCheckoutPage(url: string): { site: string; isCheckout: boolean } | null {
  if (CoupangParser.isCheckoutPage(url)) {
    return { site: 'coupang', isCheckout: true };
  }
  if (ElevenStreetParser.isProductPage(url)) {
    return { site: '11st', isCheckout: true };
  }
  if (AmazonParser.isCheckoutPage(url)) {
    return { site: 'amazon', isCheckout: true };
  }
  if (EbayParser.isCheckoutPage(url)) {
    return { site: 'ebay', isCheckout: true };
  }
  return null;
}

function getParser(site: string): BaseParser {
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

export function extractPaymentInfo(): { paymentInfo: ParsedProductInfo; site: string } | null {
  const url = window.location.href;
  console.log('[Content] 🚀 Starting payment info extraction for URL:', url);

  const checkoutInfo = detectCheckoutPage(url);
  if (!checkoutInfo) {
    console.log('[Content] ❌ Not a checkout page');
    return null;
  }

  console.log(`[Content] ✅ Checkout detected: ${checkoutInfo.site}, isCheckout: ${checkoutInfo.isCheckout}`);

  const parser = getParser(checkoutInfo.site);
  console.log(`[Content] 📝 Using parser: ${parser.siteName}`);
  let result = parser.parse(document);

  if (!result) {
    console.warn('[Content] ⚠️ Parser returned null, trying fallback');
    const fallbackParser = new FallbackParser();
    result = fallbackParser.parse(document);
    if (!result) {
      console.warn('[Content] ❌ Fallback parser failed');
      return null;
    }
  }

  console.log('[Content] ✅ Parse successful:', {
    title: result.title?.substring(0, 50),
    amount: result.amount,
    hasCardBenefits: !!result.cardBenefits,
  });

  return { paymentInfo: result, site: checkoutInfo.site };
}

function sendToBackground(paymentInfo: ParsedProductInfo, site: string, source = 'initial'): void {
  chrome.runtime.sendMessage(
    {
      type: source === 'initial' ? 'SAVE_PRODUCT_DATA' : 'UPDATE_PRODUCT_DATA',
      data: paymentInfo,
      url: window.location.href,
      timestamp: Date.now(),
      source,
    },
    (response: { success: boolean }) => {
      if (response?.success) {
        console.log('[ContentScript] ✅ Product data saved');
      }
    }
  );
}

function notifyBenefitRefresh(paymentInfo: ParsedProductInfo, site: string, source: string): void {
  updateToggleBar({ ...paymentInfo, site } as ToggleProductData);
  sendToBackground(paymentInfo, site, source);
}

function reparsePaymentInfo(source: string): boolean {
  const extractionResult = extractPaymentInfo();
  if (!extractionResult) return false;
  notifyBenefitRefresh(extractionResult.paymentInfo, extractionResult.site, source);
  return true;
}

const benefitRefreshHandler: BenefitRefreshHandler = (source) => {
  reparsePaymentInfo(source);
};

function setupDynamicContentObserver(): void {
  let hasProcessedBenefits = false;

  const observer = new MutationObserver((mutations) => {
    const hasNewIframe = mutations.some((mutation) =>
      Array.from(mutation.addedNodes).some((node) =>
        node instanceof Element ? node.tagName === 'IFRAME' || node.querySelector('iframe') : false
      )
    );

    const hasBenefitContent = !hasProcessedBenefits && mutations.some((mutation) =>
      Array.from(mutation.addedNodes).some((node) => {
        if (!(node instanceof Element)) return false;
        return (
          node.classList.contains('benefit') ||
          Boolean(node.querySelector('.benefit')) ||
          (node.closest('.other_benefits') && (node.querySelector('dt') || node.querySelector('dd')))
        );
      })
    );

    const benefitElement = document.querySelector('.other_benefits .benefit dt');
    if ((hasBenefitContent && benefitElement) || hasNewIframe) {
      if (hasBenefitContent) {
        hasProcessedBenefits = true;
      }

      const reason = hasNewIframe ? 'iframe' : 'benefit-content';
      console.log(`[ContentScript] 🔄 Dynamic content detected (${reason})`);

      setTimeout(() => {
        if (!reparsePaymentInfo(`dynamic-${reason}`)) {
          console.warn('[ContentScript] ❌ Dynamic reparse produced no result');
        }
      }, 500);

      if (hasNewIframe) {
        observer.disconnect();
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  setupElevenStreetBenefitWatcher(benefitRefreshHandler);
}

function init(): void {
  const extractionResult = extractPaymentInfo();
  if (!extractionResult) {
    console.warn('[ContentScript] ❌ Failed to extract payment info');
    return;
  }

  mountToggleBar({ ...extractionResult.paymentInfo, site: extractionResult.site } as ToggleProductData);
  sendToBackground(extractionResult.paymentInfo, extractionResult.site);
}

export function runContentScript(): void {
  if (!isMainFrame || hasRun) return;
  hasRun = true;
  init();
  setupDynamicContentObserver();
}
