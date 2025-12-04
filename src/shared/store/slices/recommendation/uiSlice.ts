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
  setLoading: (loading: boolean): void => {
    set({ isLoading: loading });
  },

  toggleExpanded: (): void => {
    set((state) => ({ isExpanded: !state.isExpanded }));
  },

  setShowPaymentMethod: (show: boolean): void => {
    set({ showPaymentMethod: show });
  },

  setSelectedTab: (tab: 'recommendation' | 'alternatives' | 'settings'): void => {
    set({ selectedTab: tab });
  },

  setError: (error: string | null): void => {
    set({ error });
  },

  resetUI: (): void => {
    set(initialUIState);
  },
});
