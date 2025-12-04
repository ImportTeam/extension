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
  setRecommendation: (method: PaymentMethod | null) => {
    set(
      { recommendation: method },
      undefined,
      'data/setRecommendation'
    );
  },

  setAlternatives: (methods: PaymentMethod[]) => {
    set(
      { alternatives: methods },
      undefined,
      'data/setAlternatives'
    );
  },

  setDiscounts: (discounts: Array<{ rate: number; type: string }> | null) => {
    set(
      { discounts },
      undefined,
      'data/setDiscounts'
    );
  },

  setCardBenefits: (benefits: Array<{ card: string; benefit: string }> | null) => {
    set(
      { cardBenefits: benefits },
      undefined,
      'data/setCardBenefits'
    );
  },

  resetData: () => {
    set(initialDataState, undefined, 'data/reset');
  },
});
