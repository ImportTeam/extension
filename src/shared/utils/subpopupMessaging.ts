/**
 * SubPopup 메시징 유틸리티
 * Iframe 간 postMessage 통신
 */

import type { SubPopupMessage } from '../types/message';
import { WINDOW_CONFIG } from '../types/constants';

/**
 * MainPopup에서 SubPopup 열기
 */
export const openSubPopup = (): void => {
  chrome.windows.create({
    url: chrome.runtime.getURL('src/subpopup/index.html'),
    type: 'popup',
    width: WINDOW_CONFIG.SUBPOPUP.width,
    height: WINDOW_CONFIG.SUBPOPUP.height,
  });
};

/**
 * SubPopup에서 MainPopup으로 메시지 전송
 */
export const sendToMainPopup = (message: SubPopupMessage): void => {
  if (window.opener && !window.opener.closed) {
    // Chrome extension의 경우 chrome-extension:// 프로토콜 사용
    const targetOrigin = window.opener.location.origin || `chrome-extension://${  chrome.runtime.id}`;
    window.opener.postMessage(message, targetOrigin);
  }
};

/**
 * MainPopup에서 메시지 수신 리스너
 */
export const onSubPopupMessage = (callback: (message: SubPopupMessage) => void): void => {
  window.addEventListener('message', (event) => {
    // 같은 origin에서만 수신
    if (event.source === window) {
      return;
    }

    callback(event.data as SubPopupMessage);
  });
};

/**
 * SubPopup에서 메시지 수신 리스너
 */
export const onMainPopupMessage = (callback: (message: SubPopupMessage) => void): void => {
  window.addEventListener('message', (event) => {
    // 같은 origin에서만 수신
    if (!event.source || event.source === window) {
      return;
    }

    callback(event.data as SubPopupMessage);
  });
};
