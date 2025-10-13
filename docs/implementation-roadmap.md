# 구현 로드맵

> 단계별 개발 가이드 (10주 계획)

## Phase 1: Core Infrastructure (Week 1-2)

### Week 1: Storage & Queue
- [ ] Storage wrapper 구현 (`src/shared/storage.ts`)
- [ ] Task Queue 구현 (`src/background/taskQueue.ts`)
- [ ] Unit tests 작성 (동시성 테스트 포함)
- [ ] Queue Processor 기본 구조

**산출물**:
- `src/shared/storage.ts`
- `src/background/taskQueue.ts`
- `tests/unit/taskQueue.test.ts`

### Week 2: Service Worker & Offscreen
- [ ] Background Service Worker entry point
- [ ] Alarms 통합
- [ ] Offscreen Manager 구현
- [ ] Offscreen Document 구현
- [ ] Integration tests

**산출물**:
- `src/background/index.ts`
- `src/background/offscreenManager.ts`
- `src/offscreen/offscreen.html`
- `src/offscreen/offscreen.js`

## Phase 2: Parser & Content (Week 3-4)

### Week 3: Base Parser
- [ ] Base Parser 추상 클래스
- [ ] Fallback Parser (텍스트 휴리스틱)
- [ ] Parser 테스트 프레임워크
- [ ] HTML 스냅샷 fixture 수집

**산출물**:
- `src/content/parsers/baseParser.ts`
- `src/content/parsers/fallbackParser.ts`
- `tests/fixtures/`

### Week 4: Site-specific Parsers
- [ ] Coupang Parser
- [ ] Naver Parser
- [ ] Gmarket Parser
- [ ] Parser accuracy 검증 (>95%)

**산출물**:
- `src/content/parsers/coupangParser.ts`
- `src/content/parsers/naverParser.ts`
- `src/content/parsers/gmarketParser.ts`

## Phase 3: UI & Content Script (Week 5-6)

### Week 5: Content Script
- [ ] Content Script entry point
- [ ] Checkout page 감지 로직
- [ ] Parser 호출 및 데이터 전송
- [ ] Shadow DOM 기본 구조

**산출물**:
- `src/content/index.ts`
- `src/content/overlay.tsx`

### Week 6: Popup UI
- [ ] React + Vite 설정
- [ ] Zustand store 구현
- [ ] Storage sync middleware
- [ ] Popup UI 컴포넌트
- [ ] TailwindCSS 스타일링

**산출물**:
- `src/popup/App.tsx`
- `src/popup/store/`
- `src/popup/components/`

## Phase 4: Background Logic (Week 7-8)

### Week 7: Rate Engine
- [ ] 환율 API 통합
- [ ] 캐싱 전략 구현
- [ ] Fallback 로직
- [ ] Rate calculation tests

**산출물**:
- `src/background/rateEngine/`
- `src/background/rateEngine/cache.ts`
- `src/background/rateEngine/calculator.ts`

### Week 8: Recommendation Engine
- [ ] 수수료 계산 로직
- [ ] 결제 수단 비교 알고리즘
- [ ] Recommendation 생성
- [ ] Integration tests

**산출물**:
- `src/background/recommendationEngine.ts`
- `tests/integration/recommendation.test.ts`

## Phase 5: Testing & QA (Week 9-10)

### Week 9: Comprehensive Testing
- [ ] Unit test coverage 80%+ 달성
- [ ] E2E scenarios 작성 (Playwright)
- [ ] Service Worker restart 시나리오
- [ ] Performance testing
- [ ] Security audit

**산출물**:
- `tests/e2e/`
- Coverage report
- Performance report

### Week 10: QA & Polish
- [ ] QA 체크리스트 통과
- [ ] Bug fixes
- [ ] Documentation 완성
- [ ] Chrome Web Store 자료 준비
- [ ] Beta testing (100 users)

**산출물**:
- Privacy policy
- Screenshots
- Promotional images
- Detailed description

## Phase 6: Release (Week 11)

### Week 11: Deployment
- [ ] CI/CD 파이프라인 구성
- [ ] GitHub Actions workflows
- [ ] Chrome Web Store 제출
- [ ] Monitoring 설정
- [ ] Release notes 작성

**산출물**:
- `.github/workflows/`
- Chrome Web Store listing
- v1.0.0 release

## Post-Release

### Week 12+: Monitoring & Iteration
- [ ] 사용자 피드백 수집
- [ ] 메트릭 분석
- [ ] Bug fixes
- [ ] Feature requests 우선순위화
- [ ] v1.1.0 계획

## 체크포인트

### Week 2 체크포인트
- ✅ Task Queue 동시성 테스트 통과
- ✅ Offscreen Manager 동작 확인

### Week 4 체크포인트
- ✅ Parser accuracy >= 95% (3개 사이트)
- ✅ HTML 스냅샷 테스트 통과

### Week 6 체크포인트
- ✅ Content Script 동작 확인
- ✅ Popup UI 기본 기능 완성

### Week 8 체크포인트
- ✅ End-to-end flow 동작 확인
- ✅ Recommendation 정확도 검증

### Week 10 체크포인트
- ✅ QA 체크리스트 Critical 항목 100% 통과
- ✅ Beta testing 피드백 반영

## 리소스 할당

| Phase | 개발자 | 시간 (주) |
|-------|--------|----------|
| Phase 1 | Backend Dev | 2 |
| Phase 2 | Frontend Dev | 2 |
| Phase 3 | Frontend Dev | 2 |
| Phase 4 | Backend Dev | 2 |
| Phase 5 | QA + Dev | 2 |
| Phase 6 | DevOps + Dev | 1 |

## 위험 요소

### High Risk
- **Service Worker 수명 관리**: Alarms 제약, keepalive 전략
- **Parser 정확도**: 사이트 구조 변경 대응
- **Chrome Web Store 승인**: 권한 justification

### Medium Risk
- **성능**: Content Script 로드 시간
- **보안**: CSP 준수, PII 마스킹
- **테스트**: E2E 환경 구성

### Mitigation
- Early prototyping (Week 1-2)
- Continuous testing
- Security review (Week 9)
- Beta testing (Week 10)

## 다음 단계

시작하려면:
1. [Task Queue 구현](./task-queue.md)
2. [Offscreen Manager 구현](./offscreen-manager.md)
3. [테스팅 전략](./testing.md)
