/**
 * SubPopup Store - Main Entry Point
 *
 * Slices Pattern:
 * - UI Slice: 화면 표시 상태
 * - Payment Slice: 사용자 정의 결제 수단
 *
 * Middleware:
 * - persist: chrome.storage.local 동기화
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createSubPopupUISlice } from './uiSlice';
import { createSubPopupPaymentSlice } from './paymentSlice';
import { asPersistStorage, STORAGE_KEYS } from '../../middleware/chromeStorage';

import type { SubPopupStore, PersistedSubPopupState } from './types';
import { initialSubPopupUIState, initialSubPopupPaymentState } from './types';

/**
 * Combined SubPopup Store
 */
export const useSubPopupStore = create<SubPopupStore>()(
  persist<SubPopupStore, [], [], PersistedSubPopupState>(
    (...args) => ({
      // Spread all slices
      ...createSubPopupUISlice(...args),
      ...createSubPopupPaymentSlice(...args),

      // Combined reset action
      reset: () => {
        const [set] = args;
        set(
          {
            ...initialSubPopupUIState,
            ...initialSubPopupPaymentState,
          },
          undefined,
          'subpopup/store/reset'
        );
      },
    }),
    {
      name: STORAGE_KEYS.SUBPOPUP,
      storage: asPersistStorage<PersistedSubPopupState>(),

      // partialize: customMethods만 persist (UI state 제외)
      partialize: (state): PersistedSubPopupState => ({
        customMethods: state.customMethods,
      }),
    }
  )
);

// ─────────────────────────────────────────────────────────────
// Type & Slice Exports
// ─────────────────────────────────────────────────────────────

export type {
  SubPopupStore,
  SubPopupUISlice,
  SubPopupPaymentSlice,
  PersistedSubPopupState,
} from './types';

export { createSubPopupUISlice } from './uiSlice';
export { createSubPopupPaymentSlice } from './paymentSlice';
