import React from 'react';
import { Gear, X } from '@phosphor-icons/react';
import {
  useIsLoading,
  useRecommendationError,
  useIsIdle,
  useIsRecommended,
} from '../shared/store/recommendationStore';
import { IdleView } from '../content/ui/components/IdleView';
import { RecommendedView } from '../content/ui/components/RecommendedView';
import { FooterButtons } from '../content/ui/components/FooterButtons';
import colors from './styles/colors';

export const Popup: React.FC = () => {
  const isLoading = useIsLoading();
  const error = useRecommendationError();
  const isIdle = useIsIdle();
  const isRecommended = useIsRecommended();

  // Note: SubPopup이 자동으로 띄워지므로 Popup에서는 최소한의 UI만 표시

  // Compact size for idle state (40% reduction)
  const popupHeight = isIdle ? '360px' : '600px';

  const handleOpenSettings = (): void => {
    // Open SubPopup in a new window/dialog
    chrome.windows.create({
      url: chrome.runtime.getURL('src/subpopup/index.html'),
      type: 'popup',
      width: 420,
      height: 600,
    });
  };

  return (
    <div
      style={{
        width: 'clamp(250px, 100%, 320px)',
        height: popupHeight,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
        color: colors.textPrimary,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: colors.background,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <img
            src="/assets/icon/picsel.png"
            alt="PicSel"
            style={{
              height: '28px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
          <h1
            style={{
              fontSize: '16px',
              fontWeight: '800',
              margin: '0',
              color: colors.textPrimary,
            }}
          >
            PicSel
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
          }}
        >
          <button
            onClick={handleOpenSettings}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.textTertiary,
            }}
            title="결제 수단 설정"
          >
            <Gear weight="bold" size={20} />
          </button>
          <button
            onClick={() => window.close()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.textTertiary,
            }}
            title="닫기"
          >
            <X weight="bold" size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: '16px 16px',
          overflowY: 'hidden',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <p style={{ color: colors.textSecondary }}>로딩 중...</p>
          </div>
        )}

        {error && !isLoading && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#fee2e2',
              borderRadius: '6px',
            }}
          >
            <p style={{ color: '#991b1b', margin: '0', fontSize: '12px' }}>
              {error}
            </p>
          </div>
        )}

        {isIdle && <IdleView />}
        {isRecommended && <RecommendedView />}
      </div>

      {/* Footer */}
      <FooterButtons />
    </div>
  );
};

export default Popup;
