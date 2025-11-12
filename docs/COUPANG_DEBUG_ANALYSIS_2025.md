# 쿠팡 가격 추출 실패 - 비관적 진단 분석 (2025-11-03)

## 🔴 **현재 상황 요약**

**Console 로그:**
```
[coupang-price] All extraction methods failed
```

**실패 패턴:** 3개 전략 **모두 실패**
- ❌ SSR JSON 추출
- ❌ MutationObserver 기반 DOM 감시
- ❌ querySelector 기반 DOM 접근

**빌드 상태:** ✅ SUCCESS (30.14 kB, 0 TS errors)

---

## 🚨 **비관적 관점의 핵심 문제**

### 문제 1: SSR JSON 경로 가정이 잘못되었을 가능성 **80%**

**현재 코드:**
```typescript
const productInfo = data?.props?.pageProps?.productDetail?.productInfo || 
                    data?.props?.pageProps?.productInfo;
```

**문제점:**
1. **쿠팡이 실제로 `#__NEXT_DATA__`를 사용하는가?** - 미확인
   - Next.js 기반이라는 가정만 있음
   - 다른 프레임워크(Remix, Nuxt 등)일 수도 있음

2. **JSON 구조가 정말 이렇게 되어 있는가?** - 미확인
   - `data.props.pageProps.productInfo` 경로가 존재하는가?
   - 다른 경로에 있을 수도 있음

3. **console 로그 분석:**
   ```
   [coupang-price] All extraction methods failed
   ```
   - SSR JSON 실패 로그 명시되지 않음 → SSR 시도 자체가 건너뛰어졌을 가능성?
   - 또는 조용히 실패하고 다음 단계로 넘어감

### 문제 2: querySelector selector들이 실제 페이지와 맞지 않음 **70%**

**현재 코드가 찾는 selector들:**
- `span.final-price-amount`
- `span.price-amount.final-price-amount`
- `.prod-price` (내부 span)
- `[data-testid="final-price"]`

**문제점:**
1. **이 selector들이 실제 쿠팡 페이지에 존재하는가?** - 미확인
   - 추측으로 만들어진 selector들
   - 실제 페이지에서 DevTools로 확인한 적 없음

2. **쿠팡이 특수 CSS 클래스를 쓸 수 있음:**
   - Tailwind CSS: `text-lg font-bold text-red-600` 같은 형태
   - CSS-in-JS: `css-a1b2c3` 같은 hash 기반
   - 동적 클래스명 생성

3. **Data attributes가 다를 수 있음:**
   - `data-testid="final-price"` 대신
   - `data-qa="price"`, `data-v-123456`, 등등

### 문제 3: iframe 또는 Shadow DOM 문제 **60%**

**content.js의 제약:**
```javascript
// content.js는 top-level document만 접근 가능
document.querySelector('span.final-price-amount'); // ✓ 작동
document.querySelector('#price-iframe').contentDocument.querySelector('span'); // ❌ SecurityError
```

**가능한 시나리오:**
1. **가격이 iframe 내부에 있음**
   - Cross-origin iframe이면 content script가 접근 불가
   - 이 경우 `SecurityError` 발생하거나 빈 결과 반환

2. **가격이 Shadow DOM 내부에 있음**
   - `document.querySelector()`는 Shadow DOM 관통 불가
   - `.shadowRoot.querySelector()`로만 접근 가능

3. **Web Component 사용**
   - Custom element 내부에 가격이 있으면 querySelector 무용지물

### 문제 4: Content Script 실행 타이밍 **50%**

**manifest.json 확인 필요:**
```json
{
  "content_scripts": [
    {
      "matches": ["https://www.coupang.com/*"],
      "js": ["content.js"],
      "run_at": "?"  // ← document_start? document_end? document_idle?
    }
  ]
}
```

**문제점:**
- `run_at: "document_start"` → DOM이 비어있을 수 있음
- `run_at: "document_end"` → 모든 JS 실행 전일 수 있음
- `run_at: "document_idle"` → 모든 DOM ready이지만, React hydration은 아직 진행중일 수 있음

### 문제 5: React Hydration 완료 타이밍 불일치

**관찰된 메트릭:**
- FCP (First Contentful Paint): 1160ms
- TTI (Time To Interactive): 2220ms
- 현재 3-stage retry: 0ms, +2000ms, +3000ms

**문제점:**
- Parser 실행: 1~2초 시점
- React hydration 완료: 2.2초 시점
- 타이밍 mismatch → querySelector는 계속 null 반환

---

## 📋 **진단 목록**

### Tier 1: 즉시 확인 필요 (필수)

- [ ] **실제 쿠팡 페이지에서 DevTools Console에서 실행:**
  ```javascript
  // 1. SSR JSON 확인
  document.querySelector('#__NEXT_DATA__')?.textContent
    .split('').slice(0, 200) + '...'
  
  // 2. 실제 구조 확인
  const script = document.querySelector('#__NEXT_DATA__');
  const data = JSON.parse(script?.textContent || '{}');
  Object.keys(data); // props? data? initialState?
  data.props ? Object.keys(data.props) : 'no props'
  data.props?.pageProps ? Object.keys(data.props.pageProps) : 'no pageProps'
  
  // 3. 가격 element 찾기
  document.querySelector('span.final-price-amount') // 존재?
  document.querySelector('[class*="price"]') // 어떤 것들 있나?
  document.querySelectorAll('span').forEach((s, i) => {
    if (s.textContent.match(/[0-9,]+원/)) console.log(i, s.className, s.textContent.slice(0, 20))
  })
  ```

- [ ] **manifest.json 확인:**
  ```
  - run_at 값은? (document_start/end/idle)
  - matches 패턴은?
  - content_scripts는 정확히 어디 로드되는가?
  ```

- [ ] **iframe 또는 Shadow DOM 확인:**
  ```javascript
  // iframe 확인
  document.querySelectorAll('iframe').length
  
  // Shadow DOM 확인
  document.querySelectorAll('*').forEach(el => {
    if (el.shadowRoot) console.log('Found shadow root:', el.tagName, el.className)
  })
  ```

### Tier 2: 로그 수집 (필수)

**개선된 디버깅 버전 배포 후 콘솔 로그 수집:**
```
[coupang-price] ========== Starting extraction ==========
[coupang-price-ssr] Looking for #__NEXT_DATA__ script tag...
[coupang-price-ssr] ✓ Found #__NEXT_DATA__, size=XXXXX bytes
[coupang-price-ssr] ✓ JSON parsed successfully, structure: [...]
[coupang-price-final] Looking for final price element...
[coupang-price-final] ✗ Not found: span.final-price-amount
[coupang-price-final] ✗ Not found: span.price-amount.final-price-amount
...
```

**로그 수집 위치:**
1. DevTools Console (F12 → Console tab)
2. Chrome Extension Popup 콘솔 (불가)
3. Background 페이지 콘솔 (chrome://extensions → "Service Worker" 검사)

---

## 🔧 **강화된 디버깅 버전 적용**

### 변경사항:

✅ **PriceExtractor.ts 로깅 강화**

1. **추출 시작/종료 로그:**
   ```
   [coupang-price] ========== Starting extraction ==========
   [coupang-price] Options: useSSRJson=true, useObserver=true, timeout=10000ms
   [coupang-price] [1/3] Attempting SSR JSON extraction...
   ```

2. **SSR JSON 상세 로그:**
   ```
   [coupang-price-ssr] ✓ Found #__NEXT_DATA__, size=XXXXX bytes
   [coupang-price-ssr] ✓ JSON parsed successfully, structure: [props, initialState, ...]
   [coupang-price-ssr] Available keys in data.props: [...]
   [coupang-price-ssr] Available keys in data.props.pageProps: [...]
   ```

3. **DOM 요소 찾기 상세 로그:**
   ```
   [coupang-price-final] ✓ Found: span.final-price-amount
   [coupang-price-final] ✗ Not found: span.price-amount.final-price-amount
   [coupang-price-final] Found 15 span.price-amount elements
   [coupang-price-final] Span #3 contains 원: 39,900원
   ```

4. **MutationObserver 상세 로그:**
   ```
   [coupang-price-observer] Starting MutationObserver (timeout: 10000ms)
   [coupang-price-observer] Checking initial DOM state...
   [coupang-price-observer] Price element not ready in initial state, waiting for mutations...
   [coupang-price-observer] ✓ SUCCESS after 2150ms and 847 mutations
   ```

### 빌드 결과:
- ✅ Build success: 1.95s
- ✅ content.js: 30.14 kB
- ✅ TypeScript: 0 errors

---

## 📊 **다음 단계**

### 즉시 실행 (사용자 액션):

1. **확장프로그램 업데이트:**
   - 새 빌드된 content.js 로드
   - 쿠팡 페이지 새로고침

2. **콘솔 로그 수집:**
   - F12 → Console
   - `[coupang-price]` 로그 모두 스크린샷

3. **DevTools 검사:**
   - Elements 탭에서 selector 직접 확인
   - 실제 DOM 구조 파악

### Agent 액션 (코드 수정):

위 로그를 받은 후:

1. **SSR JSON 실패 경우:**
   - JSON 구조 역분석
   - 올바른 path 파악
   - 추가 경로 시도 로직 구현

2. **querySelector 실패 경우:**
   - 실제 selector 찾기
   - 브루트포스 regex 또는 XPath 시도
   - iframe/Shadow DOM 감지 후 특별 처리

3. **Timing 문제 경우:**
   - MutationObserver timeout 증가
   - 더 적극적인 pooling 시도
   - React 라이프사이클 훅 활용

---

## 💡 **교훈**

> "추측으로 만든 코드는 실제 페이지와 맞지 않을 확률이 높다."

**현재 상황:**
- PriceExtractor의 모든 selector는 추측
- SSR JSON path는 가정
- Content Script 타이밍은 미지수

**필요한 것:**
- 실제 페이지에서 수집한 구체적인 데이터
- 페이지 구조에 기반한 구현
- 데이터 주도 개발 (Data-Driven Development)

---

## 📝 **체크리스트**

- [ ] 로그 분석 완료
- [ ] SSR JSON 구조 확인됨
- [ ] 가격 element selector 확인됨
- [ ] iframe/Shadow DOM 여부 확인됨
- [ ] Content Script 타이밍 확인됨
- [ ] PriceExtractor 업데이트됨
- [ ] 실제 페이지에서 재테스트 완료
- [ ] 모든 전략 중 최소 1개 작동 확인

---

**작성일:** 2025년 11월 3일
**상태:** 진단 및 디버깅 로그 수집 대기 중
