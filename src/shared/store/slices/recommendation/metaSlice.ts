/**
 * Meta Slice - Recommendation Store
 *
 * SRP: 메타데이터 관리만 담당
 * - timestamp, siteId
 * - 메타데이터 관련 actions만 포함
 */

import type { MetaSliceCreator } from './types';
import { initialMetaState } from './types';

/**
 * Create Meta Slice
 * 메타데이터 상태와 관련 액션을 생성
 */
export const createMetaSlice: MetaSliceCreator = (set) => ({
  // Initial State
  ...initialMetaState,

  // Actions
  updateTimestamp: (): void => {
    set({ timestamp: Date.now() });
  },

  setSiteId: (siteId?: string): void => {
    set({ siteId });
  },

  resetMeta: (): void => {
    set(initialMetaState);
  },
});
