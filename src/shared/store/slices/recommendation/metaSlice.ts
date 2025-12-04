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
  updateTimestamp: () => {
    set(
      { timestamp: Date.now() },
      undefined,
      'meta/updateTimestamp'
    );
  },

  setSiteId: (siteId?: string) => {
    set(
      { siteId },
      undefined,
      'meta/setSiteId'
    );
  },

  resetMeta: () => {
    set(initialMetaState, undefined, 'meta/reset');
  },
});
