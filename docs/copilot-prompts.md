# Copilot 프롬프트 가이드

> GitHub Copilot에게 정확한 코드를 생성시키는 프롬프트 모음

## 사용법

각 프롬프트를 **주석으로 작성**하면 Copilot이 자동으로 코드를 생성합니다.  
프롬프트는 **구체적이고 명확**해야 합니다.

---

## Task Queue 관련

### Enqueue 함수 생성

```typescript
/**
 * Generate a TypeScript function 'enqueueTask' that:
 * 1. Takes a task payload (without id, attempts, createdAt)
 * 2. Generates a unique task ID using crypto.randomUUID()
 * 3. Implements versioned-atomic enqueue using storage wrapper from '../shared/storage'
 * 4. Retries up to 5 times with exponential backoff (50ms * attempt) on version conflicts
 * 5. Schedules chrome.alarms.create('processQueue', { delayInMinutes: 1 }) on success
 * 6. Returns the task ID
 * 7. Throws Error if all retries fail
 * 8. Uses QUEUE_KEY='taskQueue_v1' and VERSION_KEY='taskQueueVersion_v1'
 * 9. Never directly calls chrome.storage - only use storage wrapper
 * 10. Include detailed JSDoc comments
 */
```

### Process Queue 함수 생성

```typescript
/**
 * Generate a TypeScript function 'processQueue' that:
 * 1. Takes a processor function: (task: Task) => Promise<boolean>
 * 2. Processes tasks in FIFO order
 * 3. Persists state after each task to prevent data loss
 * 4. Increments task.attempts on failure
 * 5. Retries failed tasks up to MAX_TASK_ATTEMPTS (5) times
 * 6. Drops tasks after max attempts and logs to console.error
 * 7. Handles exceptions gracefully
 * 8. Uses storage wrapper from '../shared/storage'
 * 9. Never directly calls chrome.storage
 * 10. Include detailed JSDoc comments
 */
```

---

## Parser 관련

### Base Parser 클래스 생성

```typescript
/**
 * Generate an abstract TypeScript class 'BaseParser' that:
 * 1. Has abstract property 'siteName: string'
 * 2. Has abstract property 'patterns' with selectors for amount, currency, methods
 * 3. Has abstract method 'parse(doc: Document): ParsedData | null'
 * 4. Has protected method 'extractAmount(text: string): number | null' that:
 *    - Extracts numbers from Korean format (e.g., "1,000원" -> 1000)
 *    - Returns null if no valid number found
 * 5. Has protected method 'extractCurrency(text: string): string' that:
 *    - Detects KRW, USD, EUR, JPY from text
 *    - Returns 'KRW' as default
 * 6. Include detailed JSDoc comments
 * 7. Export ParsedData type with: amount, currency, methods[], confidence (0-1), metadata?
 */
```

### Site-specific Parser 생성

```typescript
/**
 * Generate a TypeScript class 'CoupangParser' that:
 * 1. Extends BaseParser from './baseParser'
 * 2. Sets siteName = 'Coupang'
 * 3. Defines patterns with CSS selectors:
 *    - amount: '.total-price' or '.final-price'
 *    - methods: '.payment-method-item'
 * 4. Implements parse(doc: Document) that:
 *    - Queries DOM using patterns
 *    - Extracts amount using this.extractAmount()
 *    - Extracts methods from NodeList
 *    - Returns ParsedData with confidence 0.95 if methods found, else 0.7
 *    - Returns null if amount not found
 *    - Handles exceptions and returns null
 * 5. Include detailed JSDoc comments
 * 6. NEVER hardcode values - use DOM queries only
 */
```

---

## Offscreen Manager 관련

### Offscreen Manager 클래스 생성

```typescript
/**
 * Generate a TypeScript singleton class 'OffscreenManager' that:
 * 1. Has private constructor
 * 2. Has static getInstance() method
 * 3. Has private properties: active (boolean), queue (any[])
 * 4. Has public async enqueue(task: any) method that:
 *    - Pushes task to queue
 *    - Calls this.process() if not active
 * 5. Has private async process() method that:
 *    - Sets active = true
 *    - Creates offscreen document with chrome.offscreen.createDocument()
 *    - URL: 'offscreen/offscreen.html'
 *    - Reasons: [chrome.offscreen.Reason.DOM_PARSING]
 *    - Justification: 'Complex parse for checkout pages'
 *    - Processes all queued tasks by sending messages
 *    - Closes document with chrome.offscreen.closeDocument()
 *    - Sets active = false in finally block
 *    - Handles exceptions
 * 6. Export singleton instance as 'offscreenManager'
 * 7. Include detailed JSDoc comments
 * 8. Add TODO comments for timeout/retry logic
 */
```

---

## Content Script 관련

### Overlay Mount 함수 생성

```typescript
/**
 * Generate a TypeScript function 'mountOverlay' that:
 * 1. Creates a div container with id 'paywise-root'
 * 2. Attaches Shadow DOM with mode 'closed' for security
 * 3. Creates a style element with CSS reset:
 *    - :host { all: initial; display: block; }
 *    - * { all: unset; }
 * 4. Appends style to shadow root
 * 5. Creates mount div and appends to shadow root
 * 6. Appends container to document.body
 * 7. Creates React root and renders <App sandboxed={true} />
 * 8. Import React, ReactDOM, DOMPurify
 * 9. CRITICAL: Always sanitize any HTML with DOMPurify before rendering
 * 10. Include detailed JSDoc comments with security warnings
 */
```

### HTML Sanitization 함수 생성

```typescript
/**
 * Generate a TypeScript function 'sanitizeHtml' that:
 * 1. Takes html: string parameter
 * 2. Returns sanitized string using DOMPurify.sanitize()
 * 3. Configures DOMPurify with:
 *    - ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br']
 *    - ALLOWED_ATTR: ['href', 'target']
 * 4. Include JSDoc comment: "ALWAYS use this before rendering external HTML"
 * 5. Import DOMPurify from 'dompurify'
 */
```

---

## Background Worker 관련

### Message Handler 생성

```typescript
/**
 * Generate a chrome.runtime.onMessage.addListener handler that:
 * 1. Listens for messages with type property
 * 2. Handles 'CALCULATE_PAYMENT' type:
 *    - Calls enqueueTask() with msg.data
 *    - Sends response { success: true, taskId }
 *    - Catches errors and sends { success: false, error: err.message }
 *    - Returns true for async response
 * 3. Handles 'GET_QUEUE_STATUS' type:
 *    - Calls getQueueStatus()
 *    - Sends response with status
 *    - Returns true for async response
 * 4. Handles 'TRIGGER_PROCESS' type:
 *    - Calls processQueue()
 *    - Sends response { success: true }
 *    - Returns true for async response
 * 5. Logs unknown message types to console.warn
 * 6. Include detailed JSDoc comments
 */
```

### Alarm Handler 생성

```typescript
/**
 * Generate a chrome.alarms.onAlarm.addListener handler that:
 * 1. Checks if alarm.name === 'processQueue'
 * 2. Calls processQueue(handleTask) if matched
 * 3. Logs alarm trigger to console.debug
 * 4. Handles exceptions gracefully
 * 5. Include JSDoc comment explaining alarm purpose
 * 6. Import processQueue from './taskQueue'
 * 7. Import handleTask from './taskHandlers'
 */
```

---

## Logger 관련

### PII Masking 함수 생성

```typescript
/**
 * Generate a TypeScript function 'maskPII' that:
 * 1. Takes data: any parameter
 * 2. Converts to JSON string
 * 3. Replaces patterns:
 *    - Phone: \d{3}-\d{4}-\d{4} -> ***-****-****
 *    - Email: \b[\w\.-]+@[\w\.-]+\.\w{2,4}\b -> ***@***.***
 *    - Card: \d{4}-\d{4}-\d{4}-\d{4} -> ****-****-****-****
 * 4. Parses back to object and returns
 * 5. Handles null/undefined gracefully
 * 6. Include JSDoc comment: "ALWAYS use before logging user data"
 */
```

### Logger Class 생성

```typescript
/**
 * Generate a TypeScript class 'Logger' that:
 * 1. Has private queue: LogEntry[] property
 * 2. Has private BATCH_SIZE = 50 constant
 * 3. Has private FLUSH_INTERVAL = 60000 constant
 * 4. Has constructor that sets up periodic flush with setInterval
 * 5. Has public methods: debug, info, warn, error
 * 6. Each method:
 *    - Takes message: string, data?: any, context?: string
 *    - Calls private log() method
 * 7. error() method flushes immediately after logging
 * 8. Private log() method:
 *    - Creates LogEntry with level, message, masked data, timestamp, context
 *    - Pushes to queue
 *    - Flushes if queue.length >= BATCH_SIZE
 * 9. Private flush() method:
 *    - Sends batch to backend API
 *    - Clears queue on success
 *    - Stores to chrome.storage.local on failure
 * 10. Uses maskPII() for all data
 * 11. Export singleton instance as 'logger'
 * 12. Include detailed JSDoc comments
 */
```

---

## 테스트 관련

### Unit Test 생성

```typescript
/**
 * Generate a Vitest unit test for taskQueue that:
 * 1. Imports describe, it, expect, beforeEach, vi from 'vitest'
 * 2. Imports enqueueTask, processQueue, clearQueue from '@/background/taskQueue'
 * 3. Sets up chrome.storage mock in beforeEach:
 *    - Creates in-memory store object
 *    - Mocks get/set/clear methods
 *    - Resets store before each test
 * 4. Tests:
 *    - 'should enqueue a task' - verifies task added to queue
 *    - 'should handle concurrent enqueues' - 10 parallel enqueues, all unique
 *    - 'should process tasks sequentially' - FIFO order verification
 *    - 'should retry failed tasks' - processor fails first 2 times
 *    - 'should drop tasks after max attempts' - always-fail processor
 * 5. Uses async/await for all tests
 * 6. Includes descriptive test names
 */
```

### E2E Test 생성

```typescript
/**
 * Generate a Playwright E2E test for extension that:
 * 1. Imports test, expect, chromium from '@playwright/test'
 * 2. Imports path from 'path'
 * 3. Test: 'should load extension and detect checkout page'
 * 4. Steps:
 *    - Get extension path: path.join(__dirname, '../../dist')
 *    - Launch persistent context with extension loaded
 *    - Args: --disable-extensions-except=<path>, --load-extension=<path>
 *    - Navigate to https://www.coupang.com/checkout
 *    - Wait for overlay: page.locator('#paywise-root')
 *    - Assert overlay is visible
 *    - Close context
 * 5. Use headless: false (extensions require headed mode)
 * 6. Include detailed comments
 */
```

---

## 사용 예시

### 1. Task Queue 함수 생성

파일 `src/background/taskQueue.ts`를 열고 위의 "Enqueue 함수 생성" 프롬프트를 주석으로 붙여넣으면:

```typescript
// [프롬프트를 여기에 붙여넣기]

// Copilot이 자동으로 생성:
export async function enqueueTask(
  payload: Omit<Task, 'id' | 'attempts' | 'createdAt'>
): Promise<string> {
  // ... 생성된 코드 ...
}
```

### 2. Parser 클래스 생성

파일 `src/content/parsers/coupangParser.ts`를 열고 "Site-specific Parser 생성" 프롬프트 사용:

```typescript
// [프롬프트를 여기에 붙여넣기]

// Copilot이 자동으로 생성:
export class CoupangParser extends BaseParser {
  // ... 생성된 코드 ...
}
```

---

## 주의사항

### ✅ 좋은 프롬프트

- **구체적**: "Generate a function that does X, Y, Z"
- **제약 명시**: "Never use chrome.storage directly"
- **타입 명시**: "Returns Promise<string>"
- **에러 처리**: "Handles exceptions gracefully"

### ❌ 나쁜 프롬프트

- **모호함**: "Make a queue"
- **제약 없음**: "Create storage function"
- **타입 없음**: "Returns something"
- **에러 무시**: "Just make it work"

---

## 다음 문서

- [PR 템플릿](./pr-template.md)
- [QA 체크리스트](./qa-checklist.md)
- [코드 템플릿](./code-templates.md)
