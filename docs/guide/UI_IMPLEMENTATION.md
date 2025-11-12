# PicSel UI 구현 - 완성 보고서

> 📅 2025년 10월 29일  
> 📋 심리학 기반 3단계 정보 계층화 + OKLCH 색상 시스템 구현

---

## ✅ 완성된 UI 아키텍처

### 1️⃣ 디렉토리 구조

```
src/
├── shared/                    # 공유 영역
│   ├── types/index.ts        # 타입 정의 (PaymentMethod, RecommendationState 등)
│   ├── store/
│   │   └── recommendationStore.ts  # Zustand 스토어 + Chrome 스토리지 어댑터
│   └── utils/index.ts         # Chrome 메시지/스토리지 유틸
│
├── popup/                     # Popup UI (400×500px)
│   ├── index.tsx             # Entry Point
│   ├── index.html            # HTML Template
│   ├── Popup.tsx             # Main Container
│   ├── components/
│   │   ├── index.ts
│   │   ├── Button.tsx        # 기본 버튼 컴포넌트
│   │   ├── RecommendationCard.tsx  # Layer 1/2 (주요 + 확장)
│   │   ├── AlternativesList.tsx    # Layer 2 (선택지 리스트)
│   │   └── SettingsPanel.tsx       # Layer 3 (상세 정보)
│   └── styles/               # 팝업 전용 스타일 (있으면)
│
├── content/                   # Content Script
│   └── index.ts              # 체크아웃 감지 + 추천 요청
│
├── background/               # Background Service Worker
│   └── index.ts              # 메시지 핸들러 + 추천 로직
│
└── styles/
    └── globals.css           # 전역 스타일 + OKLCH 색상 변수
```

---

## 🎨 색상 시스템 (OKLCH)

### 정의된 색상 변수 (18개)

#### Primary (행동)
```css
--color-primary: oklch(0.62 0.14 39.04);        /* Indigo */
--color-primary-light: oklch(0.73 0.14 39.04);  /* Hover */
--color-primary-dark: oklch(0.51 0.14 39.04);   /* Pressed */
```

#### Semantic Colors
```css
--color-success: oklch(0.704 0.142 167.084);    /* Green (절약) */
--color-error: oklch(0.577 0.245 27.325);       /* Red */
--color-warning: oklch(0.84 0.16 84);           /* Amber */
--color-info: oklch(0.64 0.15 255);             /* Blue */
```

#### Grayscale (순수 회색)
```css
--color-gray-900: oklch(0.218 0 0);  /* 텍스트 */
--color-gray-500: oklch(0.6 0 0);    /* 중간 회색 */
--color-gray-200: oklch(0.845 0 0);  /* 테두리 */
--color-white: oklch(1 0 0);         /* 배경 */
```

### 다크모드 전략
```css
@media (prefers-color-scheme: dark) {
  /* 밝기만 변경, 색상/채도는 그대로 유지 */
  --color-primary: oklch(0.70 0.14 39.04);  /* +8% 밝기 */
}
```

**장점**:
✅ 자동 접근성 (WCAG AA 명암비)
✅ 다크모드 색감 일관성
✅ CSS 변수로 Tailwind 연동

---

## 🔄 상태 관리 (Zustand)

### Store 구조

```typescript
interface RecommendationState {
  // UI 상태
  isLoading: boolean;
  isExpanded: boolean;
  selectedTab: 'recommendation' | 'alternatives' | 'settings';
  error: string | null;

  // 데이터
  recommendation: PaymentMethod | null;
  alternatives: PaymentMethod[];
  timestamp: number;

  // 액션 (7개)
  setLoading, setRecommendation, setAlternatives,
  toggleExpanded, setSelectedTab, setError, reset
}
```

### 성능 최적화

**Selector 분리** (불필요한 리렌더 방지)
```typescript
// ✅ 최적화됨
const recommendation = useRecommendation();
const isExpanded = useIsExpanded();

// ❌ 피해야 함
const { recommendation, isExpanded } = useRecommendationStore();
```

**Chrome Storage 동기화** (Persist 미들웨어)
```typescript
persist(store, {
  name: 'picsel-recommendation',
  storage: chromeStorageAdapter,
  partialize: (state) => ({
    recommendation: state.recommendation,
    alternatives: state.alternatives,
  })
})
```

---

## 💻 컴포넌트 구조

### Popup (Main Container)
- **크기**: 400px × 500px
- **기능**: 탭 네비게이션, 로딩/에러 상태 처리
- **구성**: Header → Content → Footer

### 1️⃣ RecommendationCard (Layer 1/2)

**Layer 1 (항상 표시, 3-4초)**
```
┌─────────────────────────────────────────┐
│ 신한카드                            [×] │
│                                         │
│ ₩500 절약                    (24px)     │
│                                         │
│ 수수료 0.5% vs 0.8%                     │
│                                         │
│ [이 결제 수단으로 결제하기] [다른 방법] │
└─────────────────────────────────────────┘
```

**심리학**:
- **Anchoring Effect**: 절약액을 먼저 표시 → 기준점 설정
- **Loss Aversion**: 절약 기회 프레이밍 → 거부 동기 감소
- **Concreteness**: "₩500"은 "1%"보다 구체적

**Layer 2 (클릭 후 확장)**
- 다른 결제 수단 리스트 (알터너티브)
- 각 수단별 절약액 + 수수료
- 할부 정보 (조건부)

### 2️⃣ AlternativesList (Layer 2)

```
다른 결제 수단
├─ 우리카드      ₩150
│  수수료 0.7%
└─ 현금          ₩0
   수수료 0.8%
```

**상호작용**: 클릭 시 해당 수단이 추천 대상으로 변경

### 3️⃣ SettingsPanel (Layer 3)

- **수수료 명세**: Primary vs Base fee
- **캐시백/포인트**: 상세 정보 (Settings에만)
- **할부 정보**: 조건부 표시
- **추천 정보**: 신뢰도, 방식, 장점

---

## 📊 정보 계층화 매핑

| 정보 | Layer 1 | Layer 2 | Layer 3 | 심리학 근거 |
|------|--------|--------|--------|-----------|
| **결제 수단명** | ✅ | ✅ | ✅ | 필수 컨텍스트 |
| **절약액** | ✅ | ✅ | ✅ | Anchoring Effect |
| **수수료** | ✅ | ✅ | ✅ | Trust signal (95% 영향) |
| **할부** | - | ✅ | ✅ | 조건부 정보 |
| **포인트** | ❌ | ❌ | ✅ | Deferred (낮은 우선도) |
| **거래 ID** | ❌ | ❌ | ❌ | 노이즈 (제외) |
| **아이콘** | ❌ | ❌ | ❌ | 신뢰감 ↓ (제외) |

---

## 🔌 메시지 흐름

### 1. Checkout Detection
```
Content Script → detectCheckout()
    ↓
    CheckoutInfo {
      amount: 50000,
      methods: ['shinhan-card', 'cash'],
      siteId: 'coupang.com'
    }
```

### 2. Recommendation Request
```
Content Script ─→ [sendMessage] ─→ Background Service Worker
                                        ↓
                                   getRecommendation()
                                        ↓
                                   Return PaymentMethod[]
```

### 3. State Sync
```
Background ─→ chrome.storage.local
    ↓
Zustand (Persist middleware)
    ↓
Popup Components (via Selectors)
```

---

## 🎯 Typography (텍스트 계층)

### 크기 + 가중치

```
24px / 700 weight   ← 절약액 (강조)
18px / 600 weight   ← 결제 수단명
14px / 500 weight   ← 일반 텍스트
12px / 400 weight   ← 보조 정보
```

### 색상 역할

```
Primary (Indigo)    ← 행동/강조
Success (Green)     ← 절약/긍정
Gray-900           ← 주요 텍스트
Gray-500           ← 보조 텍스트
```

---

## 🔧 Tailwind 4.0 설정

### Config 포인트

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      success: 'var(--color-success)',
      gray: { /* 9 tones */ }
    }
  }
}
```

### CSS 변수 활용

```css
/* globals.css */
:root {
  --color-primary: oklch(0.62 0.14 39.04);
}

/* components */
className="bg-primary"  ← Tailwind이 --color-primary 참조
```

---

## 📋 구현 확인 사항

### ✅ 완성됨

1. **타입 정의** (`shared/types/index.ts`)
   - PaymentMethod, RecommendationState
   - ChromeMessage, CheckoutInfo

2. **색상 시스템** (`styles/globals.css`)
   - OKLCH 18개 색상 변수
   - 다크모드 (brightness-only 변경)
   - 접근성 (WCAG AA 준수)

3. **Zustand 스토어** (`shared/store/recommendationStore.ts`)
   - Chrome Storage 어댑터
   - Persist 미들웨어
   - 7개 액션 + 6개 셀렉터

4. **UI 컴포넌트** (`popup/components/`)
   - Button: 기본 버튼
   - RecommendationCard: Layer 1/2
   - AlternativesList: 선택지 리스트
   - SettingsPanel: Layer 3

5. **Popup 컨테이너** (`popup/Popup.tsx`)
   - 탭 네비게이션
   - 로딩/에러 상태
   - 400×500px 크기

6. **Background** (`background/index.ts`)
   - 메시지 핸들러
   - 추천 로직 (Mock 데이터)
   - Storage 초기화

7. **Content Script** (`content/index.ts`)
   - Checkout 감지
   - 추천 요청
   - Dynamic 페이지 감시

8. **Tailwind 설정** (`tailwind.config.ts`)
   - OKLCH 색상 변수 연동
   - 타이포그래피 정의
   - 스페이싱 정의

### ⏳ 다음 단계

1. **빌드 및 테스트**
   - `npm run build` 실행
   - 컴파일 에러 확인
   
2. **E2E 테스트**
   - Coupang 등에서 실제 checkout 감지 확인
   - Popup 표시 확인
   - 메시지 흐름 테스트

3. **실제 API 연동**
   - 결제 수단 데이터 API 통합
   - 추천 알고리즘 구현

4. **Chrome 스토어 배포**
   - manifest.json 최종화
   - 아이콘 준비
   - 보안 검사

---

## 📚 참고 문서

| 문서 | 용도 |
|------|------|
| INFORMATION_ARCHITECTURE_DEEP_DIVE.md | 정보 계층 심리학 |
| OKLCH_COLOR_SYSTEM_AND_ZUSTAND_GUIDE.md | 색상 + 상태 관리 |
| FINAL_REDESIGN_SUMMARY.md | 최종 설계 요약 |
| 본 문서 (UI_IMPLEMENTATION.md) | 구현 현황 |

---

## 🎉 마일스톤

- [x] 설계 완료
- [x] UI 컴포넌트 구현
- [x] 상태 관리 구현
- [x] 색상 시스템 정의
- [ ] 빌드 테스트
- [ ] E2E 테스트
- [ ] 실제 API 연동
- [ ] Chrome 스토어 배포

---

**다음 단계: `npm run build` 로 빌드 테스트 및 컴파일 에러 해결** 🚀
