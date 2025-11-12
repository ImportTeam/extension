# 🎯 **쿠팡 파서 완전 실패 원인 분석 및 진단 가이드**

## **현재 상황 (2025-11-03)**

```
❌ [coupang-price] All extraction methods failed (3개 전략 모두 실패)
✅ Build Success: 1.95s, 0 TS errors, content.js 30.14 kB
🔴 새로운 디버깅 로그 추가됨 - 콘솔에서 상세 정보 확인 가능
```

---

## **🚨 핵심 문제 - 4가지 가능성**

### **1️⃣ SSR JSON 경로 오류 (80% 확률)**

**현재 코드가 찾는 경로:**
```
data.props.pageProps.productDetail.productInfo
data.props.pageProps.productInfo
```

**문제:** 이 경로가 실제로 존재하는가? (미확인)

**확인 방법:**
```javascript
// 쿠팡 페이지 → F12 Console → 붙여넣기:
JSON.parse(document.querySelector('#__NEXT_DATA__')?.textContent || '{}')
// → 실제 구조 확인, 스크린샷
```

---

### **2️⃣ 가격 Element Selector 오류 (70% 확률)**

**현재 코드가 찾는 selector:**
- `span.final-price-amount`
- `span.price-amount.final-price-amount`
- `.prod-price span`
- `[data-testid="final-price"]`

**문제:** 이 selector들이 실제 페이지에 없을 가능성 높음

**확인 방법:**
```javascript
// F12 → Elements 탭
// Ctrl+F (또는 Cmd+F) 검색:
// 1. "최종가" 또는 "39,900" 같은 가격 검색
// 2. 나타난 element의 class/id 확인
// 3. 스크린샷 찍기
```

---

### **3️⃣ iframe / Shadow DOM (60% 확률)**

**문제:** 가격이 iframe 내부 또는 Shadow DOM 내부에 있으면 content script가 접근 불가

**확인 방법:**
```javascript
// F12 Console에서:
document.querySelectorAll('iframe').length  // > 0 ?
[...document.querySelectorAll('*')].some(el => el.shadowRoot)  // true ?
```

---

### **4️⃣ Content Script 실행 타이밍 (50% 확률)**

**manifest.json:**
```json
"run_at": "document_end"
```

**의미:**
- ✓ DOM 준비됨
- ✗ React hydration은 아직도 진행 중 (TTI = 2.2초)

**parser 실행 타이밍 vs 요소 준비:**
```
1-2초: content script 실행, parser 시작
2.2초: React 완전 준비, 가격 요소 나타남
❌ 타이밍 불일치
```

---

## **🔍 새로운 디버깅 로그 (업데이트됨)**

### **콘솔에서 보게 될 로그들:**

```
[coupang-price] ========== Starting extraction ==========
[coupang-price] Options: useSSRJson=true, useObserver=true, timeout=10000ms

[coupang-price] [1/3] Attempting SSR JSON extraction...
[coupang-price-ssr] Looking for #__NEXT_DATA__ script tag...
[coupang-price-ssr] ✓ Found #__NEXT_DATA__, size=12345 bytes
[coupang-price-ssr] ✓ JSON parsed successfully, structure: [...]
[coupang-price-ssr] Available keys in data.props: [...]
[coupang-price-ssr] Available keys in data.props.pageProps: [...]
[coupang-price-ssr] ✓ Found productInfo at: data.props.pageProps.productInfo
[coupang-price-ssr] Extracted prices: finalPrice=39900, originalPrice=49900
```

또는 실패 로그:
```
[coupang-price-ssr] ✗ #__NEXT_DATA__ script tag not found
[coupang-price-ssr] ✗ productInfo not found at expected paths
```

---

## **📊 다음 단계 (필수)**

### **1단계: 실제 페이지 진단 (5분)**

**쿠팡 상품 페이지 열기 → F12 Console에서 다음 코드 실행:**

```javascript
// 1️⃣ SSR JSON 존재 여부
document.querySelector('#__NEXT_DATA__') ? "✅ 있음" : "❌ 없음"

// 2️⃣ SSR JSON 구조
const script = document.querySelector('#__NEXT_DATA__');
if (script) {
  const data = JSON.parse(script.textContent);
  console.log("=== SSR JSON 구조 ===");
  console.log("Top-level keys:", Object.keys(data));
  console.log("data.props keys:", data.props ? Object.keys(data.props) : "❌ props 없음");
  console.log("data.props.pageProps keys:", data.props?.pageProps ? Object.keys(data.props.pageProps) : "❌ pageProps 없음");
  console.log("전체 data:", data); // 스크린샷
}

// 3️⃣ 가격 element 찾기
console.log("=== 가격 Element ===");
console.log("span.final-price-amount:", document.querySelector('span.final-price-amount'));
console.log("[class*='price']:", document.querySelector('[class*="price"]'));

// 4️⃣ 실제 가격 있는 element 찾기
const priceEl = [...document.querySelectorAll('*')].find(el => 
  el.textContent?.match(/[0-9]+,?[0-9]+원/)
);
console.log("실제 가격 element:", priceEl);
console.log("className:", priceEl?.className);
console.log("tagName:", priceEl?.tagName);

// 5️⃣ iframe 개수
console.log("iframe 개수:", document.querySelectorAll('iframe').length);

// 6️⃣ Shadow DOM 여부
const hasShadow = [...document.querySelectorAll('*')].some(el => el.shadowRoot);
console.log("Shadow DOM 있나?:", hasShadow ? "✅ 있음" : "❌ 없음");
```

**결과를 스크린샷 찍어서 알려주세요**

---

### **2단계: 콘솔 로그 확인 (2분)**

확장프로그램 새로 로드한 후:

```
F12 → Console 탭
[coupang-price] 로그들 보기
스크린샷 찍기
```

**특히 다음 로그 캡처:**
- `✓ Found #__NEXT_DATA__` 또는 `✗ script tag not found`
- `Available keys in data:` (실제 JSON 구조)
- `✓ Found productInfo at:` 또는 `✗ productInfo not found`
- `✗ Not found: span.final-price-amount` (selector들)
- `✓ SUCCESS after XXXms` 또는 `✗ TIMEOUT`

---

## **💾 파일 위치 (참고용)**

**디버깅 분석 문서:**
- `/docs/COUPANG_QUICK_DIAGNOSIS.md` - 빠른 진단 가이드
- `/docs/COUPANG_DEBUG_ANALYSIS_2025.md` - 상세 분석

**수정된 코드:**
- `src/content/parsers/coupang/PriceExtractor.ts` - 디버깅 로그 강화

---

## **⏰ 예상 시간대**

```
지금 (현재):
- 콘솔 로그 강화 완료 ✅
- 빌드 성공 ✅

5분 내:
- 위의 진단 코드 실행 (사용자)
- 로그 + 스크린샷 수집

30분 내:
- 원인 파악 (Agent)
- PriceExtractor 수정

1시간 내:
- 첫 번째 전략 작동 확인
- 재테스트
```

---

## **🎯 성공 지표**

다음 중 하나라도 보이면 성공:

```
✅ [coupang-price] ✓ SUCCESS: Extracted from SSR JSON
✅ [coupang-price] ✓ SUCCESS: Extracted from DOM Observer
✅ [coupang-price] ✓ SUCCESS: Extracted from DOM Query

또는

✅ [coupang-price] 상품이 감지되었습니다 (XX%)
```

---

## **❓ FAQ**

**Q: 왜 3가지 전략이 모두 실패했나?**
A: 현재 코드의 모든 가정(SSR JSON 경로, selector명, 타이밍 등)이 실제 쿠팡 페이지와 맞지 않을 가능성이 높습니다.

**Q: 만약 #__NEXT_DATA__가 없다면?**
A: 쿠팡이 Next.js를 쓰지 않거나 다른 방식으로 초기 데이터를 제공합니다. 다른 script tag를 찾아야 합니다.

**Q: iframe 내부에 있으면?**
A: Content Script로는 접근 불가. Background에서 요청을 intercept하거나 iframe 내부에도 script를 주입해야 합니다.

**Q: 모든 전략이 실패하면?**
A: Regex 기반 페이지 소스 스크래핑 또는 API 호출 우회 등 다른 방식을 시도합니다.

---

## **🚀 최종 액션 아이템**

- [ ] 콘솔 로그 확인 (5분)
- [ ] 위의 진단 코드 실행 (5분)
- [ ] 스크린샷 제공 (2분)
- [ ] Agent에게 결과 알리기 (즉시)

**이 정보만으로도 80% 이상의 문제를 진단할 수 있습니다.**

---

**문서 작성:** 2025년 11월 3일  
**상태:** 🔴 긴급 - 사용자 피드백 대기 중  
**우선순위:** 최고 (전체 파서 실패)
