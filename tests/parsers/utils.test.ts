/**
 * 파서 유틸리티 함수 테스트
 * @module tests/parsers/utils.test.ts
 */
import { describe, it, expect } from 'vitest';
import {
  extractNumber,
  extractDecimal,
  extractPercentage,
  extractCurrency,
  isValidPrice,
  calculateDiscountAmount,
  calculateDiscountRate,
  calculateCardDiscount,
  formatPrice,
  formatDiscountRate,
  safeGetText,
  safeGetAttr,
  normalizeCardName,
  extractCardKeyword,
} from '@/content/parsers/utils';

describe('가격 추출 유틸리티', () => {
  describe('extractNumber', () => {
    it('한국 원화 형식에서 숫자를 추출해야 한다', () => {
      expect(extractNumber('1,234,567원')).toBe(1234567);
      expect(extractNumber('₩1,234')).toBe(1234);
      expect(extractNumber('12,345')).toBe(12345);
    });

    it('공백과 특수문자를 무시해야 한다', () => {
      expect(extractNumber('  1,234원  ')).toBe(1234);
      expect(extractNumber('$99')).toBe(99);
      expect(extractNumber('€100')).toBe(100);
    });

    it('유효하지 않은 입력에 null을 반환해야 한다', () => {
      expect(extractNumber('')).toBeNull();
      expect(extractNumber('   ')).toBeNull();
      expect(extractNumber('가격없음')).toBeNull();
    });
  });

  describe('extractDecimal', () => {
    it('소수점 숫자를 추출해야 한다', () => {
      expect(extractDecimal('3.5%')).toBe(3.5);
      expect(extractDecimal('할인율 12.75')).toBe(12.75);
      expect(extractDecimal('100')).toBe(100);
    });

    it('유효하지 않은 입력에 null을 반환해야 한다', () => {
      expect(extractDecimal('')).toBeNull();
      expect(extractDecimal('없음')).toBeNull();
    });
  });

  describe('extractPercentage', () => {
    it('퍼센트 숫자를 추출해야 한다', () => {
      expect(extractPercentage('최대 20% 할인')).toBe(20);
      expect(extractPercentage('3.5%')).toBe(3.5);
      expect(extractPercentage('할인 10 %')).toBe(10);
    });

    it('% 기호가 없으면 null을 반환해야 한다', () => {
      expect(extractPercentage('20')).toBeNull();
      expect(extractPercentage('할인')).toBeNull();
    });
  });

  describe('extractCurrency', () => {
    it('한국 원화를 인식해야 한다', () => {
      expect(extractCurrency('1,234원')).toBe('KRW');
      expect(extractCurrency('KRW 1000')).toBe('KRW');
    });

    it('다른 통화를 인식해야 한다', () => {
      expect(extractCurrency('$99.99')).toBe('USD');
      expect(extractCurrency('USD 100')).toBe('USD');
      expect(extractCurrency('€50')).toBe('EUR');
      expect(extractCurrency('¥1000')).toBe('JPY');
    });

    it('기본값으로 KRW를 반환해야 한다', () => {
      expect(extractCurrency('1234')).toBe('KRW');
      expect(extractCurrency('')).toBe('KRW');
    });
  });

  describe('isValidPrice', () => {
    it('유효한 가격 범위를 확인해야 한다', () => {
      expect(isValidPrice(1000)).toBe(true);
      expect(isValidPrice(99999999)).toBe(true);
      expect(isValidPrice(101)).toBe(true);
    });

    it('유효하지 않은 가격을 거부해야 한다', () => {
      expect(isValidPrice(100)).toBe(false); // 경계값
      expect(isValidPrice(100_000_000)).toBe(false); // 경계값
      expect(isValidPrice(0)).toBe(false);
      expect(isValidPrice(-1000)).toBe(false);
      expect(isValidPrice(null)).toBe(false);
      expect(isValidPrice(undefined)).toBe(false);
    });
  });
});

describe('가격 계산 유틸리티', () => {
  describe('calculateDiscountAmount', () => {
    it('할인 금액을 정확히 계산해야 한다', () => {
      expect(calculateDiscountAmount(10000, 10)).toBe(1000);
      expect(calculateDiscountAmount(15000, 20)).toBe(3000);
      expect(calculateDiscountAmount(99999, 15)).toBe(15000); // 반올림
    });

    it('유효하지 않은 입력에 0을 반환해야 한다', () => {
      expect(calculateDiscountAmount(50, 10)).toBe(0); // 가격 범위 밖
      expect(calculateDiscountAmount(10000, 0)).toBe(0);
      expect(calculateDiscountAmount(10000, -5)).toBe(0);
      expect(calculateDiscountAmount(10000, 150)).toBe(0);
    });
  });

  describe('calculateDiscountRate', () => {
    it('할인율을 정확히 계산해야 한다', () => {
      expect(calculateDiscountRate(10000, 9000)).toBe(10);
      expect(calculateDiscountRate(20000, 15000)).toBe(25);
    });

    it('할인이 없거나 가격 오류 시 0을 반환해야 한다', () => {
      expect(calculateDiscountRate(10000, 10000)).toBe(0);
      expect(calculateDiscountRate(10000, 11000)).toBe(0); // 가격 인상
      expect(calculateDiscountRate(50, 40)).toBe(0); // 가격 범위 밖
    });
  });

  describe('calculateCardDiscount', () => {
    it('카드 할인을 정확히 계산해야 한다', () => {
      const result = calculateCardDiscount(10000, 10);
      expect(result.discountAmount).toBe(1000);
      expect(result.finalPrice).toBe(9000);
    });

    it('최대 할인 한도를 적용해야 한다', () => {
      const result = calculateCardDiscount(100000, 20, 5000);
      expect(result.discountAmount).toBe(5000); // 20000이 아닌 한도 적용
      expect(result.finalPrice).toBe(95000);
    });

    it('한도가 없으면 전체 할인을 적용해야 한다', () => {
      const result = calculateCardDiscount(100000, 20);
      expect(result.discountAmount).toBe(20000);
      expect(result.finalPrice).toBe(80000);
    });
  });
});

describe('텍스트 포맷팅 유틸리티', () => {
  describe('formatPrice', () => {
    it('원화 형식으로 포맷팅해야 한다', () => {
      expect(formatPrice(1234567)).toBe('1,234,567원');
      expect(formatPrice(1000)).toBe('1,000원');
      expect(formatPrice(0)).toBe('0원');
    });
  });

  describe('formatDiscountRate', () => {
    it('퍼센트 형식으로 포맷팅해야 한다', () => {
      expect(formatDiscountRate(20)).toBe('20%');
      expect(formatDiscountRate(3.5)).toBe('3.5%');
    });
  });
});

describe('DOM 유틸리티', () => {
  describe('safeGetText', () => {
    it('요소의 텍스트를 반환해야 한다', () => {
      const div = document.createElement('div');
      div.textContent = '  테스트 텍스트  ';
      expect(safeGetText(div)).toBe('테스트 텍스트');
    });

    it('null 요소에 빈 문자열을 반환해야 한다', () => {
      expect(safeGetText(null)).toBe('');
    });

    it('빈 요소에 빈 문자열을 반환해야 한다', () => {
      const div = document.createElement('div');
      expect(safeGetText(div)).toBe('');
    });
  });

  describe('safeGetAttr', () => {
    it('요소의 속성을 반환해야 한다', () => {
      const div = document.createElement('div');
      div.setAttribute('data-price', '  1000  ');
      expect(safeGetAttr(div, 'data-price')).toBe('1000');
    });

    it('null 요소에 빈 문자열을 반환해야 한다', () => {
      expect(safeGetAttr(null, 'any')).toBe('');
    });

    it('없는 속성에 빈 문자열을 반환해야 한다', () => {
      const div = document.createElement('div');
      expect(safeGetAttr(div, 'nonexistent')).toBe('');
    });
  });
});

describe('카드 유틸리티', () => {
  describe('normalizeCardName', () => {
    it('카드명을 정규화해야 한다', () => {
      expect(normalizeCardName('삼성')).toBe('삼성카드');
      expect(normalizeCardName('KB국민')).toBe('KB국민카드');
      expect(normalizeCardName('신한카드')).toBe('신한카드');
    });

    it('공백을 제거해야 한다', () => {
      expect(normalizeCardName('KB 국민 카드')).toBe('KB국민카드');
    });

    it('영문 card를 카드로 변환해야 한다', () => {
      expect(normalizeCardName('Samsung Card')).toBe('Samsung카드');
    });

    it('빈 문자열에 빈 문자열을 반환해야 한다', () => {
      expect(normalizeCardName('')).toBe('');
    });
  });

  describe('extractCardKeyword', () => {
    it('카드사 키워드를 추출해야 한다', () => {
      expect(extractCardKeyword('삼성카드')).toBe('삼성');
      expect(extractCardKeyword('KB국민카드')).toBe('KB');
      expect(extractCardKeyword('신한카드')).toBe('신한');
    });

    it('키워드가 없으면 카드 제외 이름을 반환해야 한다', () => {
      expect(extractCardKeyword('카카오뱅크카드')).toBe('카카오뱅크');
    });
  });
});
