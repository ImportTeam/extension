# 🔧 실무적 DOM Parser 아키텍처

> 신뢰성, 정확성, 최적화를 모두 고려한 프로덕션 레벨 파서 설계

**목차**
- [설계 원칙](#설계-원칙)
- [아키텍처](#아키텍처)
- [실무 패턴](#실무-패턴)
- [신뢰도 시스템](#신뢰도-시스템)
- [에러 핸들링](#에러-핸들링)
- [성능 최적화](#성능-최적화)
- [배포 전략](#배포-전략)

---

## 🎯 설계 원칙

### 1. **신뢰성 (Reliability)**
```
✅ Multiple Selector Fallback (주요 > 보조 > 마지막)
✅ Confidence Score (0-1.0) - 모든 파싱에 부여
✅ Retry Logic with Exponential Backoff
✅ Circuit Breaker Pattern (연속 실패시 차단)
```

### 2. **정확성 (Accuracy)**
```
✅ 정규표현식 + DOM 쿼리 이중검증
✅ 데이터 타입 검증 (금액은 숫자만)
✅ 범위 검증 (0% ~ 100% 할인만 허용)
✅ 데이터 정규화 (쉼표 제거, 공백 정리)
```

### 3. **최적화 (Optimization)**
```
✅ 초기 인코딩 시간 < 500ms
✅ DOM 쿼리 캐싱 (동일 선택자)
✅ 병렬 파서 실행 (Promise.race)
✅ 메모리 효율적 (스트링 빌더 사용)
```

---

## 🏗️ 아키텍처

### 전체 구조

```
┌──────────────────────────────────────────────────────┐
│              ParserManager (라우팅층)                 │
│  - URL 패턴 매칭                                      │
│  - 적절한 파서 선택                                   │
│  - 에러 복구                                          │
└─────────────────────┬──────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
    ┌────────┐   ┌────────┐   ┌──────────┐
    │ Coupang│   │ Musinsa│   │ Fallback │
    │ Parser │   │ Parser │   │ Parser   │
    │(0.95)  │   │(0.90)  │   │ (0.30)   │
    └────────┘   └────────┘   └──────────┘
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ▼
    ┌──────────────────────────────┐
    │   ParseResult                │
    │  - data: Object              │
    │  - confidence: 0.0 - 1.0     │
    │  - source: string            │
    │  - parsedAt: timestamp       │
    └──────────────────────────────┘
```

### 파서 타입

#### **1. Site-Specific Parser (높은 정확성)**
```typescript
interface SiteSpecificParser {
  siteName: string;
  urlPattern: RegExp;
  confidence: number;  // 보통 0.85-0.95
  
  selectors: {
    price: string[];              // CSS 선택자 배열 (fallback)
    discount: RegExp[];           // 정규표현식 배열
    cardBenefits: string[];       // 클래스명 기반
  };
  
  parse(doc: Document): ParseResult;
}
```

#### **2. Generic Parser (중간 정확성)**
```typescript
interface GenericParser {
  confidence: number;  // 보통 0.50-0.70
  
  heuristics: {
    pricePatterns: RegExp[];     // 금액 패턴
    discountPatterns: RegExp[];  // 할인률 패턴
    cardPatterns: RegExp[];      // 카드사명 패턴
  };
  
  parse(doc: Document): ParseResult;
}
```

#### **3. Fallback Parser (낮은 정확성)**
```typescript
interface FallbackParser {
  confidence: number;  // 보통 0.20-0.35
  
  patterns: {
    bodyText: string;           // document.body.textContent
    metaTags: string[];         // meta[name=...] 추출
  };
  
  parse(doc: Document): ParseResult;
}
```

---

## 📋 실무 패턴

### 패턴 1: 다중 선택자 폴백 (Multi-Selector Fallback)

**문제점:**
- 쿠팡이 DOM 구조 변경 → 기존 선택자 작동 안 함
- 지역별/시간대별 다른 레이아웃

**솔루션:**
```typescript
// selectors.ts
export const coupangSelectors = {
  price: [
    '.total-price',           // v1
    '[data-testid="price"]',  // v2
    '.product-price',         // v3
    'span[class*="price"]',   // 와일드카드
  ],
  
  discount: [
    '.discount-rate',
    '[data-discount]',
    'span:contains("%")',
  ],
  
  cardBenefits: [
    '.card-benefit-item',
    '[class*="payment-method"]',
    'div[role="listitem"][class*="card"]',
  ]
};
```

**구현:**
```typescript
function extractPrice(doc: Document): number | null {
  for (const selector of coupangSelectors.price) {
    try {
      const element = doc.querySelector(selector);
      if (element?.textContent) {
        const price = parsePrice(element.textContent);
        if (price && isValidPrice(price)) {
          return price;
        }
      }
    } catch (e) {
      // 선택자 오류 무시, 다음으로
      continue;
    }
  }
  return null;
}
```

**신뢰도 계산:**
```typescript
// 어떤 선택자를 사용했는지에 따라 신뢰도 조정
const selectorConfidence: Record<string, number> = {
  '.total-price': 0.95,           // 가장 정확
  '[data-testid="price"]': 0.90,
  '.product-price': 0.85,
  'span[class*="price"]': 0.70,   // 가장 낮음
};
```

---

### 패턴 2: 정규표현식 + DOM 이중검증

**문제점:**
- 정규표현식만: "₩12,345% 할인" → 123456 추출
- DOM 선택자만: 숨겨진 요소 추출

**솔루션:**
```typescript
interface ValidationResult {
  data: string;
  method: 'regex' | 'dom';
  confidence: number;
}

function extractDiscountWithValidation(
  doc: Document
): ValidationResult | null {
  const bodyText = doc.body.textContent || '';
  
  // 1단계: 정규표현식으로 후보 추출
  const regexMatches = bodyText.matchAll(
    /(\d{1,2})%\s*(할인|할인율|혜택)/gi
  );
  
  const candidates = Array.from(regexMatches).map(m => ({
    value: parseInt(m[1]),
    context: m[0],
    position: m.index || 0
  }));
  
  if (candidates.length === 0) return null;
  
  // 2단계: DOM에서 시각적으로 확인 가능한지 검증
  for (const candidate of candidates) {
    const xpath = `//*[contains(text(), "${candidate.value}%")]`;
    const result = doc.evaluate(
      xpath,
      doc,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );
    
    if (result.singleNodeValue) {
      // DOM에서 실제로 보이는 요소 확인
      const element = result.singleNodeValue as HTMLElement;
      
      // 숨겨진 요소 제외
      if (isVisible(element)) {
        return {
          data: String(candidate.value),
          method: 'regex+dom',
          confidence: 0.95  // 높은 신뢰도
        };
      }
    }
  }
  
  // 3단계: 정규표현식만으로 신뢰도 낮춤
  if (candidates.length > 0) {
    return {
      data: String(candidates[0].value),
      method: 'regex',
      confidence: 0.60  // 낮은 신뢰도
    };
  }
  
  return null;
}

function isVisible(element: HTMLElement): boolean {
  return !!(element.offsetParent || element.offsetWidth || element.offsetHeight);
}
```

---

### 패턴 3: 회로 차단기 (Circuit Breaker)

**문제점:**
- 계속 실패하는 파서 반복 호출 → 성능 저하
- 임시 서버 오류를 무한 재시도

**솔루션:**
```typescript
enum CircuitState {
  CLOSED = 'CLOSED',      // 정상 작동
  OPEN = 'OPEN',          // 차단됨
  HALF_OPEN = 'HALF_OPEN' // 복구 시도 중
}

class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private successCount: number = 0;
  private lastFailureTime: number = 0;
  
  // 설정값
  readonly failureThreshold = 5;      // 5회 실패 시 차단
  readonly successThreshold = 2;      // 2회 성공 시 복구
  readonly timeout = 60000;           // 60초 후 복구 시도
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    // 상태 검사
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = CircuitState.HALF_OPEN;
        this.successCount = 0;
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await fn();
      
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess(): void {
    this.failureCount = 0;
    
    if (this.state === CircuitState.HALF_OPEN) {
      this.successCount++;
      if (this.successCount >= this.successThreshold) {
        this.state = CircuitState.CLOSED;
      }
    }
  }
  
  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = CircuitState.OPEN;
    }
  }
}
```

**사용:**
```typescript
const circuitBreaker = new CircuitBreaker();

async function parseWithCircuitBreaker(doc: Document) {
  return circuitBreaker.execute(() => 
    coupangParser.parse(doc)
  );
}
```

---

### 패턴 4: Retry with Exponential Backoff

**문제점:**
- 임시 오류로 인한 파싱 실패
- 타이밍 이슈 (DOM 로딩 중)

**솔루션:**
```typescript
interface RetryOptions {
  maxAttempts: number;      // 최대 재시도 횟수
  initialDelay: number;     // 초기 지연 시간 (ms)
  maxDelay: number;         // 최대 지연 시간 (ms)
  backoffMultiplier: number; // 지수 증가율
}

const defaultRetryOptions: RetryOptions = {
  maxAttempts: 3,
  initialDelay: 100,
  maxDelay: 2000,
  backoffMultiplier: 2
};

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = defaultRetryOptions
): Promise<T> {
  let lastError: Error | null = null;
  let delay = options.initialDelay;
  
  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === options.maxAttempts) {
        break;
      }
      
      // 지수 백오프
      delay = Math.min(
        delay * options.backoffMultiplier,
        options.maxDelay
      );
      
      // + 랜덤 jitter (1-10%)
      const jitter = delay * (0.01 + Math.random() * 0.09);
      await sleep(delay + jitter);
    }
  }
  
  throw lastError || new Error('Max retries exceeded');
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

**사용:**
```typescript
const result = await retryWithBackoff(
  () => coupangParser.parse(document),
  {
    maxAttempts: 3,
    initialDelay: 100,
    maxDelay: 1000,
    backoffMultiplier: 2
  }
);
```

---

## 📊 신뢰도 시스템

### Confidence Score 계산 (0.0 ~ 1.0)

```typescript
interface ConfidenceFactors {
  selectorMatch: number;      // 선택자 일치도 (0-1)
  dataValidation: number;     // 데이터 유효성 (0-1)
  contextRelevance: number;   // 컨텍스트 관련성 (0-1)
  historicalAccuracy: number; // 과거 정확도 (0-1)
}

function calculateConfidence(factors: ConfidenceFactors): number {
  const weights = {
    selectorMatch: 0.4,       // 40%
    dataValidation: 0.3,      // 30%
    contextRelevance: 0.2,    // 20%
    historicalAccuracy: 0.1   // 10%
  };
  
  return (
    factors.selectorMatch * weights.selectorMatch +
    factors.dataValidation * weights.dataValidation +
    factors.contextRelevance * weights.contextRelevance +
    factors.historicalAccuracy * weights.historicalAccuracy
  );
}
```

### 신뢰도별 동작

```typescript
enum TrustLevel {
  VERY_HIGH = 0.90,  // 사용자 직접 표시
  HIGH = 0.75,       // 추천 배지 표시
  MEDIUM = 0.50,     // 주의 아이콘 표시
  LOW = 0.30,        // "정보 부족" 표시
  VERY_LOW = 0.10    // 무시 (폴백 파서만)
}

function handleByConfidence(
  result: ParseResult
): RecommendationAction {
  if (result.confidence >= TrustLevel.VERY_HIGH) {
    return {
      action: 'SHOW_PROMINENT',
      icon: '✅',
      hint: '확인된 정보'
    };
  } else if (result.confidence >= TrustLevel.HIGH) {
    return {
      action: 'SHOW_NORMAL',
      icon: '💡',
      hint: '추천 정보'
    };
  } else if (result.confidence >= TrustLevel.MEDIUM) {
    return {
      action: 'SHOW_WITH_WARNING',
      icon: '⚠️',
      hint: '부분 정보 (정확하지 않을 수 있음)'
    };
  } else {
    return {
      action: 'HIDE',
      icon: '❌',
      hint: '정보 부족'
    };
  }
}
```

---

## 🚨 에러 핸들링

### 구조화된 에러 타입

```typescript
enum ParsingErrorType {
  SELECTOR_NOT_FOUND = 'SELECTOR_NOT_FOUND',
  INVALID_DATA_FORMAT = 'INVALID_DATA_FORMAT',
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
  UNSUPPORTED_SITE = 'UNSUPPORTED_SITE',
  MALFORMED_HTML = 'MALFORMED_HTML',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED'
}

interface ParsingError extends Error {
  type: ParsingErrorType;
  parser: string;
  timestamp: number;
  retryable: boolean;
  context?: Record<string, any>;
}

class ParsingErrorHandler {
  static isRetryable(error: ParsingError): boolean {
    const retryableTypes = [
      ParsingErrorType.NETWORK_TIMEOUT,
      ParsingErrorType.MALFORMED_HTML,
    ];
    return retryableTypes.includes(error.type);
  }
  
  static shouldFallback(error: ParsingError): boolean {
    const fallbackTypes = [
      ParsingErrorType.SELECTOR_NOT_FOUND,
      ParsingErrorType.INVALID_DATA_FORMAT,
    ];
    return fallbackTypes.includes(error.type);
  }
  
  static logError(error: ParsingError): void {
    const entry = {
      timestamp: new Date(error.timestamp).toISOString(),
      type: error.type,
      parser: error.parser,
      message: error.message,
      context: error.context,
    };
    
    // Sentry / LogRocket 같은 서비스로 전송
    window.__errorCollector?.log(entry);
  }
}
```

---

## ⚡ 성능 최적화

### 1. DOM 쿼리 캐싱

```typescript
class QueryCache {
  private cache = new Map<string, Element[]>();
  
  query(selector: string, doc: Document): Element[] {
    const cached = this.cache.get(selector);
    if (cached) {
      return cached;
    }
    
    const result = Array.from(doc.querySelectorAll(selector));
    this.cache.set(selector, result);
    return result;
  }
  
  clear(): void {
    this.cache.clear();
  }
}
```

### 2. 병렬 파서 실행 (Promise.race)

```typescript
// 여러 파서 동시 실행, 첫 성공 반환
async function parseWithRace(doc: Document): Promise<ParseResult> {
  const parsers = [
    coupangParser.parse(doc),
    genericParser.parse(doc),
    fallbackParser.parse(doc)
  ];
  
  const results = await Promise.allSettled(parsers);
  
  // 성공한 결과 중 신뢰도 높은 순서로 정렬
  const successful = results
    .filter((r) => r.status === 'fulfilled')
    .map((r) => (r as PromiseFulfilledResult<ParseResult>).value)
    .sort((a, b) => b.confidence - a.confidence);
  
  return successful[0] || null;
}
```

### 3. 메모리 효율: 스트림 처리

```typescript
// 큰 텍스트 처리 시 스트림 사용
function* parseTextInChunks(text: string, chunkSize: number = 10000) {
  for (let i = 0; i < text.length; i += chunkSize) {
    yield text.slice(i, i + chunkSize);
  }
}

function findPriceInLargeText(text: string): number | null {
  const pricePattern = /₩([\d,]+)/g;
  
  for (const chunk of parseTextInChunks(text)) {
    const match = chunk.match(pricePattern);
    if (match) {
      return parseInt(match[0].replace(/₩|,/g, ''));
    }
  }
  
  return null;
}
```

---

## 🚀 배포 전략

### 1. A/B 테스트

```typescript
interface ParserABTest {
  id: string;
  version: string;
  trafficPercentage: number;
  enabled: boolean;
}

const activeTests: ParserABTest[] = [
  {
    id: 'coupang-v2',
    version: '2.0.0',
    trafficPercentage: 10,  // 10%만 새 버전 사용
    enabled: true
  }
];

function selectParser(siteType: string): Parser {
  const test = activeTests.find(t => 
    t.id === `${siteType}-v2` && t.enabled
  );
  
  if (test && Math.random() * 100 < test.trafficPercentage) {
    return new ParserV2();
  }
  
  return new ParserV1();
}
```

### 2. 메트릭 수집

```typescript
interface ParsingMetrics {
  timestamp: number;
  parser: string;
  duration: number;           // 실행 시간 (ms)
  success: boolean;
  confidence: number;
  selectorUsed: string;
  errorType?: ParsingErrorType;
}

class MetricsCollector {
  private metrics: ParsingMetrics[] = [];
  
  recordParsing(metric: ParsingMetrics): void {
    this.metrics.push(metric);
    
    // 100개마다 배치 전송
    if (this.metrics.length >= 100) {
      this.flush();
    }
  }
  
  async flush(): Promise<void> {
    if (this.metrics.length === 0) return;
    
    const batch = this.metrics.splice(0);
    
    await chrome.runtime.sendMessage({
      type: 'RECORD_METRICS',
      metrics: batch
    });
  }
}
```

### 3. Feature Flag 관리

```typescript
interface FeatureFlags {
  enableCoupangParser: boolean;
  enableMusinsaParser: boolean;
  enableAdvancedRetry: boolean;
  enableMetricsCollection: boolean;
}

const featureFlags = new Proxy(
  {
    enableCoupangParser: true,
    enableMusinsaParser: false,  // 아직 베타
    enableAdvancedRetry: true,
    enableMetricsCollection: true,
  } as FeatureFlags,
  {
    get(target, prop) {
      const flag = target[prop as keyof FeatureFlags];
      
      // Chrome Storage에서 오버라이드 값 확인
      chrome.storage.sync.get(`flag_${String(prop)}`, (result) => {
        return result[`flag_${String(prop)}`] ?? flag;
      });
      
      return flag;
    }
  }
);
```

---

## 📈 모니터링 대시보드

```typescript
interface ParserHealthCheck {
  site: string;
  successRate: number;        // %
  avgConfidence: number;      // 0-1
  avgDuration: number;        // ms
  lastError?: string;
  status: 'HEALTHY' | 'DEGRADED' | 'FAILED';
}

async function getHealthStatus(): Promise<ParserHealthCheck[]> {
  return [
    {
      site: 'coupang',
      successRate: 98.5,
      avgConfidence: 0.92,
      avgDuration: 245,
      status: 'HEALTHY'
    },
    {
      site: 'musinsa',
      successRate: 85.0,
      avgConfidence: 0.75,
      avgDuration: 312,
      lastError: 'DOM structure changed',
      status: 'DEGRADED'
    }
  ];
}
```

---

## ✅ 체크리스트

### 파서 구현 전
- [ ] 대상 사이트 수동 분석 (3-5개 상품 페이지)
- [ ] 주요 CSS 선택자 문서화
- [ ] 대체 선택자 준비 (최소 3개)
- [ ] 정규표현식 패턴 테스트

### 파서 구현 후
- [ ] 신뢰도 점수 설정
- [ ] 에러 타입 분류
- [ ] Circuit breaker 로직
- [ ] Retry 정책

### 배포 전
- [ ] A/B 테스트 계획
- [ ] 롤백 프로세스
- [ ] 모니터링 설정
- [ ] 메트릭 수집 활성화

---

**작성일**: 2025-11-02  
**대상**: 프로덕션 레벨 Chrome Extension  
**참고**: Apify, Oxylabs, Crawlee 등 실무 패턴
