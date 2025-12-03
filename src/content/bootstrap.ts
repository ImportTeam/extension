/**
 * Content Script Bootstrap
 * 책임: iframe 체크 및 DOMContentLoaded 대기
 */

export const isMainFrame = window.self === window.top;

export function bootstrap(runner: () => void): void {
  if (!isMainFrame) {
    console.debug('[ContentScript] Skipping iframe context');
    return;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runner);
  } else {
    runner();
  }
}
