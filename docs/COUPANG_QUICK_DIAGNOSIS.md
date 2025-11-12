# 🔍 쿠팡 파서 실패 - 비관적 진단 및 해결 방향

## 📊 현재 상황

```
콘솔 로그: [coupang-price] All extraction methods failed
빌드: ✅ SUCCESS (30.14 kB, 0 TS errors)
3개 전략 모두 실패: SSR JSON ❌ | MutationObserver ❌ | querySelector ❌
```

---

## 🎯 **근본 원인 분석 (확률 기반)**

### 1️⃣ SSR JSON 경로 가정 오류 → **80% 확률**

**현재 가정:**
```typescript
data?.props?.pageProps?.productDetail?.productInfo || 
data?.props?.pageProps?.productInfo
```

**문제:**
- ❓ 쿠팡이 실제로 `#__NEXT_DATA__`를 사용하는가? (미확인)
- ❓ JSON 경로가 정확한가? (추측)
- ❓ 실제 구조는? (DevTools에서 확인 필요)

**검증 방법:**
```javascript
// DevTools Console에 직접 입력:
JSON.parse(document.querySelector('#__NEXT_DATA__')?.textContent || '{}')
// → 실제 구조 확인
```

---

### 2️⃣ DOM Selector 불일치 → **70% 확률**

**현재 코드가 찾는 selector들:**
```
✗ span.final-price-amount
✗ span.price-amount.final-price-amount  
✗ .prod-price span
✗ [data-testid="final-price"]
```

**문제:**
- 이 selector들이 **실제 페이지에 존재하지 않음**
- Tailwind CSS: `text-lg font-bold` 같은 유틸리티 클래스
- CSS-in-JS: `css-a1b2c3` 같은 해시 기반 클래스
- 동적 생성 클래스

**검증 방법:**
```javascript
// DevTools Elements 탭:
// 1. F12 → Elements
// 2. Ctrl+F (또는 Cmd+F) → "최종가" 또는 "39,900" 같은 가격 검색
// 3. 나타난 element의 실제 class/id/data-* 확인
```

---

### 3️⃣ iframe / Shadow DOM → **60% 확률**

**문제:**
```javascript
// content.js는 top-level DOM만 접근 가능
document.querySelector('span.price'); // ✓ 가능

// iframe 내부는 SecurityError
iframe.contentDocument.querySelector('span'); // ❌

// Shadow DOM은 투과 불가
element.shadowRoot.querySelector('span'); // ❌
```

**검증 방법:**
```javascript
// iframe 확인
document.querySelectorAll('iframe').length // > 0 ?

// Shadow DOM 확인
[...document.querySelectorAll('*')].some(el => el.shadowRoot)
```

---

### 4️⃣ Content Script 실행 타이밍 → **50% 확률**

**manifest.json:**
```json
"run_at": "document_end"
```

**의미:**
- ✅ DOM parsing 완료 (document.readyState = "interactive")
- ❌ React hydration은 아직도 진행 중 (TTI = 2.2초)
- ❌ setTimeout(..., 0)도 모두 실행된 상태 아님

**콘솔에서 관찰된 메트릭:**
```
FCP: 1160ms
LCP: 1160ms
TTI: 2220ms    ← React 완전 준비
```

**문제:**
Parser가 1~2초에 실행되는데, 가격 element는 2.2초에 준비됨

---

## 💡 **즉시 진단 필요 (필수)**

### Phase 1: 실제 페이지 구조 확인 (5분)

**쿠팡 상품 페이지 열기 → F12 Console에서:**

```javascript
// 1️⃣ SSR JSON 확인
const script = document.querySelector('#__NEXT_DATA__');
script ? "✓ 존재" : "✗ 없음"

// 2️⃣ SSR JSON 구조
if (script) {
  const data = JSON.parse(script.textContent);
  console.log("Top keys:", Object.keys(data));
  console.log("props:", data.props);
  console.log("pageProps keys:", Object.keys(data.props?.pageProps || {}));
}

// 3️⃣ 가격 element 찾기
document.querySelector('span.final-price-amount') // ✓ 있나?
document.querySelector('[class*="price"]')        // 있나?

// 4️⃣ 실제 가격 element 브루트포스 찾기
[...document.querySelectorAll('*')].find(el => 
  el.textContent?.match(/[0-9]+,?[0-9]+원/)
)?.className
// → "actual_class_name"을 알려줌

// 5️⃣ iframe 확인
document.querySelectorAll('iframe').length

// 6️⃣ Shadow DOM 확인
[...document.querySelectorAll('*')].some(el => el.shadowRoot)
```

**결과를 스크린샷 찍어서 알려주기**

---

### Phase 2: 로그 분석 (2분)

**콘솔에서:**
```javascript
// 필터링해서 우리 로그만 보기
document.querySelectorAll('[class*="coupang-price"]')
```

새로운 빌드에서 다음 로그들을 찾기:
```
[coupang-price-ssr] ✓ Found #__NEXT_DATA__
[coupang-price-ssr] Available keys in data.props: [...]
[coupang-price-final] ✓ Found: span.XXXXX
[coupang-price-observer] ✓ SUCCESS after XXXms
```

---

## 🔧 **현재 개선사항**

### ✅ 디버깅 로그 강화

**PriceExtractor.ts 업데이트:**

```typescript
// 추출 시작 로그
[coupang-price] ========== Starting extraction ==========
[coupang-price] Options: useSSRJson=true, useObserver=true, timeout=10000ms

// 각 단계별 로그
[coupang-price] [1/3] Attempting SSR JSON extraction...
[coupang-price-ssr] ✓ Found #__NEXT_DATA__, size=12345 bytes
[coupang-price-ssr] Available keys in data: [...]
[coupang-price-ssr] ✗ Not found: span.final-price-amount

// MutationObserver 타이밍 로그
[coupang-price-observer] Checking initial DOM state...
[coupang-price-observer] ✓ SUCCESS after 2150ms and 847 mutations

// 최종 결과
[coupang-price] ❌ ALL extraction methods FAILED
```

### ✅ 빌드 검증

```
✅ Build: 1.95s
✅ content.js: 30.14 kB
✅ TypeScript: 0 errors
```

---

## 📋 **다음 실행 순서**

### 👤 사용자 액션 (필수)

1. **확장프로그램 업데이트**
   ```
   dist/content.js 새 버전 로드
   ```

2. **쿠팡 페이지에서 테스트**
   ```
   F12 → Console
   [coupang-price-] 로그 찾기
   ```

3. **위의 Phase 1 진단 코드 실행**
   ```javascript
   // 콘솔에 붙여넣고 결과 스크린샷
   ```

### 🤖 Agent 액션 (로그 받은 후)

**SSR JSON 실패 경우:**
- JSON 실제 구조 파악
- 올바른 path로 수정
- 추가 fallback path 구현

**querySelector 실패 경우:**
- 실제 selector 업데이트
- regex 기반 대체 전략 추가
- XPath 시도

**iframe/Shadow DOM 문제 경우:**
- 특별 처리 로직 추가
- 프레임 내부 content script 주입
- Background에서 intercept

**Timing 문제 경우:**
- MutationObserver timeout 증가
- 더 적극적인 polling 추가
- document.readyState 감시 개선

---

## 🎓 **배운 점**

> **"데이터 없이 코드를 작성하면 실패한다"**

**현재 상황:**
- 모든 selector = 추측
- 모든 JSON path = 가정
- 실제 페이지 구조 = 미지수

**올바른 접근:**
1. 실제 페이지 구조 분석
2. 실제 데이터 기반 구현
3. 체계적 테스트
4. 점진적 개선

---

## 📌 **체크리스트**

### 필수 (지금 바로)
- [ ] Phase 1 진단 코드 실행
- [ ] SSR JSON 존재 여부 확인
- [ ] 가격 element selector 찾기
- [ ] 콘솔 로그 스크린샷

### 선택 (관심 있을 시)
- [ ] iframe 개수 확인
- [ ] Shadow DOM 여부 확인
- [ ] DevTools 성능 탭에서 실제 렌더링 타이밍 측정

---

## 🚀 **다음 단계 예상**

**S1:** 사용자가 로그 + 진단 결과 제공
↓
**S2:** Agent가 실제 구조 파악 및 코드 수정
↓
**S3:** 사용자 재테스트 및 검증
↓
**S4:** 모든 전략 중 최소 1개 작동 확인
↓
**S5:** 나머지 사이트(Amazon, 이베이 등)에 같은 방식 적용

---

**작성일:** 2025년 11월 3일
**상태:** 🔴 사용자 피드백 대기 중
**우선순위:** 🔴 매우 높음 (완전 실패 상태)
