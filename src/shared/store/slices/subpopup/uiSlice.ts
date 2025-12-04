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
  setIsOpen: (open: boolean): void => {
    set({ isOpen: open });
  },

  setActiveTab: (tab: 'add' | 'list'): void => {
    set({ activeTab: tab });
  },

  setIsLoading: (loading: boolean): void => {
    set({ isLoading: loading });
  },

  setError: (error: string | null): void => {
    set({ error });
  },

  resetUI: (): void => {
    set(initialSubPopupUIState);
  },
});
