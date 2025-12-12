/**
 * Settings Store
 * 사용자 설정 관리 (표시 모드, BE 연동 옵션 등)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  asPersistStorage,
  STORAGE_KEYS,
} from '../../middleware/chromeStorage';
import { storeLog, ErrorCode } from '@/shared/utils/logger';

import type {
  SettingsStore,
  PersistedSettingsState,
  DisplayMode,
} from './types';

import { initialSettingsState } from './types';

/**
 * Settings Store
 * chrome.storage.local에 persist
 */
export const useSettingsStore = create<SettingsStore>()(
  persist<SettingsStore, [], [], PersistedSettingsState>(
    (set) => ({
      ...initialSettingsState,

      setDisplayMode: (mode: DisplayMode): void => {
        storeLog.info('Display mode changed', { mode });
        set({ displayMode: mode });
      },

      setAutoFetchLowestPrice: (enabled: boolean): void => {
        storeLog.info('Auto fetch lowest price changed', { enabled });
        set({ autoFetchLowestPrice: enabled });
      },

      setComparisonServerUrl: (url: string): void => {
        storeLog.info('Comparison server URL changed', { url });
        set({ comparisonServerUrl: url });
      },

      reset: (): void => {
        storeLog.info('Settings reset to defaults');
        set(initialSettingsState);
      },
    }),
    {
      name: STORAGE_KEYS.SETTINGS,
      storage: asPersistStorage<PersistedSettingsState>(),

      // 모든 state를 persist
      partialize: (state): PersistedSettingsState => ({
        displayMode: state.displayMode,
        autoFetchLowestPrice: state.autoFetchLowestPrice,
        comparisonServerUrl: state.comparisonServerUrl,
      }),

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          storeLog.error(ErrorCode.STO_E003, 'Settings rehydration failed', {
            error: error instanceof Error ? error : new Error(String(error)),
          });
          return;
        }

        if (state) {
          storeLog.debug('Settings rehydrated', {
            displayMode: state.displayMode,
            autoFetchLowestPrice: state.autoFetchLowestPrice,
          });
        }
      },
    }
  )
);
