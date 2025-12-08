/**
 * Dynamic Content Observer
 * 책임: DOM 변경 감지 및 재파싱 트리거
 * 
 * 최적화:
 * - debounce로 연속 호출 방지
 * - 필요한 경우에만 감시
 * - 조기 disconnect
 * - cleanup 함수로 메모리 누수 방지
 */

import { domLog } from '../shared/utils/logger';
import { debounce } from '../shared/utils/timing';

export type ReparseCallback = (source: string) => boolean;

/** Observer cleanup 함수 타입 */
export type CleanupFn = () => void;

// 재파싱 debounce 시간 (ms)
const REPARSE_DEBOUNCE_MS = 500;

/**
 * Dynamic Content Observer 설정
 * @param onReparse - 재파싱 콜백 함수
 * @returns cleanup 함수 - SPA 네비게이션이나 언마운트 시 호출
 */
export function setupDynamicContentObserver(onReparse: ReparseCallback): CleanupFn {
  let hasProcessedBenefits = false;
  let observer: MutationObserver | null = null;
  let isDisconnected = false;

  // debounce된 재파싱 함수
  const debouncedReparse = debounce((reason: string) => {
    // 이미 정리된 상태라면 실행하지 않음
    if (isDisconnected) return;
    
    domLog.info('Dynamic content detected', { reason });
    if (!onReparse(`dynamic-${reason}`)) {
      domLog.warn('Dynamic reparse produced no result');
    }
  }, REPARSE_DEBOUNCE_MS);

  const handleMutations = (mutations: MutationRecord[]): void => {
    // 이미 정리된 상태라면 실행하지 않음
    if (isDisconnected) return;

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
    if (hasNewIframe) {
      cleanup();
      domLog.debug('Observer disconnected after iframe detection');
    }
  };

  /**
   * Observer 정리 함수
   * - MutationObserver disconnect
   * - 참조 해제
   * - 중복 호출 방지
   */
  const cleanup: CleanupFn = () => {
    if (isDisconnected) return;
    
    isDisconnected = true;
    
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    
    domLog.debug('DynamicContentObserver cleaned up');
  };

  // document.body가 없는 경우 방어 처리
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
