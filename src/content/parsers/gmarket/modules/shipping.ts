/**
 * G마켓 배송 정보 추출 모듈
 * 책임: 스타배송, 배송비 정보 추출
 */

import { GMARKET_SELECTORS } from '../constants';
import { ShippingInfo } from '../../../../shared/types/parser';
import { parseLog } from '../../../../shared/utils/logger';

// Re-export type for convenience
export type { ShippingInfo };

/**
 * 배송 정보 추출
 */
export const extractShippingInfo = (doc: Document): ShippingInfo | null => {
  const selectors = GMARKET_SELECTORS.shipping;

  // 스타배송 여부 확인
  const starDeliveryEl = doc.querySelector(selectors.starDelivery);
  const isStarDelivery = !!starDeliveryEl;

  // 배송 정보 섹션
  const shippingBox = doc.querySelector(selectors.shippingInfo);
  
  const method = isStarDelivery ? '스타배송' : '일반배송';
  let fee: string | undefined;
  let estimatedDate: string | undefined;
  let isFree = false;

  if (shippingBox) {
    const text = shippingBox.textContent || '';
    
    // 배송비 추출
    const feeMatch = text.match(/(\d{1,3}(?:,\d{3})*)\s*원/);
    if (feeMatch) {
      fee = `${feeMatch[1]}원`;
    } else if (text.includes('무료')) {
      fee = '무료';
      isFree = true;
    }

    // 예상 배송일 추출
    const dateMatch = text.match(/(\d+\/\d+|\d+일)/);
    if (dateMatch) {
      estimatedDate = dateMatch[1];
    }
  }

  parseLog.debug('배송 정보', { method, isStarDelivery, fee });

  return {
    method,
    isStarDelivery,
    isFree,
    fee,
    estimatedDate,
  };
};
