/**
 * Settings Store Types
 * 사용자 설정 관리
 */

/**
 * 표시 모드
 * - card-benefits: 카드 혜택 우선 (기존 방식)
 * - lowest-price: 최저가 비교 우선 (BE 연동)
 */
export type DisplayMode = 'card-benefits' | 'lowest-price';

/**
 * Settings State
 */
export interface SettingsState {
  /** 표시 모드 */
  displayMode: DisplayMode;
  
  /** 자동으로 최저가 검색 여부 */
  autoFetchLowestPrice: boolean;
  
  /** BE 서버 URL (개발/프로덕션 전환용) */
  comparisonServerUrl: string;
}

/**
 * Settings Actions
 */
export interface SettingsActions {
  setDisplayMode: (mode: DisplayMode) => void;
  setAutoFetchLowestPrice: (enabled: boolean) => void;
  setComparisonServerUrl: (url: string) => void;
  reset: () => void;
}

/**
 * Combined Settings Store
 */
export interface SettingsStore extends SettingsState, SettingsActions {}

/**
 * Persisted State (chrome.storage.local에 저장될 데이터)
 */
export type PersistedSettingsState = SettingsState;

/**
 * Initial State
 */
export const initialSettingsState: SettingsState = {
  displayMode: 'card-benefits',
  autoFetchLowestPrice: false,
  comparisonServerUrl: 'http://localhost:8000',
};
