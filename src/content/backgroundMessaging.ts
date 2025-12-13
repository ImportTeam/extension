/**
 * Background Messaging
 * 책임: Background script와의 메시지 통신
 */

import { ParsedProductInfo } from '../shared/types';
import { networkLog } from '../shared/utils/logger';

export type MessageSource = 'initial' | 'benefit-click' | 'auto-click-benefit' | `dynamic-${string}`;

interface SaveResponse {
  success: boolean;
}

export function saveProductData(
  paymentInfo: ParsedProductInfo,
  source: MessageSource = 'initial'
): void {
  const messageType = source === 'initial' ? 'SAVE_PRODUCT_DATA' : 'UPDATE_PRODUCT_DATA';

  // Chrome API 체크
  if (!chrome?.runtime?.sendMessage) {
    networkLog.warn('Chrome extension API not available', { messageType, source });
    return;
  }

  chrome.runtime.sendMessage(
    {
      type: messageType,
      data: paymentInfo,
      url: window.location.href,
      timestamp: Date.now(),
      source,
    },
    (response: SaveResponse) => {
      // chrome.runtime.lastError 체크 필수
      if (chrome.runtime.lastError) {
        networkLog.warn('Failed to send message to background', {
          error: chrome.runtime.lastError.message,
          messageType,
          source,
        });
        return;
      }

      if (response?.success) {
        networkLog.debug(`Product data saved`, { source, messageType });
      }
    }
  );
}
