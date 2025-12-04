/**
 * UI Slice - Recommendation Store
 *
 * SRP: UI 상태 관리만 담당
 * - loading, expanded, selectedTab 등 화면 표시 상태
 * - UI 관련 actions만 포함
 */

import type { UISliceCreator } from './types';
import { initialUIState } from './types';

/**
 * Create UI Slice
 * UI 상태와 관련 액션을 생성
 */
export const createUISlice: UISliceCreator = (set) => ({
  // Initial State
  ...initialUIState,

  // Actions
  setLoading: (loading: boolean) => {
    set({ isLoading: loading }, undefined, 'ui/setLoading');
  },

  toggleExpanded: () => {
    set(
      (state) => ({ isExpanded: !state.isExpanded }),
      undefined,
      'ui/toggleExpanded'
    );
  },

  setShowPaymentMethod: (show: boolean) => {
    set({ showPaymentMethod: show }, undefined, 'ui/setShowPaymentMethod');
  },

  setSelectedTab: (tab: 'recommendation' | 'alternatives' | 'settings') => {
    set({ selectedTab: tab }, undefined, 'ui/setSelectedTab');
  },

  setError: (error: string | null) => {
    set({ error }, undefined, 'ui/setError');
  },

  resetUI: () => {
    set(initialUIState, undefined, 'ui/reset');
  },
});
