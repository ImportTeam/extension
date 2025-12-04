/**
 * 11번가 카드 혜택 관련 유틸
 * - 추가 혜택 버튼 클릭 감지 및 콜백 호출
 * - 자동 클릭은 기본 비활성화 (성능 및 UX 고려)
 * 
 * 최적화:
 * - debounce로 연속 호출 방지
 * - 자동 클릭 비활성화
 * - Observer 최소화
 */

import { domLog } from '../shared/utils/logger';
import { debounce } from '../shared/utils/timing';

export type BenefitRefreshHandler = (source: string) => void;

const DEBOUNCE_MS = 500;

const buttonSelectors = [
	'.additional_benefits button',
	'[data-log-actionid*="무이자"]',
	'[onclick*="additionalBenefit"]',
	'.c_product_btn[aria-controls*="Benefit"]',
	'button[class*="benefit"]',
];

const hasBenefitContent = (): boolean => Boolean(document.querySelector('.other_benefits .benefit dt'));

export function setupElevenStreetBenefitWatcher(onBenefitRefresh: BenefitRefreshHandler): void {
	if (!window.location.hostname.includes('11st.co.kr')) return;

	domLog.info('Setting up 11번가 benefit watcher');

	// debounce된 콜백
	const debouncedRefresh = debounce((source: string) => {
		if (hasBenefitContent()) {
			domLog.info('Benefit content found', { source });
			onBenefitRefresh(source);
		}
	}, DEBOUNCE_MS);

	// 버튼 클릭 리스너 설정 (한 번만)
	const watchedButtons = new WeakSet<Element>();

	const setupClickListeners = (): void => {
		buttonSelectors.forEach((selector) => {
			const buttons = document.querySelectorAll(selector);
			buttons.forEach((btn) => {
				if (watchedButtons.has(btn)) return;
				watchedButtons.add(btn);

				btn.addEventListener('click', () => {
					domLog.debug('Benefit button clicked');
					// 클릭 후 콘텐츠 로드 대기
					setTimeout(() => debouncedRefresh('benefit-click'), 800);
				});
			});
		});
	};

	setupClickListeners();

	// Observer는 초기 로드 시에만 짧게 실행
	let observerTimeout: ReturnType<typeof setTimeout> | null = null;
	
	const buttonObserver = new MutationObserver(() => {
		setupClickListeners();
	});

	buttonObserver.observe(document.body, {
		childList: true,
		subtree: true,
	});

	// 5초 후 Observer disconnect (초기 로드 완료 추정)
	observerTimeout = setTimeout(() => {
		buttonObserver.disconnect();
		domLog.debug('Benefit button observer disconnected (timeout)');
	}, 5000);

	// 페이지 언로드 시 정리
	window.addEventListener('beforeunload', () => {
		if (observerTimeout) clearTimeout(observerTimeout);
		buttonObserver.disconnect();
	}, { once: true });
}

/**
 * 자동 클릭 기능 (기본 비활성화)
 * 필요시 명시적으로 호출
 */
export function attemptAutoClickBenefitButton(onBenefitRefresh: BenefitRefreshHandler): void {
	// 성능 및 UX 고려하여 기본 비활성화
	// 이 함수는 필요시 옵션에서 활성화할 수 있도록 export만 유지
	domLog.debug('Auto-click is disabled for performance');
	
	// 이미 혜택 정보가 있으면 콜백만 호출
	if (hasBenefitContent()) {
		onBenefitRefresh('existing-benefit');
	}
}
