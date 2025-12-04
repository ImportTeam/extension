/**
 * Recommendation Store - Type Definitions
 *
 * SRP: 타입 정의만 담당
 * slice별로 분리된 인터페이스 정의
 */

import type { StateCreator } from 'zustand';
import type { PaymentMethod } from '../../../types/payment';

// ─────────────────────────────────────────────────────────────
// Slice Types
// ─────────────────────────────────────────────────────────────

/**
 * UI State Slice
 * 화면 표시 관련 상태만 관리
 */
export interface UISlice {
  // State
  isLoading: boolean;
  isExpanded: boolean;
  showPaymentMethod: boolean;
  selectedTab: 'recommendation' | 'alternatives' | 'settings';
  error: string | null;

  // Actions
  setLoading: (loading: boolean) => void;
  toggleExpanded: () => void;
  setShowPaymentMethod: (show: boolean) => void;
  setSelectedTab: (tab: 'recommendation' | 'alternatives' | 'settings') => void;
  setError: (error: string | null) => void;
  resetUI: () => void;
}

/**
 * Data State Slice
 * 추천 데이터 관련 상태만 관리
 */
export interface DataSlice {
  // State
  recommendation: PaymentMethod | null;
  alternatives: PaymentMethod[];
  discounts: Array<{ rate: number; type: string }> | null;
  cardBenefits: Array<{ card: string; benefit: string }> | null;

  // Actions
  setRecommendation: (method: PaymentMethod | null) => void;
  setAlternatives: (methods: PaymentMethod[]) => void;
  setDiscounts: (discounts: Array<{ rate: number; type: string }> | null) => void;
  setCardBenefits: (benefits: Array<{ card: string; benefit: string }> | null) => void;
  resetData: () => void;
}

/**
 * Meta State Slice
 * 메타데이터 관련 상태만 관리
 */
export interface MetaSlice {
  // State
  timestamp: number;
  siteId?: string;

  // Actions
  updateTimestamp: () => void;
  setSiteId: (siteId?: string) => void;
  resetMeta: () => void;
}

// ─────────────────────────────────────────────────────────────
// Combined Store Type
// ─────────────────────────────────────────────────────────────

/**
 * Combined Recommendation Store Type
 * 모든 slice를 합친 전체 store 타입
 */
export type RecommendationStore = UISlice & DataSlice & MetaSlice & {
  reset: () => void;
};

/**
 * StateCreator Types for each slice
 * Zustand의 슬라이스 패턴 타입 정의
 */
export type UISliceCreator = StateCreator<
  RecommendationStore,
  [],
  [],
  UISlice
>;

export type DataSliceCreator = StateCreator<
  RecommendationStore,
  [],
  [],
  DataSlice
>;

export type MetaSliceCreator = StateCreator<
  RecommendationStore,
  [],
  [],
  MetaSlice
>;

// ─────────────────────────────────────────────────────────────
// Persisted State Type
// ─────────────────────────────────────────────────────────────

/**
 * Persisted state for RecommendationStore
 * Storage에 저장될 데이터만 정의
 */
export interface PersistedRecommendationState {
  recommendation: PaymentMethod | null;
  alternatives: PaymentMethod[];
  discounts: Array<{ rate: number; type: string }> | null;
  cardBenefits: Array<{ card: string; benefit: string }> | null;
  siteId?: string;
  timestamp: number;
}

// ─────────────────────────────────────────────────────────────
// Initial States
// ─────────────────────────────────────────────────────────────

export const initialUIState: Pick<UISlice, 'isLoading' | 'isExpanded' | 'showPaymentMethod' | 'selectedTab' | 'error'> = {
  isLoading: false,
  isExpanded: false,
  showPaymentMethod: false,
  selectedTab: 'recommendation',
  error: null,
};

export const initialDataState: Pick<DataSlice, 'recommendation' | 'alternatives' | 'discounts' | 'cardBenefits'> = {
  recommendation: null,
  alternatives: [],
  discounts: null,
  cardBenefits: null,
};

export const initialMetaState: Pick<MetaSlice, 'timestamp' | 'siteId'> = {
  timestamp: 0,
  siteId: undefined,
};
