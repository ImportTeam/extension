# 개발 워크플로우 가이드

> Sprint 시작부터 배포까지 단계별 가이드

## 📋 즉시 수행할 작업 (우선순위)

### Phase 1: 기본 인프라 (Week 1)

#### 1. Storage Wrapper 구현 ✅

**파일**: `src/shared/storage.ts`

```bash
# 1. 파일 생성
touch src/shared/storage.ts

# 2. Copilot 프롬프트 사용하여 코드 생성
# docs/copilot-prompts.md 참조

# 3. 테스트 작성
touch tests/unit/storage.test.ts

# 4. 테스트 실행
pnpm test tests/unit/storage.test.ts
```

**완료 조건**:
- [ ] `storage.get()`, `set()`, `remove()`, `clear()` 구현
- [ ] 모든 함수 Promise 반환
- [ ] 에러 처리 포함
- [ ] Unit test 작성 및 통과

---

#### 2. Task Queue 구현 (최우선)

**파일**: `src/background/taskQueue.ts`

```bash
# 1. Types 정의
cat > src/shared/types.ts << 'EOF'
export type Task = {
  id: string;
  type: string;
  payload: any;
  attempts?: number;
  createdAt: number;
};
EOF

# 2. Task Queue 구현
touch src/background/taskQueue.ts
# Copilot 프롬프트로 enqueueTask, processQueue 생성

# 3. 동시성 테스트 작성
touch tests/unit/taskQueue.test.ts

# 4. 테스트 실행
pnpm test tests/unit/taskQueue.test.ts
```

**완료 조건**:
- [ ] `enqueueTask()` versioned-atomic 구현
- [ ] `processQueue()` FIFO 처리 구현
- [ ] 동시 enqueue 1000회 테스트 통과
- [ ] Service Worker 재시작 시나리오 테스트 통과
- [ ] Coverage 90% 이상

---

#### 3. Queue Processor + Alarms

**파일**: `src/background/queueProcessor.ts`

```bash
# 1. Task Handlers 구현
touch src/background/taskHandlers.ts

# 2. Queue Processor 구현
touch src/background/queueProcessor.ts

# 3. Background Entry Point
touch src/background/index.ts
```

**완료 조건**:
- [ ] Alarms 핸들러 구현
- [ ] Message 핸들러 구현
- [ ] onInstalled 핸들러 구현
- [ ] 수동 트리거 동작 확인

---

#### 4. Offscreen Manager 구현

**파일**: `src/background/offscreenManager.ts`

```bash
# 1. Offscreen Manager 구현
touch src/background/offscreenManager.ts

# 2. Offscreen Document 생성
mkdir -p src/offscreen
touch src/offscreen/offscreen.html
touch src/offscreen/offscreen.ts

# 3. 테스트 작성
touch tests/unit/offscreenManager.test.ts
```

**완료 조건**:
- [ ] Singleton 패턴 구현
- [ ] Queue 직렬 처리 구현
- [ ] 동시 요청 테스트 통과
- [ ] Lifecycle 관리 확인

---

### Phase 2: Parser & Content (Week 2)

#### 5. Base Parser 구현

**파일**: `src/content/parsers/baseParser.ts`

```bash
# 1. Base Parser 추상 클래스
touch src/content/parsers/baseParser.ts

# 2. Fallback Parser
touch src/content/parsers/fallbackParser.ts

# 3. HTML Fixtures 수집
mkdir -p fixtures/html
# 실제 사이트에서 HTML 저장
```

**완료 조건**:
- [ ] BaseParser 추상 클래스 구현
- [ ] `extractAmount()`, `extractCurrency()` 유틸 구현
- [ ] FallbackParser 텍스트 휴리스틱 구현
- [ ] HTML fixture 3개 이상 수집

---

#### 6. Site-specific Parsers

**파일**: `src/content/parsers/{site}Parser.ts`

```bash
# 각 사이트별 Parser 구현
touch src/content/parsers/coupangParser.ts
touch src/content/parsers/naverParser.ts
touch src/content/parsers/gmarketParser.ts

# 테스트 작성
touch tests/unit/parsers.test.ts
```

**완료 조건**:
- [ ] Coupang Parser 구현 (accuracy >= 95%)
- [ ] Naver Parser 구현 (accuracy >= 95%)
- [ ] Gmarket Parser 구현 (accuracy >= 95%)
- [ ] 각 Parser 테스트 작성 및 통과
- [ ] Confidence score 로직 구현

---

#### 7. Content Script + Overlay

**파일**: `src/content/index.ts`, `src/content/overlay.tsx`

```bash
# 1. Content Script Entry
touch src/content/index.ts

# 2. Overlay Component
touch src/content/overlay.tsx

# 3. DOMPurify 설치
pnpm add dompurify
pnpm add -D @types/dompurify
```

**완료 조건**:
- [ ] Checkout 페이지 감지 로직 구현
- [ ] Shadow DOM 마운트 구현
- [ ] DOMPurify sanitization 적용
- [ ] Background 메시지 통신 구현
- [ ] 로컬 테스트 통과

---

### Phase 3: UI & State (Week 3)

#### 8. Popup UI

**파일**: `src/popup/App.tsx`, `src/popup/store/index.ts`

```bash
# 1. Zustand store 설정
pnpm add zustand

# 2. Popup UI 구현
touch src/popup/App.tsx
touch src/popup/store/index.ts

# 3. TailwindCSS 설정
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**완료 조건**:
- [ ] Zustand store 구현
- [ ] Storage sync middleware 구현
- [ ] Popup UI 컴포넌트 구현
- [ ] TailwindCSS 스타일링 완료

---

### Phase 4: Background Logic (Week 4)

#### 9. Rate Engine

**파일**: `src/background/rateEngine/index.ts`

```bash
mkdir -p src/background/rateEngine
touch src/background/rateEngine/index.ts
touch src/background/rateEngine/cache.ts
touch src/background/rateEngine/calculator.ts
```

**완료 조건**:
- [ ] 환율 API 통합
- [ ] 캐싱 전략 구현 (TTL 1시간)
- [ ] Fallback 로직 구현
- [ ] Rate calculation 테스트 통과

---

#### 10. Recommendation Engine

**파일**: `src/background/recommendationEngine.ts`

```bash
touch src/background/recommendationEngine.ts
touch tests/integration/recommendation.test.ts
```

**완료 조건**:
- [ ] 수수료 계산 로직 구현
- [ ] 결제 수단 비교 알고리즘 구현
- [ ] Recommendation 생성 로직 구현
- [ ] Integration test 작성 및 통과

---

## 🔄 커밋 & 브랜치 규칙

### 브랜치 네이밍

```bash
# Feature
git checkout -b feature/task-queue-implementation

# Fix
git checkout -b fix/parser-accuracy-improvement

# Hotfix
git checkout -b hotfix/critical-security-issue
```

### 커밋 메시지 형식

```
type(scope): subject

body (optional)

footer (optional)
```

**Types**:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드/설정 변경

**예시**:

```bash
git commit -m "feat(taskQueue): add versioned enqueue with retry"

git commit -m "fix(parser): improve Coupang amount extraction accuracy

- Change selector from .price to .total-price
- Add fallback for mobile layout
- Increase confidence score to 0.95

Closes #123"

git commit -m "test(queue): add concurrent enqueue test

Verify that 1000 concurrent enqueues all succeed
and maintain queue integrity."
```

---

## 📝 PR 워크플로우

### 1. PR 생성 전 체크리스트

```bash
# 1. 로컬 테스트 실행
pnpm lint
pnpm type-check
pnpm test
pnpm build

# 2. 변경 사항 확인
git status
git diff

# 3. 커밋 정리 (필요시)
git rebase -i main
```

### 2. PR 생성

```bash
# 1. 브랜치 푸시
git push origin feature/task-queue-implementation

# 2. GitHub에서 PR 생성
# - PR 템플릿 자동 로드됨
# - 모든 체크박스 확인
# - 스크린샷 첨부 (UI 변경 시)

# 3. 리뷰어 지정
# - 코드 리뷰어: 1명 이상
# - QA 리뷰어: 1명 (기능 변경 시)
```

### 3. 리뷰 대응

```bash
# 1. 피드백 반영
git add .
git commit -m "fix: address review comments"

# 2. 푸시
git push origin feature/task-queue-implementation

# 3. 리뷰어에게 알림
# GitHub에서 "Re-request review" 클릭
```

### 4. 머지

```bash
# 머지 조건 확인:
# ✅ CI 통과
# ✅ 코드 리뷰 승인
# ✅ QA 승인 (기능 변경 시)
# ✅ QA 체크리스트 Critical 항목 모두 체크

# Squash and merge 권장
```

---

## 🧪 테스트 워크플로우

### 로컬 테스트

```bash
# Unit tests (watch mode)
pnpm test:watch

# Unit tests (single run)
pnpm test

# Coverage
pnpm test:coverage

# E2E tests
pnpm build
pnpm test:e2e

# Specific test file
pnpm test tests/unit/taskQueue.test.ts
```

### CI 테스트

```bash
# PR 생성 시 자동 실행:
# 1. Lint
# 2. Type check
# 3. Unit tests
# 4. Build
# 5. E2E tests
# 6. Security check

# 로컬에서 CI 시뮬레이션
pnpm lint && pnpm type-check && pnpm test && pnpm build
```

---

## 🚀 배포 워크플로우

### 1. 버전 업데이트

```bash
# package.json과 manifest.json 버전 동기화
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### 2. Changelog 작성

```bash
# CHANGELOG.md 업데이트
cat >> CHANGELOG.md << 'EOF'
## [1.0.1] - 2025-01-15

### Added
- Task queue versioned enqueue
- Coupang parser

### Fixed
- Parser accuracy improvement

### Security
- Add DOMPurify sanitization
EOF
```

### 3. 릴리즈 생성

```bash
# 1. 커밋 및 태그
git add package.json src/manifest.json CHANGELOG.md
git commit -m "chore: bump version to 1.0.1"
git tag v1.0.1

# 2. 푸시
git push origin main
git push origin v1.0.1

# 3. GitHub Actions가 자동으로:
#    - 빌드
#    - 테스트
#    - extension.zip 생성
#    - GitHub Release 생성
```

### 4. Chrome Web Store 업로드

```bash
# 수동 업로드 (첫 릴리즈)
# 1. GitHub Release에서 extension.zip 다운로드
# 2. Chrome Web Store Developer Dashboard 접속
# 3. 업로드 및 제출

# 자동 업로드 (설정 후)
# GitHub Actions가 자동으로 업로드
```

### 5. Staged Rollout

```
1% → 관찰 (24시간)
  ↓ 문제 없으면
10% → 관찰 (48시간)
  ↓ 문제 없으면
50% → 관찰 (24시간)
  ↓ 문제 없으면
100% → 전체 배포
```

---

## 📊 모니터링 워크플로우

### 배포 후 첫 24시간

```bash
# 1. 에러 모니터링
# - Error rate < 1%
# - Crash-free rate > 99%

# 2. 사용자 피드백
# - Chrome Web Store reviews 확인
# - GitHub Issues 확인

# 3. 메트릭 확인
# - Install count
# - Active users
# - Recommendation acceptance rate
```

### Rollback 기준

다음 중 하나라도 발생 시 즉시 롤백:

- Error rate > 5%
- Crash-free rate < 95%
- Critical security issue 발견
- Chrome Web Store policy violation

```bash
# Rollback 절차
# 1. Chrome Web Store에서 이전 버전으로 롤백
# 2. Hotfix 브랜치 생성
git checkout -b hotfix/critical-issue v1.0.0

# 3. 수정 후 재배포
```

---

## 🎯 QA에게 보낼 요약

> 이 리포지토리는 **MV3 제약(서비스워커 unload, alarms 1분 이상, 단일 offscreen)**을 반영해 버전 기반 atomic storage queue, alarms + optional keepalive, offscreen singleton 패턴으로 설계되었으며, 모든 외부 입력은 DOMPurify로 sanitize하고 API 키는 background/backend로만 제한합니다.
>
> **QA는 다음만 중점 검증하면 됩니다:**
> 1. ✅ enqueue race condition (동시 1000회)
> 2. ✅ SW 재시작 후 queue 복구
> 3. ✅ Offscreen 동시성 (직렬 처리)
> 4. ✅ CSP 위반 여부 (DevTools 확인)

---

## 📚 참고 문서

### 내부 문서 (작성 필요)

- [ ] MV3 Background Service Worker 생명주기 설명
- [ ] Chrome extension host_permissions 심사 가이드
- [ ] Data handling & PII masking 규칙
- [ ] Playwright extension testing 가이드

### 외부 문서

- [Chrome Extension MV3 Migration](https://developer.chrome.com/docs/extensions/migrating/)
- [Service Worker Lifecycle](https://developer.chrome.com/docs/extensions/mv3/service_workers/)
- [Offscreen Documents](https://developer.chrome.com/docs/extensions/reference/offscreen/)

---

## 다음 단계

1. **Phase 1 시작**: [Task Queue 구현](./task-queue.md)
2. **Copilot 활용**: [Copilot 프롬프트 가이드](./copilot-prompts.md)
3. **테스트 작성**: [테스팅 전략](./testing.md)
