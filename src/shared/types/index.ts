/**
 * Central type exports
 * Re-exports all types from modular files for backward compatibility
 */

// Payment types
export type { PaymentMethod, CustomPaymentMethod } from './payment';

// Store types (re-exported from slices)
export type {
  RecommendationStore,
  UISlice,
  DataSlice,
  MetaSlice,
  PersistedRecommendationState,
  SubPopupStore,
  SubPopupUISlice,
  SubPopupPaymentSlice,
  PersistedSubPopupState,
  // Legacy aliases
  RecommendationState,
  SubPopupState,
} from './store';

// Parser types
export type { ParserConfig, ParsedProductInfo, ParserResult } from './parser';

// Message types
export type { ChromeMessage, RecommendationRequest, RecommendationResponse, SubPopupMessage } from './message';

// Product types
export type { CheckoutInfo, ProductInfo } from './product';

// Notification types
export type { AutoNotificationData } from './notification';

// Constants
export { CARD_NAME_MAPPING, WINDOW_CONFIG } from './constants';

// Re-export domain types
export type { CardBenefit, ProductData } from './product';