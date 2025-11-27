/**
 * Content Script Loader
 * 
 * Chrome Extension Manifest V3 doesn't support ES modules directly in content_scripts.
 * This loader dynamically imports the actual content script (built as ESM).
 */

(async () => {
  const src = chrome.runtime.getURL('content.js');
  try {
    await import(src);
    console.log('[Loader] ✅ Content script loaded via ESM');
  } catch (e) {
    console.error('[Loader] ❌ Failed to load content script:', e);
  }
})();
