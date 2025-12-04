/**
 * Store Types
 *
 * Re-export from slices for backward compatibility
 * 실제 타입 정의는 각 slice의 types.ts에 위치
 */

// Re-export from recommendation slice
export type {
  RecommendationStore,
  UISlice,
  DataSlice,
  MetaSlice,
  PersistedRecommendationState,
} from '../store/slices/recommendation/types';

// Re-export from subpopup slice
export type {
  SubPopupStore,
  SubPopupUISlice,
  SubPopupPaymentSlice,
  PersistedSubPopupState,
} from '../store/slices/subpopup/types';

// ─────────────────────────────────────────────────────────────
// Legacy Type Aliases (역호환성 유지)
// ─────────────────────────────────────────────────────────────

import type { RecommendationStore } from '../store/slices/recommendation/types';
import type { SubPopupStore } from '../store/slices/subpopup/types';

/**
 * @deprecated Use RecommendationStore instead
 */
export type RecommendationState = RecommendationStore;

/**
 * @deprecated Use SubPopupStore instead
 */
export type SubPopupState = SubPopupStore;
