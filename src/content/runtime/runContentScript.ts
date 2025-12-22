/**
 * Content Script Runner
 * 책임: 파싱 실행 및 UI 마운트 조율
 */

import type { ParsedProductInfo } from '@/shared/types';
import { logger, LogDomain } from '@/shared/utils/logger';
import { useSettingsStore } from '@/shared/store/slices/settings';
import { STORAGE_KEYS } from '@/shared/store/middleware';

import {
	mountToggleBar,
	updateToggleBar,
	setPanelOpen,
	type ToggleProductData,
} from '@/content/ui/toggleBar';

import { extractPaymentInfo, type ExtractionResult } from '@/content/parsing/extractPaymentInfo';
import { saveProductData, type MessageSource } from '@/content/services/backgroundMessaging';
import { setupDynamicContentObserver, type CleanupFn } from '@/content/services/dynamicObserver';
import { setupElevenStreetBenefitWatcher } from '@/content/services/elevenStreetBenefits';
import { sendPriceComparisonRequest } from '@/content/services/priceComparison';
import { waitForSettingsHydration } from '@/content/runtime/settingsHydration';

const isMainFrame = window.self === window.top;
let hasRun = false;
let lastExtractionResult: ExtractionResult | null = null;

const cleanupFns: CleanupFn[] = [];

function toToggleData(paymentInfo: ParsedProductInfo, site: string): ToggleProductData {
	return { ...paymentInfo, site } as ToggleProductData;
}

function reparseAndNotify(source: MessageSource): boolean {
	const result = extractPaymentInfo();
	if (!result) return false;

	lastExtractionResult = result;

	updateToggleBar(toToggleData(result.paymentInfo, result.site));
	saveProductData(result.paymentInfo, source);
	return true;
}

function init(): void {
	const result = extractPaymentInfo();
	if (!result) {
		logger.warn(LogDomain.BOOTSTRAP, 'Failed to extract payment info on init');
		return;
	}

	lastExtractionResult = result;

	mountToggleBar(toToggleData(result.paymentInfo, result.site));
	saveProductData(result.paymentInfo, 'initial');

	void (async () => {
		await waitForSettingsHydration(useSettingsStore);
		const settings = useSettingsStore.getState();

		updateToggleBar(toToggleData(result.paymentInfo, result.site));

		logger.info(LogDomain.BOOTSTRAP, '⚙️ Display mode check', {
			displayMode: settings.displayMode,
			autoFetchLowestPrice: settings.autoFetchLowestPrice,
			hasTitle: !!result.paymentInfo.title,
		});

		if (settings.displayMode === 'lowest-price') {
			if (!result.paymentInfo.title) {
				logger.warn(LogDomain.BOOTSTRAP, '⚠️ [LOWEST_PRICE] Cannot fetch: no product title');
				return;
			}

			if (settings.autoFetchLowestPrice) {
				logger.info(LogDomain.BOOTSTRAP, '🚀 [LOWEST_PRICE] Auto fetch enabled', {
					displayMode: settings.displayMode,
					productTitle: result.paymentInfo.title.substring(0, 50),
				});

				// 로딩 indicator 먼저 표시
				const { updateIdleLoadingIndicator } = await import('../ui/toggleBar/core/loadingIndicator');
				updateIdleLoadingIndicator();

				void sendPriceComparisonRequest({
					productUrl: window.location.href,
					productName: result.paymentInfo.title,
					currentPrice: result.paymentInfo.amount,
					site: result.site,
					selectedOptions: result.paymentInfo.selectedOptions,
					onComplete: () => {
						// 비교 완료 시 패널 자동 오픈 후 콘텐츠 다시 렌더링
						setPanelOpen(true);
						updateToggleBar(toToggleData(result.paymentInfo, result.site));
					},
				});
			} else {
				logger.info(LogDomain.BOOTSTRAP, '⏸️ [LOWEST_PRICE] Manual mode (will fetch when panel opens)', {
					displayMode: settings.displayMode,
				});
			}
		} else {
			logger.debug(LogDomain.BOOTSTRAP, '💳 Card benefits mode selected');
		}
	})();
}

function cleanupAll(): void {
	cleanupFns.forEach((cleanup) => {
		try {
			cleanup();
		} catch (e) {
			logger.warn(LogDomain.BOOTSTRAP, 'Cleanup error', { error: e });
		}
	});
	cleanupFns.length = 0;
}

export function runContentScript(): void {
	if (!isMainFrame || hasRun) return;
	hasRun = true;

	logger.info(LogDomain.BOOTSTRAP, 'Content script starting');
	init();

	if (chrome?.storage?.onChanged) {
		chrome.storage.onChanged.addListener((changes, areaName) => {
			if (areaName !== 'local') return;
			if (!changes || !Object.prototype.hasOwnProperty.call(changes, STORAGE_KEYS.SETTINGS)) return;

			void (async () => {
				await waitForSettingsHydration(useSettingsStore, 1500, true);
				const settings = useSettingsStore.getState();

				if (lastExtractionResult) {
					updateToggleBar(toToggleData(lastExtractionResult.paymentInfo, lastExtractionResult.site));
				}

				if (
					settings.displayMode === 'lowest-price' &&
					settings.autoFetchLowestPrice &&
					lastExtractionResult?.paymentInfo?.title
				) {
					// 로딩 indicator 먼저 표시
					const { updateIdleLoadingIndicator } = await import('../ui/toggleBar/core/loadingIndicator');
					updateIdleLoadingIndicator();

					void sendPriceComparisonRequest({
						productUrl: window.location.href,
						productName: lastExtractionResult.paymentInfo.title,
						currentPrice: lastExtractionResult.paymentInfo.amount,
						site: lastExtractionResult.site,
						selectedOptions: lastExtractionResult.paymentInfo.selectedOptions,
						onComplete: () => {
							// 비교 완료 시 패널 자동 오픈 후 콘텐츠 다시 렌더링
							setPanelOpen(true);
							if (lastExtractionResult) {
								updateToggleBar(toToggleData(lastExtractionResult.paymentInfo, lastExtractionResult.site));
							}
						},
					});
				}
			})();
		});
	}

	const dynamicCleanup = setupDynamicContentObserver((source) => reparseAndNotify(source as MessageSource));
	cleanupFns.push(dynamicCleanup);

	const benefitCleanup = setupElevenStreetBenefitWatcher((source) => {
		reparseAndNotify(source as MessageSource);
	});
	cleanupFns.push(benefitCleanup);

	window.addEventListener('beforeunload', cleanupAll, { once: true });
}
