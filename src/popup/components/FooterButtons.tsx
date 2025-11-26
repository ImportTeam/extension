import React from 'react';
import colors from '../styles/colors';

export const FooterButtons: React.FC = () => {

  const handleShowModal = (): void => {
    // Open SubPopup in a new window
    chrome.windows.create({
      url: chrome.runtime.getURL('src/subpopup/index.html'),
      type: 'popup',
      width: 480,
      height: 640,
    });
  };

  const handleNavigateToPicsel = (): void => {
    // Navigate to PicSel dashboard in a new browser tab
    chrome.tabs.create({
      url: 'https://picsel.io/dashboard',
      active: false,
    });
  };

  const primaryButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '44px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: colors.buttonDark,
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
  };

  const primaryButtonHoverStyle: React.CSSProperties = {
    ...primaryButtonStyle,
    backgroundColor: '#1a1a1a',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    transform: 'translateY(-2px)',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '44px',
    border: `2px solid ${colors.buttonLight}`,
    borderRadius: '12px',
    backgroundColor: colors.background,
    color: colors.textPrimary,
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const secondaryButtonHoverStyle: React.CSSProperties = {
    ...secondaryButtonStyle,
    backgroundColor: colors.hover,
    borderColor: '#b0b0b0',
  };

  const [paymentHover, setPaymentHover] = React.useState(false);
  const [picselHover, setPicselHover] = React.useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '16px',
        backgroundColor: colors.background,
        borderTop: `1px solid ${colors.border}`,
        flexShrink: 0,
      }}
    >
      <button
        onClick={handleShowModal}
        onMouseEnter={() => setPaymentHover(true)}
        onMouseLeave={() => setPaymentHover(false)}
        style={paymentHover ? primaryButtonHoverStyle : primaryButtonStyle}
      >
        팝업으로 띄우기
      </button>

      <button
        onClick={handleNavigateToPicsel}
        onMouseEnter={() => setPicselHover(true)}
        onMouseLeave={() => setPicselHover(false)}
        style={picselHover ? secondaryButtonHoverStyle : secondaryButtonStyle}
      >
        내 PicSel로 가기
      </button>
    </div>
  );
};

export default FooterButtons;
