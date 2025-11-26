import { PaymentMethod, CustomPaymentMethod } from './payment';

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
  discounts: Array<{ rate: number; type: string }> | null; // 상품 할인 정보
  cardBenefits: Array<{ card: string; benefit: string }> | null; // 카드 혜택

  // 메타데이터
  timestamp: number; // 마지막 업데이트 시간
  siteId?: string; // "coupang", "gmarket" 등

  // 액션
  setLoading(loading: boolean): void;
  setRecommendation(method: PaymentMethod | null): void;
  setAlternatives(methods: PaymentMethod[]): void;
  setDiscounts(discounts: Array<{ rate: number; type: string }> | null): void;
  setCardBenefits(benefits: Array<{ card: string; benefit: string }> | null): void;
  toggleExpanded(): void;
  setShowPaymentMethod(show: boolean): void;
  setSelectedTab(tab: 'recommendation' | 'alternatives' | 'settings'): void;
  setError(error: string | null): void;
  reset(): void;
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
 * Persisted state for RecommendationStore
 * Subset of RecommendationState that gets saved to storage
 */
export interface PersistedRecommendationState {
  recommendation: PaymentMethod | null;
  alternatives: PaymentMethod[];
  discounts: Array<{ rate: number; type: string }> | null;
  cardBenefits: Array<{ card: string; benefit: string }> | null;
  siteId?: string;
  timestamp: number;
}

/**
 * Persisted state for SubPopupStore
 * Subset of SubPopupState that gets saved to storage
 */
export interface PersistedSubPopupState {
  customMethods: CustomPaymentMethod[];
}
