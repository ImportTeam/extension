# 모니터링 & 로깅

> PII 마스킹, 메트릭 수집, 에러 트래킹

## 로깅 전략

### Logger 구현

**파일**: `src/background/logger.ts`

```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type LogEntry = {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: number;
  context?: string;
};

class Logger {
  private queue: LogEntry[] = [];
  private readonly BATCH_SIZE = 50;
  private readonly FLUSH_INTERVAL = 60000; // 1min

  constructor() {
    // Periodic flush
    setInterval(() => this.flush(), this.FLUSH_INTERVAL);
  }

  debug(message: string, data?: any, context?: string) {
    this.log('debug', message, data, context);
  }

  info(message: string, data?: any, context?: string) {
    this.log('info', message, data, context);
  }

  warn(message: string, data?: any, context?: string) {
    this.log('warn', message, data, context);
  }

  error(message: string, data?: any, context?: string) {
    this.log('error', message, data, context);
    // Critical errors - flush immediately
    this.flush();
  }

  private log(level: LogLevel, message: string, data?: any, context?: string) {
    const entry: LogEntry = {
      level,
      message,
      data: this.maskPII(data),
      timestamp: Date.now(),
      context
    };

    this.queue.push(entry);

    if (this.queue.length >= this.BATCH_SIZE) {
      this.flush();
    }
  }

  private maskPII(data: any): any {
    if (!data) return data;

    const str = JSON.stringify(data);
    const masked = str
      .replace(/\d{3}-\d{4}-\d{4}/g, '***-****-****') // Phone
      .replace(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g, '***@***.***') // Email
      .replace(/\d{4}-\d{4}-\d{4}-\d{4}/g, '****-****-****-****'); // Card

    return JSON.parse(masked);
  }

  private async flush() {
    if (this.queue.length === 0) return;

    const batch = [...this.queue];
    this.queue = [];

    try {
      // Send to backend
      await fetch('https://api.example.com/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs: batch })
      });
    } catch (err) {
      console.error('Failed to send logs:', err);
      // Fallback: store locally
      chrome.storage.local.set({ 
        failedLogs: batch 
      });
    }
  }
}

export const logger = new Logger();
```

## 메트릭 수집

### Metrics 구현

**파일**: `src/background/metrics.ts`

```typescript
type Metric = {
  name: string;
  value: number;
  tags?: Record<string, string>;
  timestamp: number;
};

class Metrics {
  private queue: Metric[] = [];

  increment(name: string, tags?: Record<string, string>) {
    this.record(name, 1, tags);
  }

  gauge(name: string, value: number, tags?: Record<string, string>) {
    this.record(name, value, tags);
  }

  timing(name: string, duration: number, tags?: Record<string, string>) {
    this.record(name, duration, { ...tags, type: 'timing' });
  }

  private record(name: string, value: number, tags?: Record<string, string>) {
    this.queue.push({
      name,
      value,
      tags,
      timestamp: Date.now()
    });
  }

  async flush() {
    if (this.queue.length === 0) return;

    const batch = [...this.queue];
    this.queue = [];

    try {
      await fetch('https://api.example.com/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics: batch })
      });
    } catch (err) {
      console.error('Failed to send metrics:', err);
    }
  }
}

export const metrics = new Metrics();

// Flush every 5 minutes
setInterval(() => metrics.flush(), 300000);
```

## 사용 예시

### Background

```typescript
import { logger } from './logger';
import { metrics } from './metrics';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const start = Date.now();

  try {
    // Process message
    logger.info('Message received', { type: msg.type }, 'background');
    
    // ... handle message ...
    
    metrics.increment('message.processed', { type: msg.type });
    metrics.timing('message.duration', Date.now() - start, { type: msg.type });
    
  } catch (err) {
    logger.error('Message processing failed', { 
      error: (err as Error).message,
      type: msg.type 
    }, 'background');
    
    metrics.increment('message.error', { type: msg.type });
  }
});
```

### Parser

```typescript
import { logger } from '@/background/logger';
import { metrics } from '@/background/metrics';

export class CoupangParser {
  parse(doc: Document) {
    const start = Date.now();
    
    try {
      const result = this.doParse(doc);
      
      metrics.timing('parser.duration', Date.now() - start, { 
        site: 'coupang',
        confidence: result.confidence.toString()
      });
      
      logger.debug('Parse success', { 
        site: 'coupang',
        confidence: result.confidence 
      }, 'parser');
      
      return result;
      
    } catch (err) {
      logger.error('Parse failed', { 
        site: 'coupang',
        error: (err as Error).message 
      }, 'parser');
      
      metrics.increment('parser.error', { site: 'coupang' });
      return null;
    }
  }
}
```

## 대시보드 메트릭

### 핵심 지표

```typescript
// Installation & Usage
metrics.increment('extension.installed');
metrics.gauge('extension.active_users', userCount);

// Recommendations
metrics.increment('recommendation.shown', { site: 'coupang' });
metrics.increment('recommendation.accepted', { method: 'paypal' });
metrics.gauge('recommendation.acceptance_rate', rate);

// Parser
metrics.increment('parser.success', { site: 'coupang' });
metrics.increment('parser.failure', { site: 'coupang' });
metrics.gauge('parser.confidence', confidence, { site: 'coupang' });

// API
metrics.increment('api.request', { endpoint: '/rates' });
metrics.increment('api.error', { endpoint: '/rates', code: '500' });
metrics.timing('api.latency', duration, { endpoint: '/rates' });

// Queue
metrics.gauge('queue.length', length);
metrics.increment('queue.enqueue');
metrics.increment('queue.process.success');
metrics.increment('queue.process.failure');
```

## 에러 트래킹

### Sentry 통합 (선택)

```typescript
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'YOUR_DSN',
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    // Mask PII
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }
    return event;
  }
});

// Usage
try {
  // ...
} catch (err) {
  Sentry.captureException(err);
}
```

## 알림 설정

### Critical Alerts

```typescript
async function sendAlert(message: string, severity: 'critical' | 'warning') {
  await fetch('https://api.example.com/alerts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      severity,
      timestamp: Date.now(),
      extension: 'PayWise'
    })
  });
}

// Usage
if (errorRate > 0.05) {
  sendAlert('Error rate exceeded 5%', 'critical');
}
```

## 다음 단계

- [QA 체크리스트](./qa-checklist.md)
- [아키텍처 개요](./architecture.md)
