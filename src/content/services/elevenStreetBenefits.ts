/**
 * 11번가 카드 혜택 관련 유틸
 * 책임: 추가 혜택 버튼 클릭 감지 및 콜백 호출
 */

import { domLog } from '@/shared/utils/logger';
import { debounce } from '@/shared/utils/timing';

export type BenefitRefreshHandler = (source: string) => void;
export type CleanupFn = () => void;

const DEBOUNCE_MS = 500;

const buttonSelectors = [
	'.additional_benefits button',
	'[data-log-actionid*="무이자"]',
	'[onclick*="additionalBenefit"]',
	'.c_product_btn[aria-controls*="Benefit"]',
	'button[class*="benefit"]',
];

const hasBenefitContent = (): boolean => Boolean(document.querySelector('.other_benefits .benefit dt'));

export function setupElevenStreetBenefitWatcher(onBenefitRefresh: BenefitRefreshHandler): CleanupFn {
	if (!window.location.hostname.includes('11st.co.kr')) {
		return () => {};
	}

	domLog.info('Setting up 11번가 benefit watcher');

	let isCleanedUp = false;
	let observerTimeout: ReturnType<typeof setTimeout> | null = null;
	let buttonObserver: MutationObserver | null = null;

	const clickHandlers = new Map<Element, () => void>();

	const debouncedRefresh = debounce((source: string) => {
		if (isCleanedUp) return;
		if (hasBenefitContent()) {
			domLog.info('Benefit content found', { source });
			onBenefitRefresh(source);
		}
	}, DEBOUNCE_MS);

	const watchedButtons = new WeakSet<Element>();

	const setupClickListeners = (): void => {
		if (isCleanedUp) return;

		buttonSelectors.forEach((selector) => {
			const buttons = document.querySelectorAll(selector);
			buttons.forEach((btn) => {
				if (watchedButtons.has(btn)) return;
				watchedButtons.add(btn);

				const handler = (): void => {
					domLog.debug('Benefit button clicked');
					setTimeout(() => debouncedRefresh('benefit-click'), 800);
				};

				clickHandlers.set(btn, handler);
				btn.addEventListener('click', handler);
			});
		});
	};

	setupClickListeners();

	buttonObserver = new MutationObserver(() => {
		setupClickListeners();
	});

	if (document.body) {
		buttonObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	observerTimeout = setTimeout(() => {
		if (buttonObserver && !isCleanedUp) {
			buttonObserver.disconnect();
			buttonObserver = null;
			domLog.debug('Benefit button observer disconnected (timeout)');
		}
	}, 5000);

	const cleanup: CleanupFn = () => {
		if (isCleanedUp) return;
		isCleanedUp = true;

		if (observerTimeout) {
			clearTimeout(observerTimeout);
			observerTimeout = null;
		}

		if (buttonObserver) {
			buttonObserver.disconnect();
			buttonObserver = null;
		}

		clickHandlers.forEach((handler, btn) => {
			btn.removeEventListener('click', handler);
		});
		clickHandlers.clear();

		domLog.debug('ElevenStreetBenefitWatcher cleaned up');
	};

	window.addEventListener('beforeunload', cleanup, { once: true });

	return cleanup;
}

export function attemptAutoClickBenefitButton(onBenefitRefresh: BenefitRefreshHandler): void {
	domLog.debug('Auto-click is disabled for performance');
	if (hasBenefitContent()) {
		onBenefitRefresh('existing-benefit');
	}
}
