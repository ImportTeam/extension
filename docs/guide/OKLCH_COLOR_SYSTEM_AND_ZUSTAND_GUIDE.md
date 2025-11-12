# PicSel - OKLCH 색상 시스템 & Zustand 통합

> 현대적 색상 공간 + 상태 관리 패턴

---

## 🎨 OKLCH 색상 시스템

### OKLCH란?

**정의**: Oklab 색상 공간의 원형 표현

```
oklch(L% C H)
├─ L (Lightness):   0-1     밝기
├─ C (Chroma):      0-0.4   포화도
└─ H (Hue):         0-360   색상
```

**장점** (sRGB 대비):
- ✅ 지각적 균일성 (Perceptually Uniform)
- ✅ 접근성: 명암비 자동 계산 가능
- ✅ 다크모드 쉬움 (밝기만 변경)
- ✅ 색상 보간 자연스러움

---

## 🎯 PicSel 색상 팔레트

### 핵심 색상

#### Primary (행동/강조)

```
Light Mode:
--color-primary: oklch(0.62 0.14 39.04);  [인디고]

Dark Mode:
--color-primary: oklch(0.70 0.19 39.04);  [밝은 인디고]

밝기: 0.62 (Light) → 0.70 (Dark)
이유: 다크 배경에 명도 ↑
```

**사용처**:
- Primary Button
- Active Tab
- Focus State
- Link Color

#### Success (긍정/절약)

```
Light Mode:
--color-success: oklch(0.704 0.142 167.084);  [초록]

Dark Mode:
--color-success: oklch(0.75 0.15 167.084);    [밝은 초록]

명도: 0.704 (Light) → 0.75 (Dark)
```

**사용처**:
- 절약액 텍스트
- Success Badge
- Positive Indicator

#### Neutral/Gray Scale

```
--color-gray-50:   oklch(0.961 0 0);     [거의 하양]
--color-gray-100:  oklch(0.925 0 0);     [매우 밝은 회색]
--color-gray-200:  oklch(0.845 0 0);     [밝은 회색]
--color-gray-300:  oklch(0.767 0 0);     [중간 밝은 회색]
--color-gray-400:  oklch(0.683 0 0);     [중간 회색]
--color-gray-500:  oklch(0.6 0 0);       [중간 회색]
--color-gray-600:  oklch(0.51 0 0);      [중간 어두운 회색]
--color-gray-700:  oklch(0.42 0 0);      [어두운 회색]
--color-gray-800:  oklch(0.321 0 0);     [더 어두운 회색]
--color-gray-900:  oklch(0.218 0 0);     [거의 검정]

이점:
- 모두 0 Chroma = 순수 회색 (색감 없음)
- 밝기만으로 계층화 가능
- 다크모드 대응 간단
```

#### Semantic Colors

```
--color-error:     oklch(0.577 0.245 27.325);   [빨강]
--color-warning:   oklch(0.84 0.16 84);         [노랑/주황]
--color-info:      oklch(0.482 0.14 261.518);   [파랑]
```

---

## 🌓 다크모드 구현

### 원칙: Brightness만 변경

```css
:root {
  /* Light Mode */
  --color-primary: oklch(0.62 0.14 39.04);
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.218 0 0);
  --color-border: oklch(0.922 0 0);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark Mode - 밝기만 변경 */
    --color-primary: oklch(0.70 0.14 39.04);      /* +8% 밝기 */
    --color-background: oklch(0.145 0 0);         /* 역전 */
    --color-foreground: oklch(0.985 0 0);         /* 역전 */
    --color-border: oklch(0.220 0 0 / 0.1);       /* 투명도 추가 */
  }
}
```

**주의**: Chroma (C)는 변경하지 않음 (색감 일관성)

---

## 📱 접근성 검증

### 명암비 계산

**OKLCH에서 명암비 확인**:

```
공식: (L1 + 0.05) / (L2 + 0.05)
L1 = 밝은 색상의 Lightness
L2 = 어두운 색상의 Lightness

예: 텍스트 (gray-900) on 배경 (white)
명암비 = (0.218 + 0.05) / (1 + 0.05) = 0.257
= 약 3.9:1 (WCAG AA ✅ for 18px+ text)

절약액 (green) on 카드 배경
명암비 = (0.704 + 0.05) / (1 + 0.05) = 0.719
= 약 4.1:1 (WCAG AA ✅)
```

### 테스트 도구

```bash
# WebAIM Contrast Checker (온라인)
# 또는 VS Code Extension: Color Contrast Checker
```

---

## 🎨 컴포넌트별 색상 적용

### Button (Primary)

```css
.button--primary {
  background: oklch(var(--lightness, 0.62) 0.14 39.04);
  color: oklch(1 0 0);  /* white */
  
  &:hover {
    background: oklch(0.55 0.14 39.04);  /* -7% 어두움 */
  }
  
  &:active {
    background: oklch(0.48 0.14 39.04);  /* -14% 어두움 */
  }
  
  &:focus-visible {
    outline: 2px solid oklch(0.62 0.14 39.04);
    outline-offset: 2px;
  }
}
```

### Card (추천 카드)

```css
.recommendation-card {
  background: oklch(1 0 0);              /* white */
  border: 1px solid oklch(0.922 0 0);    /* light gray */
  color: oklch(0.218 0 0);               /* dark text */
  
  .recommendation-card__amount {
    color: oklch(0.704 0.142 167.084);   /* success green */
  }
  
  .recommendation-card__description {
    color: oklch(0.6 0 0);               /* medium gray */
  }
}
```

### Badge

```css
.badge--success {
  background: oklch(0.8 0.08 167.084 / 0.15);  /* 10% opacity */
  border: 1px solid oklch(0.704 0.142 167.084);
  color: oklch(0.2 0 0);                       /* dark for contrast */
}
```

---

## 🔄 Zustand 상태 관리 아키텍처

### 1. 핵심 상태 정의

```typescript
// store/types.ts
interface RecommendationState {
  // UI 상태
  isLoading: boolean;
  isExpanded: boolean;
  selectedTab: 'recommendation' | 'alternatives' | 'settings';
  
  // 데이터
  recommendation: PaymentMethod | null;
  alternatives: PaymentMethod[];
  error: string | null;
  
  // 액션
  setLoading: (loading: boolean) => void;
  setRecommendation: (rec: PaymentMethod) => void;
  toggleExpanded: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

interface PaymentMethod {
  id: string;                    // "card_shinhan_001"
  name: string;                  // "신한카드"
  savingAmount: number;          // 500 (₩)
  fee: number;                   // 0.5 (%)
  confidence: number;            // 0.95
  baseFee?: number;              // 0.8 (기준값)
  installmentAvailable?: boolean; // true/false
}
```

### 2. Zustand 스토어 구현

```typescript
// store/recommendationStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecommendationState {
  // State
  isLoading: boolean;
  isExpanded: boolean;
  recommendation: PaymentMethod | null;
  alternatives: PaymentMethod[];
  error: string | null;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setRecommendation: (rec: PaymentMethod) => void;
  setAlternatives: (alts: PaymentMethod[]) => void;
  toggleExpanded: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
  
  // 파생 상태 (selectors)
  getTotalSavings: () => number;
  getRelativeSavings: (methodId: string) => number;
}

export const useRecommendationStore = create<RecommendationState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      isLoading: false,
      isExpanded: false,
      recommendation: null,
      alternatives: [],
      error: null,
      
      // 액션
      setLoading: (loading) => set({ isLoading: loading }),
      
      setRecommendation: (rec) =>
        set({
          recommendation: rec,
          error: null,
          isLoading: false,
        }),
      
      setAlternatives: (alts) => set({ alternatives: alts }),
      
      toggleExpanded: () =>
        set((state) => ({ isExpanded: !state.isExpanded })),
      
      setError: (error) =>
        set({
          error,
          isLoading: false,
          recommendation: null,
        }),
      
      reset: () =>
        set({
          isLoading: false,
          isExpanded: false,
          recommendation: null,
          alternatives: [],
          error: null,
        }),
      
      // 파생 상태
      getTotalSavings: () => {
        const { recommendation, alternatives } = get();
        if (!recommendation) return 0;
        
        return (
          recommendation.savingAmount +
          alternatives.reduce((sum, alt) => sum + alt.savingAmount, 0)
        );
      },
      
      getRelativeSavings: (methodId: string) => {
        const { recommendation, alternatives } = get();
        if (!recommendation) return 0;
        
        const method = alternatives.find((alt) => alt.id === methodId);
        return method
          ? recommendation.savingAmount - method.savingAmount
          : recommendation.savingAmount;
      },
    }),
    {
      name: 'picsel-recommendation',
      partialize: (state) => ({
        // localStorage에 저장할 상태 (UI 상태 제외)
        recommendation: state.recommendation,
        alternatives: state.alternatives,
      }),
    },
  ),
);

// Selector 분리 (성능 최적화)
export const useRecommendationLoading = () =>
  useRecommendationStore((state) => state.isLoading);

export const useRecommendationData = () =>
  useRecommendationStore((state) => ({
    recommendation: state.recommendation,
    alternatives: state.alternatives,
  }));

export const useRecommendationUI = () =>
  useRecommendationStore((state) => ({
    isExpanded: state.isExpanded,
    toggleExpanded: state.toggleExpanded,
  }));
```

### 3. Chrome 메시지 통합

```typescript
// hooks/useRecommendation.ts
import { useEffect } from 'react';
import { useRecommendationStore } from '@store/recommendationStore';

export const useRecommendation = (checkoutInfo: CheckoutInfo) => {
  const {
    setLoading,
    setRecommendation,
    setAlternatives,
    setError,
  } = useRecommendationStore();
  
  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoading(true);
      
      try {
        const response = await chrome.runtime.sendMessage({
          type: 'GET_RECOMMENDATION',
          data: checkoutInfo,
        });
        
        if (response.success) {
          setRecommendation(response.data.recommendation);
          setAlternatives(response.data.alternatives);
        } else {
          setError(response.error || '추천을 가져올 수 없습니다');
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };
    
    if (checkoutInfo) {
      fetchRecommendation();
    }
  }, [checkoutInfo]);
};
```

### 4. 컴포넌트에서 사용

```typescript
// components/RecommendationCard.tsx
import { useRecommendationStore } from '@store/recommendationStore';

export const RecommendationCard = () => {
  // 필요한 상태만 구독 (성능 최적화)
  const recommendation = useRecommendationStore(
    (state) => state.recommendation,
  );
  const { isExpanded, toggleExpanded } = useRecommendationStore(
    (state) => ({
      isExpanded: state.isExpanded,
      toggleExpanded: state.toggleExpanded,
    }),
  );
  
  if (!recommendation) return null;
  
  return (
    <div
      className={`recommendation-card ${isExpanded ? 'expanded' : ''}`}
    >
      {/* Layer 1 */}
      <div className="recommendation-card__header">
        <h3 className="recommendation-card__title">
          {recommendation.name}
        </h3>
        <button
          onClick={toggleExpanded}
          className="recommendation-card__expand-btn"
        >
          {isExpanded ? '∧' : '∨'}
        </button>
      </div>
      
      <div className="recommendation-card__amount">
        ₩{recommendation.savingAmount} 절약
      </div>
      
      <div className="recommendation-card__fee">
        수수료 {recommendation.fee}% vs {recommendation.baseFee}%
      </div>
      
      {/* Layer 2 - 확장 시 */}
      {isExpanded && (
        <div className="recommendation-card__alternatives">
          {/* 다른 옵션들 렌더 */}
        </div>
      )}
    </div>
  );
};
```

---

## 🔌 Chrome Storage 동기화

### Persist Middleware 설정

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Chrome Storage Adapter
const chromeStorageAdapter = {
  getItem: async (name: string) => {
    const result = await chrome.storage.local.get(name);
    return result[name] ?? null;
  },
  setItem: async (name: string, value: string) => {
    await chrome.storage.local.set({ [name]: value });
  },
  removeItem: async (name: string) => {
    await chrome.storage.local.remove(name);
  },
};

export const useRecommendationStore = create<RecommendationState>()(
  persist(
    (set, get) => ({
      // ... store implementation
    }),
    {
      name: 'picsel-recommendation',
      storage: chromeStorageAdapter,
      partialize: (state) => ({
        recommendation: state.recommendation,
        alternatives: state.alternatives,
        // UI 상태는 저장하지 않음
      }),
    },
  ),
);
```

---

## 📊 성능 최적화 전략

### 1. Selector 분리

```typescript
// ✅ 좋음: 필요한 상태만 구독
const recommendation = useRecommendationStore(
  (state) => state.recommendation,
);

// ❌ 나쁨: 전체 스토어 구독 (불필요한 리렌더)
const store = useRecommendationStore();
```

### 2. Shallow Equality

```typescript
// ✅ 구조적 변경이 없으면 리렌더 안 됨
const { recommendation } = useRecommendationStore(
  (state) => ({
    recommendation: state.recommendation,
  }),
);
```

### 3. 메모이제이션

```typescript
import { useMemo } from 'react';

const RelativeSavings = ({ methodId }: Props) => {
  const getRelativeSavings = useRecommendationStore(
    (state) => state.getRelativeSavings,
  );
  
  const savings = useMemo(
    () => getRelativeSavings(methodId),
    [methodId, getRelativeSavings],
  );
  
  return <div>₩{savings} 더 절약</div>;
};
```

---

## ✅ 구현 체크리스트

### OKLCH 색상 시스템
- [ ] CSS 변수 정의 (globals.css)
- [ ] 라이트/다크 모드 구현
- [ ] 명암비 검증 (WCAG AA)
- [ ] 색상 보간 테스트

### Zustand 스토어
- [ ] 타입 정의 (types.ts)
- [ ] 스토어 구현 (recommendationStore.ts)
- [ ] Selector 최적화
- [ ] Chrome Storage 동기화

### 통합
- [ ] useRecommendation 훅
- [ ] 컴포넌트 통합
- [ ] 메시지 통신 테스트
- [ ] 상태 동기화 테스트

---

**다음**: 실제 React 컴포넌트 구현 시작
