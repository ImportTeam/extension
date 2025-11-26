import { PaymentMethod } from './payment';
import { CheckoutInfo, ProductInfo } from './product';

/**
 * Chrome Message 프로토콜
 */
export interface ChromeMessage {
  type: string;
  data?: unknown;
  error?: string;
}

/**
 * 추천 요청 메시지
 */
export interface RecommendationRequest extends ChromeMessage {
  type: 'GET_RECOMMENDATION' | 'PRODUCT_INFO_PARSED' | 'RECORD_METRICS' | 'FETCH_CARD_BENEFIT_IFRAME';
  data?: CheckoutInfo | ProductInfo | unknown;
}

/**
 * 추천 응답 메시지
 */
export interface RecommendationResponse extends ChromeMessage {
  type: 'RECOMMENDATION_RESULT' | 'OK' | 'ERROR';
  data?: {
    recommendation?: PaymentMethod;
    alternatives?: PaymentMethod[];
    benefits?: unknown[];
  };
}

/**
 * SubPopup 메시지 프로토콜
 */
export interface SubPopupMessage extends ChromeMessage {
  type: 'SUBPOPUP_ADD' | 'SUBPOPUP_UPDATE' | 'SUBPOPUP_DELETE' | 'SUBPOPUP_GET';
  data?: unknown;
}
