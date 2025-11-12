# 테스팅 전략

> Unit, Integration, E2E 테스트 가이드

## 테스트 피라미드

```
       /\
      /E2E\       (10%) - Playwright
     /------\
    /  Int   \    (20%) - Vitest + msw
   /----------\
  /   Unit     \  (70%) - Vitest
 /--------------\
```

## Unit Tests (Vitest)

### 설정

**파일**: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

### Chrome API Mock

**파일**: `tests/setup.ts`

```typescript
import { vi } from 'vitest';

global.chrome = {
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
      clear: vi.fn()
    }
  },
  runtime: {
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    }
  },
  alarms: {
    create: vi.fn(),
    clear: vi.fn(),
    onAlarm: {
      addListener: vi.fn()
    }
  }
} as any;
```

### 예시

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { enqueue } from '@/background/taskQueue';

describe('Task Queue', () => {
  beforeEach(() => {
    // Setup storage mock
  });

  it('should enqueue task', async () => {
    const id = await enqueue({ type: 'TEST', payload: {} });
    expect(id).toBeDefined();
  });
});
```

## E2E Tests (Playwright)

### 설정

**파일**: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
```

### Extension Context

**파일**: `tests/e2e/extension.spec.ts`

```typescript
import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test('should load extension', async () => {
  const extensionPath = path.join(__dirname, '../../dist');
  
  const context = await chromium.launchPersistentContext('', {
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`
    ]
  });

  const page = await context.newPage();
  await page.goto('https://www.coupang.com/checkout');

  // Test overlay appears
  const overlay = await page.locator('#paywise-overlay');
  await expect(overlay).toBeVisible();

  await context.close();
});
```

## Integration Tests

### API Mocking (msw)

```typescript
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('/api/rates', () => {
    return HttpResponse.json({
      USD: 1300,
      EUR: 1400
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Service Worker 시나리오

### SW Restart 시뮬레이션

```typescript
test('queue survives SW restart', async () => {
  // Enqueue tasks
  await enqueue({ type: 'TASK_1', payload: {} });

  // Simulate restart (re-import)
  vi.resetModules();
  const { getQueueStatus } = await import('@/background/taskQueue');

  const status = await getQueueStatus();
  expect(status.length).toBe(1);
});
```

## 커버리지 목표

| 레이어 | 목표 |
|--------|------|
| Utils | 90%+ |
| Parsers | 85%+ |
| Background | 80%+ |
| UI | 70%+ |
| **Overall** | **80%+** |

## CI 통합

**파일**: `.github/workflows/test.yml`

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm test
      - run: pnpm test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## 다음 단계

- [QA 체크리스트](./qa-checklist.md)
- [CI/CD 파이프라인](./cicd.md)
