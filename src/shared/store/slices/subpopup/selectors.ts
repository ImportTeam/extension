/**
 * SubPopup Store - Selectors
 *
 * SRP: Selector 로직만 담당
 */

import { useSubPopupStore } from './store';
import type { CustomPaymentMethod } from '../../../types/payment';
import type { SubPopupStore } from './types';

// ─────────────────────────────────────────────────────────────
// State Selectors - UI
// ─────────────────────────────────────────────────────────────

export const useIsSubPopupOpen = (): boolean =>
  useSubPopupStore((state) => state.isOpen);

export const useSubPopupActiveTab = (): 'add' | 'list' =>
  useSubPopupStore((state) => state.activeTab);

export const useSubPopupIsLoading = (): boolean =>
  useSubPopupStore((state) => state.isLoading);

export const useSubPopupError = (): string | null =>
  useSubPopupStore((state) => state.error);

// ─────────────────────────────────────────────────────────────
// State Selectors - Payment
// ─────────────────────────────────────────────────────────────

export const useCustomPaymentMethods = (): CustomPaymentMethod[] =>
  useSubPopupStore((state) => state.customMethods);

// ─────────────────────────────────────────────────────────────
// Derived Selectors
// ─────────────────────────────────────────────────────────────

/**
 * Custom methods count
 */
export const useCustomMethodsCount = (): number =>
  useSubPopupStore((state) => state.customMethods.length);

/**
 * Check if method exists by id
 */
export const useHasCustomMethod = (id: string): boolean =>
  useSubPopupStore((state) => state.customMethods.some((m) => m.id === id));

/**
 * Get single custom method by id
 */
export const useCustomMethodById = (id: string): CustomPaymentMethod | undefined =>
  useSubPopupStore((state) => state.customMethods.find((m) => m.id === id));

// ─────────────────────────────────────────────────────────────
// Action Selectors
// ─────────────────────────────────────────────────────────────

/**
 * UI Actions selector
 */
export const useSubPopupUIActions = () =>
  useSubPopupStore((state) => ({
    setIsOpen: state.setIsOpen,
    setActiveTab: state.setActiveTab,
    setIsLoading: state.setIsLoading,
    setError: state.setError,
    resetUI: state.resetUI,
  }));

/**
 * Payment Actions selector
 */
export const useSubPopupPaymentActions = () =>
  useSubPopupStore((state) => ({
    addPaymentMethod: state.addPaymentMethod,
    updatePaymentMethod: state.updatePaymentMethod,
    deletePaymentMethod: state.deletePaymentMethod,
    setCustomMethods: state.setCustomMethods,
    resetPayment: state.resetPayment,
  }));

/**
 * All Actions selector (backward compatible)
 */
export const useSubPopupActions = (): Pick<
  SubPopupStore,
  | 'setIsOpen'
  | 'setActiveTab'
  | 'addPaymentMethod'
  | 'updatePaymentMethod'
  | 'deletePaymentMethod'
  | 'setCustomMethods'
  | 'reset'
> =>
  useSubPopupStore((state) => ({
    setIsOpen: state.setIsOpen,
    setActiveTab: state.setActiveTab,
    addPaymentMethod: state.addPaymentMethod,
    updatePaymentMethod: state.updatePaymentMethod,
    deletePaymentMethod: state.deletePaymentMethod,
    setCustomMethods: state.setCustomMethods,
    reset: state.reset,
  }));
