import { extractNumber } from '../../utils';

export const extractPrices = (doc: Document): {
  amount: number | null;
  originalPrice: number | null;
  discountPrice: number | null;
} => {
  let amount: number | null = null;
  let originalPrice: number | null = null;
  let discountPrice: number | null = null;

  // 방법 1: 선택자 기반 (우선순위)
  const salesPriceEl = doc.querySelector('.price-amount.sales-price-amount');
  if (salesPriceEl?.textContent) {
    originalPrice = extractNumber(salesPriceEl.textContent);
    amount = originalPrice;
  }

  const discountPriceEl = doc.querySelector('.price-amount.final-price-amount');
  if (discountPriceEl?.textContent) {
    discountPrice = extractNumber(discountPriceEl.textContent);
    if (discountPrice) amount = discountPrice; // 최종 가격 (할인 적용)
  }

  // 방법 2: 실패시 DOM 탐색 (외부에서 호출하거나 여기서 구현)
  // 여기서는 선택자 기반만 처리하고, DOM 탐색은 필요한 경우 상위에서 처리하도록 함
  // 또는 DOM 탐색 로직도 여기로 가져올 수 있음

  return { amount, originalPrice, discountPrice };
};

export const findPriceInDOM = (doc: Document): number | null => {
  const pricePattern = /(\d{1,3}(?:,\d{3})*)\s*원/;
  
  const walker = doc.createTreeWalker(
    doc.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  let node;
  while ((node = walker.nextNode())) {
    const text = node.textContent || '';
    const match = text.match(pricePattern);
    if (match) {
      return extractNumber(match[1]);
    }
  }

  return null;
};
