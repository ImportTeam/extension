/**
 * 11번가 카드 혜택 관련 유틸
 * - 추가 혜택 버튼 자동 클릭
 * - 버튼 클릭 감지 및 콜백 호출
 */

import { domLog } from '../shared/utils/logger';

export type BenefitRefreshHandler = (source: string) => void;

const buttonSelectors = [
	'.additional_benefits button',
	'[data-log-actionid*="무이자"]',
	'[onclick*="additionalBenefit"]',
	'.c_product_btn[aria-controls*="Benefit"]',
	'button[class*="benefit"]',
];

const autoClickSelectors = [
	...buttonSelectors,
	'.max_saveing_point .c_layer_expand button',
];

const closeButtonSelector = '.dialog_cont .btn_close, .layer_pop .btn_close, [class*="popup"] .close';

const hasBenefitContent = (): boolean => Boolean(document.querySelector('.other_benefits .benefit dt'));

export function setupElevenStreetBenefitWatcher(onBenefitRefresh: BenefitRefreshHandler): void {
	if (!window.location.hostname.includes('11st.co.kr')) return;

	domLog.info('Setting up 11번가 benefit watcher');

	attemptAutoClickBenefitButton(onBenefitRefresh);

	const setupClickListeners = (): void => {
		buttonSelectors.forEach((selector) => {
			const buttons = document.querySelectorAll(selector);
			buttons.forEach((btn) => {
				if (btn.getAttribute('data-picsel-watched')) return;
				btn.setAttribute('data-picsel-watched', 'true');

				btn.addEventListener('click', () => {
					domLog.debug('Benefit button clicked, waiting for content...');
					setTimeout(() => {
						if (hasBenefitContent()) {
							domLog.info('Benefit content found after click');
							onBenefitRefresh('benefit-click');
						}
					}, 1000);
				});
			});
		});
	};

	setupClickListeners();

	const buttonObserver = new MutationObserver(() => {
		setupClickListeners();
	});

	buttonObserver.observe(document.body, {
		childList: true,
		subtree: true,
	});

	setTimeout(setupClickListeners, 3000);
}

export function attemptAutoClickBenefitButton(onBenefitRefresh: BenefitRefreshHandler): void {
	if (hasBenefitContent()) {
		domLog.debug('Benefit content already exists, skip auto-click');
		return;
	}

	let targetButton: Element | null = null;
	for (const selector of autoClickSelectors) {
		const btn = document.querySelector(selector);
		if (!btn) continue;
		const text = btn.textContent || '';
		if (text.includes('무이자') || text.includes('할인') || text.includes('추가') || text.includes('혜택')) {
			targetButton = btn;
			domLog.debug('Found benefit button', { selector, text: text.substring(0, 30) });
			break;
		}
	}

	if (!targetButton) {
		domLog.debug('No benefit button found for auto-click');
		setTimeout(() => {
			if (document.querySelector('.additional_benefits button') && !hasBenefitContent()) {
				domLog.debug('Retry auto-click benefit button');
				attemptAutoClickBenefitButton(onBenefitRefresh);
			}
		}, 3000);
		return;
	}

	domLog.info('Auto-clicking benefit button to load content');
	(targetButton as HTMLElement).click();

	setTimeout(() => {
		const closeButton = document.querySelector(closeButtonSelector);
		if (closeButton) {
			domLog.debug('Closing benefit dialog after load');
			(closeButton as HTMLElement).click();
		}

		setTimeout(() => {
			if (hasBenefitContent()) {
				domLog.info('Benefit content loaded via auto-click');
				onBenefitRefresh('auto-click-benefit');
			} else {
				domLog.warn('Benefit content not found after auto-click');
			}
		}, 500);
	}, 1000);
}
