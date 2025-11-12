# Sprint 체크리스트

> 주차별 완료 항목 체크리스트

## Week 1: 기본 인프라

### Storage Wrapper
- [ ] `src/shared/storage.ts` 구현
- [ ] Unit test 작성
- [ ] 모든 테스트 통과

### Task Queue
- [ ] `src/background/taskQueue.ts` 구현
- [ ] Versioned-atomic enqueue
- [ ] FIFO processQueue
- [ ] 동시성 테스트 통과 (1000회)
- [ ] Coverage 90%+

### Queue Processor
- [ ] `src/background/queueProcessor.ts` 구현
- [ ] Alarms 핸들러
- [ ] Message 핸들러
- [ ] Background entry point

### Offscreen Manager
- [ ] `src/background/offscreenManager.ts` 구현
- [ ] Singleton 패턴
- [ ] Queue 직렬 처리
- [ ] Lifecycle 테스트

---

## Week 2: Parser & Content

### Base Parser
- [ ] `src/content/parsers/baseParser.ts` 구현
- [ ] `extractAmount()`, `extractCurrency()` 유틸
- [ ] FallbackParser 구현
- [ ] HTML fixtures 수집 (3개+)

### Site Parsers
- [ ] CoupangParser (accuracy >= 95%)
- [ ] NaverParser (accuracy >= 95%)
- [ ] GmarketParser (accuracy >= 95%)
- [ ] Parser 테스트 작성

### Content Script
- [ ] `src/content/index.ts` 구현
- [ ] Checkout 페이지 감지
- [ ] Shadow DOM 마운트
- [ ] DOMPurify sanitization
- [ ] Background 통신

---

## Week 3: UI & State

### Popup UI
- [ ] Zustand store 구현
- [ ] Storage sync middleware
- [ ] Popup 컴포넌트
- [ ] TailwindCSS 스타일링

---

## Week 4: Background Logic

### Rate Engine
- [ ] 환율 API 통합
- [ ] 캐싱 (TTL 1시간)
- [ ] Fallback 로직

### Recommendation
- [ ] 수수료 계산
- [ ] 결제 수단 비교
- [ ] Integration test

---

## QA Critical 체크리스트

- [ ] enqueue race (1000회)
- [ ] SW 재시작 복구
- [ ] Offscreen 동시성
- [ ] CSP 위반 0건
- [ ] API key 노출 없음
- [ ] PII 마스킹 동작
