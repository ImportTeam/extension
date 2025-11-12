# Offscreen Manager 구현 가이드

> Singleton Offscreen Document Manager with Internal Queue

## 목차
- [개요](#개요)
- [설계 원칙](#설계-원칙)
- [구현](#구현)
- [테스트](#테스트)
- [사용 예시](#사용-예시)

## 개요

### Offscreen API란?
- MV3에서 DOM 접근이 필요한 작업을 위한 숨겨진 페이지
- Service Worker에서는 DOM API 사용 불가
- 예: HTML parsing, Canvas 조작, Web Audio

### 제약사항
- **Single Instance**: 한 번에 하나의 offscreen document만 생성 가능
- **Reasons**: 생성 시 명확한 이유(`reasons`) 필요
- **Lifecycle**: 명시적으로 생성/종료 관리 필요

### 왜 Manager가 필요한가?
- 동시 요청 시 충돌 방지
- 작업 큐로 순차 처리
- 리소스 효율적 관리 (사용 후 즉시 종료)

## 설계 원칙

### 1. Singleton Pattern
```typescript
class OffscreenManager {
  private static instance: OffscreenManager;
  private active = false;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new OffscreenManager();
    }
    return this.instance;
  }
}
```

### 2. Internal Queue
```typescript
private queue: OffscreenTask[] = [];

async enqueue(task: OffscreenTask) {
  this.queue.push(task);
  if (!this.active) {
    await this.process();
  }
}
```

### 3. Lifecycle Management
```typescript
async process() {
  this.active = true;
  await this.createDocument();
  
  while (this.queue.length > 0) {
    await this.processTask(this.queue.shift()!);
  }
  
  await this.closeDocument();
  this.active = false;
}
```

## 구현

### Types

**파일**: `src/shared/types.ts`

```typescript
/**
 * Offscreen Task 타입
 */
export type OffscreenTask = {
  id: string;
  type: 'PARSE_HTML' | 'EXTRACT_DATA' | 'CUSTOM';
  payload: any;
  timeout?: number; // ms
};

/**
 * Offscreen Response 타입
 */
export type OffscreenResponse = {
  taskId: string;
  success: boolean;
  data?: any;
  error?: string;
};

/**
 * Offscreen Reasons
 */
export const OFFSCREEN_REASONS = {
  DOM_PARSING: chrome.offscreen.Reason.DOM_PARSING,
  IFRAME_SCRIPTING: chrome.offscreen.Reason.IFRAME_SCRIPTING,
  // Add more as needed
} as const;
```

### Offscreen Manager

**파일**: `src/background/offscreenManager.ts`

```typescript
import type { OffscreenTask, OffscreenResponse } from '../shared/types';

/**
 * Singleton Offscreen Manager
 */
class OffscreenManager {
  private static instance: OffscreenManager;
  private active = false;
  private queue: OffscreenTask[] = [];
  private pendingTasks = new Map<string, {
    resolve: (value: any) => void;
    reject: (error: Error) => void;
    timeout?: NodeJS.Timeout;
  }>();

  private constructor() {
    // Setup message listener
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.type === 'OFFSCREEN_RESPONSE') {
        this.handleResponse(msg.data as OffscreenResponse);
      }
    });
  }

  static getInstance(): OffscreenManager {
    if (!this.instance) {
      this.instance = new OffscreenManager();
    }
    return this.instance;
  }

  /**
   * Task 추가 및 처리
   */
  async enqueue(task: OffscreenTask): Promise<any> {
    return new Promise((resolve, reject) => {
      // Store promise handlers
      const timeout = task.timeout ? setTimeout(() => {
        this.pendingTasks.delete(task.id);
        reject(new Error(`Task ${task.id} timeout`));
      }, task.timeout) : undefined;

      this.pendingTasks.set(task.id, { resolve, reject, timeout });

      // Add to queue
      this.queue.push(task);

      // Start processing if not active
      if (!this.active) {
        this.process().catch(err => {
          console.error('Offscreen process error:', err);
          reject(err);
        });
      }
    });
  }

  /**
   * Queue 처리 (순차)
   */
  private async process(): Promise<void> {
    if (this.active) return;
    
    this.active = true;

    try {
      // Create offscreen document
      await this.createDocument();

      // Process all queued tasks
      while (this.queue.length > 0) {
        const task = this.queue.shift()!;
        await this.sendTaskToOffscreen(task);
      }

    } catch (err) {
      console.error('Offscreen processing error:', err);
      
      // Reject all pending tasks
      for (const [id, { reject, timeout }] of this.pendingTasks.entries()) {
        if (timeout) clearTimeout(timeout);
        reject(err as Error);
      }
      this.pendingTasks.clear();
      
    } finally {
      // Close document
      await this.closeDocument();
      this.active = false;
    }
  }

  /**
   * Offscreen document 생성
   */
  private async createDocument(): Promise<void> {
    try {
      // Check if already exists
      const existingContexts = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT' as any]
      });

      if (existingContexts.length > 0) {
        console.warn('Offscreen document already exists');
        return;
      }

      await chrome.offscreen.createDocument({
        url: 'offscreen/offscreen.html',
        reasons: [chrome.offscreen.Reason.DOM_PARSING],
        justification: 'Parse complex checkout page HTML'
      });

      // Wait for document to be ready
      await this.waitForReady();
      
    } catch (err) {
      console.error('Failed to create offscreen document:', err);
      throw err;
    }
  }

  /**
   * Offscreen document 종료
   */
  private async closeDocument(): Promise<void> {
    try {
      await chrome.offscreen.closeDocument();
    } catch (err) {
      // Ignore if already closed
      console.warn('Failed to close offscreen document:', err);
    }
  }

  /**
   * Offscreen 준비 대기
   */
  private async waitForReady(timeout = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Offscreen document ready timeout'));
      }, timeout);

      const listener = (msg: any) => {
        if (msg.type === 'OFFSCREEN_READY') {
          clearTimeout(timer);
          chrome.runtime.onMessage.removeListener(listener);
          resolve();
        }
      };

      chrome.runtime.onMessage.addListener(listener);
    });
  }

  /**
   * Task를 offscreen으로 전송
   */
  private async sendTaskToOffscreen(task: OffscreenTask): Promise<void> {
    try {
      await chrome.runtime.sendMessage({
        type: 'OFFSCREEN_TASK',
        data: task
      });
    } catch (err) {
      console.error('Failed to send task to offscreen:', err);
      
      // Reject this task
      const pending = this.pendingTasks.get(task.id);
      if (pending) {
        if (pending.timeout) clearTimeout(pending.timeout);
        pending.reject(err as Error);
        this.pendingTasks.delete(task.id);
      }
    }
  }

  /**
   * Offscreen 응답 처리
   */
  private handleResponse(response: OffscreenResponse): void {
    const pending = this.pendingTasks.get(response.taskId);
    if (!pending) {
      console.warn('No pending task for response:', response.taskId);
      return;
    }

    // Clear timeout
    if (pending.timeout) {
      clearTimeout(pending.timeout);
    }

    // Resolve or reject
    if (response.success) {
      pending.resolve(response.data);
    } else {
      pending.reject(new Error(response.error || 'Unknown error'));
    }

    this.pendingTasks.delete(response.taskId);
  }

  /**
   * Queue 상태 조회
   */
  getStatus() {
    return {
      active: this.active,
      queueLength: this.queue.length,
      pendingTasks: this.pendingTasks.size
    };
  }
}

// Export singleton instance
export const offscreenManager = OffscreenManager.getInstance();
```

### Offscreen Document

**파일**: `src/offscreen/offscreen.html`

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Offscreen Document</title>
</head>
<body>
  <script src="offscreen.js"></script>
</body>
</html>
```

**파일**: `src/offscreen/offscreen.js`

```typescript
import type { OffscreenTask, OffscreenResponse } from '../shared/types';
import DOMPurify from 'dompurify';

/**
 * Task 처리 함수들
 */
const taskHandlers = {
  /**
   * HTML 파싱
   */
  async PARSE_HTML(payload: { html: string; selector?: string }): Promise<any> {
    // Sanitize HTML
    const clean = DOMPurify.sanitize(payload.html);
    
    // Parse
    const parser = new DOMParser();
    const doc = parser.parseFromString(clean, 'text/html');
    
    // Extract data
    if (payload.selector) {
      const elements = doc.querySelectorAll(payload.selector);
      return Array.from(elements).map(el => ({
        text: el.textContent?.trim(),
        html: el.innerHTML,
        attributes: Object.fromEntries(
          Array.from(el.attributes).map(attr => [attr.name, attr.value])
        )
      }));
    }
    
    return {
      title: doc.title,
      body: doc.body.innerHTML
    };
  },

  /**
   * 데이터 추출
   */
  async EXTRACT_DATA(payload: { html: string; rules: any }): Promise<any> {
    const clean = DOMPurify.sanitize(payload.html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(clean, 'text/html');
    
    const result: Record<string, any> = {};
    
    for (const [key, rule] of Object.entries(payload.rules)) {
      const element = doc.querySelector((rule as any).selector);
      if (element) {
        result[key] = (rule as any).attribute 
          ? element.getAttribute((rule as any).attribute)
          : element.textContent?.trim();
      }
    }
    
    return result;
  },

  /**
   * Custom handler (확장 가능)
   */
  async CUSTOM(payload: any): Promise<any> {
    // Implement custom logic
    return payload;
  }
};

/**
 * Message listener
 */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'OFFSCREEN_TASK') {
    handleTask(msg.data as OffscreenTask);
  }
});

/**
 * Task 처리
 */
async function handleTask(task: OffscreenTask): Promise<void> {
  const response: OffscreenResponse = {
    taskId: task.id,
    success: false
  };

  try {
    const handler = taskHandlers[task.type];
    if (!handler) {
      throw new Error(`Unknown task type: ${task.type}`);
    }

    const data = await handler(task.payload);
    response.success = true;
    response.data = data;
    
  } catch (err) {
    response.error = (err as Error).message;
  }

  // Send response back to background
  chrome.runtime.sendMessage({
    type: 'OFFSCREEN_RESPONSE',
    data: response
  });
}

/**
 * Ready signal
 */
chrome.runtime.sendMessage({ type: 'OFFSCREEN_READY' });
```

## 테스트

### Unit Test

**파일**: `tests/unit/offscreenManager.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { offscreenManager } from '@/background/offscreenManager';

// Mock chrome APIs
global.chrome = {
  offscreen: {
    createDocument: vi.fn(),
    closeDocument: vi.fn(),
    Reason: { DOM_PARSING: 'DOM_PARSING' }
  },
  runtime: {
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    },
    getContexts: vi.fn()
  }
} as any;

describe('Offscreen Manager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (chrome.runtime.getContexts as any).mockResolvedValue([]);
  });

  it('should create singleton instance', () => {
    const instance1 = offscreenManager;
    const instance2 = offscreenManager;
    expect(instance1).toBe(instance2);
  });

  it('should enqueue and process task', async () => {
    // Mock offscreen ready
    setTimeout(() => {
      const listener = (chrome.runtime.onMessage.addListener as any).mock.calls[0][0];
      listener({ type: 'OFFSCREEN_READY' });
    }, 10);

    // Mock task response
    setTimeout(() => {
      const listener = (chrome.runtime.onMessage.addListener as any).mock.calls[0][0];
      listener({
        type: 'OFFSCREEN_RESPONSE',
        data: {
          taskId: 'test-id',
          success: true,
          data: { result: 'parsed' }
        }
      });
    }, 50);

    const result = await offscreenManager.enqueue({
      id: 'test-id',
      type: 'PARSE_HTML',
      payload: { html: '<div>test</div>' }
    });

    expect(result).toEqual({ result: 'parsed' });
    expect(chrome.offscreen.createDocument).toHaveBeenCalled();
    expect(chrome.offscreen.closeDocument).toHaveBeenCalled();
  });

  it('should handle timeout', async () => {
    setTimeout(() => {
      const listener = (chrome.runtime.onMessage.addListener as any).mock.calls[0][0];
      listener({ type: 'OFFSCREEN_READY' });
    }, 10);

    // No response - should timeout
    await expect(
      offscreenManager.enqueue({
        id: 'timeout-id',
        type: 'PARSE_HTML',
        payload: {},
        timeout: 100
      })
    ).rejects.toThrow('timeout');
  });

  it('should process tasks sequentially', async () => {
    const processed: string[] = [];

    // Mock responses
    setTimeout(() => {
      const listener = (chrome.runtime.onMessage.addListener as any).mock.calls[0][0];
      listener({ type: 'OFFSCREEN_READY' });
      
      // Respond to tasks in order
      ['task-1', 'task-2', 'task-3'].forEach((id, i) => {
        setTimeout(() => {
          processed.push(id);
          listener({
            type: 'OFFSCREEN_RESPONSE',
            data: { taskId: id, success: true, data: {} }
          });
        }, 50 * (i + 1));
      });
    }, 10);

    await Promise.all([
      offscreenManager.enqueue({ id: 'task-1', type: 'PARSE_HTML', payload: {} }),
      offscreenManager.enqueue({ id: 'task-2', type: 'PARSE_HTML', payload: {} }),
      offscreenManager.enqueue({ id: 'task-3', type: 'PARSE_HTML', payload: {} })
    ]);

    expect(processed).toEqual(['task-1', 'task-2', 'task-3']);
  });
});
```

## 사용 예시

### Background에서 사용

**파일**: `src/background/index.ts`

```typescript
import { offscreenManager } from './offscreenManager';

// Message handler
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'PARSE_CHECKOUT_PAGE') {
    offscreenManager.enqueue({
      id: crypto.randomUUID(),
      type: 'PARSE_HTML',
      payload: {
        html: msg.html,
        selector: '.payment-method'
      },
      timeout: 10000 // 10s
    })
    .then(result => {
      sendResponse({ success: true, data: result });
    })
    .catch(err => {
      sendResponse({ success: false, error: err.message });
    });
    
    return true; // Async
  }
});
```

### Content Script에서 요청

```typescript
// Get page HTML
const html = document.documentElement.outerHTML;

// Request parsing
const response = await chrome.runtime.sendMessage({
  type: 'PARSE_CHECKOUT_PAGE',
  html: html
});

if (response.success) {
  console.log('Parsed data:', response.data);
}
```

## 주의사항

### 1. Single Instance 제약
- 동시에 하나의 offscreen document만 생성 가능
- Manager가 자동으로 순차 처리
- 긴 작업은 timeout 설정 필수

### 2. Lifecycle 관리
- 사용 후 즉시 종료 (리소스 절약)
- 재사용 시 재생성 필요
- Ready signal 대기 필수

### 3. 보안
- DOMPurify로 HTML sanitize
- Trusted Types 고려
- CSP 준수

## 다음 단계

- [Parser 전략](./parser-strategy.md)
- [Content Script 구현](./content-script.md)
- [테스팅 전략](./testing.md)
