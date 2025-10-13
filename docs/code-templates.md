# 코드 템플릿 상세

> 복사-붙여넣기 가능한 완전한 코드 템플릿

## 목차
- [Configuration Files](#configuration-files)
- [Manifest](#manifest)
- [Vite Config](#vite-config)
- [Test Setup](#test-setup)

---

## Configuration Files

### package.json

```json
{
  "name": "paywise",
  "version": "1.0.0",
  "description": "Best payment method recommendation",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,md}\""
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.0",
    "dompurify": "^3.0.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/chrome": "^0.0.250",
    "@types/dompurify": "^3.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "@vitest/coverage-v8": "^1.0.0",
    "eslint": "^8.50.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-react": "^7.33.0",
    "jsdom": "^23.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Linting - STRICT MODE */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    
    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    
    /* Chrome types */
    "types": ["chrome", "node", "vite/client"]
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### .eslintrc.json

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "webextensions": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["@typescript-eslint", "react"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "react/react-in-jsx-scope": "off",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### .prettierrc

```json
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

## Manifest

**파일**: `src/manifest.json`

```json
{
  "manifest_version": 3,
  "name": "PayWise",
  "version": "1.0.0",
  "description": "Recommend most cost-effective payment method",
  
  "permissions": [
    "storage",
    "scripting",
    "activeTab"
  ],
  
  "optional_permissions": [
    "alarms",
    "notifications"
  ],
  
  "host_permissions": [
    "https://www.coupang.com/checkout/*",
    "https://order.pay.naver.com/*",
    "https://checkout.gmarket.co.kr/*"
  ],
  
  "background": {
    "service_worker": "background/index.js",
    "type": "module"
  },
  
  "action": {
    "default_popup": "popup/index.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "32": "icons/icon32.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  
  "content_scripts": [
    {
      "matches": [
        "https://*.coupang.com/*",
        "https://order.pay.naver.com/*",
        "https://checkout.gmarket.co.kr/*"
      ],
      "js": ["content/index.js"],
      "run_at": "document_idle"
    }
  ],
  
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  },
  
  "icons": {
    "16": "icons/icon16.png",
    "32": "icons/icon32.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

---

## Vite Config

**파일**: `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    
    rollupOptions: {
      input: {
        // HTML entries
        popup: resolve(__dirname, 'src/popup/index.html'),
        options: resolve(__dirname, 'src/options/index.html'),
        offscreen: resolve(__dirname, 'src/offscreen/offscreen.html'),
        
        // JS entries
        background: resolve(__dirname, 'src/background/index.ts'),
        content: resolve(__dirname, 'src/content/index.ts')
      },
      
      output: {
        entryFileNames: (chunkInfo) => {
          // Background and content scripts go to their own folders
          if (chunkInfo.name === 'background') {
            return 'background/[name].js';
          }
          if (chunkInfo.name === 'content') {
            return 'content/[name].js';
          }
          return '[name]/[name].js';
        },
        
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // Dev server (for popup/options development)
  server: {
    port: 3000,
    strictPort: true
  }
});
```

**파일**: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData.ts'
      ],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    },
    
    include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.ts'],
    exclude: ['node_modules', 'dist', 'tests/e2e']
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
```

---

## Test Setup

**파일**: `tests/setup.ts`

```typescript
import { vi } from 'vitest';

/**
 * Mock Chrome APIs for testing
 */
global.chrome = {
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
      clear: vi.fn()
    },
    sync: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
      clear: vi.fn()
    },
    onChanged: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    }
  },
  
  runtime: {
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    },
    connect: vi.fn(),
    onConnect: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    },
    getURL: vi.fn((path) => `chrome-extension://mock-id/${path}`),
    lastError: undefined
  },
  
  alarms: {
    create: vi.fn(),
    clear: vi.fn(),
    clearAll: vi.fn(),
    get: vi.fn(),
    getAll: vi.fn(),
    onAlarm: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    }
  },
  
  tabs: {
    query: vi.fn(),
    sendMessage: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  },
  
  offscreen: {
    createDocument: vi.fn(),
    closeDocument: vi.fn(),
    Reason: {
      DOM_PARSING: 'DOM_PARSING',
      IFRAME_SCRIPTING: 'IFRAME_SCRIPTING'
    }
  }
} as any;

/**
 * Mock crypto.randomUUID for Node environment
 */
if (typeof crypto === 'undefined') {
  global.crypto = {
    randomUUID: () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  } as any;
}
```

**파일**: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  
  fullyParallel: false, // Extensions can't run in parallel
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // One worker for extension tests
  
  reporter: [
    ['html'],
    ['list']
  ],
  
  use: {
    headless: false, // Extensions require headed mode
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  
  webServer: process.env.CI ? undefined : {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
});
```

---

## 다음 문서

- [Copilot 프롬프트 가이드](./copilot-prompts.md)
- [PR 템플릿](./pr-template.md)
- [CI/CD 설정](./cicd.md)
