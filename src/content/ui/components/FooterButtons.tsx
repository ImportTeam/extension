import React, { useState } from 'react';
import { footerStyles as styles } from '../../../popup/styles/popup/footerStyles';

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

  const [paymentHover, setPaymentHover] = useState(false);
  const [picselHover, setPicselHover] = useState(false);

  return (
    <div style={styles.container}>
      <button
        onClick={handleNavigateToPicsel}
        onMouseEnter={() => setPicselHover(true)}
        onMouseLeave={() => setPicselHover(false)}
        style={picselHover ? { ...styles.primaryButton, ...styles.primaryButtonHover } : styles.primaryButton}
      >
        전체 리포트보기
      </button>

      <button
        onClick={handleShowModal}
        onMouseEnter={() => setPaymentHover(true)}
        onMouseLeave={() => setPaymentHover(false)}
        style={paymentHover ? { ...styles.secondaryButton, ...styles.secondaryButtonHover } : styles.secondaryButton}
      >
        내 결제수단보러 가기
      </button>
    </div>
  );
};

export default FooterButtons;
