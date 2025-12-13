/**
 * Price Comparison Messaging
 * 책임: Background/Server로 최저가 비교 요청 및 ToggleBar 상태 반영
 */

import { logger, LogDomain, ErrorCode } from '@/shared/utils/logger';

import { renderContent, state as toggleBarState } from '@/content/ui/toggleBar';

export async function sendPriceComparisonRequest(params: {
	productUrl: string;
	productName: string;
	currentPrice?: number;
	site?: string;
}): Promise<void> {
	const { productUrl, productName, currentPrice, site } = params;

	try {
		logger.info(LogDomain.NETWORK, '💰 [LOWEST_PRICE] Initiating price comparison', {
			url: productUrl,
			product: productName,
			currentPrice,
			site,
			timestamp: new Date().toISOString(),
		});

		toggleBarState.comparison = {
			status: 'loading',
			query: productName,
			error: null,
			data: null,
		};
		renderContent();

		if (!chrome?.runtime?.sendMessage) {
			logger.error(LogDomain.NETWORK, ErrorCode.NET_E002, 'Chrome extension API not available', {});

			toggleBarState.comparison = {
				status: 'error',
				query: productName,
				error: 'Chrome extension API를 사용할 수 없습니다.',
				data: null,
			};
			renderContent();
			return;
		}

		logger.debug(LogDomain.NETWORK, '[LOWEST_PRICE] Checking server health...');
		const serverCheck = await chrome.runtime.sendMessage({
			type: 'CHECK_COMPARISON_SERVER',
		});

		if (!serverCheck?.success) {
			logger.error(LogDomain.NETWORK, ErrorCode.NET_E002, '[LOWEST_PRICE] Server not available', {
				error: serverCheck?.error || 'Server check failed',
			});

			toggleBarState.comparison = {
				status: 'error',
				query: productName,
				error: serverCheck?.error || '가격 비교 서버가 실행 중이 아닙니다.',
				data: null,
			};
			renderContent();
			return;
		}

		logger.info(LogDomain.NETWORK, '[LOWEST_PRICE] Server healthy, sending comparison request');

		const response = await chrome.runtime.sendMessage({
			type: 'COMPARE_PRICES',
			query: productName,
			currentPrice,
			currentUrl: productUrl,
		});

		if (response?.success) {
			logger.info(LogDomain.NETWORK, '✅ [LOWEST_PRICE] Price comparison completed', {
				resultCount: response.data?.results?.length || 0,
				fromCache: response.data?.fromCache,
				totalDuration: response.data?.totalDuration,
			});

			toggleBarState.comparison = {
				status: 'success',
				query: productName,
				error: null,
				data: response.data,
			};
			renderContent();
		} else {
			logger.warn(LogDomain.NETWORK, '[LOWEST_PRICE] Price comparison failed', {
				error: response?.error,
			});

			toggleBarState.comparison = {
				status: 'error',
				query: productName,
				error: response?.error || '가격 비교 검색 실패',
				data: null,
			};
			renderContent();
		}
	} catch (error) {
		logger.error(LogDomain.NETWORK, ErrorCode.NET_E002, '[LOWEST_PRICE] Request error', {
			error: error instanceof Error ? error : new Error(String(error)),
		});

		toggleBarState.comparison = {
			status: 'error',
			query: productName,
			error: error instanceof Error ? error.message : '알 수 없는 오류',
			data: null,
		};
		renderContent();
	}
}
