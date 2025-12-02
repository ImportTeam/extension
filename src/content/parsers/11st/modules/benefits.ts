/**
 * 11번가 혜택 정보 추출 모듈
 */

import { extractNumber } from '../../utils';
import { ELEVEN_ST_SELECTORS } from '../constants';

export interface PointInfo {
  amount: number;        // 포인트 금액
  type: string;          // 포인트 유형 (적립포인트, 11pay포인트 등)
  description: string;   // 설명
}

export interface CardBenefitInfo {
  cardName: string;      // 카드명 (예: '11번가 신한카드')
  benefitAmount: number; // 혜택 금액
  benefitType: string;   // 혜택 유형 (포인트, 할인 등)
  condition: string;     // 조건 (예: '결제 시')
}

export interface CouponInfo {
  name: string;          // 쿠폰명
  discountAmount: number | null;  // 할인 금액
  discountRate: number | null;    // 할인율 (%)
}

export interface BenefitsInfo {
  points: PointInfo[];
  cardBenefits: CardBenefitInfo[];
  coupons: CouponInfo[];
  totalPointAmount: number;
  totalCardBenefitAmount: number;
}

/**
 * 전체 혜택 정보 추출
 */
export const extractBenefits = (doc: Document): BenefitsInfo => {
  const result: BenefitsInfo = {
    points: [],
    cardBenefits: [],
    coupons: [],
    totalPointAmount: 0,
    totalCardBenefitAmount: 0,
  };

  try {
    // 포인트 추출
    result.points = extractPoints(doc);
    result.totalPointAmount = result.points.reduce((sum, p) => sum + p.amount, 0);

    // 카드 혜택 추출
    result.cardBenefits = extractCardBenefits(doc);
    result.totalCardBenefitAmount = result.cardBenefits.reduce((sum, c) => sum + c.benefitAmount, 0);

    // 쿠폰 추출
    result.coupons = extractCoupons(doc);

    console.log('[11stParser][Benefits] 총 포인트:', result.totalPointAmount);
    console.log('[11stParser][Benefits] 총 카드혜택:', result.totalCardBenefitAmount);
  } catch (error) {
    console.error('[11stParser][Benefits] 혜택 추출 오류:', error);
  }

  return result;
};

/**
 * 포인트 정보 추출
 */
export const extractPoints = (doc: Document): PointInfo[] => {
  const points: PointInfo[] = [];
  const selectors = ELEVEN_ST_SELECTORS.benefits;

  try {
    // 최대 적립 포인트 레이어
    const pointLayer = doc.querySelector(selectors.pointLayer);
    if (pointLayer) {
      // 메인 포인트 금액
      const pointEl = pointLayer.querySelector(selectors.pointAmount);
      if (pointEl?.textContent) {
        const amount = extractNumber(pointEl.textContent);
        if (amount) {
          points.push({
            amount,
            type: '적립포인트',
            description: '최대 적립 가능 포인트',
          });
          console.log('[11stParser][Points] 최대 적립 포인트:', amount);
        }
      }

      // 11pay 포인트
      const elevenPayEl = pointLayer.querySelector(selectors.elevenPayPoint);
      if (elevenPayEl?.textContent) {
        const amount = extractNumber(elevenPayEl.textContent);
        if (amount) {
          points.push({
            amount,
            type: '11pay포인트',
            description: '11pay 결제 시 적립',
          });
          console.log('[11stParser][Points] 11pay 포인트:', amount);
        }
      }
    }

    // 기본 포인트 표시 영역
    const basicPointEl = doc.querySelector(selectors.basicPoint);
    if (basicPointEl?.textContent && points.length === 0) {
      const amount = extractNumber(basicPointEl.textContent);
      if (amount) {
        points.push({
          amount,
          type: '기본적립',
          description: '기본 적립 포인트',
        });
        console.log('[11stParser][Points] 기본 포인트:', amount);
      }
    }
  } catch (error) {
    console.error('[11stParser][Points] 포인트 추출 오류:', error);
  }

  return points;
};

/**
 * 카드 혜택 정보 추출
 */
export const extractCardBenefits = (doc: Document): CardBenefitInfo[] => {
  const benefits: CardBenefitInfo[] = [];
  const selectors = ELEVEN_ST_SELECTORS.cardBenefits;

  try {
    // 카드 혜택 레이어
    const benefitLayer = doc.querySelector(selectors.layer);
    if (benefitLayer) {
      // 혜택 버튼들에서 정보 추출
      const buttons = benefitLayer.querySelectorAll(selectors.benefitButton);
      
      buttons.forEach((btn: Element) => {
        const text = btn.textContent?.trim() || '';
        const benefit = parseCardBenefitText(text);
        if (benefit) {
          benefits.push(benefit);
        }
      });
    }

    // 대체 방법: 카드혜택 섹션에서 직접 추출
    const cardItems = doc.querySelectorAll(selectors.cardItem);
    cardItems.forEach((item) => {
      const titleEl = item.querySelector(selectors.cardTitle);
      const amountEl = item.querySelector(selectors.cardAmount);
      
      if (titleEl && amountEl) {
        const cardName = titleEl.textContent?.trim() || '';
        const amount = extractNumber(amountEl.textContent || '');
        
        if (cardName && amount) {
          benefits.push({
            cardName,
            benefitAmount: amount,
            benefitType: '포인트',
            condition: '결제 시',
          });
          console.log('[11stParser][CardBenefit]', cardName, amount);
        }
      }
    });

    // 텍스트 패턴 매칭으로 추가 혜택 찾기
    const benefitTexts = doc.querySelectorAll('.card_benefit, [class*="card_benefit"]');
    benefitTexts.forEach((el) => {
      const text = el.textContent?.trim() || '';
      const benefit = parseCardBenefitText(text);
      if (benefit && !benefits.find(b => b.cardName === benefit.cardName)) {
        benefits.push(benefit);
      }
    });

  } catch (error) {
    console.error('[11stParser][CardBenefit] 카드 혜택 추출 오류:', error);
  }

  return benefits;
};

/**
 * 카드 혜택 텍스트 파싱
 * 예: "11번가 신한카드 결제 시 1,000P 적립"
 */
function parseCardBenefitText(text: string): CardBenefitInfo | null {
  if (!text) return null;

  // 패턴: {카드명} 결제 시 {금액}P|원 {혜택유형}
  const patterns = [
    /(.+?(?:카드|페이))\s*결제\s*시\s*([\d,]+)\s*[P포인트]/i,
    /(.+?(?:카드|페이)).*?([\d,]+)\s*[P포인트]/i,
    /(.+?(?:카드|페이))\s*최대\s*([\d,]+)\s*[P포인트]/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const cardName = match[1].trim();
      const amount = extractNumber(match[2]);
      
      if (cardName && amount) {
        return {
          cardName,
          benefitAmount: amount,
          benefitType: text.includes('할인') ? '할인' : '포인트',
          condition: text.includes('결제 시') ? '결제 시' : '',
        };
      }
    }
  }

  return null;
}

/**
 * 쿠폰 정보 추출
 */
export const extractCoupons = (doc: Document): CouponInfo[] => {
  const coupons: CouponInfo[] = [];
  const selectors = ELEVEN_ST_SELECTORS.coupon;

  try {
    // 쿠폰 다운로드 버튼/배지
    const couponBadge = doc.querySelector(selectors.badge);
    if (couponBadge?.textContent) {
      const text = couponBadge.textContent.trim();
      const coupon = parseCouponText(text);
      if (coupon) {
        coupons.push(coupon);
        console.log('[11stParser][Coupon]', coupon);
      }
    }

    // 쿠폰 목록
    const couponItems = doc.querySelectorAll(selectors.item);
    couponItems.forEach((item) => {
      const nameEl = item.querySelector(selectors.name);
      const discountEl = item.querySelector(selectors.discount);
      
      if (nameEl || discountEl) {
        const name = nameEl?.textContent?.trim() || '쿠폰';
        const discountText = discountEl?.textContent || '';
        
        const discountAmount = discountText.includes('원') 
          ? extractNumber(discountText) 
          : null;
        const discountRate = discountText.includes('%') 
          ? extractNumber(discountText) 
          : null;

        coupons.push({
          name,
          discountAmount,
          discountRate,
        });
      }
    });
  } catch (error) {
    console.error('[11stParser][Coupon] 쿠폰 추출 오류:', error);
  }

  return coupons;
};

/**
 * 쿠폰 텍스트 파싱
 */
function parseCouponText(text: string): CouponInfo | null {
  if (!text) return null;

  // 금액 할인 쿠폰
  const amountMatch = text.match(/([\d,]+)\s*원\s*(?:할인)?/);
  if (amountMatch) {
    return {
      name: text,
      discountAmount: extractNumber(amountMatch[1]),
      discountRate: null,
    };
  }

  // 퍼센트 할인 쿠폰
  const percentMatch = text.match(/(\d+)\s*%\s*(?:할인)?/);
  if (percentMatch) {
    return {
      name: text,
      discountAmount: null,
      discountRate: parseInt(percentMatch[1], 10),
    };
  }

  return {
    name: text,
    discountAmount: null,
    discountRate: null,
  };
}
