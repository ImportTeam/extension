# Production-grade Chrome Extension 설계 문서

> **PayWise** - 최적 결제 수단 추천 확장 프로그램  
> Manifest V3 기반 Production-ready 아키텍처 및 구현 가이드

## 📋 목차

### 🚀 시작하기
- **[Copilot 개발 가이드](./copilot-guide.md)** ⭐ - GitHub Copilot으로 정확히 구현하는 방법
- **[개발 워크플로우](./development-workflow.md)** - Sprint 시작부터 배포까지
- **[Sprint 체크리스트](./sprint-checklist.md)** - 주차별 완료 항목

### 핵심 문서
- **[아키텍처 개요](./architecture.md)** - 전체 시스템 구조 및 설계 원칙
- **[구현 로드맵](./implementation-roadmap.md)** - 단계별 개발 가이드

### 구현 가이드
1. **[Task Queue 구현](./task-queue.md)** - Persistent, 동시성 안전한 작업 큐
2. **[Offscreen Manager 구현](./offscreen-manager.md)** - Singleton 오프스크린 관리자
3. **[Parser 전략](./parser-strategy.md)** - 플러그인형 사이트별 파서
4. **[Content Script & Overlay](./content-script.md)** - Shadow DOM 기반 UI
5. **[Background Service Worker](./background-worker.md)** - 환율 엔진 및 메시지 처리

### 개발자 도구
- **[코드 템플릿](./code-templates.md)** - 복사-붙여넣기 가능한 설정 파일
- **[Copilot 프롬프트](./copilot-prompts.md)** - 정확한 코드 생성 프롬프트 모음

### 보안 & 품질
- **[보안 가이드](./security.md)** - CSP, DOMPurify, 권한 최소화
- **[테스팅 전략](./testing.md)** - Unit, E2E, Service Worker 시나리오
- **[QA 체크리스트](./qa-checklist.md)** - 릴리즈 전 필수 검증 항목

### 운영
- **[CI/CD 파이프라인](./cicd.md)** - GitHub Actions 기반 자동화
- **[모니터링 & 로깅](./monitoring.md)** - PII 마스킹, 메트릭 수집

## 🎯 핵심 설계 원칙

### 1. 동시성 안전 (Concurrency-Safe)
- Storage-backed versioned task queue
- Atomic enqueue/dequeue with retry
- Race condition 완화

### 2. Manifest V3 제약 대응
- Alarms 최소 1분 간격 제약
- Service Worker 수명 관리
- Offscreen single-instance 제약

### 3. 보안 우선 (Security-First)
- CSP `script-src 'self'`
- Shadow DOM `mode: closed`
- API keys in background only
- PII masking in logs

### 4. 테스트 가능성 (Testability)
- Unit: Vitest (80%+ coverage)
- E2E: Playwright with extension context
- CI: Automated build + test

## 🚀 빠른 시작

### 전제 조건
- Node.js 18+
- pnpm 8+
- Chrome 120+

### 개발 환경 설정
```bash
# 의존성 설치
pnpm install

# 개발 모드 실행
pnpm dev

# 빌드
pnpm build

# 테스트
pnpm test
pnpm test:e2e
```

### Chrome에 로드
1. `chrome://extensions` 접속
2. "개발자 모드" 활성화
3. "압축해제된 확장 프로그램을 로드합니다" 클릭
4. `dist/` 디렉토리 선택

## 📊 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                    User's Checkout Page                  │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐      ┌────────▼────────┐
│ Content Script │      │  Popup (React)  │
│  + Overlay     │      │   + Zustand     │
└───────┬────────┘      └────────┬────────┘
        │                        │
        └────────────┬───────────┘
                     │ chrome.runtime.sendMessage
        ┌────────────▼────────────────────────┐
        │   Background Service Worker (MV3)   │
        ├─────────────────────────────────────┤
        │ • Persistent Task Queue             │
        │ • Queue Processor (alarms)          │
        │ • Offscreen Manager                 │
        │ • Rate/Discount Engine              │
        │ • Logger & Metrics                  │
        └────────────┬────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐      ┌────────▼────────┐
│ chrome.storage │      │   IndexedDB     │
│   + local      │      │  (large cache)  │
└────────────────┘      └─────────────────┘
```

## 🛠️ 기술 스택

| 레이어 | 기술 |
|--------|------|
| **Manifest** | V3 (service_worker) |
| **UI** | React 18 + TypeScript + Vite |
| **State** | Zustand + chrome.storage middleware |
| **Styling** | TailwindCSS + Shadow DOM |
| **Testing** | Vitest + Playwright |
| **CI/CD** | GitHub Actions |
| **Backend** | Optional (환율 proxy + Redis) |

## 📦 디렉토리 구조

```
/src
 ├─ background/         # Service Worker
 ├─ content/            # Content Scripts + Parsers
 ├─ popup/              # Popup UI (React)
 ├─ options/            # Options Page
 ├─ offscreen/          # Offscreen Document
 ├─ shared/             # 공통 유틸리티
 └─ manifest.json

/docs                   # 이 문서들
/tests                  # 테스트 파일
/scripts                # 빌드/배포 스크립트
```

## 🔐 보안 체크리스트 (요약)

- [x] CSP `script-src 'self'`
- [x] No external CDN
- [x] Shadow DOM `closed` mode
- [x] DOMPurify for all external input
- [x] API keys in background only
- [x] PII masking in logs
- [x] HTTPS-only host_permissions

전체 체크리스트: [보안 가이드](./security.md)

## 📈 개발 로드맵

### Phase 1: Core Infrastructure (Week 1-2)
- [ ] Task Queue + 테스트
- [ ] Queue Processor + Alarms
- [ ] Offscreen Manager
- [ ] Storage wrapper

### Phase 2: Parser & Content (Week 3-4)
- [ ] Base Parser + 3개 사이트
- [ ] Content Script + Shadow DOM
- [ ] Overlay UI (React)

### Phase 3: Background Logic (Week 5-6)
- [ ] Rate Engine
- [ ] Discount Calculator
- [ ] API Adapter

### Phase 4: Testing & QA (Week 7-8)
- [ ] Unit tests (80%+ coverage)
- [ ] E2E scenarios
- [ ] Performance testing
- [ ] Security audit

### Phase 5: Release (Week 9-10)
- [ ] CI/CD pipeline
- [ ] Beta testing (100 users)
- [ ] Chrome Web Store submission
- [ ] Monitoring setup

상세 로드맵: [구현 로드맵](./implementation-roadmap.md)

## 🧪 테스팅 전략 (요약)

| 타입 | 도구 | 커버리지 목표 |
|------|------|--------------|
| Unit | Vitest | 80%+ |
| Integration | Vitest + msw | 핵심 플로우 |
| E2E | Playwright | 주요 시나리오 |
| Manual | QA Checklist | 릴리즈 전 |

상세 가이드: [테스팅 전략](./testing.md)

## 📞 지원 & 기여

### 이슈 리포팅
- GitHub Issues 사용
- 재현 단계 포함
- 스크린샷/로그 첨부

### 기여 가이드
1. Fork & Clone
2. Feature branch 생성
3. 테스트 작성 + 통과
4. PR 제출 (template 사용)

## 📄 라이선스

MIT License - 상세 내용은 [LICENSE](../LICENSE) 참조

---

**다음 단계**: [아키텍처 개요](./architecture.md)를 읽고 전체 시스템을 이해하세요.
