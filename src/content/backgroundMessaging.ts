/**
 * Background Messaging
 * 책임: Background script와의 메시지 통신
 */

import { ParsedProductInfo } from '../shared/types';

export type MessageSource = 'initial' | 'benefit-click' | 'auto-click-benefit' | `dynamic-${string}`;

interface SaveResponse {
  success: boolean;
}

export function saveProductData(
  paymentInfo: ParsedProductInfo,
  source: MessageSource = 'initial'
): void {
  const messageType = source === 'initial' ? 'SAVE_PRODUCT_DATA' : 'UPDATE_PRODUCT_DATA';

  chrome.runtime.sendMessage(
    {
      type: messageType,
      data: paymentInfo,
      url: window.location.href,
      timestamp: Date.now(),
      source,
    },
    (response: SaveResponse) => {
      if (response?.success) {
        console.log(`[ContentScript] ✅ Product data saved (source: ${source})`);
      }
    }
  );
}
