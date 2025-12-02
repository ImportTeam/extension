/**
 * 체크아웃 정보 (Content Script에서 추출)
 */
export interface CheckoutInfo {
  amount: number; // 주문 금액 (원)
  currency: string; // "KRW"
  methods: string[]; // 사용 가능한 결제 수단들
  siteId: string; // "coupang", "gmarket" 등
}

/**
 * 상품 정보 (파서에서 추출)
 */
export interface ProductInfo {
  price: number; // 상품 가격 (원)
  discounts: Array<{
    rate: number;
    type: string; // "COUPANG_WOW", "CARD_DISCOUNT" 등
  }>;
 cardBenefits?: Array<{
    card: string;
    benefit: string;
  }>;
}

/**
 * 카드 혜택 정보
 */
export interface CardBenefit {
  cardName?: string;
  card?: string;
  rate?: number;
  discount?: number;
  benefit?: string;
}

/**
 * Background에서 사용하는 상품 데이터
 */
export interface ProductData {
  title?: string;
  price?: number;
  url?: string;
  imageUrl?: string;
}
