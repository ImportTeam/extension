/**
 * Payment Slice - SubPopup Store
 *
 * SRP: 사용자 정의 결제 수단 관리만 담당
 */

import type { SubPopupPaymentSliceCreator } from './types';
import type { CustomPaymentMethod } from '../../../types/payment';
import { initialSubPopupPaymentState } from './types';

/**
 * Create SubPopup Payment Slice
 */
export const createSubPopupPaymentSlice: SubPopupPaymentSliceCreator = (set) => ({
  // Initial State
  ...initialSubPopupPaymentState,

  // Actions
  addPaymentMethod: (
    method: Omit<CustomPaymentMethod, 'createdAt' | 'updatedAt' | 'isCustom'>
  ) => {
    const now = Date.now();
    const newMethod: CustomPaymentMethod = {
      ...method,
      createdAt: now,
      updatedAt: now,
      isCustom: true,
    };

    set(
      (state) => ({
        customMethods: [...state.customMethods, newMethod],
      }),
      undefined,
      'subpopup/payment/add'
    );
  },

  updatePaymentMethod: (id: string, updates: Partial<CustomPaymentMethod>) => {
    set(
      (state) => ({
        customMethods: state.customMethods.map((method) =>
          method.id === id
            ? {
                ...method,
                ...updates,
                updatedAt: Date.now(),
              }
            : method
        ),
      }),
      undefined,
      'subpopup/payment/update'
    );
  },

  deletePaymentMethod: (id: string) => {
    set(
      (state) => ({
        customMethods: state.customMethods.filter((method) => method.id !== id),
      }),
      undefined,
      'subpopup/payment/delete'
    );
  },

  setCustomMethods: (methods: CustomPaymentMethod[]) => {
    set({ customMethods: methods }, undefined, 'subpopup/payment/setAll');
  },

  resetPayment: () => {
    set(initialSubPopupPaymentState, undefined, 'subpopup/payment/reset');
  },
});
