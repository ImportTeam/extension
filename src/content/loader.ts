/**
 * Content Script Loader
 * - Manifest V3 content_scripts는 ESM을 직접 선언할 수 없으므로
 *   dynamic import(chrome.runtime.getURL('content.js'))로 ESM을 로드한다.
 * - 이 파일은 Classic Script 형태를 유지해야 하므로 static import 금지.
 * - Logger도 사용하지 않고 console만 사용 (번들 의존성 제거)
 */

((): void => {
  const src = chrome.runtime.getURL('content.js');

  const script = document.createElement('script');
  script.type = 'module';
  script.src = src;

  script.onload = () => {
    console.warn('[PicSel] content.js loaded via injected module script');
  };

  script.onerror = (e) => {
    console.error('[PicSel] Failed to load content.js', e);
  };

  const target = document.documentElement || document.head || document.body;
  if (target) {
    target.appendChild(script);
  } else {
    console.error('[PicSel] No DOM available to inject content.js');
  }
})();
