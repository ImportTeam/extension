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
 * 배송 정보
 */
export interface ShippingInfo {
  method: string;           // 배송 방법 (스타배송, 로켓배송 등)
  fee?: string;             // 배송비
  estimatedDate?: string;   // 예상 배송일
  isFree?: boolean;         // 무료 배송 여부
  isRocket?: boolean;       // 로켓배송 여부
  isStarDelivery?: boolean; // 스타배송 여부
}

/**
 * 추가 혜택 정보 (신세계포인트 등)
 */
export interface AdditionalBenefit {
  type: string;             // 혜택 종류 (shinsegae_point, smile_pay 등)
  title: string;            // 혜택 제목
  details: BenefitDetail[];
}

export interface BenefitDetail {
  label: string;            // 항목명 (적립률, 적립한도 등)
  value: string;            // 값
}

/**
 * 판매자 정보
 */
export interface SellerInfo {
  brand?: string;           // 브랜드명
  seller?: string;          // 판매자명
  isOfficial?: boolean;     // 공식 판매자 여부
}

/**
 * 카드 혜택 상세 정보
 */
export interface CardBenefitInfo {
  card: string;             // 카드사명
  cardName?: string;        // 카드명 (별칭)
  benefit: string;          // 혜택 설명
  discount?: number;        // 할인율 (%) 또는 할인액
  rate?: number;            // 할인율 (별칭)
  discountAmount?: number;  // 계산된 할인 금액
  imageUrl?: string;        // 카드 이미지 URL
  maxDiscount?: number;     // 최대 할인 한도
  minPurchase?: number;     // 최소 구매 금액
}

/**
 * 파싱된 상품 정보
 * Content Script에서 DOM에서 추출한 정보
 */
export interface ParsedProductInfo {
  // 필수 필드
  price: number;              // 상품 가격 (원) - 최종 결제가
  amount?: number;            // price의 별칭
  currency?: string;          // "KRW"
  
  // 가격 정보
  originalPrice?: number;     // 원가 (정가)
  discountPrice?: number;     // 할인가
  discountRate?: number;      // 할인율 (%)
  
  // 할인 정보
  discounts?: Array<{
    rate: number;
    type: string;             // "COUPANG_WOW", "CARD_DISCOUNT" 등
    description?: string;
    amount?: number;          // 할인 금액
  }>;
  
  // 카드 혜택
  cardBenefits?: CardBenefitInfo[];
  
  // 기타 할인
  giftCardDiscount?: {
    rate?: number;
    description: string;
  };
  cashback?: {
    amount?: number;
    description: string;
  };
  
  // 상품 정보
  title?: string;
  imageUrl?: string;
  images?: string[];
  variants?: Array<{
    name: string;
    price?: number;
    discount?: string;
  }>;
  
  // 배송 정보
  shippingInfo?: ShippingInfo | string;  // 객체 또는 문자열
  
  // 추가 혜택
  additionalBenefits?: AdditionalBenefit[];
  
  // 판매자 정보
  sellerInfo?: SellerInfo;
  
  // 할부 정보
  installmentInfo?: string;
  
  // 선택된 옵션 정보 (사용자가 선택한 옵션)
  selectedOptions?: Array<{
    name: string;   // "CPU", "색상", "RAM", "SSD", "키보드" 등
    value: string;  // "M4 Pro 14코어", "실버", "24GB", "512GB", "한글" 등
  }>;
  
  // 11번가 전용 필드
  elevenst?: ElevenStreetExtendedInfo;
}

/**
 * 11번가 전용 확장 정보
 */
export interface ElevenStreetExtendedInfo {
  maxDiscountPrice?: number | null;
  maxDiscountRate?: number | null;
  maxInstallmentMonths?: number;
  points?: Array<{
    type: string;
    amount: number;
    description: string;
  }>;
  installments?: Array<{
    cardName: string;
    maxMonths: number;
    minAmount: number | null;
    months: string;
    condition: string;
  }>;
  coupons?: Array<{
    name: string;
    discountAmount: number | null;
    discountRate: number | null;
  }>;
  totalPointAmount?: number;
  totalCardBenefitAmount?: number;
  seller?: string | null;
  sellerRating?: number | string | null;
  discountDetails?: Array<{
    type: string;
    amount: number;
    description?: string;
  }>;
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
