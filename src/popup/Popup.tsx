import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import {
  useIsLoading,
  useRecommendationError,
  useIsIdle,
  useIsRecommended,
} from '@/shared/store';
import { IdleView } from '@/content/ui/components/IdleView';
import { RecommendedView } from '@/content/ui/components/RecommendedView';
import { FooterButtons } from '@/content/ui/components/FooterButtons';
import { popupStyles as styles } from './styles/popup/popupStyles';
import { WINDOW_CONFIG } from '@/shared/types/constants';

export const Popup: React.FC = () => {
  const isLoading = useIsLoading();
  const error = useRecommendationError();
  const isIdle = useIsIdle();
  const isRecommended = useIsRecommended();
  const [settingsHover, setSettingsHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);

  // Note: SubPopup이 자동으로 띄워지므로 Popup에서는 최소한의 UI만 표시

  // Compact size for idle state
  const popupHeight = isIdle ? WINDOW_CONFIG.POPUP.idleHeight : WINDOW_CONFIG.POPUP.expandedHeight;

  const handleOpenSettings = (): void => {
    // Open SubPopup in a new window/dialog
    chrome.windows.create({
      url: chrome.runtime.getURL('src/subpopup/index.html'),
      type: 'popup',
      width: WINDOW_CONFIG.SUBPOPUP.width,
      height: WINDOW_CONFIG.SUBPOPUP.height,
    });
  };

  return (
    <div style={{ ...styles.container, height: `${popupHeight}px`, flex: '0 0 auto' }}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          <img
            src="/assets/icon/picsel-logo.png"
            alt="PicSel"
            style={styles.logo}
          />
          <h1 style={styles.title}>PicSel</h1>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleOpenSettings}
            onMouseEnter={() => setSettingsHover(true)}
            onMouseLeave={() => setSettingsHover(false)}
            style={settingsHover ? { ...styles.iconButton, ...styles.iconButtonHover } : styles.iconButton}
            title="결제 수단 설정"
          >
            <Settings size={20} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => window.close()}
            onMouseEnter={() => setCloseHover(true)}
            onMouseLeave={() => setCloseHover(false)}
            style={closeHover ? { ...styles.iconButton, ...styles.iconButtonHover } : styles.iconButton}
            title="닫기"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {isLoading && (
          <div style={styles.loading}>
            <p>로딩 중...</p>
          </div>
        )}

        {error && !isLoading && (
          <div style={styles.error}>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}

        {isIdle && <IdleView />}
        {isRecommended && <RecommendedView />}

        {!isIdle && !isRecommended && !isLoading && !error && (
          <div style={styles.loading}>
            <p>초기화 중...</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <FooterButtons />
    </div>
  );
};

export default Popup;
