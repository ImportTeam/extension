import { extractNumber } from '../../utils';
import { COUPANG_SELECTORS } from '../constants';

/**
 * 가격 유효성 검증 - 쿠팡 가격 범위 내인지 확인
 */
const isValidCoupangPrice = (value: number): boolean => {
  return value >= 100 && value <= 100_000_000; // 100원 ~ 1억원
};

export const extractPrices = (doc: Document): {
  amount: number | null;
  originalPrice: number | null;
  discountPrice: number | null;
} => {
  let amount: number | null = null;
  let originalPrice: number | null = null;
  let discountPrice: number | null = null;

  // 방법 1: 선택자 기반 (우선순위) - COUPANG_SELECTORS.amount에 정의된 우선순위대로 시도
  for (const selector of COUPANG_SELECTORS.amount) {
    try {
      const el = doc.querySelector(selector);
      if (!el || !el.textContent) continue;
      
      const text = el.textContent.trim();
      // 가격처럼 보이지 않으면 스킵 (숫자 + 원 또는 쉼표가 있는 숫자)
      if (!/[\d,]+\s*원?/.test(text) && !/^\d{1,3}(,\d{3})*$/.test(text.replace(/[^\d,]/g, ''))) {
        continue;
      }
      
      const value = extractNumber(text);
      if (!value || !isValidCoupangPrice(value)) continue;
      
      console.log(`[CoupangParser][Price] Found via selector "${selector}": ${value}`);
      
      // final/discount/sale 키워드를 포함한 셀렉터는 할인된 가격(최종 가격)으로 처리
      if (/final|discount|final-price|deal|sale|coupon/i.test(selector)) {
        discountPrice = value;
        amount = value;
        break; // 최종 가격을 찾았으므로 루프 종료
      }
      // sales 등은 원가로 처리
      if (!originalPrice) originalPrice = value;
      if (!amount) amount = value;
    } catch (e) {
      // ignore selector errors
      console.debug(`[CoupangParser][Price] Selector ${selector} failed`, e);
    }
  }

  // 방법 2: 실패시 텍스트 컨텐츠에서 가격 패턴 직접 검색
  if (!amount) {
    const priceElements = doc.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');
    for (const el of priceElements) {
      const text = el.textContent?.trim() || '';
      const match = text.match(/(\d{1,3}(?:,\d{3})*)\s*원/);
      if (match) {
        const value = extractNumber(match[1]);
        if (value && isValidCoupangPrice(value)) {
          console.log(`[CoupangParser][Price] Found via regex in element: ${value}`);
          amount = value;
          break;
        }
      }
    }
  }

  return { amount, originalPrice, discountPrice };
};

export const findPriceInDOM = (doc: Document): number | null => {
  const pricePatterns = [
    /(\d{1,3}(?:,\d{3})*)\s*원/, // 1,234원
    /₩\s*(\d{1,3}(?:,\d{3})*)/, // ₩ 1,234
    /(\d{1,3}(?:,\d{3})*)\s*WON/i, // 1,234 WON
    /(\d{1,3}(?:,\d{3})*)/ // bare number fallback - least reliable
  ];
  
  const walker = doc.createTreeWalker(
    doc.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  let node;
  while ((node = walker.nextNode())) {
    const text = (node.textContent || '').replace(/\u00A0/g, ' '); // replace non-breaking spaces
    for (const pattern of pricePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const value = extractNumber(match[1]);
        if (value) {
          console.log(`[CoupangParser][findPriceInDOM] Found price via text walker: ${value}`);
          return value;
        }
      }
    }
  }

  return null;
};

// Additional heuristic: scan elements with 'price' in class/id or data attributes
export const findPriceByElementScan = (doc: Document): number | null => {
  try {
    const candidates = Array.from(doc.querySelectorAll('[class*="price"], [id*="price"], [data-price]')) as Element[];
    const pricePattern = /(\d{1,3}(?:,\d{3})*)/;
    for (const el of candidates) {
      const text = (el.textContent || '').replace(/\u00A0/g, ' ').trim();
      const attr = (el.getAttribute('data-price') || '').trim();
      const combined = `${text} ${attr}`.trim();
      const match = combined.match(pricePattern);
      if (match && match[1]) {
        const value = extractNumber(match[1]);
        if (value) {
          console.log(`[CoupangParser][findPriceByElementScan] Found price by element scan: ${value}`);
          return value;
        }
      }
    }
  } catch (e) {
    console.debug('[CoupangParser][findPriceByElementScan] error', e);
  }
  return null;
};
