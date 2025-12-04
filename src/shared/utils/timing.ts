/**
 * Debounce & Throttle 유틸리티
 * 
 * 심플하고 실용적인 버전
 */

export interface DebouncedFn<T extends (...args: Parameters<T>) => void> {
  (...args: Parameters<T>): void;
  cancel(): void;
}

/**
 * Debounce - 연속 호출 시 마지막 호출만 실행
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  wait: number
): DebouncedFn<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>): void => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, wait);
  };

  debounced.cancel = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

/**
 * Throttle - 일정 시간 내 한 번만 실행
 */
export function throttle<T extends (...args: Parameters<T>) => void>(
  fn: T,
  limit: number
): DebouncedFn<T> {
  let inThrottle = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = (...args: Parameters<T>): void => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      timeoutId = setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };

  throttled.cancel = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    inThrottle = false;
  };

  return throttled;
}

/**
 * Delay - Promise 기반 지연
 */
export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));
