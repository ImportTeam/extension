/**
 * G마켓 가격 추출 모듈
 * 책임: 판매가, 할인가, 결제할인가 추출
 */

import { GMARKET_SELECTORS } from '../constants';
import { extractNumber } from '../../utils';
import { parseLog } from '../../../../shared/utils/logger';

interface PriceResult {
  amount: number | null;           // 최종 결제 금액
  originalPrice: number | null;    // 정가
  salePrice: number | null;        // 판매가
  discountPrice: number | null;    // 결제할인가
  discountRate: number | null;     // 할인율 (%)
}

/**
 * 텍스트에서 가격 숫자 추출
 */
const parsePrice = (text: string | null | undefined): number | null => {
  if (!text) return null;
  
  // 숫자와 콤마만 추출
  const cleaned = text.replace(/[^0-9,]/g, '');
  return extractNumber(cleaned);
};

/**
 * 결제할인가 추출 (최종가)
 */
const extractDiscountPrice = (doc: Document): number | null => {
  const selectors = GMARKET_SELECTORS.price;
  
  // 1. 결제할인가 섹션에서 가격 추출
  const discountPriceEl = doc.querySelector(selectors.discountPrice);
  if (discountPriceEl?.textContent) {
    const price = parsePrice(discountPriceEl.textContent);
    if (price) {
      parseLog.debug('결제할인가', { price });
      return price;
    }
  }

  // 2. 대체 선택자
  const altEl = doc.querySelector(selectors.discountPriceAlt);
  if (altEl?.textContent) {
    const price = parsePrice(altEl.textContent);
    if (price) {
      parseLog.debug('결제할인가 (alt)', { price });
      return price;
    }
  }

  return null;
};

/**
 * 판매가 추출
 */
const extractSalePrice = (doc: Document): number | null => {
  const selectors = GMARKET_SELECTORS.price;
  
  // strong.price_real
  const salePriceEl = doc.querySelector(selectors.salePrice);
  if (salePriceEl?.textContent) {
    const price = parsePrice(salePriceEl.textContent);
    if (price) {
      parseLog.debug('판매가', { price });
      return price;
    }
  }

  return null;
};

/**
 * 정가 (원가) 추출
 */
const extractOriginalPrice = (doc: Document): number | null => {
  const selectors = GMARKET_SELECTORS.price;
  
  const originalEl = doc.querySelector(selectors.originalPrice);
  if (originalEl?.textContent) {
    const price = parsePrice(originalEl.textContent);
    if (price) {
      parseLog.debug('정가', { price });
      return price;
    }
  }

  return null;
};

/**
 * 할인율 추출
 */
const extractDiscountRate = (doc: Document): number | null => {
  const selectors = GMARKET_SELECTORS.price;
  
  const rateEl = doc.querySelector(selectors.discountRate);
  if (rateEl?.textContent) {
    const match = rateEl.textContent.match(/(\d+)\s*%/);
    if (match) {
      const rate = parseInt(match[1], 10);
      parseLog.debug('할인율', { rate });
      return rate;
    }
  }

  return null;
};

/**
 * 전체 가격 정보 추출
 */
export const extractPrices = (doc: Document): PriceResult => {
  parseLog.debug('가격 정보 추출 시작...');

  const originalPrice = extractOriginalPrice(doc);
  const salePrice = extractSalePrice(doc);
  const discountPrice = extractDiscountPrice(doc);
  const discountRate = extractDiscountRate(doc);

  // 최종 금액 결정: 결제할인가 > 판매가 > 정가
  const amount = discountPrice || salePrice || originalPrice;

  parseLog.debug('가격 결과', {
    amount,
    originalPrice,
    salePrice,
    discountPrice,
    discountRate,
  });

  return {
    amount,
    originalPrice,
    salePrice,
    discountPrice,
    discountRate,
  };
};

/**
 * DOM에서 가격 패턴 검색 (폴백)
 */
export const findPriceInDOM = (doc: Document): number | null => {
  // 가격 관련 클래스를 가진 요소들 검색
  const priceElements = doc.querySelectorAll(
    '.price, [class*="price"], .total, [class*="amount"]'
  );

  for (const el of priceElements) {
    const text = el.textContent || '';
    // "원" 포함하고 숫자가 있는 경우
    if (text.includes('원')) {
      const match = text.match(/(\d{1,3}(?:,\d{3})*)\s*원/);
      if (match) {
        const price = extractNumber(match[1]);
        if (price && price >= 1000) {
          parseLog.debug('DOM 스캔 가격', { price });
          return price;
        }
      }
    }
  }

  return null;
};
