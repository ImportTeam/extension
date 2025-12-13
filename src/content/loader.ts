/**
 * Content Script Loader
 * - Manifest V3 content_scripts는 ESM을 직접 선언할 수 없으므로
 *   dynamic import(chrome.runtime.getURL('content.js'))로 ESM을 로드한다.
 * - 이 파일은 Classic Script 형태를 유지해야 하므로 static import 금지.
 * - Logger도 사용하지 않고 console만 사용 (번들 의존성 제거)
 */

((): void => {
  try {
    // Loader 자체는 content_scripts로 주입되므로(Isolated World) 여기서 chrome.runtime이 보여야 정상이다.
    // 이 로그가 안 보이거나 runtimeId가 비어있으면, 확장 프로그램이 실제로 로드/리로드되지 않은 상태일 가능성이 크다.
    console.warn('[PicSel] loader starting', {
      runtimeId: chrome?.runtime?.id,
      hasRuntime: !!chrome?.runtime,
      hasSendMessage: typeof chrome?.runtime?.sendMessage === 'function',
      href: globalThis.location?.href,
    });

    const src = chrome.runtime.getURL('content.js');

    // 레거시 방식(<script type="module" src="content.js">)으로 페이지(Main World)에 주입된 흔적이 있으면 제거한다.
    // main world에서 돌아가는 content.js는 chrome.* API를 사용할 수 없어 "Chrome extension API not available" 경고를 유발한다.
    try {
      const legacy = Array.from(document.querySelectorAll('script[src]'))
        .map((el) => el as HTMLScriptElement)
        .filter((el) => {
          const srcAttr = el.getAttribute('src') || '';
          return srcAttr.includes('/content.js') && srcAttr.includes('chrome-extension://');
        });

      if (legacy.length > 0) {
        legacy.forEach((el) => el.remove());
        console.warn('[PicSel] removed legacy injected content.js scripts', { count: legacy.length });
      }
    } catch (e) {
      console.error('[PicSel] legacy script cleanup failed', e);
    }

    // IMPORTANT:
    // - <script type="module">로 페이지(Main World)에 주입하면 chrome.* API를 사용할 수 없다.
    // - content script(Isolated World)에서 dynamic import로 로드해야 MV3 컨텍스트가 유지된다.
    import(src)
      .then(() => {
        console.warn('[PicSel] content.js loaded via dynamic import (isolated world)');
      })
      .catch((e) => {
        console.error('[PicSel] Failed to import content.js', e);
      });
  } catch (e) {
    console.error('[PicSel] Loader crashed before importing content.js', e);
  }
})();
