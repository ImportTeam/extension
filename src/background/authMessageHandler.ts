/**
 * Background Message Handler - Auth
 * 웹에서 postMessage로 받은 토큰 처리
 */

import { TokenManager } from '@/shared/utils/tokenManager';
import type { AuthToken } from '@/shared/store/slices/auth';

export const setupAuthMessageHandler = (): void => {
  // Content script에서 토큰 메시지 받기
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'EXTENSION_AUTH_TOKEN') {
      const { accessToken, refreshToken, expiresIn } = message;

      if (accessToken && refreshToken && expiresIn) {
        const token: AuthToken = {
          accessToken,
          refreshToken,
          expiresAt: Date.now() + expiresIn * 1000,
        };

        // chrome.storage.local에 저장
        TokenManager.saveToken(token)
          .then(() => {
            console.warn('[Background] Auth token saved');
            sendResponse({ success: true });
          })
          .catch((err) => {
            console.error('[Background] Failed to save token:', err);
            sendResponse({ success: false, error: err.message });
          });

        return true; // async response
      }
    }

    // 다른 메시지는 계속 처리
    return false;
  });
};
