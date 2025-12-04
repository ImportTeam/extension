/**
 * SubPopup Store - Type Definitions
 *
 * SRP: 타입 정의만 담당
 * slice별로 분리된 인터페이스 정의
 */

import type { StateCreator } from 'zustand';
import type { CustomPaymentMethod } from '../../../types/payment';

// ─────────────────────────────────────────────────────────────
// Slice Types
// ─────────────────────────────────────────────────────────────

/**
 * UI State Slice
 * SubPopup 화면 표시 관련 상태
 */
export interface SubPopupUISlice {
  // State
  isOpen: boolean;
  activeTab: 'add' | 'list';
  isLoading: boolean;
  error: string | null;

  // Actions
  setIsOpen: (open: boolean) => void;
  setActiveTab: (tab: 'add' | 'list') => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetUI: () => void;
}

/**
 * Payment State Slice
 * 사용자 정의 결제 수단 관리
 */
export interface SubPopupPaymentSlice {
  // State
  customMethods: CustomPaymentMethod[];

  // Actions
  addPaymentMethod: (
    method: Omit<CustomPaymentMethod, 'createdAt' | 'updatedAt' | 'isCustom'>
  ) => void;
  updatePaymentMethod: (id: string, updates: Partial<CustomPaymentMethod>) => void;
  deletePaymentMethod: (id: string) => void;
  setCustomMethods: (methods: CustomPaymentMethod[]) => void;
  resetPayment: () => void;
}

// ─────────────────────────────────────────────────────────────
// Combined Store Type
// ─────────────────────────────────────────────────────────────

/**
 * Combined SubPopup Store Type
 */
export type SubPopupStore = SubPopupUISlice & SubPopupPaymentSlice & {
  reset: () => void;
};

/**
 * StateCreator Types for each slice
 */
export type SubPopupUISliceCreator = StateCreator<
  SubPopupStore,
  [],
  [],
  SubPopupUISlice
>;

export type SubPopupPaymentSliceCreator = StateCreator<
  SubPopupStore,
  [],
  [],
  SubPopupPaymentSlice
>;

// ─────────────────────────────────────────────────────────────
// Persisted State Type
// ─────────────────────────────────────────────────────────────

/**
 * Persisted state for SubPopupStore
 * Storage에 저장될 데이터만 정의
 */
export interface PersistedSubPopupState {
  customMethods: CustomPaymentMethod[];
}

// ─────────────────────────────────────────────────────────────
// Initial States
// ─────────────────────────────────────────────────────────────

export const initialSubPopupUIState: Pick<
  SubPopupUISlice,
  'isOpen' | 'activeTab' | 'isLoading' | 'error'
> = {
  isOpen: false,
  activeTab: 'list',
  isLoading: false,
  error: null,
};

export const initialSubPopupPaymentState: Pick<SubPopupPaymentSlice, 'customMethods'> = {
  customMethods: [],
};
