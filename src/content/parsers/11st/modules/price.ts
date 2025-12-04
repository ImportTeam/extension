/**
 * 11번가 가격 추출 모듈
 */

import { extractNumber } from '../../utils';
import { ELEVEN_ST_SELECTORS } from '../constants';
import { parseLog, ErrorCode } from '../../../../shared/utils/logger';

export interface PriceInfo {
  amount: number | null;           // 현재 판매가
  originalPrice: number | null;    // 정가 (취소선)
  discountPrice: number | null;    // 할인가
  maxDiscountPrice: number | null; // 최대할인가
  discountRate: number | null;     // 할인율 (%)
  maxDiscountRate: number | null;  // 최대할인율 (%)
}

/**
 * 가격 정보 추출
 */
export const extractPrices = (doc: Document): PriceInfo => {
  const result: PriceInfo = {
    amount: null,
    originalPrice: null,
    discountPrice: null,
    maxDiscountPrice: null,
    discountRate: null,
    maxDiscountRate: null,
  };

  const selectors = ELEVEN_ST_SELECTORS.price;

  try {
    // 1. 정가 (취소선 가격)
    const originalPriceEl = doc.querySelector(selectors.originalPrice);
    if (originalPriceEl?.textContent) {
      result.originalPrice = extractNumber(originalPriceEl.textContent);
      parseLog.debug('정가', { price: result.originalPrice });
    }

    // 2. 현재 판매가 (할인가)
    const salePriceEl = doc.querySelector(selectors.salePrice) || 
                        doc.querySelector(selectors.salePriceAlt);
    if (salePriceEl?.textContent) {
      result.discountPrice = extractNumber(salePriceEl.textContent);
      result.amount = result.discountPrice;
      parseLog.debug('판매가', { price: result.discountPrice });
    }

    // 3. 할인율
    const discountRateEl = doc.querySelector(selectors.discountRate);
    if (discountRateEl?.textContent) {
      result.discountRate = extractNumber(discountRateEl.textContent);
      parseLog.debug('할인율', { rate: result.discountRate });
    }

    // 4. 최대할인가
    const maxDiscountPriceEl = doc.querySelector(selectors.maxDiscountPrice);
    if (maxDiscountPriceEl?.textContent) {
      result.maxDiscountPrice = extractNumber(maxDiscountPriceEl.textContent);
      parseLog.debug('최대할인가', { price: result.maxDiscountPrice });
    }

    // 5. 최대할인율
    const maxDiscountRateEl = doc.querySelector(selectors.maxDiscountRate);
    if (maxDiscountRateEl?.textContent) {
      result.maxDiscountRate = extractNumber(maxDiscountRateEl.textContent);
      parseLog.debug('최대할인율', { rate: result.maxDiscountRate });
    }

    // amount가 없으면 다른 가격으로 대체
    if (!result.amount) {
      result.amount = result.maxDiscountPrice || result.discountPrice || result.originalPrice;
    }

  } catch (error) {
    parseLog.error(ErrorCode.PAR_E002, '가격 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return result;
};

/**
 * DOM에서 가격 찾기 (폴백)
 */
export const findPriceInDOM = (doc: Document): number | null => {
  const pricePatterns = [
    /(\d{1,3}(?:,\d{3})*)\s*원/,
    /₩\s*(\d{1,3}(?:,\d{3})*)/,
  ];

  // price 클래스를 가진 요소들에서 검색
  const priceElements = doc.querySelectorAll('.price, [class*="price"]');
  
  for (const el of priceElements) {
    const text = el.textContent || '';
    for (const pattern of pricePatterns) {
      const match = text.match(pattern);
      if (match?.[1]) {
        const value = extractNumber(match[1]);
        if (value && value > 100 && value < 100_000_000) {
          parseLog.debug('가격 발견', { value });
          return value;
        }
      }
    }
  }

  return null;
};

/**
 * 최대할인가 상세 정보 추출
 */
export interface DiscountDetail {
  type: string;      // '즉시할인', '쿠폰할인' 등
  amount: number;    // 할인 금액
}

export const extractDiscountDetails = (doc: Document): DiscountDetail[] => {
  const details: DiscountDetail[] = [];
  const selectors = ELEVEN_ST_SELECTORS.price;

  try {
    const layer = doc.querySelector(selectors.maxDiscountLayer);
    if (!layer) return details;

    const items = layer.querySelectorAll('.discount_prices.list_type .field');
    
    items.forEach((item) => {
      const titleEl = item.querySelector('.title');
      const priceEl = item.querySelector('.price');
      
      if (titleEl && priceEl) {
        const type = titleEl.textContent?.trim() || '';
        const amountText = priceEl.textContent?.trim() || '';
        const amount = extractNumber(amountText.replace('-', ''));
        
        if (type && amount && type !== '판매가') {
          details.push({ type, amount });
          parseLog.debug('DiscountDetail', { type, amount });
        }
      }
    });
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E002, 'DiscountDetail 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return details;
};
