/**
 * 자동 알림 데이터
 * SubPopup의 AutoNotification 컴포넌트로 전송
 */
export interface AutoNotificationData {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number; // 밀리초 (기본값: 3000)
  action?: {
    label: string;
    handler: () => void;
  };
}
