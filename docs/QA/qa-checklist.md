# QA 체크리스트

> 릴리즈 전 필수 검증 항목

## Critical (필수 통과)

### 동시성 & 안정성
- [ ] Task Queue 동시 enqueue 1000회 테스트 통과
- [ ] Service Worker 재시작 후 Queue 100% 복구
- [ ] Alarms 최소 1분 간격 정책 준수
- [ ] Offscreen single-instance 동작 확인 (동시 요청 시 직렬 처리)

### 보안
- [ ] CSP violations 0건
- [ ] No external CDN scripts/styles
- [ ] Shadow DOM `mode: closed` 적용
- [ ] DOMPurify 모든 외부 입력 sanitize
- [ ] API keys background-only (content에 노출 없음)
- [ ] HTTPS-only host_permissions

### 권한
- [ ] Manifest permissions 최소화 확인
- [ ] Optional permissions UI flow 검증
- [ ] 권한 거부 시 graceful degradation

## High (중요)

### 기능
- [ ] Parser accuracy >= 95% (지원 사이트별)
- [ ] 환율 캐싱 hit ratio > 95%
- [ ] Recommendation 정확도 검증

### 테스트
- [ ] Unit test coverage >= 80%
- [ ] E2E core flows 95% pass
- [ ] Service Worker 시나리오 테스트 통과

### 성능
- [ ] Content Script 로드 시간 < 100ms
- [ ] Overlay 렌더링 < 200ms
- [ ] Background 처리 시간 < 1s

## Medium (권장)

### 코드 품질
- [ ] TypeScript strict mode
- [ ] ESLint 0 errors
- [ ] Prettier formatting

### 모니터링
- [ ] Logging pipeline 동작 확인
- [ ] PII masking 검증
- [ ] Metrics 수집 확인

### 문서
- [ ] README 최신화
- [ ] API 문서 작성
- [ ] 릴리즈 노트 작성

## Chrome Web Store 제출

### 필수 자료
- [ ] Privacy policy URL
- [ ] Screenshots (1280x800, 최소 1개)
- [ ] Promotional images (440x280)
- [ ] Detailed description (한글/영문)
- [ ] Permissions justification

### 검토 대비
- [ ] Host permissions 사유 명확화
- [ ] Optional permissions 설명
- [ ] 데이터 수집 정책 명시

## 배포 전 최종 확인

- [ ] Version bump (manifest.json, package.json)
- [ ] Changelog 업데이트
- [ ] Git tag 생성
- [ ] CI/CD 빌드 성공
- [ ] Staging 환경 테스트 (beta users)

## 배포 후 모니터링

### 첫 24시간
- [ ] Install count 확인
- [ ] Error rate < 1%
- [ ] Crash-free rate > 99%
- [ ] User reviews 모니터링

### 첫 1주일
- [ ] Active users 추이
- [ ] Recommendation acceptance rate
- [ ] Parser failure rate per site
- [ ] API error rate

## Rollback 기준

다음 중 하나라도 발생 시 즉시 롤백:
- Error rate > 5%
- Crash-free rate < 95%
- Critical security issue 발견
- Chrome Web Store policy violation

## 다음 단계

- [CI/CD 파이프라인](./cicd.md)
- [모니터링 & 로깅](./monitoring.md)
