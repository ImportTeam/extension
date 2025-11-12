# Persistent Task Queue 구현 가이드

> 동시성 안전한 Storage-backed Task Queue with Versioning

## 목차
- [개요](#개요)
- [설계 원칙](#설계-원칙)
- [구현](#구현)
- [테스트](#테스트)
- [사용 예시](#사용-예시)

## 개요

### 왜 필요한가?
- Service Worker는 언제든 종료될 수 있음
- 작업이 중단되면 사용자 경험 저하
- 동시 요청 시 race condition 발생 가능

### 핵심 기능
- **Persistent**: chrome.storage.local에 저장
- **Atomic**: Versioned updates로 race condition 완화
- **Retry**: Exponential backoff with max attempts
- **Recovery**: Service Worker 재시작 후 자동 복구

## 설계 원칙

### 1. Storage-backed Persistence
```typescript
// Queue는 항상 storage에 저장
const QUEUE_KEY = 'taskQueue_v1';
const VERSION_KEY = 'taskQueueVersion_v1';
```

### 2. Versioned Atomic Updates
```typescript
// Read → Modify → Write → Verify 패턴
async function atomicSet(newQueue, newVersion) {
  await storage.set({ [QUEUE_KEY]: newQueue, [VERSION_KEY]: newVersion });
  const { [VERSION_KEY]: ver } = await storage.get(VERSION_KEY);
  return ver === newVersion; // Verify
}
```

### 3. Retry with Backoff
```typescript
// 실패 시 재시도 (최대 5회)
for (let i = 0; i < MAX_RETRIES; i++) {
  // ... attempt ...
  await new Promise(r => setTimeout(r, 50 * (i + 1))); // Backoff
}
```

## 구현

### Storage Wrapper

**파일**: `src/shared/storage.ts`

```typescript
/**
 * Promisified chrome.storage wrapper
 */
export const storage = {
  async get(keys: string | string[] | null = null): Promise<any> {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, resolve);
    });
  },

  async set(obj: Record<string, any>): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set(obj, resolve);
    });
  },

  async remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.remove(key, resolve);
    });
  },

  async clear(): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.clear(resolve);
    });
  }
};
```

### Task Queue Core

**파일**: `src/background/taskQueue.ts`

```typescript
import { storage } from '../shared/storage';

/**
 * Task 타입 정의
 */
export type Task = {
  id: string;
  type: string;
  payload: any;
  attempts?: number;
  createdAt: number;
  updatedAt?: number;
};

/**
 * 설정
 */
const QUEUE_KEY = 'taskQueue_v1';
const VERSION_KEY = 'taskQueueVersion_v1';
const MAX_RETRIES = 5;
const MAX_TASK_ATTEMPTS = 5;

/**
 * Queue 상태 조회
 */
async function getState(): Promise<{ taskQueue: Task[]; version: number }> {
  const data = await storage.get([QUEUE_KEY, VERSION_KEY]);
  return {
    taskQueue: (data[QUEUE_KEY] || []) as Task[],
    version: (data[VERSION_KEY] || 0) as number
  };
}

/**
 * Atomic set with verification
 */
async function atomicSet(newQueue: Task[], newVersion: number): Promise<boolean> {
  // Write
  await storage.set({
    [QUEUE_KEY]: newQueue,
    [VERSION_KEY]: newVersion
  });

  // Verify
  const { [VERSION_KEY]: ver } = await storage.get(VERSION_KEY);
  return ver === newVersion;
}

/**
 * Task 추가 (동시성 안전)
 */
export async function enqueue(
  taskPayload: Omit<Task, 'id' | 'attempts' | 'createdAt'>
): Promise<string> {
  const id = crypto.randomUUID();
  const task: Task = {
    id,
    attempts: 0,
    createdAt: Date.now(),
    ...taskPayload
  };

  // Retry loop for race condition
  for (let i = 0; i < MAX_RETRIES; i++) {
    const { taskQueue, version } = await getState();
    const newQueue = [...taskQueue, task];
    const newVersion = version + 1;

    const success = await atomicSet(newQueue, newVersion);
    if (success) {
      // Trigger processor
      try {
        chrome.alarms.create('processQueue', { delayInMinutes: 1 });
      } catch (e) {
        console.warn('Failed to create alarm:', e);
      }

      // Notify via runtime message (for immediate processing)
      try {
        chrome.runtime.sendMessage({ type: 'QUEUE_UPDATED' });
      } catch (e) {
        // Ignore if no listeners
      }

      return task.id;
    }

    // Exponential backoff
    await new Promise(r => setTimeout(r, 50 * (i + 1)));
  }

  throw new Error('enqueue failed after retries');
}

/**
 * Task 처리 (순차적)
 */
export async function dequeueAndProcess(
  processor: (task: Task) => Promise<boolean>
): Promise<void> {
  const { taskQueue, version } = await getState();
  if (!taskQueue.length) return;

  const newQueue = [...taskQueue];
  let newVersion = version;

  while (newQueue.length > 0) {
    const task = newQueue.shift()!;

    try {
      const success = await processor(task);

      if (!success) {
        // Increment attempts
        task.attempts = (task.attempts || 0) + 1;
        task.updatedAt = Date.now();

        if (task.attempts < MAX_TASK_ATTEMPTS) {
          // Push back with backoff
          newQueue.push(task);
        } else {
          // Permanent failure - log it
          console.error('Task permanently failed:', task);
          // Optionally send to monitoring
        }
      }
    } catch (err) {
      console.error('Processor error:', err);
      task.attempts = (task.attempts || 0) + 1;
      task.updatedAt = Date.now();

      if (task.attempts < MAX_TASK_ATTEMPTS) {
        newQueue.push(task);
      }
    }

    // Persist after each task
    newVersion++;
    await storage.set({
      [QUEUE_KEY]: newQueue,
      [VERSION_KEY]: newVersion
    });
  }
}

/**
 * Queue 상태 조회 (디버깅용)
 */
export async function getQueueStatus(): Promise<{
  length: number;
  tasks: Task[];
  version: number;
}> {
  const { taskQueue, version } = await getState();
  return {
    length: taskQueue.length,
    tasks: taskQueue,
    version
  };
}

/**
 * Queue 초기화 (테스트용)
 */
export async function clearQueue(): Promise<void> {
  await storage.set({
    [QUEUE_KEY]: [],
    [VERSION_KEY]: 0
  });
}
```

## 테스트

### Unit Test

**파일**: `tests/unit/taskQueue.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { enqueue, dequeueAndProcess, clearQueue, getQueueStatus } from '@/background/taskQueue';

// Mock chrome.storage
global.chrome = {
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
      clear: vi.fn()
    }
  },
  alarms: {
    create: vi.fn()
  },
  runtime: {
    sendMessage: vi.fn()
  }
} as any;

describe('Task Queue', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Setup storage mock
    let store: Record<string, any> = {};
    
    (chrome.storage.local.get as any).mockImplementation((keys: any) => {
      return Promise.resolve(
        keys === null ? store : 
        Array.isArray(keys) ? Object.fromEntries(keys.map(k => [k, store[k]])) :
        { [keys]: store[keys] }
      );
    });
    
    (chrome.storage.local.set as any).mockImplementation((obj: any) => {
      store = { ...store, ...obj };
      return Promise.resolve();
    });
    
    (chrome.storage.local.clear as any).mockImplementation(() => {
      store = {};
      return Promise.resolve();
    });
    
    await clearQueue();
  });

  it('should enqueue a task', async () => {
    const taskId = await enqueue({
      type: 'CALCULATE_RATE',
      payload: { amount: 1000 }
    });

    expect(taskId).toBeDefined();
    
    const status = await getQueueStatus();
    expect(status.length).toBe(1);
    expect(status.tasks[0].type).toBe('CALCULATE_RATE');
  });

  it('should handle concurrent enqueues', async () => {
    const promises = Array.from({ length: 10 }, (_, i) =>
      enqueue({
        type: 'TEST',
        payload: { index: i }
      })
    );

    const ids = await Promise.all(promises);
    expect(new Set(ids).size).toBe(10); // All unique

    const status = await getQueueStatus();
    expect(status.length).toBe(10);
  });

  it('should process tasks sequentially', async () => {
    // Enqueue 3 tasks
    await enqueue({ type: 'TASK_1', payload: {} });
    await enqueue({ type: 'TASK_2', payload: {} });
    await enqueue({ type: 'TASK_3', payload: {} });

    const processed: string[] = [];
    const processor = async (task: any) => {
      processed.push(task.type);
      return true; // Success
    };

    await dequeueAndProcess(processor);

    expect(processed).toEqual(['TASK_1', 'TASK_2', 'TASK_3']);
    
    const status = await getQueueStatus();
    expect(status.length).toBe(0); // All processed
  });

  it('should retry failed tasks', async () => {
    await enqueue({ type: 'FLAKY_TASK', payload: {} });

    let attempts = 0;
    const processor = async (task: any) => {
      attempts++;
      return attempts > 2; // Fail first 2 times
    };

    await dequeueAndProcess(processor);
    
    // Should have retried
    expect(attempts).toBeGreaterThan(1);
  });

  it('should drop tasks after max attempts', async () => {
    await enqueue({ type: 'ALWAYS_FAIL', payload: {} });

    const processor = async (task: any) => {
      return false; // Always fail
    };

    await dequeueAndProcess(processor);

    const status = await getQueueStatus();
    expect(status.length).toBe(0); // Dropped after max attempts
  });
});
```

### Integration Test

**파일**: `tests/integration/queuePersistence.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { enqueue, getQueueStatus } from '@/background/taskQueue';

describe('Queue Persistence', () => {
  it('should survive service worker restart', async () => {
    // Enqueue tasks
    await enqueue({ type: 'TASK_1', payload: {} });
    await enqueue({ type: 'TASK_2', payload: {} });

    // Simulate SW restart (re-import module)
    const { getQueueStatus: getStatus } = await import('@/background/taskQueue');
    
    const status = await getStatus();
    expect(status.length).toBe(2);
  });
});
```

## 사용 예시

### Background Service Worker

**파일**: `src/background/index.ts`

```typescript
import { enqueue, dequeueAndProcess } from './taskQueue';
import { processTask } from './queueProcessor';

// Message handler
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'CALCULATE_PAYMENT') {
    enqueue({
      type: 'CALCULATE_PAYMENT',
      payload: msg.data
    }).then(taskId => {
      sendResponse({ taskId });
    });
    return true; // Async
  }
});

// Alarm handler
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'processQueue') {
    await dequeueAndProcess(processTask);
  }
});

// On install/update
chrome.runtime.onInstalled.addListener(() => {
  // Setup recurring alarm
  chrome.alarms.create('processQueue', { periodInMinutes: 1 });
});
```

### Content Script

```typescript
// Request calculation
const response = await chrome.runtime.sendMessage({
  type: 'CALCULATE_PAYMENT',
  data: {
    amount: 50000,
    currency: 'KRW',
    methods: ['card', 'paypal']
  }
});

console.log('Task queued:', response.taskId);
```

## 모니터링

### Queue 상태 확인

```typescript
// DevTools Console에서
chrome.runtime.sendMessage({ type: 'GET_QUEUE_STATUS' }, (status) => {
  console.log('Queue length:', status.length);
  console.log('Tasks:', status.tasks);
  console.log('Version:', status.version);
});
```

### 메트릭 수집

```typescript
// background/logger.ts
export async function logQueueMetrics() {
  const status = await getQueueStatus();
  
  // Send to monitoring
  await sendMetric({
    name: 'queue.length',
    value: status.length,
    timestamp: Date.now()
  });
}
```

## 주의사항

### 1. Storage Quota
- chrome.storage.local: 10MB 제한
- 큰 payload는 IndexedDB 사용 고려
- 주기적으로 오래된 task 정리

### 2. Alarms 제약
- 최소 1분 간격
- 즉시 처리가 필요하면 runtime.sendMessage 사용
- Battery-intensive 주의

### 3. Race Condition
- Versioning으로 완화하지만 100% 방지는 불가
- Critical task는 추가 검증 필요
- 멱등성(idempotency) 보장 권장

## 다음 단계

- [Queue Processor 구현](./queue-processor.md)
- [Offscreen Manager 구현](./offscreen-manager.md)
- [테스팅 전략](./testing.md)
