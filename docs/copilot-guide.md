# GitHub Copilot 스타일 개발 지침서

> PayWise Production-grade Chrome Extension  
> 코드 자동완성 도구로 정확히 구현 가능한 절대적 지침서

## 목적

확장 프로그램 개발자가 **GitHub Copilot** 또는 다른 코드 자동완성 도구로도 정확히 따라 구현할 수 있도록, 모든 설계·코드·검증 지침을 명확·절대적 문장으로 정리했습니다.

이 문서는 **직접 복사/붙여넙기** 해서 리포지토리에 바로 적용 가능한:
- 파일 목록
- 코드 스니펫
- 테스트/CI 설정
- QA 체크리스트

를 포함합니다.

---

## 📁 리포지토리 구조 (정확한 파일/경로)

```
paywise/
├─ src/
│  ├─ background/
│  │  ├─ index.ts
│  │  ├─ taskQueue.ts
│  │  ├─ queueProcessor.ts
│  │  ├─ offscreenManager.ts
│  │  ├─ taskHandlers.ts
│  │  ├─ logger.ts
│  │  ├─ metrics.ts
│  │  └─ rateEngine/
│  │     ├─ index.ts
│  │     ├─ cache.ts
│  │     └─ calculator.ts
│  ├─ content/
│  │  ├─ index.ts
│  │  ├─ overlay.tsx
│  │  └─ parsers/
│  │     ├─ baseParser.ts
│  │     ├─ coupangParser.ts
│  │     ├─ naverParser.ts
│  │     ├─ gmarketParser.ts
│  │     └─ fallbackParser.ts
│  ├─ popup/
│  │  ├─ index.html
│  │  ├─ App.tsx
│  │  ├─ components/
│  │  └─ store/
│  │     └─ index.ts
│  ├─ options/
│  │  ├─ index.html
│  │  └─ App.tsx
│  ├─ offscreen/
│  │  ├─ offscreen.html
│  │  └─ offscreen.ts
│  ├─ shared/
│  │  ├─ storage.ts
│  │  ├─ types.ts
│  │  ├─ messaging.ts
│  │  └─ utils.ts
│  └─ manifest.json
├─ tests/
│  ├─ unit/
│  │  ├─ taskQueue.test.ts
│  │  ├─ parsers.test.ts
│  │  └─ storage.test.ts
│  ├─ integration/
│  │  └─ queuePersistence.test.ts
│  └─ e2e/
│     ├─ playwright.config.ts
│     └─ extension.spec.ts
├─ fixtures/
│  └─ html/
│     ├─ coupang-checkout.html
│     └─ naver-checkout.html
├─ scripts/
│  ├─ build.sh
│  └─ deploy.sh
├─ .github/
│  ├─ workflows/
│  │  ├─ ci.yml
│  │  ├─ release.yml
│  │  └─ test.yml
│  └─ PULL_REQUEST_TEMPLATE.md
├─ vite.config.ts
├─ vitest.config.ts
├─ playwright.config.ts
├─ tsconfig.json
├─ package.json
├─ pnpm-lock.yaml
├─ .eslintrc.json
├─ .prettierrc
└─ README.md
```

---

## 🔒 규칙 및 코딩 스타일 (Copilot 프롬프트로 쓸 규칙)

### 절대 규칙 (MUST)

1. **TypeScript strict mode 필수**
   - `tsconfig.json`에서 `strict: true` 설정
   - 모든 타입은 명시적으로 선언
   - `any` 사용 금지 (불가피한 경우 `unknown` 사용 후 type guard)

2. **Storage 접근 규칙**
   - 모든 async storage access는 `shared/storage.ts`의 wrapper를 통해서만 사용
   - **절대 직접 `chrome.storage`를 호출하지 마라**
   - Copilot이 storage 코드를 생성하면 반드시 wrapper import 확인

3. **Background 작업 규칙**
   - 모든 background 작업은 **반드시 taskQueue에 enqueue 후 처리**
   - Content script는 **절대 복잡한 계산/네트워크를 직접 수행하지 말 것**
   - 즉시 처리가 필요한 경우에만 runtime.sendMessage 직접 사용

4. **API Key 보안**
   - API Key는 **절대 리포지토리에 넣지 마라**
   - 환경변수 또는 backend에 보관
   - Copilot에게 **절대 하드코딩하지 말라고 주석으로 명시**
   - 예: `// NEVER hardcode API keys - use environment variables or backend`

5. **입력 Sanitization**
   - 모든 외부 입력(HTML, 텍스트)은 **DOMPurify로 sanitize**
   - Copilot이 HTML 마운트 코드를 생성할 때 이 단계를 누락하면 **오류로 간주**
   - Shadow DOM 사용 시에도 sanitize 필수

6. **로깅 규칙**
   - 모든 로그 전송은 **PII 마스킹 후 배치 전송**
   - Copilot이 로깅 코드를 생성하면 `maskSensitive()` 유틸 호출을 포함시켜라
   - Critical error는 즉시 전송, 일반 로그는 배치

7. **Queue 구현 규칙**
   - `enqueue()` 구현은 **versioned-atomic 방식**으로 구현
   - Race condition 허용하지 말 것
   - 최대 5회 재시도 with exponential backoff

8. **Offscreen 사용 규칙**
   - Offscreen document는 **singleton manager로 직렬화**
   - Copilot이 offscreen 사용 코드를 만들면 **manager 호출을 통해서만** 생성/요청하도록 강제
   - 직접 `chrome.offscreen.createDocument()` 호출 금지

### 권장 사항 (SHOULD)

- ESLint + Prettier 사용
- 함수는 단일 책임 원칙 준수
- 주석은 JSDoc 형식으로 작성
- 에러 처리는 명시적으로 (try-catch)
- 테스트 커버리지 80% 이상 유지

---

## 📝 핵심 코드 템플릿 (복사해서 사용 가능)

### 1. Storage Wrapper

**파일**: `src/shared/storage.ts`

```typescript
/**
 * Chrome Storage Wrapper
 * 
 * 반드시 이 파일을 통해서만 chrome.storage.local 접근.
 * 모든 함수는 Promise 반환.
 * 
 * 사용 시: import { storage } from '../shared/storage';
 */

export const storage = {
  /**
   * Get items from storage
   * @param keys - Key or array of keys to retrieve (null for all)
   */
  async get(keys: string | string[] | null = null): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        chrome.storage.local.get(keys, (result) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  },

  /**
   * Set items in storage
   * @param obj - Object with key-value pairs to store
   */
  async set(obj: Record<string, any>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.local.set(obj, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  },

  /**
   * Remove item from storage
   * @param key - Key to remove
   */
  async remove(key: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.local.remove(key, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  },

  /**
   * Clear all items from storage
   */
  async clear(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.local.clear(() => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
};
```

### 2. Task Queue (Versioned Atomic)

**파일**: `src/background/taskQueue.ts`

```typescript
import { storage } from '../shared/storage';
import type { Task } from '../shared/types';

const QUEUE_KEY = 'taskQueue_v1';
const VERSION_KEY = 'taskQueueVersion_v1';
const MAX_RETRIES = 5;
const MAX_TASK_ATTEMPTS = 5;

/**
 * Get current queue state
 */
async function getState(): Promise<{ taskQueue: Task[]; version: number }> {
  const res = await storage.get([QUEUE_KEY, VERSION_KEY]);
  return {
    taskQueue: (res[QUEUE_KEY] || []) as Task[],
    version: (res[VERSION_KEY] || 0) as number
  };
}

/**
 * Enqueue task with optimistic versioning (atomic)
 * 
 * This function implements versioned-atomic enqueue to prevent race conditions.
 * It retries up to MAX_RETRIES times with exponential backoff.
 * 
 * @param payload - Task payload (without id, attempts, createdAt)
 * @returns Task ID
 * @throws Error if enqueue fails after all retries
 */
export async function enqueueTask(
  payload: Omit<Task, 'id' | 'attempts' | 'createdAt'>
): Promise<string> {
  const id = crypto.randomUUID();
  const task: Task = {
    id,
    attempts: 0,
    createdAt: Date.now(),
    ...payload
  };

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const { taskQueue, version } = await getState();
    const newQueue = [...taskQueue, task];
    const newVersion = version + 1;

    // Write
    await storage.set({
      [QUEUE_KEY]: newQueue,
      [VERSION_KEY]: newVersion
    });

    // Verify (optimistic locking)
    const verify = await storage.get(VERSION_KEY);
    if (verify[VERSION_KEY] === newVersion) {
      // Success - schedule processor
      try {
        chrome.alarms.create('processQueue', { delayInMinutes: 1 });
      } catch (e) {
        // Alarms permission might not be granted
        console.warn('Failed to create alarm:', e);
      }

      return task.id;
    }

    // Conflict - retry with backoff
    await new Promise(r => setTimeout(r, 50 * (attempt + 1)));
  }

  throw new Error('enqueueTask failed after retries');
}

/**
 * Process queue in FIFO order
 * 
 * Processes tasks sequentially and persists state after each task.
 * Failed tasks are retried up to MAX_TASK_ATTEMPTS times.
 * 
 * @param processor - Function to process each task
 */
export async function processQueue(
  processor: (task: Task) => Promise<boolean>
): Promise<void> {
  const { taskQueue } = await getState();
  if (!taskQueue.length) return;

  // Process in FIFO order, persist after each pop to avoid data loss
  while (true) {
    const state = await getState();
    const queue = state.taskQueue;
    if (!queue.length) break;

    const task = queue.shift();
    if (!task) break;

    try {
      const ok = await processor(task);
      
      if (!ok) {
        // Increment attempts
        task.attempts = (task.attempts || 0) + 1;
        
        if (task.attempts < MAX_TASK_ATTEMPTS) {
          // Retry - push back to queue
          queue.push(task);
        } else {
          // Permanent failure - log and drop
          console.error('Task permanently failed:', task);
          // TODO: Send to monitoring
        }
      }

      // Persist state
      const newVer = state.version + 1;
      await storage.set({
        [QUEUE_KEY]: queue,
        [VERSION_KEY]: newVer
      });

    } catch (e) {
      // On error, increment attempts and persist
      console.error('Task processing error:', e);
      task.attempts = (task.attempts || 0) + 1;
      
      if (task.attempts < MAX_TASK_ATTEMPTS) {
        queue.push(task);
      }

      const newVer = state.version + 1;
      await storage.set({
        [QUEUE_KEY]: queue,
        [VERSION_KEY]: newVer
      });
    }
  }
}

/**
 * Get queue status (for debugging)
 */
export async function getQueueStatus() {
  const { taskQueue, version } = await getState();
  return {
    length: taskQueue.length,
    tasks: taskQueue,
    version
  };
}

/**
 * Clear queue (for testing)
 */
export async function clearQueue(): Promise<void> {
  await storage.set({
    [QUEUE_KEY]: [],
    [VERSION_KEY]: 0
  });
}
```

### 3. Queue Processor

**파일**: `src/background/queueProcessor.ts`

```typescript
import { processQueue } from './taskQueue';
import { handleTask } from './taskHandlers';

/**
 * Alarms handler
 * Processes queue when alarm triggers
 */
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'processQueue') {
    await processQueue(handleTask);
  }
});

/**
 * OnConnect keepalive (optional - use sparingly)
 * 
 * WARNING: This can impact battery life and may be flagged by Chrome Web Store.
 * Only use if immediate processing is critical.
 */
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'keepalive') {
    port.onMessage.addListener(async (msg) => {
      if (msg === 'ping') {
        await processQueue(handleTask);
      }
    });
  }
});

/**
 * Manual trigger via message
 * Allows content scripts to trigger queue processing
 */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === 'TRIGGER_PROCESS') {
    processQueue(handleTask)
      .then(() => sendResponse({ ok: true }))
      .catch((err) => sendResponse({ ok: false, error: err.message }));
    return true; // Async response
  }
});
```

### 4. Offscreen Manager (Singleton)

**파일**: `src/background/offscreenManager.ts`

```typescript
/**
 * Offscreen Manager (Singleton)
 * 
 * Manages offscreen document lifecycle and queues tasks for sequential processing.
 * Only one offscreen document can exist at a time (Chrome limitation).
 */
class OffscreenManager {
  private active = false;
  private queue: any[] = [];

  /**
   * Enqueue task for offscreen processing
   * 
   * Tasks are processed sequentially. If no offscreen document is active,
   * processing starts immediately.
   * 
   * @param task - Task to process in offscreen context
   */
  async enqueue(task: any): Promise<void> {
    this.queue.push(task);
    if (!this.active) {
      await this.process();
    }
  }

  /**
   * Process queued tasks
   * 
   * Creates offscreen document, processes all queued tasks, then closes document.
   */
  private async process(): Promise<void> {
    this.active = true;

    try {
      // Create offscreen document
      await chrome.offscreen.createDocument({
        url: 'offscreen/offscreen.html',
        reasons: [chrome.offscreen.Reason.DOM_PARSING],
        justification: 'Complex parse for checkout pages'
      });

      // Process all queued tasks
      while (this.queue.length) {
        const task = this.queue.shift();
        
        // Send message to offscreen and wait for ack
        // TODO: Implement timeout/retry logic
        await chrome.runtime.sendMessage({
          type: 'OFFSCREEN_TASK',
          payload: task
        });
      }

    } catch (err) {
      console.error('Offscreen processing error:', err);
      // Re-queue failed tasks
      // TODO: Implement retry logic
      
    } finally {
      // Close offscreen document
      try {
        await chrome.offscreen.closeDocument();
      } catch (e) {
        console.warn('Failed to close offscreen:', e);
      }
      
      this.active = false;
    }
  }
}

/**
 * Singleton instance
 * ALWAYS use this instance - never create new OffscreenManager()
 */
export const offscreenManager = new OffscreenManager();
```

### 5. Content Script Overlay (Shadow DOM + DOMPurify)

**파일**: `src/content/overlay.tsx`

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import DOMPurify from 'dompurify';

/**
 * Mount overlay with Shadow DOM isolation
 * 
 * CRITICAL: Always sanitize HTML with DOMPurify before rendering.
 * Shadow DOM mode is 'closed' for security.
 */
export function mountOverlay(): void {
  const container = document.createElement('div');
  container.id = 'paywise-root';
  
  // Attach Shadow DOM (closed mode for security)
  const shadow = container.attachShadow({ mode: 'closed' });
  
  // Reset all styles to prevent page interference
  const style = document.createElement('style');
  style.textContent = `
    :host {
      all: initial;
      display: block;
    }
    * {
      all: unset;
    }
  `;
  shadow.appendChild(style);
  
  // Create mount point
  const mount = document.createElement('div');
  shadow.appendChild(mount);
  
  // Append to body
  document.body.appendChild(container);
  
  // Render React app
  const root = ReactDOM.createRoot(mount);
  root.render(<App sandboxed={true} />);
}

/**
 * Sanitize HTML with DOMPurify
 * 
 * ALWAYS use this function before rendering any external HTML.
 * 
 * @param html - Untrusted HTML string
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target']
  });
}
```

---

## 📋 Types (정확한 타입 정의)

**파일**: `src/shared/types.ts`

```typescript
/**
 * Task type for queue
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
 * Parsed checkout data
 */
export type ParsedData = {
  amount: number;
  currency: string;
  methods: string[];
  confidence: number; // 0-1
  metadata?: Record<string, any>;
};

/**
 * Exchange rates
 */
export type ExchangeRates = {
  [currency: string]: number;
  timestamp: number;
};

/**
 * Recommendation result
 */
export type Recommendation = {
  method: string;
  savings: number;
  confidence: number;
  details?: string;
};
```

---

## 다음 문서

- [코드 템플릿 상세](./code-templates.md)
- [Copilot 프롬프트 가이드](./copilot-prompts.md)
- [테스트 전략](./testing.md)
