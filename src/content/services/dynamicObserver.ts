/**
 * Dynamic Content Observer
 * 책임: DOM 변경 감지 및 재파싱 트리거
 */

import { domLog } from '@/shared/utils/logger';
import { debounce } from '@/shared/utils/timing';

export type ReparseCallback = (source: string) => boolean;
export type CleanupFn = () => void;

const REPARSE_DEBOUNCE_MS = 500;

export function setupDynamicContentObserver(onReparse: ReparseCallback): CleanupFn {
	let hasProcessedBenefits = false;
	let observer: MutationObserver | null = null;
	let isDisconnected = false;

	const debouncedReparse = debounce((reason: string) => {
		if (isDisconnected) return;

		domLog.info('Dynamic content detected', { reason });
		if (!onReparse(`dynamic-${reason}`)) {
			domLog.warn('Dynamic reparse produced no result');
		}
	}, REPARSE_DEBOUNCE_MS);

	const handleMutations = (mutations: MutationRecord[]): void => {
		if (isDisconnected) return;

		const hasNewIframe = mutations.some((mutation) =>
			Array.from(mutation.addedNodes).some((node) =>
				node instanceof Element
					? node.tagName === 'IFRAME' || Boolean(node.querySelector('iframe'))
					: false
			)
		);

		const hasBenefitContent =
			!hasProcessedBenefits &&
			mutations.some((mutation) =>
				Array.from(mutation.addedNodes).some((node) => {
					if (!(node instanceof Element)) return false;
					return (
						node.classList.contains('benefit') ||
						Boolean(node.querySelector('.benefit')) ||
						(node.closest('.other_benefits') && (node.querySelector('dt') || node.querySelector('dd')))
					);
				})
			);

		const benefitElement = document.querySelector('.other_benefits .benefit dt');
		const shouldReparse = (hasBenefitContent && benefitElement) || hasNewIframe;
		if (!shouldReparse) return;

		if (hasBenefitContent) {
			hasProcessedBenefits = true;
		}

		const reason = hasNewIframe ? 'iframe' : 'benefit-content';
		debouncedReparse(reason);

		if (hasNewIframe) {
			cleanup();
			domLog.debug('Observer disconnected after iframe detection');
		}
	};

	const cleanup: CleanupFn = () => {
		if (isDisconnected) return;
		isDisconnected = true;

		if (observer) {
			observer.disconnect();
			observer = null;
		}

		domLog.debug('DynamicContentObserver cleaned up');
	};

	if (!document.body) {
		domLog.warn('document.body not available, observer not started');
		return cleanup;
	}

	observer = new MutationObserver(handleMutations);
	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});

	return cleanup;
}
