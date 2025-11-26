/**
 * Common utility functions for parsers
 */

/**
 * 텍스트에서 숫자 추출
 * "1,234,567원" → 1234567
 */
export const extractNumber = (text: string): number | null => {
  const cleaned = text.replace(/[,₩$€£\s]/g, '').trim();
  const match = cleaned.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
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
export const isValidPrice = (price: number): boolean => {
  return price > 100 && price < 100_000_000;
};
