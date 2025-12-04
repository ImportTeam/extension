/**
 * Content Script Loader
 * 
 * Chrome Extension Manifest V3 doesn't support ES modules directly in content_scripts.
 * This loader dynamically imports the actual content script (built as ESM).
 */

import { bootstrapLog, ErrorCode } from '../shared/utils/logger';

(async (): Promise<void> => {
  const src = chrome.runtime.getURL('content.js');
  try {
    await import(src);
    bootstrapLog.info('Content script loaded via ESM');
  } catch (e) {
    bootstrapLog.error(ErrorCode.BST_E001, 'Failed to load content script', {
      error: e instanceof Error ? e : new Error(String(e)),
    });
  }
})();
