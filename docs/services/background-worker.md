# Background Service Worker 구현 가이드

> MV3 Service Worker 아키텍처 및 메시지 처리

## 목차
- [개요](#개요)
- [Entry Point](#entry-point)
- [메시지 핸들러](#메시지-핸들러)
- [Alarms](#alarms)
- [Rate Engine](#rate-engine)

## 개요

### 역할
- 메시지 라우팅
- Task Queue 관리
- 환율 계산 및 캐싱
- 추천 로직 실행

### 제약사항
- Service Worker 수명: 30초 idle 후 종료
- Alarms: 최소 1분 간격
- Storage: 10MB 제한

## Entry Point

**파일**: `src/background/index.ts`

```typescript
import { enqueue, dequeueAndProcess } from './taskQueue';
import { offscreenManager } from './offscreenManager';
import { processTask } from './queueProcessor';
import { logger } from './logger';
import { metrics } from './metrics';

/**
 * Install/Update handler
 */
chrome.runtime.onInstalled.addListener((details) => {
  logger.info('Extension installed', { reason: details.reason });

  // Setup recurring alarm
  chrome.alarms.create('processQueue', {
    periodInMinutes: 1
  });

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
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
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
chrome.alarms.onAlarm.addListener(async (alarm) => {
  logger.debug('Alarm triggered', { name: alarm.name });

  if (alarm.name === 'processQueue') {
    await dequeueAndProcess(processTask);
    metrics.increment('alarm.processQueue');
  }
});

/**
 * Handlers
 */
async function handleCalculatePayment(data: any, sendResponse: Function) {
  try {
    const taskId = await enqueue({
      type: 'CALCULATE_PAYMENT',
      payload: data
    });

    logger.info('Payment calculation queued', { taskId });
    metrics.increment('task.enqueued', { type: 'CALCULATE_PAYMENT' });

    sendResponse({ success: true, taskId });
  } catch (err) {
    logger.error('Failed to enqueue task', { error: (err as Error).message });
    sendResponse({ success: false, error: (err as Error).message });
  }
}

async function handleGetQueueStatus(sendResponse: Function) {
  const { getQueueStatus } = await import('./taskQueue');
  const status = await getQueueStatus();
  sendResponse(status);
}

async function handleTriggerProcess(sendResponse: Function) {
  await dequeueAndProcess(processTask);
  sendResponse({ success: true });
}
```

## 메시지 핸들러

### Queue Processor

**파일**: `src/background/queueProcessor.ts`

```typescript
import type { Task } from './taskQueue';
import { calculateRecommendation } from './recommendationEngine';
import { logger } from './logger';
import { metrics } from './metrics';

/**
 * Process a single task
 */
export async function processTask(task: Task): Promise<boolean> {
  const start = Date.now();

  try {
    logger.info('Processing task', { id: task.id, type: task.type });

    switch (task.type) {
      case 'CALCULATE_PAYMENT':
        await processCalculatePayment(task);
        break;

      default:
        logger.warn('Unknown task type', { type: task.type });
        return false;
    }

    metrics.timing('task.duration', Date.now() - start, { type: task.type });
    metrics.increment('task.success', { type: task.type });

    return true;

  } catch (err) {
    logger.error('Task processing failed', {
      id: task.id,
      type: task.type,
      error: (err as Error).message
    });

    metrics.increment('task.error', { type: task.type });
    return false;
  }
}

/**
 * Process payment calculation
 */
async function processCalculatePayment(task: Task) {
  const { amount, currency, methods, url } = task.payload;

  // Calculate recommendation
  const recommendation = await calculateRecommendation({
    amount,
    currency,
    methods
  });

  // Store result
  await chrome.storage.local.set({
    [`recommendation_${task.id}`]: recommendation
  });

  // Notify content script
  const tabs = await chrome.tabs.query({ url: url });
  if (tabs.length > 0) {
    chrome.tabs.sendMessage(tabs[0].id!, {
      type: 'UPDATE_RECOMMENDATION',
      data: recommendation
    });
  }

  logger.info('Recommendation calculated', {
    taskId: task.id,
    method: recommendation.method
  });
}
```

## Alarms

### 설정

```typescript
// One-time alarm
chrome.alarms.create('myAlarm', {
  delayInMinutes: 1
});

// Recurring alarm
chrome.alarms.create('processQueue', {
  periodInMinutes: 1
});

// Clear alarm
chrome.alarms.clear('myAlarm');
```

### 핸들러

```typescript
chrome.alarms.onAlarm.addListener(async (alarm) => {
  switch (alarm.name) {
    case 'processQueue':
      await dequeueAndProcess(processTask);
      break;

    case 'refreshRates':
      await refreshExchangeRates();
      break;
  }
});
```

## Rate Engine

**파일**: `src/background/rateEngine/index.ts`

```typescript
import { logger } from '../logger';
import { metrics } from '../metrics';

type ExchangeRates = {
  [currency: string]: number;
  timestamp: number;
};

const CACHE_TTL = 3600000; // 1 hour

/**
 * Get exchange rates (with caching)
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
  // Check cache
  const cached = await getCachedRates();
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    logger.debug('Using cached rates');
    metrics.increment('rates.cache.hit');
    return cached;
  }

  // Fetch fresh rates
  try {
    const rates = await fetchRates();
    await cacheRates(rates);
    
    logger.info('Rates fetched', { timestamp: rates.timestamp });
    metrics.increment('rates.fetch.success');
    
    return rates;

  } catch (err) {
    logger.error('Failed to fetch rates', { error: (err as Error).message });
    metrics.increment('rates.fetch.error');

    // Fallback to cached (even if expired)
    if (cached) {
      logger.warn('Using expired cache as fallback');
      return cached;
    }

    // Last resort: hardcoded fallback
    return getFallbackRates();
  }
}

/**
 * Fetch rates from API
 */
async function fetchRates(): Promise<ExchangeRates> {
  const response = await fetch('https://api.example.com/rates');
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  
  return {
    ...data.rates,
    timestamp: Date.now()
  };
}

/**
 * Cache rates
 */
async function cacheRates(rates: ExchangeRates): Promise<void> {
  await chrome.storage.local.set({ exchangeRates: rates });
}

/**
 * Get cached rates
 */
async function getCachedRates(): Promise<ExchangeRates | null> {
  const { exchangeRates } = await chrome.storage.local.get('exchangeRates');
  return exchangeRates || null;
}

/**
 * Fallback rates (hardcoded)
 */
function getFallbackRates(): ExchangeRates {
  return {
    USD: 1300,
    EUR: 1400,
    JPY: 9,
    timestamp: Date.now()
  };
}
```

## 다음 단계

- [Task Queue 구현](./task-queue.md)
- [테스팅 전략](./testing.md)
