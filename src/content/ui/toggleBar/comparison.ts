/**
 * Lowest Price Comparison 모듈
 * 비교 요청/상태 갱신만 책임 (렌더링은 콜백으로 위임)
 */

import type { ComparisonResponse } from './types';
import { state } from './state';

const ensureLowestPriceComparison = async (query: string): Promise<void> => {
	if (!query) return;

	// 이미 로딩 중이거나 동일 쿼리가 완료된 경우 스킵
	if (state.comparison.status === 'loading') return;
	if (state.comparison.query === query && (state.comparison.status === 'success' || state.comparison.status === 'error')) {
		return;
	}

	state.comparison = { status: 'loading', query, error: null, data: null };

	try {
		if (!chrome?.runtime?.sendMessage) {
			state.comparison = {
				status: 'error',
				query,
				error: 'Chrome extension API를 사용할 수 없습니다.',
				data: null,
			};
			return;
		}

		const serverCheck = await chrome.runtime.sendMessage({ type: 'CHECK_COMPARISON_SERVER' });
		if (!serverCheck?.success) {
			state.comparison = {
				status: 'error',
				query,
				error: serverCheck?.error || '가격 비교 서버가 실행 중이 아닙니다.',
				data: null,
			};
			return;
		}

		const result = await chrome.runtime.sendMessage({
			type: 'COMPARE_PRICES',
			query,
		});

		if (result?.success) {
			state.comparison = {
				status: 'success',
				query,
				error: null,
				data: result.data as ComparisonResponse,
			};
			return;
		}

		state.comparison = {
			status: 'error',
			query,
			error: result?.error || '가격 비교 검색 실패',
			data: null,
		};
	} catch (e) {
		state.comparison = {
			status: 'error',
			query,
			error: e instanceof Error ? e.message : '알 수 없는 오류',
			data: null,
		};
	}
};

/**
 * 패널 열림 시 가격 비교 시작 + 리렌더
 * 렌더링 책임은 콜백으로 위임
 */
export const startLowestPriceComparison = (query: string, render: () => void): void => {
	if (!query) return;

	if (state.comparison.status === 'loading') {
		return;
	}

	if (state.comparison.query === query && (state.comparison.status === 'success' || state.comparison.status === 'error')) {
		return;
	}

	state.comparison = { status: 'loading', query, error: null, data: null };
	render();

	ensureLowestPriceComparison(query).finally(() => {
		render();
	});
};
