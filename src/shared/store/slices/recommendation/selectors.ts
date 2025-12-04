/**
 * Recommendation Store - Selectors
 *
 * SRP: Selector 로직만 담당
 * - State selectors: 특정 상태 조각 선택
 * - Derived selectors: 계산된 값 선택
 * - Action selectors: 액션 함수 선택
 */

import { useRecommendationStore } from './store';
import type { PaymentMethod } from '../../../types/payment';
import type { RecommendationStore } from './types';

// ─────────────────────────────────────────────────────────────
// State Selectors - UI
// ─────────────────────────────────────────────────────────────

export const useIsLoading = (): boolean =>
  useRecommendationStore((state) => state.isLoading);

export const useIsExpanded = (): boolean =>
  useRecommendationStore((state) => state.isExpanded);

export const useShowPaymentMethod = (): boolean =>
  useRecommendationStore((state) => state.showPaymentMethod);

export const useSelectedTab = (): 'recommendation' | 'alternatives' | 'settings' =>
  useRecommendationStore((state) => state.selectedTab);

export const useRecommendationError = (): string | null =>
  useRecommendationStore((state) => state.error);

// ─────────────────────────────────────────────────────────────
// State Selectors - Data
// ─────────────────────────────────────────────────────────────

export const useRecommendation = (): PaymentMethod | null =>
  useRecommendationStore((state) => state.recommendation);

export const useAlternatives = (): PaymentMethod[] =>
  useRecommendationStore((state) => state.alternatives);

export const useDiscounts = (): Array<{ rate: number; type: string }> | null =>
  useRecommendationStore((state) => state.discounts);

export const useCardBenefits = (): Array<{ card: string; benefit: string }> | null =>
  useRecommendationStore((state) => state.cardBenefits);

// ─────────────────────────────────────────────────────────────
// State Selectors - Meta
// ─────────────────────────────────────────────────────────────

export const useTimestamp = (): number =>
  useRecommendationStore((state) => state.timestamp);

export const useSiteId = (): string | undefined =>
  useRecommendationStore((state) => state.siteId);

// ─────────────────────────────────────────────────────────────
// Derived Selectors
// ─────────────────────────────────────────────────────────────

/**
 * Total savings from recommendation
 */
export const useTotalSavings = (): number => {
  const recommendation = useRecommendation();
  return recommendation?.savingAmount ?? 0;
};

/**
 * Relative savings compared to alternatives
 */
export const useRelativeSavings = (): number => {
  const recommendation = useRecommendation();
  const alternatives = useAlternatives();

  if (!recommendation || alternatives.length === 0) return 0;

  const maxSavings = Math.max(
    recommendation.savingAmount,
    ...alternatives.map((m) => m.savingAmount)
  );

  return recommendation.savingAmount === maxSavings
    ? 0
    : maxSavings - recommendation.savingAmount;
};

/**
 * Fee comparison between recommendation and base
 */
export const useFeeComparison = (): {
  primary: number;
  base: number;
  difference: number;
} | null => {
  const recommendation = useRecommendation();

  if (!recommendation) return null;

  return {
    primary: recommendation.fee,
    base: recommendation.baseFee,
    difference: recommendation.baseFee - recommendation.fee,
  };
};

/**
 * UI State - Idle (no recommendation, not loading)
 */
export const useIsIdle = (): boolean => {
  const recommendation = useRecommendation();
  const isLoading = useIsLoading();
  return !recommendation && !isLoading;
};

/**
 * UI State - Has recommendation and not loading
 */
export const useIsRecommended = (): boolean => {
  const recommendation = useRecommendation();
  const isLoading = useIsLoading();
  return !!recommendation && !isLoading;
};

// ─────────────────────────────────────────────────────────────
// Action Selectors
// ─────────────────────────────────────────────────────────────

/**
 * UI Actions selector
 */
export const useUIActions = () =>
  useRecommendationStore((state) => ({
    setLoading: state.setLoading,
    toggleExpanded: state.toggleExpanded,
    setShowPaymentMethod: state.setShowPaymentMethod,
    setSelectedTab: state.setSelectedTab,
    setError: state.setError,
    resetUI: state.resetUI,
  }));

/**
 * Data Actions selector
 */
export const useDataActions = () =>
  useRecommendationStore((state) => ({
    setRecommendation: state.setRecommendation,
    setAlternatives: state.setAlternatives,
    setDiscounts: state.setDiscounts,
    setCardBenefits: state.setCardBenefits,
    resetData: state.resetData,
  }));

/**
 * Meta Actions selector
 */
export const useMetaActions = () =>
  useRecommendationStore((state) => ({
    updateTimestamp: state.updateTimestamp,
    setSiteId: state.setSiteId,
    resetMeta: state.resetMeta,
  }));

/**
 * All Actions selector (backward compatible)
 */
export const useRecommendationActions = (): Pick<
  RecommendationStore,
  | 'setLoading'
  | 'setRecommendation'
  | 'setAlternatives'
  | 'setDiscounts'
  | 'setCardBenefits'
  | 'toggleExpanded'
  | 'setSelectedTab'
  | 'setShowPaymentMethod'
  | 'setError'
  | 'reset'
> =>
  useRecommendationStore((state) => ({
    setLoading: state.setLoading,
    setRecommendation: state.setRecommendation,
    setAlternatives: state.setAlternatives,
    setDiscounts: state.setDiscounts,
    setCardBenefits: state.setCardBenefits,
    toggleExpanded: state.toggleExpanded,
    setSelectedTab: state.setSelectedTab,
    setShowPaymentMethod: state.setShowPaymentMethod,
    setError: state.setError,
    reset: state.reset,
  }));
