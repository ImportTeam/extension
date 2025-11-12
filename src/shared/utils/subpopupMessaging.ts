/**
 * SubPopup 메시징 유틸리티
 * Iframe 간 postMessage 통신
 */

export interface SubPopupMessage {
  type: 'OPEN_SUBPOPUP' | 'CLOSE_SUBPOPUP' | 'SYNC_PAYMENT_METHODS' | 'UPDATE_PAYMENT_METHOD';
  payload?: unknown;
}

/**
 * MainPopup에서 SubPopup 열기
 */
export const openSubPopup = () => {
  chrome.windows.create({
    url: chrome.runtime.getURL('src/subpopup/index.html'),
    type: 'popup',
    width: 420,
    height: 600,
  });
};

/**
 * SubPopup에서 MainPopup으로 메시지 전송
 */
export const sendToMainPopup = (message: SubPopupMessage) => {
  if (window.opener && !window.opener.closed) {
    // Chrome extension의 경우 chrome-extension:// 프로토콜 사용
    const targetOrigin = window.opener.location.origin || 'chrome-extension://' + chrome.runtime.id;
    window.opener.postMessage(message, targetOrigin);
  }
};

/**
 * MainPopup에서 메시지 수신 리스너
 */
export const onSubPopupMessage = (callback: (message: SubPopupMessage) => void) => {
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
export const onMainPopupMessage = (callback: (message: SubPopupMessage) => void) => {
  window.addEventListener('message', (event) => {
    // 같은 origin에서만 수신
    if (!event.source || event.source === window) {
      return;
    }

    callback(event.data as SubPopupMessage);
  });
};
