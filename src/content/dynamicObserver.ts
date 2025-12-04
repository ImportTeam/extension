/**
 * Dynamic Content Observer
 * 책임: DOM 변경 감지 및 재파싱 트리거
 */

import { domLog } from '../shared/utils/logger';

export type ReparseCallback = (source: string) => boolean;

export function setupDynamicContentObserver(onReparse: ReparseCallback): void {
  let hasProcessedBenefits = false;

  const observer = new MutationObserver((mutations) => {
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
    domLog.info(`Dynamic content detected`, { reason });

    setTimeout(() => {
      if (!onReparse(`dynamic-${reason}`)) {
        domLog.warn('Dynamic reparse produced no result');
      }
    }, 500);

    if (hasNewIframe) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
