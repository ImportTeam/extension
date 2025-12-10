/**
 * Content Script Loader
 * - Manifest V3 content_scripts는 ESM을 직접 선언할 수 없으므로
 *   dynamic import(chrome.runtime.getURL('content.js'))로 ESM을 로드한다.
 * - 이 파일은 Classic Script 형태를 유지해야 하므로 static import 금지.
 */

import { extLog, ErrorCode } from '@/shared/utils/logger';

((): void => {
  const src = chrome.runtime.getURL('content.js');

  const script = document.createElement('script');
  script.type = 'module';
  script.src = src;

  script.onload = () => {
    extLog.info('📦 content.js loaded via injected module script');
  };

  script.onerror = (e) => {
    extLog.error(ErrorCode.EXT_E001, 'Failed to load content.js', {
      error: e instanceof Error ? e : new Error(String(e)),
    });
  };

  const target = document.documentElement || document.head || document.body;
  if (target) {
    target.appendChild(script);
  } else {
    extLog.error(ErrorCode.EXT_E001, 'No DOM available to inject content.js');
  }
})();
