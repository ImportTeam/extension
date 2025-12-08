/**
 * Content Script Loader
 * - Manifest V3 content_scripts는 ESM을 직접 선언할 수 없으므로
 *   dynamic import(chrome.runtime.getURL('content.js'))로 ESM을 로드한다.
 * - 이 파일은 Classic Script 형태를 유지해야 하므로 static import 금지.
 */

((): void => {
  const src = chrome.runtime.getURL('content.js');

  // dynamic import는 classic 스크립트에서도 동작하며, content-script 컨텍스트를 유지함
  import(src)
    .then(() => {
      console.warn('[PicSel] content.js loaded via dynamic import');
    })
    .catch((e) => {
      console.error('[PicSel] Failed to load content.js', e);
    });
})();
