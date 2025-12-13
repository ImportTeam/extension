import React from 'react';
import {
  useSubPopupActiveTab,
  useSubPopupActions,
} from '../../shared/store';
import { AddPaymentForm } from './AddPaymentForm';
import { PaymentMethodsList } from './PaymentMethodsList';

/**
 * SubPopup Component
 * Iframe에서 독립적으로 실행되는 결제 수단 관리 UI
 * 
 * Features:
 * - 탭 네비게이션 (추가 / 목록)
 * - 결제 수단 CRUD
 * - Zustand 스토어 동기화
 */
export const SubPopup: React.FC = () => {
  const activeTab = useSubPopupActiveTab();
  const { setActiveTab } = useSubPopupActions();

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header - Modern Gradient */}
      <div className="subpopup-header">
        <div className="subpopup-header-title">
          <span style={{ fontSize: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>💳</span>
          <h1>결제 수단 관리</h1>
        </div>
        <button
          className="subpopup-header-close-btn"
          onClick={() => {
            // 완전한 닫힘을 위해 상태 초기화 후 강제 종료
            try {
              if (window.opener && !window.opener.closed) {
                window.opener.focus();
              }
            } catch {
              // Ignore cross-origin errors
            }
            window.close();
            // 브라우저가 window.close()를 무시하는 경우 대비
            setTimeout(() => {
              if (typeof chrome !== 'undefined' && chrome.windows) {
                chrome.windows.getCurrent((w) => {
                  if (w.id) chrome.windows.remove(w.id);
                });
              }
            }, 100);
          }}
          title="닫기"
          aria-label="창 닫기"
        >
          ✕
        </button>
      </div>

      {/* Tabs - Modern Underline Navigation */}
      <div className="subpopup-tabs">
        <button
          className={`subpopup-tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
          aria-selected={activeTab === 'add'}
        >
          ➕ 새로 추가
        </button>
        <button
          className={`subpopup-tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
          aria-selected={activeTab === 'list'}
        >
          📋 관리
        </button>
      </div>

      {/* Content Area - Smooth Transitions */}
      <div className="subpopup-content" style={{ animation: 'fadeIn 0.2s ease' }}>
        {activeTab === 'add' && <AddPaymentForm />}
        {activeTab === 'list' && <PaymentMethodsList />}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SubPopup;
