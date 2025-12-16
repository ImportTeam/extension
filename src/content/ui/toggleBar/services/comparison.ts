/**
 * Lowest Price Comparison Service
 * 비교 요청/상태 갱신만 책임 (렌더링은 콜백으로 위임)
 */

import type { ComparisonResponse } from '../core/types';
import { state } from '../core/state';

const ensureLowestPriceComparison = async (query: string, onComplete?: () => void): Promise<void> => {
	if (!query) return;

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
			onComplete?.();
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
			onComplete?.();
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
				data: {
					...result.data,
					current_price: state.cachedData?.amount,
				} as ComparisonResponse,
			};
			onComplete?.();
			return;
		}

		state.comparison = {
			status: 'error',
			query,
			error: result?.error || '가격 비교 검색 실패',
			data: null,
		};
		onComplete?.();
	} catch (e) {
		state.comparison = {
			status: 'error',
			query,
			error: e instanceof Error ? e.message : '알 수 없는 오류',
			data: null,
		};
		onComplete?.();
	}
};

export const startLowestPriceComparison = (query: string, render: () => void, onComplete?: () => void): void => {
	if (!query) return;

	if (state.comparison.status === 'loading') {
		return;
	}

	// 이미 같은 쿼리로 비교가 완료된 경우: 즉시 콜백만 호출
	if (state.comparison.query === query && (state.comparison.status === 'success' || state.comparison.status === 'error')) {
		onComplete?.();
		return;
	}

	state.comparison = { status: 'loading', query, error: null, data: null };
	render();

	ensureLowestPriceComparison(query, onComplete).finally(() => {
		render();
	});
};
