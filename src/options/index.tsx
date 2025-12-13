import React, { useEffect } from 'react';
import '../popup/styles/globals.css';
import './options.css';
import ReactDOM from 'react-dom/client';
import { useSettingsStore } from '@/shared/store/slices/settings';
import { CreditCard, ShoppingCart, Search, X, RotateCcw, Check } from 'lucide-react';

export const Options: React.FC = () => {
  const {
    displayMode,
    autoFetchLowestPrice,
    setDisplayMode,
    setAutoFetchLowestPrice,
    reset,
  } = useSettingsStore();

  // Chrome 테마 자동 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent): void => {
      document.documentElement.classList.toggle('dark', e.matches);
    };
    
    // 초기 테마 설정
    document.documentElement.classList.toggle('dark', mediaQuery.matches);
    
    // 테마 변경 리스너
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  const handleReset = (): void => {
    if (confirm('설정을 초기화할까요?')) {
      reset();
    }
  };

  const handleClose = (): void => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="w-full h-screen flex flex-col overflow-x-hidden">
        <header className="flex items-center justify-between px-5 py-3.5 shrink-0 border-b border-gray-200 dark:border-gray-800">
          <h1 className="m-0 text-lg font-bold text-gray-900 dark:text-gray-100">설정</h1>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            aria-label="닫기"
            title="닫기"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-3">
          <section className="mb-5">
            <h2 className="m-0 text-xs font-bold text-gray-600 dark:text-gray-400 mb-2.5 uppercase tracking-wide">표시 모드</h2>
            <div className="space-y-2.5">
              <ListItem
                icon={<CreditCard className="w-5 h-5" />}
                title="카드 혜택"
                desc="최대 혜택 카드 추천"
                selected={displayMode === 'card-benefits'}
                onClick={() => setDisplayMode('card-benefits')}
              />
              <ListItem
                icon={<ShoppingCart className="w-5 h-5" />}
                title="최저가 비교"
                desc="쇼핑몰 가격 실시간 비교"
                selected={displayMode === 'lowest-price'}
                onClick={() => setDisplayMode('lowest-price')}
              />
            </div>
          </section>

          <section className="mb-5">
            <h2 className="m-0 text-xs font-bold text-gray-600 dark:text-gray-400 mb-2.5 uppercase tracking-wide">자동화</h2>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '16px',
                border: '1.5px solid #e5e7eb',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '11px',
                    backgroundColor: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Search style={{ width: '22px', height: '22px', color: '#6b7280' }} strokeWidth={2.5} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', lineHeight: '1.3' }}>자동 검색</div>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '1px', lineHeight: '1.4' }}>페이지 접속 시 자동 실행</div>
                </div>
                <Toggle checked={autoFetchLowestPrice} onChange={setAutoFetchLowestPrice} />
              </div>
            </div>
          </section>
        </main>

        <footer className="shrink-0 px-5 py-3 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={handleReset}
            style={{
              width: '100%',
              height: '44px',
              borderRadius: '11px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #dc2626',
              color: '#dc2626',
              fontWeight: 700,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fef2f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            <RotateCcw style={{ width: '16px', height: '16px' }} />
            설정 초기화
          </button>
        </footer>
      </div>
    </div>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
 * Components
 * ───────────────────────────────────────────────────────────────────────────── */

interface ListItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ icon, title, desc, selected, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '16px',
      borderRadius: '14px',
      border: selected ? 'none' : '1.5px solid #e5e7eb',
      backgroundColor: selected ? '#1a1a1a' : '#ffffff',
      transition: 'all 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      if (!selected) {
        e.currentTarget.style.borderColor = '#d1d5db';
        e.currentTarget.style.backgroundColor = '#f9fafb';
      }
    }}
    onMouseLeave={(e) => {
      if (!selected) {
        e.currentTarget.style.borderColor = '#e5e7eb';
        e.currentTarget.style.backgroundColor = '#ffffff';
      }
    }}
  >
    <div
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '11px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected ? '#2d2d2d' : '#f3f4f6',
        color: selected ? '#ffffff' : '#6b7280',
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1, textAlign: 'left' }}>
      <div
        style={{
          fontSize: '15px',
          fontWeight: 700,
          color: selected ? '#ffffff' : '#1f2937',
          lineHeight: '1.3',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: '13px',
          color: selected ? '#d1d5db' : '#6b7280',
          marginTop: '1px',
          lineHeight: '1.4',
        }}
      >
        {desc}
      </div>
    </div>
    {selected && (
      <Check
        style={{ width: '22px', height: '22px', color: '#ffffff', flexShrink: 0 }}
        strokeWidth={2.5}
      />
    )}
  </button>
);

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    style={{
      position: 'relative',
      width: '56px',
      height: '32px',
      borderRadius: '9999px',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: checked ? '#1a1a1a' : '#e5e7eb',
      border: 'none',
      cursor: 'pointer',
    }}
    onFocus={(e) => {
      e.currentTarget.style.outline = '2px solid #1a1a1a';
      e.currentTarget.style.outlineOffset = '2px';
    }}
    onBlur={(e) => {
      e.currentTarget.style.outline = 'none';
    }}
  >
    <span
      style={{
        position: 'absolute',
        left: checked ? 'calc(100% - 28px)' : '4px',
        width: '24px',
        height: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    />
  </button>
);

/* ─────────────────────────────────────────────────────────────────────────────
 * Mount
 * ───────────────────────────────────────────────────────────────────────────── */

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Options />
    </React.StrictMode>
  );
}
