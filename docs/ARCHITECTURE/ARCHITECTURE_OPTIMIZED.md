# PicSel - 최적화된 아키텍처 설계 (시니어 관점)

> MVP부터 Production까지: 복잡도 최소화 + 확장성 보장

## 💡 설계 철학

### Before (Over-engineered)
```
Content Script → Task Queue → Background → Offscreen → Recommendation
(복잡, 관리 포인트 많음, 초기 개발 느림)
```

### After (Optimized for MVP)
```
Content Script → Background (direct message) → Recommendation → Overlay
(간단, 빠른 개발, 확장 가능)
```

---

## 1. 핵심 아키텍처

### 레이어 구조

```
┌─────────────────────────────────────┐
│   Popup & Options Pages (React)     │
│   (Settings, History, Dashboard)    │
└──────────────┬──────────────────────┘
               │ storage.onChanged
┌──────────────▼──────────────────────┐
│  Background Service Worker (MV3)    │
├─────────────────────────────────────┤
│ • Message Router                    │
│ • Recommendation Engine             │
│ • Rate Cache (IndexedDB)            │
│ • Logger + Metrics                  │
└──────────────▲──────────────────────┘
               │ chrome.runtime.sendMessage
┌──────────────┴──────────────────────┐
│   Content Script + Overlay          │
│   (DOM Parsing + Shadow DOM UI)     │
└─────────────────────────────────────┘
```

### 단순화 포인트

1. **No Task Queue in MVP**: 
   - 직접 메시징으로 충분 (알고리즘이 < 100ms)
   - 나중에 필요하면 추가 (사용자 수 증가시)

2. **No Offscreen Manager**:
   - Content Script에서 DOM 파싱 (page context)
   - Offscreen은 정말 복잡한 작업시에만 (Canvas, Web Audio 등)

3. **Simplified Logger**:
   - Critical errors만 즉시 전송
   - 배치 로깅은 60초 주기

4. **Direct Storage Sync**:
   - chrome.storage.onChanged로 자동 동기화
   - 중간 계층 (Task Queue) 제거

---

## 2. 개선사항 적용

### A. 성능 (Performance)

**목표**: Core Web Vitals 기준 준수

```typescript
// 1. Lazy Loading
- Background: 필요한 모듈만 import()
- Content: Shadow DOM render 전에만 React 로드
- Parser: 사이트별 parser 필요시에만 로드

// 2. Code Splitting
// background/index.ts
const { recommendationEngine } = await import('./engines/recommendation');

// 3. Caching Strategy
- IndexedDB: rates (TTL 1h), parser results (TTL 30m)
- chrome.storage.local: UI state, settings (no TTL)
- Memory: recommendation result (session only)
```

**메트릭 목표**:
- Content Script inject 시간: < 50ms
- Overlay render: < 200ms
- Background 처리: < 500ms
- Total user journey: < 1s

### B. 보안 (Security)

**적용 사항**:

```typescript
// 1. CSP 강제
content_security_policy: {
  extension_pages: "script-src 'self'; object-src 'self'; style-src 'self' 'unsafe-inline';"
}

// 2. DOMPurify 모든 외부 입력
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(externalHTML);

// 3. Trusted Types (Chrome 91+)
const policy = trustedTypes.createPolicy('default', {
  createHTML: (html) => html // Sanitize here
});

// 4. PII Masking
maskPII(data): 전화번호, 이메일, 카드번호 마스킹

// 5. No API Keys in Content
// ✅ Background only
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'FETCH_RATES') {
    fetch(API_URL, { headers: { Authorization: `Bearer ${API_KEY}` } });
  }
});
```

### C. 모니터링 & 에러 처리

**3단계 모니터링**:

```typescript
// Level 1: Info (배치 60초)
logger.info('User visited Coupang checkout');

// Level 2: Warning (즉시 + 배치)
logger.warn('Parser confidence < 0.5', { site: 'coupang' });

// Level 3: Error (즉시 전송 + 알림)
logger.error('API rate fetch failed', { error });
```

**에러 분류**:

```typescript
enum ErrorType {
  NETWORK = 'network',      // API 실패, timeout
  PARSING = 'parsing',      // DOM 파싱 실패
  VALIDATION = 'validation', // 데이터 검증 실패
  UNKNOWN = 'unknown'
}

// 사용자 메시지 (에러 타입별로 다름)
case 'network': "환율 정보를 가져올 수 없습니다. 나중에 다시 시도해주세요."
case 'parsing': "이 사이트는 아직 지원하지 않습니다."
case 'validation': "데이터 오류가 발생했습니다."
```

### D. 최신 동향 반영

**Chrome 최신 기능**:

```typescript
// 1. Dynamic Content Scripts (MV3 최신)
chrome.scripting.registerContentScripts([{
  id: 'checkout-detector',
  matches: ['https://*.coupang.com/*'],
  js: ['content/index.js'],
  runAt: 'document_start' // 더 빠른 로드
}]);

// 2. Storage Partitioning (Chrome 115+)
// chrome.storage는 자동으로 partitioned
// 따라서 iframe 내에서도 안전

// 3. Service Worker Keep-Alive (신중히 사용)
// Battery drain 고려, 필요시에만
chrome.runtime.connect({ name: 'keepalive' });
```

**최신 보안 표준**:

```typescript
// 1. Subresource Integrity (외부 리소스 사용시)
<script src="https://cdn.example.com/lib.js" 
        integrity="sha384-..."
        crossorigin="anonymous"></script>

// 2. X-XSS-Protection 등 Legacy headers 제거 (CSP 사용)

// 3. Permissions API 활용
if (Permissions.query) {
  const result = await Permissions.query({ name: 'notifications' });
  if (result.state === 'granted') {
    // show notifications
  }
}
```

---

## 3. 디렉토리 구조 (최적화)

```
src/
├── manifest.json                    # MV3 manifest
│
├── shared/
│   ├── types.ts                    # Type definitions
│   ├── storage.ts                  # chrome.storage wrapper
│   ├── logger.ts                   # Logger (PII masking)
│   ├── constants.ts                # Constants
│   └── components/                 # Shared React components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── PixelLoader.tsx
│
├── background/
│   ├── index.ts                    # Service Worker entry
│   ├── messageHandler.ts           # Message router
│   ├── engines/
│   │   ├── recommendation.ts       # Recommendation logic
│   │   ├── rate.ts                 # Rate calculation + cache
│   │   └── parser.ts               # Parser coordinator
│   └── utils/
│       ├── cache.ts                # IndexedDB wrapper
│       └── errorHandler.ts         # Error classification
│
├── content/
│   ├── index.ts                    # Content script entry
│   ├── detector.ts                 # Checkout page detection
│   ├── parsers/
│   │   ├── baseParser.ts           # Abstract base
│   │   ├── coupangParser.ts
│   │   ├── naverParser.ts
│   │   └── fallbackParser.ts
│   ├── overlay.tsx                 # Shadow DOM + React UI
│   └── utils.ts                    # DOM utilities
│
├── popup/
│   ├── index.html
│   ├── main.tsx                    # React entry
│   ├── App.tsx                     # Root component
│   └── pages/
│       ├── Dashboard.tsx
│       ├── Settings.tsx
│       └── History.tsx
│
├── options/
│   ├── index.html
│   ├── main.tsx
│   └── App.tsx
│
├── offscreen/ (추가는 나중에)
│   ├── offscreen.html
│   └── offscreen.ts
│
└── styles/
    └── global.css
```

---

## 4. 데이터 흐름 (상세)

### Flow 1: 사용자가 checkout 페이지 접속

```
1. Content Script inject (document_start)
   └─ detectCheckoutPage() 호출
   
2. 감지 성공 → 기본 정보 추출
   └─ Coupang parser (confidence 검사)
   
3. Background로 메시지
   chrome.runtime.sendMessage({
     type: 'CALCULATE_RECOMMENDATION',
     data: { amount, currency, methods }
   })
   
4. Background 처리 (< 500ms)
   ├─ rate cache 확인
   ├─ 계산 수행
   └─ 응답 전송
   
5. Content Script 수신
   └─ mountOverlay(recommendation)
   
6. Shadow DOM 렌더링 (< 200ms)
   └─ 사용자 시각
```

### Flow 2: 설정 변경

```
Popup UI 변경
  ↓
chrome.storage.local.set() (Zustand middleware)
  ↓
Background: storage.onChanged 감지
  ↓
필요시 재계산 (cache invalidation)
  ↓
Content Script: 업데이트 결과 표시
```

---

## 5. 단계별 구현 계획 (수정)

### Phase 1: Core (Week 1-2)
- [x] shared/ 작성 (types, storage, logger)
- [x] content/ 작성 (detector, parser, overlay)
- [x] background/ 작성 (messageHandler, engines)
- [x] Unit tests (80%+ coverage)
- [ ] E2E 테스트

### Phase 2: Polish (Week 3)
- [ ] 성능 최적화 (lazy loading, code splitting)
- [ ] 모니터링 강화 (RUM, error tracking)
- [ ] 보안 감사 (CSP, DOMPurify, PII)

### Phase 3: Production (Week 4-5)
- [ ] CI/CD 파이프라인
- [ ] QA 체크리스트
- [ ] Chrome Web Store 준비

### Phase 4: Post-Launch (Week 6+)
- [ ] Task Queue 추가 (필요시)
- [ ] Feature toggles
- [ ] Canary releases

---

## 6. 비관점 (Critical Analysis)

### ⚠️ 주의사항

1. **Chrome 최신화 추적**:
   - MV3 계속 변화 중 (2024년에도 업데이트 예정)
   - 정기적으로 Chrome DevTools 뉴스레터 확인

2. **성능 모니터링**:
   - 실제 사용자 환경에서 메트릭 수집 필수
   - 1ms 차이도 누적되면 큼

3. **보안은 일회성 아님**:
   - 정기적 audit 필수 (분기별)
   - 새로운 취약점 대응 체계 필요

4. **사용자 수 증가에 대비**:
   - 현재 설계는 < 100k users 기준
   - 수백만 명 규모가 되면 재설계 필요 가능

---

## 7. 최신 동향 분석 (2024)

### A. Chrome 확장 생태계 변화

- **MV2 완전 제거** (2024년 중반 예정)
  - MV3 관련 문서, 도구 계속 개선
  - 새로운 API 추가 예상

- **Privacy Focus 강화**
  - Cross-site tracking 제한
  - PII 보호 기준 상향

### B. Web Performance 트렌드

- **Core Web Vitals 중요성 증가**
  - Largest Contentful Paint (LCP)
  - Cumulative Layout Shift (CLS)
  - First Input Delay (FID) → Interaction to Next Paint (INP)

- **Zero-JS 운동**
  - 가능하면 plain JS 사용
  - Framework 최소화

### C. 보안 트렌드

- **Trusted Types 표준화**
  - DOM XSS 방지의 새로운 표준
  - Chrome 91+에서 지원

- **Permissions Policy (formerly Feature Policy)**
  - iframe 내 API 제한

---

## 8. 타임라인 & 마일스톤

### Week 1
- [ ] shared/ 기본 구현 (storage, types, logger)
- [ ] Tests 작성 (mocking setup)

### Week 2
- [ ] content/ 구현 (detector, parsers)
- [ ] background/ 구현 (messageHandler, engines)
- [ ] Integration test

### Week 3
- [ ] UI (popup, options)
- [ ] Performance 최적화
- [ ] Security 감사

### Week 4
- [ ] CI/CD 구성
- [ ] QA 전체 점검
- [ ] Beta release

---

## 다음 단계

1. shared/ 구현 시작
2. Storage wrapper 테스트
3. Type definitions 검증
4. Logger + PII masking 구현

