import React, { useEffect } from 'react';
import '../popup/styles/globals.css';
import './options.css';
import ReactDOM from 'react-dom/client';
import { useSettingsStore } from '@/shared/store/slices/settings';
import { CreditCard, ShoppingCart, Search, X, RotateCcw, Check } from 'lucide-react';
import { COLORS } from './color';

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
      <div className="w-full max-h-screen flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-gray-200 dark:border-gray-800">
          <h1 className="m-0 text-base font-bold text-gray-900 dark:text-gray-100">설정</h1>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            aria-label="닫기"
            title="닫기"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-2.5">
          <section className="mb-4">
            <h2 className="m-0 text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">표시 모드</h2>
            <div className="space-y-2">
              <ListItem
                icon={<CreditCard className="w-4 h-4" />}
                title="카드 혜택"
                desc="최대 혜택 카드 추천"
                selected={displayMode === 'card-benefits'}
                onClick={() => setDisplayMode('card-benefits')}
              />
              <ListItem
                icon={<ShoppingCart className="w-4 h-4" />}
                title="최저가 비교"
                desc="쇼핑몰 가격 실시간 비교"
                selected={displayMode === 'lowest-price'}
                onClick={() => setDisplayMode('lowest-price')}
              />
            </div>
          </section>

          <section className="mb-4">
            <h2 className="m-0 text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">자동화</h2>
            <div
              style={{
                backgroundColor: COLORS.auto.background,
                borderRadius: '12px',
                padding: '14px',
                border: `1.5px solid ${COLORS.auto.border}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: COLORS.auto.iconBackground,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Search style={{ width: '20px', height: '20px', color: COLORS.auto.icon }} strokeWidth={2.5} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: COLORS.unselected.text, lineHeight: '1.3' }}>자동 검색</div>
                  <div style={{ fontSize: '12px', color: COLORS.unselected.subText, marginTop: '1px', lineHeight: '1.4' }}>페이지 접속 시 자동 실행</div>
                </div>
                <Toggle checked={autoFetchLowestPrice} onChange={setAutoFetchLowestPrice} />
              </div>
            </div>
          </section>
        </main>

        <footer className="shrink-0 px-4 py-2.5 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={handleReset}
            style={{
              width: '100%',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: COLORS.reset.background,
              border: `1.5px solid ${COLORS.reset.border}`,
              color: COLORS.reset.text,
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.reset.backgroundHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.reset.background;
            }}
          >
            <RotateCcw style={{ width: '14px', height: '14px' }} />
            설정 초기화
          </button>
        </footer>
      </div>
    </div>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
** Components
** ─────────────────────────────────────────────────────────────────────────────
 **/

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
      gap: '12px',
      padding: '14px',
      borderRadius: '12px',
      border: selected ? 'none' : `1.5px solid ${COLORS.unselected.border}`,
      backgroundColor: selected ? COLORS.selected.background : COLORS.unselected.background,
      transition: 'all 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      if (!selected) {
        e.currentTarget.style.borderColor = COLORS.unselected.borderHover;
        e.currentTarget.style.backgroundColor = COLORS.unselected.backgroundHover;
      }
    }}
    onMouseLeave={(e) => {
      if (!selected) {
        e.currentTarget.style.borderColor = COLORS.unselected.border;
        e.currentTarget.style.backgroundColor = COLORS.unselected.background;
      }
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected ? COLORS.selected.iconBackground : COLORS.unselected.iconBackground,
        color: selected ? COLORS.selected.icon : COLORS.unselected.icon,
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1, textAlign: 'left' }}>
      <div
        style={{
          fontSize: '14px',
          fontWeight: 700,
          color: selected ? COLORS.selected.text : COLORS.unselected.text,
          lineHeight: '1.3',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: '12px',
          color: selected ? COLORS.selected.subText : COLORS.unselected.subText,
          marginTop: '1px',
          lineHeight: '1.4',
        }}
      >
        {desc}
      </div>
    </div>
    {selected && (
      <Check
        style={{ width: '20px', height: '20px', color: COLORS.selected.icon, flexShrink: 0 }}
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
      width: '52px',
      height: '28px',
      borderRadius: '9999px',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: checked ? COLORS.toggle.backgroundOn : COLORS.toggle.backgroundOff,
      border: 'none',
      cursor: 'pointer',
    }}
    onFocus={(e) => {
      e.currentTarget.style.outline = `2px solid ${COLORS.toggle.focusOutline}`;
      e.currentTarget.style.outlineOffset = '2px';
    }}
    onBlur={(e) => {
      e.currentTarget.style.outline = 'none';
    }}
  >
    <span
      style={{
        position: 'absolute',
        left: checked ? 'calc(100% - 26px)' : '3px',
        width: '22px',
        height: '22px',
        backgroundColor: COLORS.toggle.thumb,
        borderRadius: '50%',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    />
  </button>
);

/* ─────────────────────────────────────────────────────────────────────────────
** Mount
** ─────────────────────────────────────────────────────────────────────────────
 **/

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Options />
    </React.StrictMode>
  );
}
