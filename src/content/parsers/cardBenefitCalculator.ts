/**
 * 카드 혜택 계산 유틸리티
 * 모든 파서에서 공통으로 사용하는 카드 할인 계산 로직
 */

import { CardBenefitInfo } from '../../shared/types/parser';
import { isValidPrice } from './utils';

// ============================================
// 카드 할인 금액 계산
// ============================================

/**
 * 카드 할인 금액 계산
 * @param price 상품 가격
 * @param benefit 카드 혜택 정보
 * @returns 계산된 할인 금액
 */
export const calculateCardDiscountAmount = (
  price: number,
  benefit: CardBenefitInfo
): number => {
  if (!isValidPrice(price)) return 0;

  const rate = benefit.rate ?? benefit.discount ?? 0;
  if (rate <= 0) return 0;

  // 할인 금액 계산
  let discountAmount = Math.round(price * (rate / 100));

  // 최대 할인 한도 적용
  if (benefit.maxDiscount && discountAmount > benefit.maxDiscount) {
    discountAmount = benefit.maxDiscount;
  }

  // 최소 구매 금액 조건 확인
  if (benefit.minPurchase && price < benefit.minPurchase) {
    return 0;
  }

  return discountAmount;
};

/**
 * 카드 적용 후 최종 가격 계산
 * @param price 상품 가격
 * @param benefit 카드 혜택 정보
 * @returns { finalPrice: 최종가격, discountAmount: 할인금액 }
 */
export const calculateFinalPriceWithCard = (
  price: number,
  benefit: CardBenefitInfo
): { finalPrice: number; discountAmount: number } => {
  const discountAmount = calculateCardDiscountAmount(price, benefit);
  return {
    finalPrice: price - discountAmount,
    discountAmount,
  };
};

/**
 * 여러 카드 혜택 중 최적의 혜택 찾기
 * @param price 상품 가격
 * @param benefits 카드 혜택 배열
 * @returns 최적의 혜택 (가장 큰 할인)
 */
export const findBestCardBenefit = (
  price: number,
  benefits: CardBenefitInfo[]
): { benefit: CardBenefitInfo; discountAmount: number } | null => {
  if (!benefits.length) return null;

  let bestBenefit: CardBenefitInfo | null = null;
  let maxDiscount = 0;

  for (const benefit of benefits) {
    const discountAmount = calculateCardDiscountAmount(price, benefit);
    if (discountAmount > maxDiscount) {
      maxDiscount = discountAmount;
      bestBenefit = benefit;
    }
  }

  if (!bestBenefit) return null;

  return {
    benefit: bestBenefit,
    discountAmount: maxDiscount,
  };
};

// ============================================
// 카드 혜택 정규화
// ============================================

/**
 * 카드 혜택 정보를 표준 형식으로 변환
 * 각 파서에서 추출한 다양한 형식을 CardBenefitInfo로 통일
 */
export const normalizeCardBenefit = (raw: {
  card?: string;
  cardName?: string;
  benefit?: string;
  discount?: number;
  rate?: number;
  imageUrl?: string;
  maxDiscount?: number;
  minPurchase?: number;
}): CardBenefitInfo => {
  const cardName = raw.cardName || raw.card || '알 수 없는 카드';
  const rate = raw.rate ?? raw.discount ?? 0;

  return {
    card: cardName,
    cardName,
    benefit: raw.benefit || `${rate}% 할인`,
    discount: rate,
    rate,
    imageUrl: raw.imageUrl,
    maxDiscount: raw.maxDiscount,
    minPurchase: raw.minPurchase,
  };
};

/**
 * 카드 혜택 배열 정규화 및 정렬
 * @param benefits 원본 혜택 배열
 * @param price 상품 가격 (할인금액 계산용, 선택)
 * @returns 정규화된 혜택 배열 (할인율 내림차순 정렬)
 */
export const normalizeAndSortCardBenefits = (
  benefits: Array<{
    card?: string;
    cardName?: string;
    benefit?: string;
    discount?: number;
    rate?: number;
    imageUrl?: string;
  }>,
  price?: number
): CardBenefitInfo[] => {
  const normalized = benefits.map((b) => {
    const benefit = normalizeCardBenefit(b);

    // 가격이 제공되면 할인 금액 계산
    if (price && isValidPrice(price)) {
      benefit.discountAmount = calculateCardDiscountAmount(price, benefit);
    }

    return benefit;
  });

  // 할인율(또는 할인금액) 기준 내림차순 정렬
  return normalized.sort((a, b) => {
    // 할인금액이 계산되어 있으면 그것으로 정렬
    if (a.discountAmount !== undefined && b.discountAmount !== undefined) {
      return b.discountAmount - a.discountAmount;
    }
    // 그렇지 않으면 할인율로 정렬
    return (b.rate ?? 0) - (a.rate ?? 0);
  });
};

// ============================================
// 중복 제거
// ============================================

/**
 * 중복된 카드 혜택 제거
 * 같은 카드사의 여러 혜택이 있을 경우 가장 좋은 것만 유지
 */
export const deduplicateCardBenefits = (
  benefits: CardBenefitInfo[]
): CardBenefitInfo[] => {
  const cardMap = new Map<string, CardBenefitInfo>();

  for (const benefit of benefits) {
    const key = extractCardKey(benefit.cardName || benefit.card);
    const existing = cardMap.get(key);

    if (!existing) {
      cardMap.set(key, benefit);
    } else {
      // 더 좋은 혜택으로 교체
      const existingRate = existing.rate ?? existing.discount ?? 0;
      const newRate = benefit.rate ?? benefit.discount ?? 0;
      if (newRate > existingRate) {
        cardMap.set(key, benefit);
      }
    }
  }

  return Array.from(cardMap.values());
};

/**
 * 카드명에서 비교용 키 추출
 * "11번가 신한 신용카드" → "신한"
 * "KB국민카드" → "KB"
 * "NH농협카드" → "NH"
 * 
 * 우선순위: 영문 약자(KB, NH, BC) > 한글 카드사명
 */
const extractCardKey = (cardName: string): string => {
  const normalized = cardName.toUpperCase();
  
  // 1순위: 영문 약자 먼저 체크 (더 구체적임)
  const abbreviations = ['KB', 'NH', 'BC'];
  for (const abbr of abbreviations) {
    if (normalized.includes(abbr)) {
      return abbr;
    }
  }
  
  // 2순위: 한글 카드사명 체크
  const keywords = [
    '삼성',
    '현대',
    '신한',
    '국민',
    '롯데',
    '하나',
    '우리',
    '농협',
    '비씨',
    '씨티',
    '스마일',
  ];
  
  for (const keyword of keywords) {
    if (cardName.includes(keyword)) {
      return keyword;
    }
  }

  return cardName;
};

// ============================================
// 혜택 텍스트 포맷팅
// ============================================

/**
 * 카드 혜택을 사용자에게 보여줄 텍스트로 포맷팅
 * @param benefit 카드 혜택 정보
 * @param price 상품 가격 (선택, 금액 계산용)
 */
export const formatCardBenefitText = (
  benefit: CardBenefitInfo,
  price?: number
): string => {
  const rate = benefit.rate ?? benefit.discount ?? 0;
  const cardName = benefit.cardName || benefit.card;

  let text = `${cardName}: ${rate}% 할인`;

  // 금액이 제공되면 예상 할인금액 표시
  if (price && isValidPrice(price)) {
    const discountAmount = calculateCardDiscountAmount(price, benefit);
    text += ` (약 ${discountAmount.toLocaleString('ko-KR')}원 할인)`;
  }

  // 최대 할인 한도 표시
  if (benefit.maxDiscount) {
    text += ` [최대 ${benefit.maxDiscount.toLocaleString('ko-KR')}원]`;
  }

  // 최소 구매 금액 조건 표시
  if (benefit.minPurchase) {
    text += ` (${benefit.minPurchase.toLocaleString('ko-KR')}원 이상)`;
  }

  return text;
};

/**
 * 모든 카드 혜택을 요약 텍스트로 변환
 */
export const formatAllCardBenefits = (
  benefits: CardBenefitInfo[],
  price?: number
): string => {
  if (!benefits.length) return '카드 혜택 없음';

  return benefits
    .map((b) => formatCardBenefitText(b, price))
    .join('\n');
};
