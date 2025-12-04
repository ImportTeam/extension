/**
 * Store Index - Main Entry Point
 *
 * Zustand Store with Slices Pattern
 * - SRP: 각 slice는 단일 책임
 * - 역호환성: 기존 import 경로 유지
 *
 * Directory Structure:
 * store/
 * ├── index.ts (이 파일)
 * ├── middleware/
 * │   ├── index.ts
 * │   └── chromeStorage.ts
 * └── slices/
 *     ├── index.ts
 *     ├── recommendation/
 *     │   ├── index.ts
 *     │   ├── types.ts
 *     │   ├── store.ts
 *     │   ├── selectors.ts
 *     │   ├── uiSlice.ts
 *     │   ├── dataSlice.ts
 *     │   └── metaSlice.ts
 *     └── subpopup/
 *         ├── index.ts
 *         ├── types.ts
 *         ├── store.ts
 *         ├── selectors.ts
 *         ├── uiSlice.ts
 *         └── paymentSlice.ts
 */

// ─────────────────────────────────────────────────────────────
// Recommendation Store (역호환성 유지)
// ─────────────────────────────────────────────────────────────

export {
  // Store
  useRecommendationStore,

  // Selectors - UI
  useIsLoading,
  useIsExpanded,
  useShowPaymentMethod,
  useSelectedTab,
  useRecommendationError,

  // Selectors - Data
  useRecommendation,
  useAlternatives,
  useDiscounts,
  useCardBenefits,

  // Selectors - Meta
  useTimestamp,
  useSiteId,

  // Selectors - Derived
  useTotalSavings,
  useRelativeSavings,
  useFeeComparison,
  useIsIdle,
  useIsRecommended,

  // Selectors - Actions
  useUIActions,
  useDataActions,
  useMetaActions,
  useRecommendationActions,
} from './slices/recommendation';

export type {
  RecommendationStore,
  UISlice,
  DataSlice,
  MetaSlice,
  PersistedRecommendationState,
} from './slices/recommendation';

// ─────────────────────────────────────────────────────────────
// SubPopup Store (역호환성 유지)
// ─────────────────────────────────────────────────────────────

export {
  // Store
  useSubPopupStore,

  // Selectors - UI
  useIsSubPopupOpen,
  useSubPopupActiveTab,
  useSubPopupIsLoading,
  useSubPopupError,

  // Selectors - Payment
  useCustomPaymentMethods,

  // Selectors - Derived
  useCustomMethodsCount,
  useHasCustomMethod,
  useCustomMethodById,

  // Selectors - Actions
  useSubPopupUIActions,
  useSubPopupPaymentActions,
  useSubPopupActions,
} from './slices/subpopup';

export type {
  SubPopupStore,
  SubPopupUISlice,
  SubPopupPaymentSlice,
  PersistedSubPopupState,
} from './slices/subpopup';

// ─────────────────────────────────────────────────────────────
// Middleware Exports
// ─────────────────────────────────────────────────────────────

export {
  chromeStorageAdapter,
  asPersistStorage,
  STORAGE_KEYS,
  MAX_CACHE_AGE,
} from './middleware';

export type { ChromeStorageAdapter } from './middleware';
