import { extractNumber } from '../../utils';
import { COUPANG_SELECTORS } from '../constants';

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
      const value = extractNumber(el.textContent);
      if (!value) continue;
      // final/discount 키워드를 포함한 셀렉터는 할인된 가격(최종 가격)으로 처리
      if (/final|discount|final-price|deal|sale/i.test(selector)) {
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

  // 방법 2: 실패시 DOM 탐색 (외부에서 호출하거나 여기서 구현)
  // 여기서는 선택자 기반만 처리하고, DOM 탐색은 필요한 경우 상위에서 처리하도록 함
  // 또는 DOM 탐색 로직도 여기로 가져올 수 있음

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
