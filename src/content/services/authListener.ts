/**
 * Auth Listener
 * 웹 페이지에서 postMessage로 보낸 토큰을 받아 background로 전달
 */

export const setupAuthListener = (): void => {
  window.addEventListener('message', (event) => {
    // origin 검증 (보안)
    const allowedOrigins = [
      'https://picsel.kr',
      'https://www.picsel.kr',
      'http://localhost:3000', // 개발용
    ];

    if (!allowedOrigins.includes(event.origin)) {
      return;
    }

    // 웹에서 보낸 인증 토큰
    if (event.data?.type === 'EXTENSION_AUTH_TOKEN') {
      const { accessToken, refreshToken, expiresIn } = event.data;

      // background script로 메시지 전달
      chrome.runtime.sendMessage(
        {
          type: 'EXTENSION_AUTH_TOKEN',
          accessToken,
          refreshToken,
          expiresIn,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.warn('[Content] Failed to send auth token:', chrome.runtime.lastError);
          } else if (response?.success) {
            console.warn('[Content] Auth token sent successfully');
            // 웹에 완료 알림
            event.source?.postMessage(
              { type: 'EXTENSION_AUTH_SAVED', success: true },
              event.origin
            );
          }
        }
      );
    }
  });
};
