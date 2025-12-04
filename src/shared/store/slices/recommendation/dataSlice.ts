/**
 * Data Slice - Recommendation Store
 *
 * SRP: 추천 데이터 관리만 담당
 * - recommendation, alternatives, discounts, cardBenefits
 * - 데이터 관련 actions만 포함
 */

import type { DataSliceCreator } from './types';
import type { PaymentMethod } from '../../../types/payment';
import { initialDataState } from './types';

/**
 * Create Data Slice
 * 추천 데이터 상태와 관련 액션을 생성
 */
export const createDataSlice: DataSliceCreator = (set) => ({
  // Initial State
  ...initialDataState,

  // Actions
  setRecommendation: (method: PaymentMethod | null): void => {
    set({ recommendation: method });
  },

  setAlternatives: (methods: PaymentMethod[]): void => {
    set({ alternatives: methods });
  },

  setDiscounts: (discounts: Array<{ rate: number; type: string }> | null): void => {
    set({ discounts });
  },

  setCardBenefits: (benefits: Array<{ card: string; benefit: string }> | null): void => {
    set({ cardBenefits: benefits });
  },

  resetData: (): void => {
    set(initialDataState);
  },
});
