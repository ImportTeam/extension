/**
 * Dynamic Content Observer
 * 책임: DOM 변경 감지 및 재파싱 트리거
 * 
 * 최적화:
 * - debounce로 연속 호출 방지
 * - 필요한 경우에만 감시
 * - 조기 disconnect
 */

import { domLog } from '../shared/utils/logger';
import { debounce } from '../shared/utils/timing';

export type ReparseCallback = (source: string) => boolean;

// 재파싱 debounce 시간 (ms)
const REPARSE_DEBOUNCE_MS = 500;

export function setupDynamicContentObserver(onReparse: ReparseCallback): void {
  let hasProcessedBenefits = false;
  let observer: MutationObserver | null = null;

  // debounce된 재파싱 함수
  const debouncedReparse = debounce((reason: string) => {
    domLog.info('Dynamic content detected', { reason });
    if (!onReparse(`dynamic-${reason}`)) {
      domLog.warn('Dynamic reparse produced no result');
    }
  }, REPARSE_DEBOUNCE_MS);

  const handleMutations = (mutations: MutationRecord[]): void => {
    // iframe 추가 감지
    const hasNewIframe = mutations.some((mutation) =>
      Array.from(mutation.addedNodes).some((node) =>
        node instanceof Element
          ? node.tagName === 'IFRAME' || Boolean(node.querySelector('iframe'))
          : false
      )
    );

    // 혜택 콘텐츠 추가 감지 (한 번만)
    const hasBenefitContent =
      !hasProcessedBenefits &&
      mutations.some((mutation) =>
        Array.from(mutation.addedNodes).some((node) => {
          if (!(node instanceof Element)) return false;
          return (
            node.classList.contains('benefit') ||
            Boolean(node.querySelector('.benefit')) ||
            (node.closest('.other_benefits') &&
              (node.querySelector('dt') || node.querySelector('dd')))
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

    // iframe 감지 후 disconnect (더 이상 감시 불필요)
    if (hasNewIframe && observer) {
      observer.disconnect();
      observer = null;
      domLog.debug('Observer disconnected after iframe detection');
    }
  };

  observer = new MutationObserver(handleMutations);

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
