import React, { useEffect, useState } from 'react';
import '../popup/styles/globals.css';
import './options.css';
import ReactDOM from 'react-dom/client';
import { useSettingsStore } from '@/shared/store/slices/settings';
import { CreditCard, ShoppingCart, Search, ChevronLeft, X, RotateCcw, Check } from 'lucide-react';

export const Options: React.FC = () => {
  const {
    displayMode,
    autoFetchLowestPrice,
    setDisplayMode,
    setAutoFetchLowestPrice,
    reset,
  } = useSettingsStore();

  const handleReset = (): void => {
    if (confirm('설정을 초기화할까요?')) {
      reset();
    }
  };

  const handleClose = (): void => {
    window.close();
  };

  useEffect(() => {
    try {
      // Helpful debug logs to verify CSS load and count on Options page
      // eslint-disable-next-line no-console
      console.info('[Options] mounted, stylesheets=', document.styleSheets.length);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.info('[Options] mount log fail', e);
    }
  }, []);

  // Temp helper to preview light/dark theme locally
  const [forceTheme, setForceTheme] = useState<'auto' | 'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('options.forceTheme') as 'auto' | 'light' | 'dark') || 'auto';
    } catch {
      return 'auto';
    }
  });

  useEffect(() => {
    try {
      if (forceTheme === 'auto') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', forceTheme);
      }
      localStorage.setItem('options.forceTheme', forceTheme);
    } catch {
      // ignore
    }
  }, [forceTheme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 transition-colors">
          <div className="max-w-xl mx-auto p-6">
            <div className="bg-white dark:bg-[#121212] rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
          {/* Header */}
            
        <header className="flex items-center justify-between px-6 py-5 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800">
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">설정</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setForceTheme(forceTheme === 'auto' ? 'light' : forceTheme === 'light' ? 'dark' : 'auto')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={`Theme: ${forceTheme}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v2"></path></svg>
            </button>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Display Mode */}
        <section className="mb-2">
          <h2 className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            표시 모드
          </h2>
          <div className="bg-gray-50 dark:bg-[#0f1723] divide-y divide-gray-100 dark:divide-gray-800 px-3 py-3">
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

        {/* Auto Search */}
        <section className="mb-2">
          <h2 className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            자동화
          </h2>
          <div className="bg-gray-50 dark:bg-[#0f1723] p-3">
            <div className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-sm">자동 검색</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">페이지 접속 시 자동 실행</div>
                </div>
              </div>
              <Toggle
                checked={autoFetchLowestPrice}
                onChange={setAutoFetchLowestPrice}
              />
            </div>
          </div>
        </section>

        {/* Reset */}
        <div className="px-6 py-8">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            설정 초기화
          </button>
            </div>
          </div>
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
    className={`w-full flex items-center gap-4 px-4 py-3 transition-colors rounded-2xl ${selected ? 'bg-white dark:bg-gray-900 border-2 border-gray-900 dark:border-white shadow-sm' : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-600'} hover:bg-gray-50 dark:hover:bg-gray-900/50`}
  >
    <div className={`p-3 rounded-full flex items-center justify-center border ${selected ? 'bg-white dark:bg-gray-900 border-transparent dark:border-transparent' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600'}`}>
      <div className={selected ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}>
        {icon}
      </div>
    </div>
    <div className="flex-1 text-left">
      <div className="font-medium text-sm">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{desc}</div>
    </div>
    {selected && (
      <Check className="w-5 h-5 text-gray-900 dark:text-white shrink-0" />
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
    className={`relative w-14 h-7 rounded-full transition-all duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-[#121212] ${
      checked 
        ? 'bg-violet-500 shadow-sm shadow-violet-500/30 dark:shadow-violet-500/20' 
        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`}
  >
    <span
      className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
        checked ? 'translate-x-6' : 'translate-x-0'
      }`}
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
