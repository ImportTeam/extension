/**
 * Central type exports
 */

// Result 타입 (에러 핸들링)
export { type Result, Ok, Err, isOk, isErr, Result as ResultUtils } from './result';

// Type Guards
export { isNotNull, isString, isNumber, isFiniteNumber, isObject, exhaustiveCheck } from './guards';

// Payment types
export type { PaymentMethod, CustomPaymentMethod } from './payment';

// Store types
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
  RecommendationState,
  SubPopupState,
} from './store';

// Parser types
export type { ParserConfig, ParsedProductInfo, ParserResult, ElevenStreetExtendedInfo } from './parser';

// Message types
export type { ChromeMessage, RecommendationRequest, RecommendationResponse, SubPopupMessage } from './message';

// Product types
export type { CheckoutInfo, ProductInfo, CardBenefit, ProductData, StoredProductData } from './product';

// Notification types
export type { AutoNotificationData } from './notification';

// Constants
export { CARD_NAME_MAPPING, WINDOW_CONFIG } from './constants';