# Production-grade Chrome Extension 아키텍처

## 1. 전체 아키텍처

```
User's Checkout Page (Web)
    └─ Content Script (DOM parse + lightweight overlay)
            ↕ chrome.runtime.sendMessage / Port
    └─ Popup (React + Zustand)  <─> Background via storage/message

Background Service Worker (MV3)
 ├─ Persistent Task Queue (storage-backed, versioned)
 ├─ Queue Processor (alarms-triggered / onConnect / manual)
 ├─ Offscreen Manager (singleton, queued tasks)
 ├─ Rate/Discount Engine (환율·수수료 계산)
 ├─ API Adapter (backend proxy recommended)
 └─ Logger / Metrics (batch send, PII-masking)

Storage Layer
 ├─ chrome.storage.local (config, small cache, queue meta)
 └─ IndexedDB (large caches, snapshots, parser data)

Optional Backend
 ├─ Rate proxy + cache (Redis)
 └─ Auth, admin, analytics (비민감 데이터)

CI/CD / QA / Monitoring
 ├─ Vitest (unit), Playwright (E2E), GitHub Actions
 └─ Sentry-like or custom logging (PII 마스킹)
```

## 2. 핵심 설계 요소

### 2.1 기술 스택
- **Manifest V3 (MV3)**: service_worker, host_permissions 최소화, optional_permissions 사용
- **UI**: React + Vite + TypeScript, Shadow DOM으로 Overlay 격리
- **State**: Zustand (popup) + chrome.storage sync via middleware
- **Queue**: storage-backed, versioned atomic updates + retry/backoff
- **Worker wake**: alarms (1min min) + runtime.Port keepalive (주의: 배터리 / 스토어 판단 필요)
- **Offscreen**: singleton manager with internal queue

### 2.2 보안
- **CSP**: `script-src 'self'`, no CDN
- **DOMPurify**: 모든 외부/사용자 입력 sanitize
- **API keys**: background/backend only (never content)
- **Shadow DOM**: `mode: closed` + style reset

### 2.3 테스팅
- **Unit**: Vitest (parser, discount calc, queue)
- **E2E**: Playwright with extension context
- **CI**: GitHub Actions build + pack + upload

## 3. 디렉토리 구조

```
/src
 ├─ background/
 │   ├─ index.ts                      // service worker entry
 │   ├─ taskQueue.ts                  // persistent queue + atomic enqueue
 │   ├─ queueProcessor.ts             // alarms & handlers
 │   ├─ offscreenManager.ts
 │   ├─ rateEngine/
 │   └─ logger.ts
 ├─ content/
 │   ├─ index.ts                      // entry
 │   ├─ parsers/
 │   │   ├─ baseParser.ts
 │   │   ├─ coupangParser.ts
 │   │   └─ naverParser.ts
 │   └─ overlay.tsx                   // Shadow DOM mount
 ├─ popup/
 │   ├─ index.html
 │   ├─ App.tsx
 │   └─ store/
 ├─ options/
 ├─ shared/
 │   ├─ storage.ts                    // wrapper (promisified)
 │   ├─ types.ts
 │   └─ messaging.ts
 ├─ offscreen/
 │   └─ offscreen.html + offscreen.js  // long-running parsing UI worker
 ├─ manifest.json
 └─ vite.config.ts
```

## 4. Manifest & Permissions

### 4.1 권장 Manifest 샘플

```json
{
  "manifest_version": 3,
  "name": "PicSel",
  "version": "1.0.0",
  "description": "Best payment method recommendation",
  "permissions": ["storage", "scripting", "activeTab"],
  "optional_permissions": ["alarms", "notifications"],
  "host_permissions": [
    "https://www.coupang.com/checkout/*",
    "https://order.pay.naver.com/*",
    "https://checkout.gmarket.co.kr/*"
  ],
  "background": {
    "service_worker": "background/index.js"
  },
  "action": {
    "default_popup": "popup/index.html"
  },
  "content_scripts": [
    {
      "matches": ["https://*.coupang.com/*", "https://order.pay.naver.com/*"],
      "js": ["content/index.js"],
      "run_at": "document_idle"
    }
  ],
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

### 4.2 권한 최소화 원칙
- `host_permissions`는 기능에 필요한 정확한 path로 좁힌다
- `optional_host_permissions`로 확장 가능
- 민감한 권한은 optional로 설정하고 runtime에 요청

## 5. 데이터 흐름

### 5.1 결제 페이지 감지 → 추천
1. Content Script가 checkout page 감지
2. 기본 정보 추출 (금액, 통화, 결제 옵션)
3. Background로 메시지 전송
4. Background가 Task Queue에 enqueue
5. Queue Processor가 처리 (환율 조회, 수수료 계산)
6. 결과를 storage에 저장
7. Content Script가 overlay에 표시

### 5.2 Popup 설정 변경
1. Popup UI에서 설정 변경
2. Zustand store 업데이트
3. Storage middleware가 chrome.storage에 sync
4. Background가 storage change 감지
5. 필요시 재계산 트리거

## 6. 캐싱 전략

### 6.1 환율 데이터
- **Backend proxy + Redis cache** (TTL 10–60min)
- **Client**: background fetch to backend `/api/rates` → storage cache (timestamp)
- **Fallback**: 로컬 하드코딩(이전 값) + 사용자 알림("환율 임시 불가")

### 6.2 Parser 데이터
- **IndexedDB**: HTML 스냅샷, parser 결과
- **TTL**: 사이트별 설정 (일반적으로 1시간)
- **Invalidation**: 사이트 구조 변경 감지 시

## 7. 에러 처리 & 복구

### 7.1 Service Worker Restart
- Queue는 storage-backed이므로 자동 복구
- Alarms는 persistent하므로 재등록 불필요
- Offscreen manager는 재초기화

### 7.2 네트워크 에러
- Exponential backoff retry (max 5회)
- Fallback to cached data
- 사용자에게 명확한 에러 메시지

### 7.3 Parser 실패
- Fallback to text heuristic
- Confidence score 표시
- 사용자 피드백 수집

## 8. 성능 최적화

### 8.1 Content Script
- Lightweight: DOM parse만 수행
- Heavy computation은 background로 위임
- Shadow DOM으로 style isolation

### 8.2 Background
- Batch processing: 여러 task를 한 번에 처리
- Debounce: 중복 요청 방지
- Lazy loading: 필요시에만 module load

### 8.3 Storage
- IndexedDB for large data
- chrome.storage.local for config
- Compression for snapshots

## 9. 모니터링 & 로깅

### 9.1 로깅 전략
- **Batch logging**: 주기적으로 backend에 전송
- **PII masking**: 개인정보 자동 마스킹
- **Error tracking**: Critical error는 즉시 전송

### 9.2 메트릭
- Installs, active users
- Recommendation acceptance rate
- API error rate
- Queue failure counts
- Parser accuracy per site

## 10. 보안 체크리스트

- [ ] CSP: 모든 extension pages `script-src 'self'`
- [ ] No external CDN scripts/styles
- [ ] Shadow DOM mode: `closed` + style reset (`:host{all:initial}`)
- [ ] DOMPurify 사용: 모든 외부/사용자 입력 sanitize
- [ ] API Keys: background or backend-only (never content)
- [ ] Data minimization & PII masking in logs
- [ ] HTTPS-only host_permissions
- [ ] Input validation on all message handlers
- [ ] Rate limiting on API calls
- [ ] Secure storage of sensitive data
