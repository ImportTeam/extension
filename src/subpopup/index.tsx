import React from 'react';
import ReactDOM from 'react-dom/client';
import SubPopup from './components/SubPopup';
import AutoNotification from './components/AutoNotification';
import '../popup/styles/subpopup.css';

/**
 * SubPopup Entry Point
 * 
 * 두 가지 모드:
 * 1. Auto mode (쿼리 ?auto=true): AutoNotification 표시
 * 2. Manual mode (Settings에서 열기): SubPopup 표시
 */
const root = ReactDOM.createRoot(document.getElementById('subpopup-root')!);

// URL 파라미터 확인
const params = new URLSearchParams(window.location.search);
const isAutoMode = params.get('auto') === 'true';

console.log(`🎪 [SubPopup] Mode: ${isAutoMode ? 'Auto' : 'Manual'}`);

root.render(
  <React.StrictMode>
    {isAutoMode ? <AutoNotification /> : <SubPopup />}
  </React.StrictMode>
);
