import React from 'react';
import ReactDOM from 'react-dom/client';
import { useSettingsStore } from '../shared/store/slices/settings';
import type { DisplayMode } from '../shared/store/slices/settings';
import '../popup/styles/globals.css';

/**
 * Options Page
 * 사용자 설정 관리
 */

export const Options: React.FC = () => {
  const {
    displayMode,
    autoFetchLowestPrice,
    comparisonServerUrl,
    setDisplayMode,
    setAutoFetchLowestPrice,
    setComparisonServerUrl,
    reset,
  } = useSettingsStore();

  const handleDisplayModeChange = (mode: DisplayMode): void => {
    setDisplayMode(mode);
  };

  const handleAutoFetchToggle = (): void => {
    setAutoFetchLowestPrice(!autoFetchLowestPrice);
  };

  const handleServerUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setComparisonServerUrl(e.target.value);
  };

  const handleReset = (): void => {
    if (confirm('모든 설정을 초기화하시겠습니까?')) {
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">PicSel 설정</h1>
          <p className="text-gray-600 dark:text-gray-400">
            결제 최적화 확장 프로그램 설정을 관리합니다.
          </p>
        </header>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Display Mode Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              📊 표시 모드
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              상품 페이지에서 어떤 정보를 우선적으로 표시할지 선택하세요.
            </p>

            <div className="space-y-3">
              {/* 카드 혜택 우선 */}
              <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
                style={{
                  borderColor: displayMode === 'card-benefits' ? 'oklch(0.65 0.15 270)' : 'oklch(0.85 0 0)',
                  backgroundColor: displayMode === 'card-benefits' ? 'oklch(0.95 0.05 270)' : 'transparent',
                }}
              >
                <input
                  type="radio"
                  name="displayMode"
                  value="card-benefits"
                  checked={displayMode === 'card-benefits'}
                  onChange={() => handleDisplayModeChange('card-benefits')}
                  className="mt-1 mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    💳 카드 혜택 우선
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    현재 페이지의 카드별 할인율과 혜택을 분석하여 표시합니다. (기존 방식)
                  </div>
                </div>
              </label>

              {/* 최저가 비교 우선 */}
              <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
                style={{
                  borderColor: displayMode === 'lowest-price' ? 'oklch(0.65 0.15 270)' : 'oklch(0.85 0 0)',
                  backgroundColor: displayMode === 'lowest-price' ? 'oklch(0.95 0.05 270)' : 'transparent',
                }}
              >
                <input
                  type="radio"
                  name="displayMode"
                  value="lowest-price"
                  checked={displayMode === 'lowest-price'}
                  onChange={() => handleDisplayModeChange('lowest-price')}
                  className="mt-1 mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    💰 최저가 비교 우선
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    여러 쇼핑몰의 가격을 비교하여 최저가 정보를 표시합니다.
                  </div>
                </div>
              </label>
            </div>
          </section>

          {/* Auto Fetch Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              🚀 자동 검색
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              페이지 로드 시 자동으로 최저가를 검색합니다.
            </p>

            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={autoFetchLowestPrice}
                  onChange={handleAutoFetchToggle}
                  className="sr-only"
                />
                <div
                  className="w-14 h-8 rounded-full transition-colors"
                  style={{
                    backgroundColor: autoFetchLowestPrice ? 'oklch(0.65 0.15 270)' : 'oklch(0.75 0 0)',
                  }}
                ></div>
                <div
                  className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform"
                  style={{
                    transform: autoFetchLowestPrice ? 'translateX(24px)' : 'translateX(0)',
                  }}
                ></div>
              </div>
              <span className="ml-3 text-gray-900 dark:text-gray-100 font-medium">
                {autoFetchLowestPrice ? '활성화' : '비활성화'}
              </span>
            </label>

            {autoFetchLowestPrice && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  ℹ️ 상품 페이지 접속 시 자동으로 백엔드 서버에 요청하여 최저가 정보를 가져옵니다.
                </p>
              </div>
            )}
          </section>

          {/* Server URL Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              🌐 서버 설정
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              가격 비교 백엔드 서버 URL을 설정합니다.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                서버 URL
              </label>
              <input
                type="text"
                value={comparisonServerUrl}
                onChange={handleServerUrlChange}
                placeholder="http://localhost:8000"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                개발 환경: http://localhost:8000 | 프로덕션: https://api.picsel.kr
              </p>
            </div>
          </section>

          {/* Reset Button */}
          <section className="flex justify-end">
            <button
              onClick={handleReset}
              className="px-6 py-2 text-red-600 dark:text-red-400 border border-red-600 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              ⚠️ 설정 초기화
            </button>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>PicSel v1.0.0 | 설정은 자동으로 저장됩니다.</p>
        </footer>
      </div>
    </div>
  );
};

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Options />
    </React.StrictMode>
  );
}
