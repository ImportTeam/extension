/**
 * Common utility functions for parsers
 * 모든 파서에서 공통으로 사용하는 유틸리티 함수
 */

// ============================================
// 가격 추출 유틸리티
// ============================================

/**
 * 텍스트에서 숫자 추출
 * "1,234,567원" → 1234567
 * "₩1,234" → 1234
 */
export const extractNumber = (text: string): number | null => {
  if (!text) return null;
  
  const cleaned = text.replace(/[,₩$€£\s원]/g, '').trim();
  const match = cleaned.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * 텍스트에서 소수점 포함 숫자 추출
 * "3.5%" → 3.5
 */
export const extractDecimal = (text: string): number | null => {
  if (!text) return null;
  
  const match = text.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
};

/**
 * 텍스트에서 퍼센트 추출
 * "최대 20% 할인" → 20
 */
export const extractPercentage = (text: string): number | null => {
  if (!text) return null;
  
  const match = text.match(/(\d+(?:\.\d+)?)\s*%/);
  return match ? parseFloat(match[1]) : null;
};

/**
 * 텍스트에서 통화 추출
 */
export const extractCurrency = (text: string): string => {
  if (text.includes('원') || text.includes('KRW')) return 'KRW';
  if (text.includes('$') || text.includes('USD')) return 'USD';
  if (text.includes('€') || text.includes('EUR')) return 'EUR';
  if (text.includes('¥') || text.includes('JPY')) return 'JPY';
  return 'KRW'; // 기본값
};

/**
 * 가격 검증 (합리적인 범위)
 * 100원 ~ 1억원
 */
export const isValidPrice = (price: number | null | undefined): price is number => typeof price === 'number' && price > 100 && price < 100_000_000;

// ============================================
// 가격 계산 유틸리티
// ============================================

/**
 * 할인율로 할인 금액 계산
 * @param price 원가
 * @param discountRate 할인율 (%)
 * @returns 할인 금액
 */
export const calculateDiscountAmount = (price: number, discountRate: number): number => {
  if (!isValidPrice(price) || discountRate <= 0 || discountRate > 100) {
    return 0;
  }
  return Math.round(price * (discountRate / 100));
};

/**
 * 할인 금액으로 할인율 계산
 * @param originalPrice 원가
 * @param discountedPrice 할인가
 * @returns 할인율 (%)
 */
export const calculateDiscountRate = (
  originalPrice: number,
  discountedPrice: number
): number => {
  if (!isValidPrice(originalPrice) || !isValidPrice(discountedPrice)) {
    return 0;
  }
  if (discountedPrice >= originalPrice) {
    return 0;
  }
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * 카드 할인 적용 후 최종 금액 계산
 * @param price 상품 가격
 * @param discountRate 카드 할인율 (%)
 * @param maxDiscount 최대 할인 한도 (선택)
 * @returns { finalPrice: 최종가, discountAmount: 할인금액 }
 */
export const calculateCardDiscount = (
  price: number,
  discountRate: number,
  maxDiscount?: number
): { finalPrice: number; discountAmount: number } => {
  if (!isValidPrice(price) || discountRate <= 0) {
    return { finalPrice: price, discountAmount: 0 };
  }
  
  let discountAmount = calculateDiscountAmount(price, discountRate);
  
  // 최대 할인 한도 적용
  if (maxDiscount && discountAmount > maxDiscount) {
    discountAmount = maxDiscount;
  }
  
  return {
    finalPrice: price - discountAmount,
    discountAmount,
  };
};

// ============================================
// 텍스트 포맷팅 유틸리티
// ============================================

/**
 * 혜택 정보를 가독성 높은 텍스트로 포맷팅
 * @param details 혜택 상세 정보 배열
 * @returns 포맷팅된 문자열
 */
export const formatBenefitDetails = (
  details: Array<{ label: string; value: string }>
): string => details
    .map((d) => `${d.label}: ${d.value}`)
    .join('\n');

/**
 * 금액을 원화 형식으로 포맷팅
 * 1234567 → "1,234,567원"
 */
export const formatPrice = (price: number): string => `${price.toLocaleString('ko-KR')}원`;

/**
 * 할인율을 포맷팅
 * 20 → "20%"
 */
export const formatDiscountRate = (rate: number): string => `${rate}%`;

// ============================================
// DOM 유틸리티
// ============================================

/**
 * 안전하게 요소의 텍스트 가져오기
 */
export const safeGetText = (element: Element | null): string => element?.textContent?.trim() || '';

/**
 * 안전하게 속성 가져오기
 */
export const safeGetAttr = (element: Element | null, attr: string): string => element?.getAttribute(attr)?.trim() || '';

/**
 * 첫 번째 매칭 요소의 텍스트 가져오기
 */
export const getFirstMatchText = (
  doc: Document,
  selectors: string[]
): string | null => {
  for (const selector of selectors) {
    const el = doc.querySelector(selector);
    const text = safeGetText(el);
    if (text) return text;
  }
  return null;
};

/**
 * 첫 번째 매칭 요소의 숫자 가져오기
 */
export const getFirstMatchNumber = (
  doc: Document,
  selectors: string[]
): number | null => {
  const text = getFirstMatchText(doc, selectors);
  return text ? extractNumber(text) : null;
};

// ============================================
// 카드 유틸리티
// ============================================

/**
 * 카드명 정규화
 * "삼성" → "삼성카드"
 * "KB국민" → "KB국민카드"
 */
export const normalizeCardName = (name: string): string => {
  if (!name) return '';
  
  const cleaned = name
    .trim()
    .replace(/\s+/g, '')
    .replace(/card$/i, '카드');
    
  if (!cleaned.includes('카드')) {
    return `${cleaned}카드`;
  }
  
  return cleaned;
};

/**
 * 카드사명에서 키워드 추출
 * "KB국민카드" → "국민"
 */
export const extractCardKeyword = (cardName: string): string => {
  const keywords = ['삼성', '현대', '신한', 'KB', '국민', '롯데', '하나', '우리', '농협', 'BC', 'NH'];
  
  for (const keyword of keywords) {
    if (cardName.includes(keyword)) {
      return keyword;
    }
  }
  
  return cardName.replace(/카드$/g, '');
};
