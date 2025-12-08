/**
 * 11번가 카드 혜택 관련 유틸
 * - 추가 혜택 버튼 클릭 감지 및 콜백 호출
 * - 자동 클릭은 기본 비활성화 (성능 및 UX 고려)
 * 
 * 최적화:
 * - debounce로 연속 호출 방지
 * - 자동 클릭 비활성화
 * - Observer 최소화
 * - cleanup 함수로 메모리 누수 방지
 */

import { domLog } from '../shared/utils/logger';
import { debounce } from '../shared/utils/timing';

export type BenefitRefreshHandler = (source: string) => void;

/** Watcher cleanup 함수 타입 */
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

/**
 * 11번가 혜택 버튼 감시자 설정
 * @param onBenefitRefresh - 혜택 새로고침 콜백
 * @returns cleanup 함수
 */
export function setupElevenStreetBenefitWatcher(onBenefitRefresh: BenefitRefreshHandler): CleanupFn {
	// 11번가가 아니면 빈 cleanup 반환
	if (!window.location.hostname.includes('11st.co.kr')) {
		return () => {};
	}

	domLog.info('Setting up 11번가 benefit watcher');

	let isCleanedUp = false;
	let observerTimeout: ReturnType<typeof setTimeout> | null = null;
	let buttonObserver: MutationObserver | null = null;

	// 버튼 클릭 핸들러들 (cleanup 시 제거용)
	const clickHandlers = new Map<Element, () => void>();

	// debounce된 콜백
	const debouncedRefresh = debounce((source: string) => {
		if (isCleanedUp) return;
		
		if (hasBenefitContent()) {
			domLog.info('Benefit content found', { source });
			onBenefitRefresh(source);
		}
	}, DEBOUNCE_MS);

	// 버튼 클릭 리스너 설정 (한 번만)
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
					// 클릭 후 콘텐츠 로드 대기
					setTimeout(() => debouncedRefresh('benefit-click'), 800);
				};

				clickHandlers.set(btn, handler);
				btn.addEventListener('click', handler);
			});
		});
	};

	setupClickListeners();

	// Observer는 초기 로드 시에만 짧게 실행
	buttonObserver = new MutationObserver(() => {
		setupClickListeners();
	});

	if (document.body) {
		buttonObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	// 5초 후 Observer disconnect (초기 로드 완료 추정)
	observerTimeout = setTimeout(() => {
		if (buttonObserver && !isCleanedUp) {
			buttonObserver.disconnect();
			buttonObserver = null;
			domLog.debug('Benefit button observer disconnected (timeout)');
		}
	}, 5000);

	/**
	 * Cleanup 함수
	 * - 타이머 정리
	 * - Observer disconnect
	 * - 이벤트 리스너 제거
	 */
	const cleanup: CleanupFn = () => {
		if (isCleanedUp) return;
		isCleanedUp = true;

		// 타이머 정리
		if (observerTimeout) {
			clearTimeout(observerTimeout);
			observerTimeout = null;
		}

		// Observer 정리
		if (buttonObserver) {
			buttonObserver.disconnect();
			buttonObserver = null;
		}

		// 클릭 핸들러 제거
		clickHandlers.forEach((handler, btn) => {
			btn.removeEventListener('click', handler);
		});
		clickHandlers.clear();

		domLog.debug('ElevenStreetBenefitWatcher cleaned up');
	};

	// 페이지 언로드 시 정리
	window.addEventListener('beforeunload', cleanup, { once: true });

	return cleanup;
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
