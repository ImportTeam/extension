import { create } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';
import type { RecommendationState, PaymentMethod } from '../types';

/**
 * Chrome Storage Adapter for Zustand Persist Middleware
 * Syncs state with chrome.storage.local
 */
const chromeStorageAdapter = {
  getItem: async (name: string): Promise<string | null> => {
    return new Promise((resolve) => {
      chrome.storage.local.get([name], (result) => {
        resolve(result[name] ?? null);
      });
    });
  },
  setItem: async (name: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [name]: value }, () => {
        resolve();
      });
    });
  },
  removeItem: async (name: string): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.remove([name], () => {
        resolve();
      });
    });
  },
};

/**
 * Zustand Store for Recommendation
 *
 * Features:
 * - Persist middleware: Auto-syncs with chrome.storage.local
 * - Partialize: Only saves critical data (not UI state)
 * - Rehydration: Handles offline state gracefully
 * - Selectors: Component subscriptions for performance
 */
interface PersistedRecommendationState {
  recommendation: PaymentMethod | null;
  alternatives: PaymentMethod[];
  discounts: Array<{ rate: number; type: string }> | null;
  cardBenefits: Array<{ card: string; benefit: string }> | null;
  siteId?: string;
  timestamp: number;
}

export const useRecommendationStore = create<RecommendationState>()(
  persist<RecommendationState, [], [], PersistedRecommendationState>(
    (set) => ({
      // Initial state
      isLoading: false,
      isExpanded: false,
      showPaymentMethod: false,
      selectedTab: 'recommendation',
      error: null,
      recommendation: null,
      alternatives: [],
      discounts: null,
      cardBenefits: null,
      timestamp: 0,
      siteId: undefined,

      // Actions
      setLoading: (loading: boolean): void => {
        set({ isLoading: loading });
      },

      setRecommendation: (method: PaymentMethod | null): void => {
        set({
          recommendation: method,
          timestamp: Date.now(),
          error: null,
        });
      },

      setAlternatives: (methods: PaymentMethod[]): void => {
        set({ alternatives: methods });
      },

      setDiscounts: (discounts: Array<{ rate: number; type: string }> | null): void => {
        set({ discounts });
      },

      setCardBenefits: (benefits: Array<{ card: string; benefit: string }> | null): void => {
        set({ cardBenefits: benefits });
      },

      toggleExpanded: (): void => {
        set((state) => ({
          isExpanded: !state.isExpanded,
        }));
      },

      setSelectedTab: (tab: 'recommendation' | 'alternatives' | 'settings'): void => {
        set({ selectedTab: tab });
      },

      setShowPaymentMethod: (show: boolean): void => {
        set({ showPaymentMethod: show });
      },

      setError: (error: string | null): void => {
        set({ error });
      },

      reset: (): void => {
        set({
          isLoading: false,
          isExpanded: false,
          showPaymentMethod: false,
          selectedTab: 'recommendation',
          error: null,
          recommendation: null,
          alternatives: [],
          discounts: null,
          cardBenefits: null,
          timestamp: 0,
          siteId: undefined,
        });
      },
    }),
    {
      name: 'picsel-recommendation',
      storage: chromeStorageAdapter as unknown as PersistStorage<PersistedRecommendationState>,
      // Only persist critical data, not UI state
      partialize: (state): PersistedRecommendationState => ({
        recommendation: state.recommendation,
        alternatives: state.alternatives,
        discounts: state.discounts,
        cardBenefits: state.cardBenefits,
        siteId: state.siteId,
        timestamp: state.timestamp,
      }),
      // Rehydration strategy
      onRehydrateStorage: (): ((state: PersistedRecommendationState | undefined) => void) => (state) => {
        // Handle offline/stale data gracefully
        if (state && state.timestamp) {
          const age = Date.now() - state.timestamp;
          const MAX_AGE = 30 * 60 * 1000; // 30 minutes

          if (age > MAX_AGE) {
            // Stale data - reset
            state.recommendation = null;
            state.alternatives = [];
            state.discounts = null;
            state.cardBenefits = null;
          }
        }
      },
    }
  )
);

/**
 * Selectors for performance optimization
 * Components should subscribe to specific selectors, not whole state
 */

export const useRecommendation = (): PaymentMethod | null =>
  useRecommendationStore((state) => state.recommendation);

export const useAlternatives = (): PaymentMethod[] =>
  useRecommendationStore((state) => state.alternatives);

export const useIsLoading = (): boolean =>
  useRecommendationStore((state) => state.isLoading);

export const useIsExpanded = (): boolean =>
  useRecommendationStore((state) => state.isExpanded);

export const useSelectedTab = (): 'recommendation' | 'alternatives' | 'settings' =>
  useRecommendationStore((state) => state.selectedTab);

export const useRecommendationError = (): string | null =>
  useRecommendationStore((state) => state.error);

export const useShowPaymentMethod = (): boolean =>
  useRecommendationStore((state) => state.showPaymentMethod);

export const useDiscounts = (): Array<{ rate: number; type: string }> | null =>
  useRecommendationStore((state) => state.discounts);

export const useCardBenefits = (): Array<{ card: string; benefit: string }> | null =>
  useRecommendationStore((state) => state.cardBenefits);

/**
 * Derived selectors
 * These compute values from state
 */

export const useTotalSavings = (): number => {
  const recommendation = useRecommendation();
  return recommendation?.savingAmount ?? 0;
};

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

export const useFeeComparison = (): { primary: number; base: number; difference: number } | null => {
  const recommendation = useRecommendation();

  if (!recommendation) return null;

  return {
    primary: recommendation.fee,
    base: recommendation.baseFee,
    difference: recommendation.baseFee - recommendation.fee,
  };
};

/**
 * UI State Selectors (determines which view to show)
 */

export const useIsIdle = (): boolean => {
  const recommendation = useRecommendation();
  const isLoading = useIsLoading();
  return !recommendation && !isLoading;
};

export const useIsRecommended = (): boolean => {
  const recommendation = useRecommendation();
  const isLoading = useIsLoading();
  return !!recommendation && !isLoading;
};

/**
 * Action selectors (for better code organization)
 */

export const useRecommendationActions = (): Pick<RecommendationState, 'setLoading' | 'setRecommendation' | 'setAlternatives' | 'setDiscounts' | 'setCardBenefits' | 'toggleExpanded' | 'setSelectedTab' | 'setShowPaymentMethod' | 'setError' | 'reset'> =>
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
