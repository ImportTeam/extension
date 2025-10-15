import { backgroundLogger as logger } from '@/shared/logger';
import { metrics } from '@/background/metrics';

/**
 * Install/Update handler
 */
chrome.runtime.onInstalled.addListener((details) => {
  logger.info('Extension installed', { reason: details.reason });

  // Setup recurring alarm (with guard check)
  if (chrome.alarms) {
    chrome.alarms.create('processQueue', {
      periodInMinutes: 1
    });
  }

  // Setup default settings
  chrome.storage.local.set({
    settings: {
      autoRecommend: true,
      preferredCurrency: 'KRW'
    }
  });

  metrics.increment('extension.installed', {
    reason: details.reason
  });
});

/**
 * Message handler
 */
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  logger.debug('Message received', { type: msg.type });

  switch (msg.type) {
    case 'CALCULATE_PAYMENT':
      handleCalculatePayment(msg.data, sendResponse);
      return true; // Async

    case 'GET_QUEUE_STATUS':
      handleGetQueueStatus(sendResponse);
      return true;

    case 'TRIGGER_PROCESS':
      handleTriggerProcess(sendResponse);
      return true;

    default:
      logger.warn('Unknown message type', { type: msg.type });
      sendResponse({ success: false, error: 'Unknown message type' });
  }
});

/**
 * Alarm handler
 */
if (chrome.alarms) {
  chrome.alarms.onAlarm.addListener(async (alarm) => {
    logger.debug('Alarm triggered', { name: alarm.name });

    if (alarm.name === 'processQueue') {
      // TODO: Implement queue processing
      logger.info('Queue processing triggered');
      metrics.increment('alarm.processQueue');
    }
  });
}

/**
 * Handlers
 */
async function handleCalculatePayment(data: any, sendResponse: Function) {
  try {
    logger.info('Payment calculation requested', { data });
    
    // TODO: Implement payment calculation
    sendResponse({ success: true, message: 'Calculation queued' });
  } catch (err) {
    logger.error('Failed to handle payment calculation', err as Error, { data });
    sendResponse({ success: false, error: (err as Error).message });
  }
}

async function handleGetQueueStatus(sendResponse: Function) {
  try {
    // TODO: Implement queue status
    sendResponse({ success: true, status: 'Queue not implemented yet' });
  } catch (err) {
    sendResponse({ success: false, error: (err as Error).message });
  }
}

async function handleTriggerProcess(sendResponse: Function) {
  try {
    // TODO: Implement manual trigger
    sendResponse({ success: true, message: 'Process triggered' });
  } catch (err) {
    sendResponse({ success: false, error: (err as Error).message });
  }
}
