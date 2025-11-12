# SubPopup UI 재설계 - 현대적 결제수단 관리 인터페이스

## 📋 개요

PicSel의 SubPopup (결제수단 관리 팝업) UI를 완전히 재설계했습니다. Toss, shadcn/ui, Material Design 등 현대적 fintech 디자인 패턴을 적용하여 전문적이고 세련된 인터페이스를 제공합니다.

**상태**: ✅ 완료 (빌드 성공, 모든 린트/보안 검사 통과)

---

## 🎨 디자인 시스템

### 색상 팔레트

```css
/* Primary: Modern Purple */
--color-primary: #5B21B6        /* 주요 액션 */
--color-primary-light: #7C3AED   /* Hover 상태 */
--color-primary-lighter: #EDE9FE /* 배경 */

/* Status Colors */
--color-success: #059669        /* 성공 메시지 */
--color-danger: #DC2626         /* 경고/삭제 */
--color-warning: #D97706        /* 경고 */

/* Neutral Colors */
--color-bg: #FFFFFF              /* 배경 */
--color-bg-secondary: #F9FAFB   /* 보조 배경 */
--color-text-primary: #111827   /* 본문 텍스트 */
--color-text-secondary: #6B7280 /* 보조 텍스트 */
--color-text-tertiary: #9CA3AF  /* 하단 텍스트 */
```

### 타이포그래피

- **헤더**: 18px, 700 weight, -0.5px letter-spacing
- **섹션 제목**: 13px, 700 weight, uppercase
- **본문**: 14px, 400-600 weight
- **힌트**: 12px, 400 weight, 보조 컬러

### 간격 & 라우닝

```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 12px
--spacing-lg: 16px
--spacing-xl: 24px
--spacing-2xl: 32px

--radius-sm: 6px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
```

### 섀도우 깊이

- **xs**: 1px 2px (호버 상태)
- **sm**: 1px 3px (보통)
- **md**: 4px 6px (강조)
- **lg**: 10px 15px (floating)

---

## 🏗️ 컴포넌트 구조

### 1️⃣ 헤더 (Header)

**특징:**
- 그래디언트 배경 (보라색 → 라이트 보라)
- 제목 및 닫기 버튼
- 프로필 아이콘 (💳)
- 깨끗한 레이아웃

```tsx
// 외형
┌─────────────────────────────────────┐
│ 💳 결제수단 관리         ✕           │  ← 그래디언트 배경
└─────────────────────────────────────┘
```

**CSS Variables:**
- 배경: `linear-gradient(135deg, #5B21B6, #7C3AED)`
- 텍스트: `#FFFFFF`
- 패딩: 16px

### 2️⃣ 탭 네비게이션 (Tabs)

**특징:**
- 언더라인 인디케이터 (활성 탭)
- 배경 하이라이트 (호버)
- 부드러운 전환 애니메이션
- 아이콘 + 텍스트

```tsx
┌────────────────┬────────────────┐
│ ➕ 새로 추가   │ 📋 관리        │
│ ============   │ (아래에 라인)   │
└────────────────┴────────────────┘
```

**활성 탭 표시:**
```css
.subpopup-tab-btn.active {
  background: 라이트 보라색 그래디언트
  color: 주요 보라색
  아래에 3px 언더라인
}
```

### 3️⃣ 폼 섹션 (Add Payment Form)

**레이아웃:**
```
┌─────────────────────────────────┐
│ 결제수단 정보          ═══════   │ ← 섹션 제목
│                                 │
│ [라벨]                          │
│ [입력 필드]  💡 힌트            │
│                                 │
│ [라벨]                          │
│ [입력 필드]  💡 힌트            │
│                                 │
│ [수수료]% [기본수수료]%          │
│                                 │
│ ▁▂▃▄▅▆▇█ 신뢰도  85%          │ ← 슬라이더
│                                 │
│ ☑ 할부 지원                     │
│                                 │
│ [✓ 추가하기]                    │
└─────────────────────────────────┘
```

**입력 필드 특징:**
- 포커스시 주요 컬러 테두리 + 섀도우
- 배경색: 회색 → 흰색 (포커스시)
- 플레이스홀더: 보조 텍스트 컬러
- 패딩: 12px 16px

**범위 슬라이더:**
```css
신뢰도 슬라이더 {
  배경: 회색 박스
  색상: 주요 보라색
  썸: 동적 퍼센트 표시
  예: ▁▂▃▄▅▆▇█ 50%
}
```

**버튼:**
```css
.btn-primary {
  배경: linear-gradient(135deg, #5B21B6, #7C3AED)
  색상: 흰색
  시효과: 라이트 플래시 애니메이션
  호버: 더 높은 섀도우 + 위로 1px 이동
}
```

### 4️⃣ 결제수단 카드 (Payment Item)

**디자인:**
```
┌─────────────────────────────────────────┐
│ 💳  신한카드               ⭐ 우수       │ ← 아이콘, 배지
│     2025.01.01                         │
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ 절약액      ₩50,000                 ││
│ │ 수수료       0.5%                   ││
│ │ 신뢰도      100%                    ││
│ │ 기본수수료    0.8%                  ││
│ └─────────────────────────────────────┘│
│                                         │
│ 할부 정보: 3개월 무이자                │
│                                         │
│ [✏️ 수정]  [🗑️ 삭제]                  │
└─────────────────────────────────────────┘
```

**주요 요소:**

1. **헤더 행**: 이름 + 신뢰도 배지
2. **메타 정보**: 생성일 + 신뢰도 배지
3. **정보 그리드**: 2열 레이아웃
   - 절약액, 수수료, 신뢰도, 기본수수료
4. **할부 정보**: (선택사항) 하이라이트 박스
5. **액션 버튼**: 수정 + 삭제 (2열)

**호버 효과:**
- 테두리 색상: 회색 → 주요 보라색
- 섀도우: 증가
- 수직 이동: -2px
- 위 테두리: 3px 그래디언트 나타남

**신뢰도 배지:**
```css
신뢰도 >= 95% {
  배경: 성공 라이트 컬러 (#D1FAE5)
  텍스트: 성공 컬러 (#059669)
  내용: ⭐ 우수
}
```

**정보 그리드:**
```css
.payment-item-info {
  배경: 회색 박스
  2열 그리드
  라벨: 보조 텍스트
  값: 주요 텍스트 + 굵음
  패딩: 12px
  border-radius: 8px
}
```

---

## ✨ UI 개선사항

### 기존 vs 신규 비교

| 측면 | 기존 | 신규 |
|------|------|------|
| **헤더** | 베이스 보더 | 그래디언트 배경 |
| **색상** | 회색 미니멀 | 보라색 현대적 |
| **카드** | 평면 | 깊이감 있는 그래디언트 |
| **호버** | 배경색 변화 | 섀도우 + 이동 + 보더 |
| **폼** | 기본 입력 | 범위 슬라이더 + 섹션 제목 |
| **버튼** | 정적 | 플래시 애니메이션 |
| **타이포** | 단순 | 계층적 + 이모지 |
| **간격** | 좁음 | 넓고 깨끗함 |

### 현대적 디자인 패턴 적용

✅ **Card Hierarchy** (shadcn/ui pattern)
- Header → Content → Footer 구조
- 명확한 정보 우선순위

✅ **Semantic Forms** (Material Design)
- Label → Input → Description → Error
- 직관적인 폼 흐름

✅ **Gradient Accents** (Toss style)
- 헤더 그래디언트
- 버튼 그래디언트
- 섹션 구분

✅ **Interactive Feedback** (Modern UX)
- 부드러운 전환 (0.2s - 0.3s)
- 호버 애니메이션
- 로딩 상태 스핀 애니메이션

✅ **Color Psychology**
- 주요 액션: 보라색 (신뢰, 프리미엄)
- 성공: 초록색
- 경고/삭제: 빨강색

---

## 📱 반응형 디자인

### 창 크기
- **너비**: 480px (크롬 팝업 최적)
- **높이**: 640px (스크롤 가능)
- **스크롤바**: 커스텀 (6px, 부드러운)

### 모바일 친화성
- 터치 친화적 버튼 (최소 44x44px)
- 입력 필드: 충분한 패딩
- 카드: 풀 너비 사용

---

## 🎯 사용 흐름

### 1. 결제수단 추가

```
[➕ 새로 추가 탭]
  ↓
[결제수단 정보 섹션]
  ↓
[이름 입력]
  ↓
[절약액 입력]
  ↓
[수수료 입력]
  ↓
[신뢰도 슬라이더]
  ↓
[할부 옵션 (선택)]
  ↓
[✓ 추가하기 버튼]
  ↓
[성공 메시지 표시]
```

### 2. 결제수단 관리

```
[📋 관리 탭]
  ↓
[결제수단 카드 목록]
  ↓
[카드 호버 → 강조 효과]
  ↓
[수정 버튼 클릭] or [삭제 버튼 클릭]
  ↓
[확인 다이얼로그]
  ↓
[완료 메시지]
```

---

## 🔧 기술 구현

### 파일 구조

```
/src/popup/styles/subpopup.css
├── CSS Variables (컬러, 간격, 라우닝)
├── 헤더 스타일
├── 탭 스타일
├── 폼 스타일
├── 카드 스타일
├── 버튼 스타일
├── 로딩/에러 상태
└── 유틸리티 클래스

/src/subpopup/components/
├── SubPopup.tsx (레이아웃)
├── AddPaymentForm.tsx (폼)
└── PaymentMethodsList.tsx (카드 목록)
```

### CSS 기법

**CSS Variables**
```css
:root {
  --color-primary: #5B21B6;
  --spacing-lg: 16px;
  --radius-md: 8px;
}
```

**그래디언트**
```css
background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
```

**애니메이션**
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**플렉스박스 & 그리드**
```css
/* 탭 네비게이션 */
.subpopup-tabs {
  display: flex;
  gap: var(--spacing-sm);
}

/* 정보 그리드 */
.payment-item-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}
```

### 컴포넌트 기능

**AddPaymentForm.tsx**
```tsx
// 스포너 슬라이더
<input
  type="range"
  min="0" max="1" step="0.1"
  value={formData.confidence}
  onChange={handleInputChange}
  style={{ accentColor: 'var(--color-primary)' }}
/>

// 동적 퍼센트 표시
<span>{(formData.confidence * 100).toFixed(0)}%</span>

// 조건부 렌더링 (할부)
{formData.hasInstallment && (
  <div className="form-group">할부 정보 입력</div>
)}
```

**PaymentMethodsList.tsx**
```tsx
// 동적 아이콘 결정
const getPaymentIcon = (name: string): string => {
  if (name.includes('카드')) return '💳';
  if (name.includes('계좌')) return '🏦';
  // ...
  return '💰';
};

// 신뢰도 배지
{isHighConfidence && (
  <div className="payment-item-badge success">
    ⭐ 우수
  </div>
)}

// 정보 그리드 렌더링
<div className="payment-item-info">
  <div className="payment-item-info-item">
    <span className="payment-item-info-label">절약액</span>
    <span className="payment-item-info-value">
      ₩{method.savingAmount.toLocaleString()}
    </span>
  </div>
  {/* ... */}
</div>
```

---

## 🚀 성능

### 빌드 결과

```
✓ 4607 modules transformed
✓ dist/assets/subpopup-CrskGB0g.css    12.76 kB │ gzip: 2.92 kB
✓ dist/assets/subpopup-dTWnNWLP.js     11.48 kB │ gzip: 3.58 kB
✓ built in 1.57s
```

### 최적화 전략

1. **CSS Variables**: 런타임 테마 변경 지원
2. **가벼운 애니메이션**: GPU 가속 (transform, opacity)
3. **커스텀 스크롤바**: 브라우저 기본값보다 얇고 이쁨
4. **조건부 렌더링**: 불필요한 DOM 요소 최소화

---

## ✅ 품질 보증

### 린트/보안 검사

```
SubPopup.tsx:           ✓ 통과
AddPaymentForm.tsx:     ✓ 통과
PaymentMethodsList.tsx: ✓ 통과
FooterButtons.tsx:      ✓ 통과

ESLint:        ✓ 0 errors
Semgrep:       ✓ 0 issues
Trivy:         ✓ 0 vulnerabilities
```

### 호환성

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ 부드러운 스크롤
- ✅ 시스템 폰트 폴백

---

## 📖 사용 가이드

### SubPopup 열기

```tsx
// FooterButtons.tsx에서
const handleShowModal = () => {
  chrome.windows.create({
    url: chrome.runtime.getURL('src/subpopup/index.html'),
    type: 'popup',
    width: 480,
    height: 640,
  });
};
```

### 커스텀 스타일링

```css
/* 회사 색상으로 변경 */
:root {
  --color-primary: #YourColor;
  --color-primary-light: #YourColorLight;
}
```

### 다크 모드 (미래)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1F2937;
    --color-text-primary: #F3F4F6;
    /* ... */
  }
}
```

---

## 🎓 설계 원칙

1. **계층적 정보 구조**: 중요한 정보부터 시각적으로 강조
2. **일관된 간격**: 8px 기반 그리드로 정렬
3. **색상 의미**: 주요 액션=보라, 성공=초록, 경고=빨강
4. **부드러운 상호작용**: 모든 전환에 0.2-0.3s 애니메이션
5. **접근성**: 시맨틱 HTML + ARIA 레이블
6. **모바일 우선**: 터치 친화적 크기 및 간격

---

## 🔮 미래 개선 사항

- [ ] 다크 모드 완전 지원
- [ ] 결제수단 수정(Edit) 기능 구현
- [ ] 즐겨찾기 / 정렬 기능
- [ ] 드래그앤드롭 정렬
- [ ] 결제수단 카테고리 필터
- [ ] 통계 / 차트 시각화
- [ ] 키보드 네비게이션 최적화

---

**작성일**: 2025-01-02  
**디자인 참고**: Toss, shadcn/ui, Material Design v3  
**상태**: ✅ 프로덕션 준비 완료
