# 🧪 쿠팡 카드혜택 iframe 리팩토링 테스트 계획 & QA (2025)

## 📝 변경 사항 정리

### ✨ 구현 완료
1. **Content Script 클릭 감시** (`src/content/index.ts`)
   - 카드혜택 버튼 클릭 감지
   - 클릭 후 최대 15초 동안 iframe 생성 모니터링
   - 상세 로깅 추가 (클릭 감지, iframe 찾음, 메시지 전송)

2. **Background Script 강화** (`src/background/index.ts`)
   - Fetch 요청 타임아웃 처리 (10초)
   - 에러 핸들링 개선 (HTTP 상태, 네트워크 에러 등)
   - 상세 로깅 추가 (HTML 길이, 파싱 결과, 개별 카드 정보)
   - User-Agent 업그레이드 (Chrome Extension → Windows NT 환경)

3. **Manifest.json**
   - `<all_urls>` host_permissions (이미 충분함)
   - Cross-origin fetch 지원 확인

### 🔧 코드 변경 통계
- **src/content/index.ts**: +70줄 (클릭 감시 로직)
- **src/background/index.ts**: +25줄 (에러 핸들링, 로깅)
- **총 코드 추가**: ~95줄

---

## 🎯 테스트 시나리오

### 🧪 테스트 케이스 1: 일반 상품 + 카드혜택 표시 (정상 케이스)

**URL**: https://www.coupang.com/vp/products/8586262353

**기대 동작**:
1. 페이지 로드 완료
2. 콘솔에 `[main] Scroll-based iframe detection enabled...` 출력
3. 사용자가 "상세보기" 또는 "카드 혜택" 버튼 클릭
4. 콘솔에 다음 순서대로 출력:
   ```
   🖱️  [click] Detected card benefit button click: ...
   ✨ [click-detected] Card-benefit iframe found after click!
   📡 [CardBenefit] Sending fetch request with credentials...
   ✅ [CardBenefit] Received HTML: XXXX chars
   📊 [CardBenefit] Parsed 9 benefits from iframe
   [0] 카드: 와우카드, 할인: 1%, 혜택: ...
   [1] 카드: KB국민카드, 할인: 1%, 혜택: ...
   ...
   💾 [CardBenefit] Saved 9 benefits to storage
   ```

**검증 기준**:
- ✅ 9개 이상의 카드 혜택 감지
- ✅ 각 카드에 할인율이 포함됨
- ✅ Chrome Storage에 저장됨 (DevTools > Application > Storage > Local)
- ✅ SubPopup에 카드 목록 표시됨

**실패 시나리오**:
- ❌ 버튼을 클릭해도 iframe이 감지되지 않음
  - **원인**: 클릭 감시가 작동하지 않거나 iframe이 다른 방식으로 생성됨
  - **해결**: DevTools에서 실제 클릭 시 어떤 요소가 활성화되는지 확인

- ❌ iframe은 감지되지만 HTTP 에러
  - **원인**: Cross-origin 제약 또는 쿠팡 세션 만료
  - **로그**: `❌ [CardBenefit] HTTP 403 Forbidden`
  - **해결**: `credentials: 'include'` 확인, 쿠팡 재로그인

- ❌ 파싱 결과: 0개
  - **원인**: HTML 구조 변경 또는 regex 패턴 미스매치
  - **로그**: `⚠️ [CardBenefit] No benefits parsed from HTML`
  - **해결**: 실제 HTML을 DevTools에서 확인, regex 패턴 업데이트

---

### 🧪 테스트 케이스 2: 카드혜택이 없는 상품

**URL**: 해외배송 상품 또는 쿠팡플러스 전용 상품

**기대 동작**:
1. 페이지 로드 완료
2. 카드 혜택 섹션이 없거나 버튼이 비활성화됨
3. 사용자가 버튼을 클릭해도 iframe이 생성되지 않음
4. 콘솔에:
   ```
   ⏱️ [click-detected] Timeout: iframe not found after 15000ms
   ```

**검증 기준**:
- ✅ 타임아웃 후 에러 발생하지 않음
- ✅ UI가 정상 작동 (다운)
- ✅ Chrome Storage에 empty benefits 저장 (`[]`)

---

### 🧪 테스트 케이스 3: iframe 로드 지연 (느린 네트워크)

**시뮬레이션**: DevTools > Network > Throttling: "Slow 3G"

**URL**: https://www.coupang.com/vp/products/8586262353

**기대 동작**:
1. 카드 혜택 버튼 클릭
2. iframe이 3~5초 뒤에 생성됨 (지연)
3. 콘솔에:
   ```
   🖱️  [click] Detected card benefit button click
   🖱️  [click-detected] Checking... (count 1/30)
   🖱️  [click-detected] Checking... (count 2/30)
   ... (계속 재시도)
   ✨ [click-detected] Card-benefit iframe found after click!
   ```

**검증 기준**:
- ✅ 최대 15초까지 재시도
- ✅ iframe이 도착하면 즉시 감지
- ✅ 최종적으로 성공 (9개 카드 파싱)

---

### 🧪 테스트 케이스 4: 네트워크 실패 시나리오

**시뮬레이션**: DevTools > Network > Offline 또는 fetch 실패 강제

**기대 동작**:
1. iframe은 감지됨
2. fetch 요청 실패
3. 콘솔에:
   ```
   ❌ [CardBenefit] Fetch/Parse failed: Network error (or TypeError)
   ```

**검증 기준**:
- ✅ 에러 메시지가 명확함
- ✅ Extension이 충돌하지 않음
- ✅ UI가 정상 작동

---

## 🔍 비관적 QA (Edge Cases)

### ⚠️ 문제 1: iframe 구조 변경
**가능성**: 높음 (쿠팡이 자주 개선함)
**대응**:
- 로그에서 iframe이 감지되었는지 확인
- 감지되었으면 `iframe.src` 확인 (payment.coupang.com인지)
- 파싱 결과가 0개면 HTML 구조 변경 → regex 업데이트 필요

### ⚠️ 문제 2: Shadow DOM 사용
**가능성**: 중간 (일부 엘리먼트만)
**현재 대응**: 감지 안 됨 (향후 개선)
**로그**:
```
✨ [click-detected] Card-benefit iframe found after click!
```
이 로그가 없으면 Shadow DOM일 가능성

### ⚠️ 문제 3: 다양한 브라우저 호환성
**테스트 범위**: Chrome, Edge (Chromium 기반만)
**알려진 제약**: Firefox, Safari는 MV3 미지원

### ⚠️ 문제 4: 사용자 세션 만료
**증상**: `❌ [CardBenefit] HTTP 401 Unauthorized`
**해결**: 사용자에게 쿠팡 재로그인 요청

---

## 📊 콘솔 로그 체크리스트

### ✅ 정상 작동 시 확인할 로그

```markdown
### Content Script 로그
□ 🔍 [PicSel] Content script loaded!
□ 👀 [main] MutationObserver started for iframe detection...
□ 🔍 [main] Scroll-based iframe detection enabled...
□ 👆 [main] Click-based iframe detection listener registered
□ 🖱️  [click] Detected card benefit button click:
□ ✨ [click-detected] Card-benefit iframe found after click!
□ 📤 [iframe] Sending FETCH_CARD_BENEFIT_IFRAME to background...
□ ✅ [click-detected] Background response:

### Background Service Worker 로그
□ 📩 Background received message: { type: 'FETCH_CARD_BENEFIT_IFRAME', ... }
□ 📡 [CardBenefit] Sending fetch request with credentials...
□ ✅ [CardBenefit] Received HTML: XXXX chars
□ 📊 [CardBenefit] Parsed 9 benefits from iframe
□ [0] 카드: 와우카드, 할인: 1%, 혜택: ...
□ 💾 [CardBenefit] Saved 9 benefits to storage
```

### ❌ 에러 발생 시 확인할 로그

```markdown
# 에러 유형별 로그
□ ⏱️  [click-detected] Timeout: iframe not found after 15000ms
  → 버튼이 실제로 iframe을 생성하지 않음
  → 새로운 버튼 selector 필요

□ ❌ [CardBenefit] HTTP 403 Forbidden
  → 쿠팡 세션 만료 또는 권한 부족
  → 사용자 재로그인 필요

□ ⚠️  [CardBenefit] No benefits parsed from HTML
  → HTML 구조 변경
  → regex 패턴 검토 필요

□ ❌ [CardBenefit] Fetch/Parse failed: TypeError: ...
  → 네트워크 에러 또는 CORS 제약
  → 상세 에러 메시지 확인
```

---

## 🚀 배포 전 체크리스트

### 코드 품질
- [x] ESLint: 0 errors
- [x] Semgrep OSS: 0 issues
- [x] Trivy: 0 vulnerabilities
- [x] TypeScript: 모든 타입 검증 통과
- [x] 빌드: ✓ built in 2.11s

### 기능 검증
- [ ] 테스트 케이스 1 완료 (9개 카드 혜택 감지)
- [ ] 테스트 케이스 2 완료 (카드혜택 없는 상품)
- [ ] 테스트 케이스 3 완료 (지연 로드)
- [ ] 테스트 케이스 4 완료 (네트워크 실패)

### 문서
- [x] 변경 전략 문서 작성 (REFACTORING_STRATEGY_2025.md)
- [x] 테스트 계획 문서 작성 (이 파일)
- [x] 로그 분석 가이드 작성

### 배포
- [ ] 확장프로그램 새로고침
- [ ] 콘솔 로그 출력 확인
- [ ] 실제 쿠팡 사이트에서 테스트
- [ ] 타 팀에 공유

---

## 📋 문제 발생 시 디버깅 가이드

### 클릭이 감지되지 않음
```typescript
// 1. DevTools에서 실제 버튼 element 확인
document.querySelectorAll('button, a, [role="button"]')
  .forEach((el, i) => {
    if (el.textContent.includes('카드') || el.textContent.includes('혜택')) {
      console.log(`Button ${i}:`, el.tagName, el.className, el.textContent.substring(0, 50));
    }
  });

// 2. 버튼 selector 업데이트 필요 시
// src/content/index.ts 라인 ~570 수정
const button = target.closest('button, a, [role="button"], [role="tab"], .card-benefit-btn, ...NEW_SELECTOR...');
```

### iframe이 감지되지만 파싱 안 됨
```typescript
// 1. iframe HTML 다운로드
fetch(iframeUrl, { credentials: 'include' })
  .then(r => r.text())
  .then(html => {
    console.log('HTML length:', html.length);
    console.log('First 500 chars:', html.substring(0, 500));
    // 2. regex 패턴 테스트
    const h3matches = html.match(/<h3[^>]*>([^<]+)<\/h3>/gi);
    console.log('h3 tags:', h3matches?.length);
  });

// 3. parseCardBenefitsFromHTML() 함수의 regex 업데이트 필요
// src/background/index.ts 라인 ~78
```

---

## 📞 연락처 & 문제 보고

### 발견 사항 리포트 형식
```
[날짜] 쿠팡 카드혜택 iframe 리팩토링 이슈

증상:
- 콘솔 로그: (관련 로그 복사 붙여넣기)
- 시각적 증상: (UI에 어떻게 보이는지)
- 재현 방법: (단계별 설명)

예상 원인:
- (추측)

제안된 해결:
- (가능한 해결 방법)
```

---

## 🎓 학습 포인트

이 리팩토링에서 배운 점들:

1. **클릭 기반 감시의 중요성**
   - MutationObserver만으로는 비동기 로드 감지 불가
   - 사용자 상호작용(클릭) 기반 감시 필요

2. **Cross-Origin 우회 방법**
   - iframe.contentDocument 접근 불가
   - Background script fetch()로 우회 가능
   - credentials: 'include' 필수

3. **에러 핸들링의 가치**
   - 타임아웃 처리 (10초)
   - HTTP 상태 코드 검사
   - 네트워크 에러 처리
   - 상세한 로깅

4. **쿠팡 웹사이트의 특성**
   - 매우 복잡한 React 렌더링
   - 동적 iframe 삽입 패턴
   - 자주 구조 변경

---

## 📈 향후 개선 사항

### 단기 (1-2주)
1. CoupangParser refactoring (비관적 QA)
2. Shadow DOM 탐색 함수 추가
3. UI 렌더링 타이밍 변경

### 중기 (1개월)
1. 다른 쇼핑몰 (무신사, G마켓) 카드혜택 지원
2. 캐싱 전략 (중복 요청 방지)
3. 사용자 설정 (자동 vs 수동 감지)

### 장기 (분기별)
1. 서버 기반 분석 (쿠팡 구조 변경 모니터링)
2. A/B 테스트 (어떤 감지 방식이 가장 효과적인가)
3. 성능 최적화 (배터리 소비 최소화)

---

**문서 작성 일**: 2025년 11월 3일  
**최신 업데이트**: 빌드 2.11s, Codacy ✅ 통과  
**상태**: 🟢 테스트 준비 완료
