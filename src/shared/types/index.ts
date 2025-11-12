/**
 * 결제 수단 정보
 * Layer 1, 2, 3에서 사용되는 기본 단위
 */
export interface PaymentMethod {
  id: string; // "shinhan-card", "woori-cash" 등
  name: string; // "신한카드"
  savingAmount: number; // 원 단위, e.g., 500
  fee: number; // %, e.g., 0.5
  baseFee: number; // 기준 수수료 %, e.g., 0.8
  confidence: number; // 0-1, 추천도
  hasInstallment?: boolean; // 할부 가능 여부
  installmentInfo?: string; // "3개월 무이자" 등
}

/**
 * 추천 상태 (Zustand Store)
 * Popup, Content Script에서 동기화되는 상태
 */
export interface RecommendationState {
  // UI 상태
  isLoading: boolean;
  isExpanded: boolean;
  showPaymentMethod: boolean;
  selectedTab: 'recommendation' | 'alternatives' | 'settings';
  error: string | null;

  // 데이터
  recommendation: PaymentMethod | null;
  alternatives: PaymentMethod[];
  discounts: Array<{rate: number; type: string}> | null; // 상품 할인 정보
  cardBenefits: Array<{card: string; benefit: string}> | null; // 카드 혜택

  // 메타데이터
  timestamp: number; // 마지막 업데이트 시간
  siteId?: string; // "coupang", "gmarket" 등

  // 액션
  setLoading(loading: boolean): void;
  setRecommendation(method: PaymentMethod | null): void;
  setAlternatives(methods: PaymentMethod[]): void;
  setDiscounts(discounts: Array<{rate: number; type: string}> | null): void;
  setCardBenefits(benefits: Array<{card: string; benefit: string}> | null): void;
  toggleExpanded(): void;
  setShowPaymentMethod(show: boolean): void;
  setSelectedTab(tab: 'recommendation' | 'alternatives' | 'settings'): void;
  setError(error: string | null): void;
  reset(): void;
}

/**
 * Chrome Message 프로토콜
 */
export interface ChromeMessage {
  type: string;
  data?: unknown;
  error?: string;
}

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
 * 추천 요청 메시지
 */
export interface RecommendationRequest extends ChromeMessage {
  type: 'GET_RECOMMENDATION' | 'PRODUCT_INFO_PARSED' | 'RECORD_METRICS' | 'FETCH_CARD_BENEFIT_IFRAME';
  data?: CheckoutInfo | ProductInfo | any;
}

/**
 * 추천 응답 메시지
 */
export interface RecommendationResponse extends ChromeMessage {
  type: 'RECOMMENDATION_RESULT' | 'OK' | 'ERROR';
  data?: {
    recommendation?: PaymentMethod;
    alternatives?: PaymentMethod[];
    benefits?: any[];
  };
}

/**
 * 사용자 정의 결제 수단 (SubPopup에서 관리)
 */
export interface CustomPaymentMethod extends PaymentMethod {
  createdAt: number; // 생성 시간
  updatedAt: number; // 수정 시간
  isCustom: true;
}

/**
 * SubPopup 상태
 */
export interface SubPopupState {
  // UI 상태
  isOpen: boolean;
  activeTab: 'add' | 'list';
  isLoading: boolean;
  error: string | null;

  // 데이터
  customMethods: CustomPaymentMethod[];

  // 액션
  setIsOpen(open: boolean): void;
  setActiveTab(tab: 'add' | 'list'): void;
  addPaymentMethod(method: Omit<CustomPaymentMethod, 'createdAt' | 'updatedAt' | 'isCustom'>): void;
  updatePaymentMethod(id: string, updates: Partial<CustomPaymentMethod>): void;
  deletePaymentMethod(id: string): void;
  setCustomMethods(methods: CustomPaymentMethod[]): void;
  reset(): void;
}

/**
 * SubPopup 메시지 프로토콜
 */
export interface SubPopupMessage extends ChromeMessage {
  type: 'SUBPOPUP_ADD' | 'SUBPOPUP_UPDATE' | 'SUBPOPUP_DELETE' | 'SUBPOPUP_GET';
  data?: unknown;
}

/**
 * ==========================================
 * Parser 관련 타입
 * ==========================================
 */

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

/**
 * 자동 알림 데이터
 * SubPopup의 AutoNotification 컴포넌트로 전송
 */
export interface AutoNotificationData {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number; // 밀리초 (기본값: 3000)
  action?: {
    label: string;
    handler: () => void;
  };
}
