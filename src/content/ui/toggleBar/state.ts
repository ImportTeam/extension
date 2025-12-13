/**
 * Toggle Bar 상태 관리 모듈
 * 전역 상태와 DOM 참조를 중앙 관리
 */

import type { ToggleProductData } from './types';

// Constants
export const HOST_ID = 'picsel-toggle-host';
export const PANEL_ID = 'picsel-toggle-panel';

// Platform name mapping
export const PLATFORM_NAMES: Record<string, string> = {
	coupang: '쿠팡',
	amazon: '아마존',
	ebay: '이베이',
	gmarket: 'G마켓',
	'11st': '11번가',
	naver: '네이버쇼핑',
	tmon: '티몬',
	wemakeprice: '위메프',
};

export const getPlatformDisplayName = (site: string | undefined | null): string => {
	if (!site) return 'PicSel';
	const siteKey = String(site).toLowerCase();
	return PLATFORM_NAMES[siteKey] || String(site);
};

// State 객체로 통합 관리
interface ToggleBarState {
	hostElement: HTMLDivElement | null;
	shadowRoot: ShadowRoot | null;
	toggleButton: HTMLButtonElement | null;
	buttonLabelEl: HTMLSpanElement | null;
	buttonBadgeEl: HTMLSpanElement | null;
	panelEl: HTMLDivElement | null;
	closeButtonEl: HTMLButtonElement | null;
	contentEl: HTMLDivElement | null;
	panelTitleEl: HTMLDivElement | null;
	mounted: boolean;
	cachedData: ToggleProductData | null;
	comparison: {
		status: 'idle' | 'loading' | 'success' | 'error';
		query: string | null;
		error: string | null;
		data: unknown | null;
	};
}

export const state: ToggleBarState = {
	hostElement: null,
	shadowRoot: null,
	toggleButton: null,
	buttonLabelEl: null,
	buttonBadgeEl: null,
	panelEl: null,
	closeButtonEl: null,
	contentEl: null,
	panelTitleEl: null,
	mounted: false,
	cachedData: null,
	comparison: {
		status: 'idle',
		query: null,
		error: null,
		data: null,
	},
};

