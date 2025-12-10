/**
 * Recommendation Store - Main Entry Point
 *
 * Slices Pattern:
 * - UI Slice: 화면 표시 상태
 * - Data Slice: 추천 데이터
 * - Meta Slice: 메타데이터
 *
 * Middleware:
 * - persist: chrome.storage.local 동기화
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createUISlice } from './uiSlice';
import { createDataSlice } from './dataSlice';
import { createMetaSlice } from './metaSlice';
import {
  asPersistStorage,
  STORAGE_KEYS,
  MAX_CACHE_AGE,
} from '../../middleware/chromeStorage';
import { storeLog, ErrorCode } from '@/shared/utils/logger';

import type {
  RecommendationStore,
  PersistedRecommendationState,
} from './types';

import {
  initialUIState,
  initialDataState,
  initialMetaState,
} from './types';

/**
 * Combined Recommendation Store
 * 모든 slice를 합쳐서 하나의 store 생성
 */
export const useRecommendationStore = create<RecommendationStore>()(
  persist<RecommendationStore, [], [], PersistedRecommendationState>(
    (...args) => ({
      // Spread all slices
      ...createUISlice(...args),
      ...createDataSlice(...args),
      ...createMetaSlice(...args),

      // Combined reset action
      reset: (): void => {
        const [set] = args;
        set({
          ...initialUIState,
          ...initialDataState,
          ...initialMetaState,
        });
      },
    }),
    {
      name: STORAGE_KEYS.RECOMMENDATION,
      storage: asPersistStorage<PersistedRecommendationState>(),

      // partialize: critical data만 persist (UI state 제외)
      partialize: (state): PersistedRecommendationState => ({
        recommendation: state.recommendation,
        alternatives: state.alternatives,
        discounts: state.discounts,
        cardBenefits: state.cardBenefits,
        siteId: state.siteId,
        timestamp: state.timestamp,
      }),

      // onRehydrateStorage: stale data 처리
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          storeLog.error(ErrorCode.STO_E003, 'Store rehydration failed', {
            error: error instanceof Error ? error : new Error(String(error)),
          });
          return;
        }

        if (state && state.timestamp) {
          const age = Date.now() - state.timestamp;

          if (age > MAX_CACHE_AGE) {
            // Stale data - Zustand set()을 사용하여 안전하게 리셋
            storeLog.info('🔄 Cache expired, resetting recommendation store', {
              age: `${Math.floor(age / 1000)}s`,
              maxAge: `${MAX_CACHE_AGE / 1000}s`,
            });
            useRecommendationStore.setState({
              recommendation: null,
              alternatives: [],
              discounts: null,
              cardBenefits: null,
            });
          }
        }
      },
    }
  )
);

// ─────────────────────────────────────────────────────────────
// Type & Slice Exports
// ─────────────────────────────────────────────────────────────

export type {
  RecommendationStore,
  UISlice,
  DataSlice,
  MetaSlice,
  PersistedRecommendationState,
} from './types';

export { createUISlice } from './uiSlice';
export { createDataSlice } from './dataSlice';
export { createMetaSlice } from './metaSlice';
