/**
 * 파서 설정
 * 각 사이트별 선택자 및 정규표현식 정의
 */
export interface ParserConfig {
  siteName: string; // "coupang", "musinsa", "gmarket"
  urlPattern: RegExp; // URL 매칭 패턴
  confidence: number; // 0.0 ~ 1.0 신뢰도
  selectors: {
    price?: string[]; // CSS 선택자 배열 (fallback)
    discount?: string[]; // 할인율 선택자
    cardBenefits?: string[]; // 카드 혜택 선택자
    product?: string; // 상품 정보 컨테이너
    // Coupang 특화
    title?: string[];
    image?: string[];
    originalPrice?: string[];
    finalPrice?: string[];
    cardBenefitPopup?: string[];
  };
  patterns?: {
    price?: RegExp[];
    discount?: RegExp[];
    cardName?: RegExp[];
  };
}

/**
 * 파싱된 상품 정보
 * Content Script에서 DOM에서 추출한 정보
 */
export interface ParsedProductInfo {
  price: number; // 상품 가격 (원)
  originalPrice?: number; // 원가
  discountRate?: number; // 할인율 (%)
  discounts?: Array<{
    rate: number;
    type: string; // "COUPANG_WOW", "CARD_DISCOUNT" 등
    description?: string;
  }>;
  cardBenefits?: Array<{
    card: string; // 카드사명
    benefit: string; // 혜택 설명
    discount?: number; // 할인액 또는 할인율
  }>;
  installmentInfo?: string; // 할부 정보
  currency?: string; // "KRW"

  // Added fields for UI
  title?: string;
  imageUrl?: string;
  images?: string[];
  variants?: Array<{
    name: string;
    price?: number;
    discount?: string;
  }>;
  shippingInfo?: string;
  giftCardDiscount?: {
    description: string;
  };
  cashback?: {
    description: string;
  };
  amount?: number; // Alias for price
  discountPrice?: number; // Alias for price
}

/**
 * 파서 결과
 * 파싱 성공/실패 여부와 신뢰도를 포함
 */
export interface ParserResult {
  success: boolean;
  data: ParsedProductInfo | null;
  source: string; // "coupang", "fallback" 등
  confidence: number; // 0.0 ~ 1.0
  error?: string;
  timestamp: number;
  parsingTime: number; // 밀리초
}
