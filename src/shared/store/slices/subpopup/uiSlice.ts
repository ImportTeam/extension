/**
 * UI Slice - SubPopup Store
 *
 * SRP: UI 상태 관리만 담당
 */

import type { SubPopupUISliceCreator } from './types';
import { initialSubPopupUIState } from './types';

/**
 * Create SubPopup UI Slice
 */
export const createSubPopupUISlice: SubPopupUISliceCreator = (set) => ({
  // Initial State
  ...initialSubPopupUIState,

  // Actions
  setIsOpen: (open: boolean) => {
    set({ isOpen: open }, undefined, 'subpopup/ui/setIsOpen');
  },

  setActiveTab: (tab: 'add' | 'list') => {
    set({ activeTab: tab }, undefined, 'subpopup/ui/setActiveTab');
  },

  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading }, undefined, 'subpopup/ui/setIsLoading');
  },

  setError: (error: string | null) => {
    set({ error }, undefined, 'subpopup/ui/setError');
  },

  resetUI: () => {
    set(initialSubPopupUIState, undefined, 'subpopup/ui/reset');
  },
});
