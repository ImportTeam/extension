/**
 * Recommendation Store - Public Exports
 *
 * Barrel export for clean import paths
 * Usage: import { useRecommendationStore, useRecommendation } from '@/shared/store/slices/recommendation'
 */

// Store
export { useRecommendationStore } from './store';

// Types
export type {
  RecommendationStore,
  UISlice,
  DataSlice,
  MetaSlice,
  PersistedRecommendationState,
} from './types';

// Selectors - State
export {
  // UI
  useIsLoading,
  useIsExpanded,
  useShowPaymentMethod,
  useSelectedTab,
  useRecommendationError,
  // Data
  useRecommendation,
  useAlternatives,
  useDiscounts,
  useCardBenefits,
  // Meta
  useTimestamp,
  useSiteId,
  // Derived
  useTotalSavings,
  useRelativeSavings,
  useFeeComparison,
  useIsIdle,
  useIsRecommended,
  // Actions
  useUIActions,
  useDataActions,
  useMetaActions,
  useRecommendationActions,
} from './selectors';
