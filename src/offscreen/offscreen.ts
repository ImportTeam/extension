/**
 * Offscreen Document
 *
 * Handles complex DOM parsing tasks that require a full document context
 */

import { offscreenLogger as logger } from '@/shared/logger';

/**
 * Handle messages from background script
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logger.debug('Offscreen message received', { type: message.type, sender: sender?.id });

  if (message.type === 'OFFSCREEN_TASK') {
    handleOffscreenTask(message.payload)
      .then(result => {
        logger.info('Offscreen task completed', { result });
        sendResponse({ success: true, result });
      })
      .catch(error => {
        logger.error('Offscreen task failed', error, { payload: message.payload });
        sendResponse({ success: false, error: error.message });
      });
    return true; // Async response
  }
});

/**
 * Process offscreen task
 */
async function handleOffscreenTask(payload: any) {
  logger.info('Starting offscreen task', { payload });

  // TODO: Implement complex DOM parsing
  // This could include:
  // - Complex HTML parsing
  // - Heavy computation
  // - DOM manipulation that requires full document context

  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 100));

  const result = { processed: true, payload };
  logger.debug('Offscreen task processed', { result });

  return result;
}
