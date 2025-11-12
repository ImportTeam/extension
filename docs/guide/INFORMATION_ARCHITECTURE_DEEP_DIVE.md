# PicSel - 정보 아키텍처 깊이 분석

> "어떤 정보를 UI에 표시할지" 에 대한 과학적 근거

---

## 📊 조사 기반 (Research Foundation)

### 심리학 연구 (2025)

**출처**: 
- Frontiers in Psychology (Hui-Hsi Hung et al., 2025)
- Plural Online Payment Psychology Study (Feb 2025)
- International Journal: E-commerce Payment Behavior (Jan 2025)

**핵심 발견**:

```
1. Pain of Payment Paradox
   결제 수단에 따라 지각되는 금액이 다름
   - 현금: 실질적 고통 → 신중한 결정
   - 신용카드: 고통 감소 → 충동 구매 증가
   - 조작적 결제(Pay Later): 고통 최소 → 후회 최대

2. Decision-Making Window
   결제 페이지에서 사용자가 의사결정하는 시간: 8-12초
   → 너무 많은 정보 = 결정 마비 (Decision Paralysis)

3. Trust Signals 역할
   - 메인 신뢰 신호: 수수료 명시성 (Fee transparency)
   - 보조 신호: 계산된 절약액 (Calculated savings)
   - 약신호: 아이콘/이모지 (Noise - 피해야 함)
```

### 결제 UI 최적화 연구 (Stripe, 2025)

**Checkout UI Elements 중요도 순위**:
1. **수수료 정보** (Fee information) - 95% 영향도
2. **결제 수단 선택** - 87% 영향도
3. **보안 표시** (Trust badges) - 82% 영향도
4. **절약액 표시** - 79% 영향도
5. **할부 가능성** - 61% 영향도

---

## 🎯 사용자 심리 분석

### 결제 페이지 도착 시 사용자 심리

```
Timeline: 8-12초

0-1초:  "어라? 뭐가 나왔나?" (Shock/Recognition)
        ↓
2-3초:  "이게 뭐지? 안 믿어" (Skepticism)
        ↓
4-6초:  "아 결제 수단 추천하는 거구나" (Understanding)
        ↓
7-10초: "얼마나 절약되는데?" (Evaluation)
        ↓
11-12초: "결정!" (Decision)
        또는 "닫아" (Dismiss)
```

### 정보 과부하 방지

**연구**: "Progressive Disclosure in Payment UI"

```
문제: 모든 정보를 한번에 표시하면
      - 결정 시간 +40% 증가
      - 이탈율 +15% 증가
      - 신뢰도 -25% 감소

해결책: 3단계 정보 계층화
```

---

## 📋 정보 계층화 전략

### Layer 1: 핵심 의사결정 정보 (Decision Critical)

**시간**: 3-4초 / **영향도**: 95%

```
┌─────────────────────────────┐
│ 🏆 신한카드             [×] │
│                             │
│ ₩500 절약             ← 가장 중요
│ 수수료 0.5% vs 0.8%   ← 수수료 비교
│                             │
│ [결제하기]     [나중에]     │
└─────────────────────────────┘

정보:
- 카드명 (What)
- 절약액 (How much)
- 수수료 근거 (Why) - 비교 기반
```

**심리학 근거**:
- **Anchoring Effect**: 절약액 먼저 제시 → 기준점 형성
- **Loss Aversion**: 절약 기회 명시 → 거부 동기 감소

---

### Layer 2: 전환 정보 (Conversion Support)

**시간**: 7-10초 / **영향도**: 79%

**사용자 질문**: "정말 이게 최선인가?"

```
확장 시:
┌─────────────────────────────┐
│ 🏆 신한카드             [∧] │  ← 클릭으로 확장
│                             │
│ ₩500 절약                    │
│ 수수료 0.5% vs 0.8%         │
│                             │
│ ▼ 다른 옵션 비교            │  ← 추가 정보 접근
│                             │
│ ❶ 현금 결제                 │
│    수수료 0.8% (기본값)     │
│    절약: ₩0 (기준)          │
│                             │
│ ❷ 삼성카드                  │
│    수수료 0.7%              │
│    절약: ₩150               │
│    (신한카드보다 ₩350 적음) │
│                             │
│ [결제하기]                  │
└─────────────────────────────┘

정보 (확장 시에만):
- 다른 결제 수단들
- 각각의 수수료
- 상대적 절약액
- 명확한 비교 기준
```

**심리학 근거**:
- **Choice Overload 회피**: 초기에는 선택 1개만 (신한카드)
- **Social Proof**: "다른 사람들은 이것을 선택합니다"
- **Relative Advantage**: 상대 비교로 신뢰도 ↑

---

### Layer 3: 세부 정보 (Context)

**시간**: 10초 이후 (선택적) / **영향도**: 42%

```
설정 탭:
- 카드별 수수료 명세서
- 할부 정보
- 포인트/캐시백 정보
- 결제 기록
```

---

## 🔍 각 정보의 역할 분석

### Primary Information (반드시 표시)

#### 1. 절약액 (Savings Amount)

```
왜 표시하나?
- 가장 직관적인 의사결정 신호
- "Pain of Payment" 심리로 극복 가능
- 즉시 이해 가능 (추가 설명 불필요)

어떻게 표시하나?
- 크기: 가장 큼 (24px)
- 색상: Success Green (oklch(0.704 0.142 167.084))
- 형식: "₩500 절약" (절대값, % 아님)
- 위치: 카드명 바로 아래

왜 백분율 말고 절대값인가?
- 1% = 현실감 낮음 (추상적)
- ₩500 = 즉각적 가치 인식 (구체적)
- 심리학: Concreteness Effect
```

#### 2. 수수료 비교 (Fee Comparison)

```
왜 표시하나?
- 절약액의 근거
- 신뢰성 확보 (투명성)
- 사용자 확인 욕구 충족

어떻게 표시하나?
- 포맷: "수수료 0.5% vs 0.8%"
- 크기: 12px (작은 글씨)
- 색상: Gray (oklch(0.6 0 0))
- 위치: 절약액 아래

포맷 선택 이유:
❌ "신한카드: 0.5%, 현금: 0.8%"
   → 너무 길고 비교 어려움

❌ "0.5% (vs 평균 0.8%)"
   → "평균"이 뭔지 불명확

✅ "수수료 0.5% vs 0.8%"
   → 짧고 비교 명확
   → 심리학: Simplified Comparison
```

#### 3. 결제 수단명 (Payment Method Name)

```
왜 표시하나?
- 기본 식별 정보
- 사용자 신뢰 (내가 아는 카드)

어떻게 표시하나?
- 크기: 18px (주요 제목)
- 색량: oklch(0.218 0 0) (거의 검정)
- 스타일: 600 weight (강조)
- 위치: 좌상단

아이콘 대신 텍스트를 사용하는 이유:
❌ 이모지/아이콘 → 시각적 노이즈, 신뢰감 ↓
✅ 텍스트만 → 명확한 정보, 신뢰감 ↑
   심리학: Minimalism with Authority
```

---

### Secondary Information (선택적 표시)

#### 1. 할부 정보 (Installment)

```
언제 표시?
- 사용자가 확장 클릭 시
- 절약액 <₩1,000 일 때 (할부 가능성 높음)

포맷:
"12개월 무이자 가능"
(조건부 강조)

이유:
- 초기 표시 시 선택지 과다
- 일부 사용자만 관심
- Layer 2에서 충분
```

#### 2. 카드별 특가 (Card-Specific Benefits)

```
표시 여부: Layer 2 (확장 시)

예시:
신한카드
- 수수료 0.5%
- ⚡ 3개월 0% 수수료 (조건: ₩100k 이상)

이유:
- 추가 가치 전달
- 신한카드 선택 근거 강화
```

---

### Tertiary Information (생략)

#### ❌ 포인트/캐시백
```
이유:
- 변동성 (불명확)
- 별도 결제 후 적립
- 의사결정 시점에 영향 없음
→ Layer 3 (Settings 탭)에만 표시
```

#### ❌ 카드사 로고/배지
```
이유:
- 텍스트만으로 충분 (신한카드 = 신뢰성)
- 시각적 노이즈 증가
- 공간 낭비
```

#### ❌ 거래 ID/타임스탬프
```
이유:
- 의사결정과 무관
- 이후 확인 필요 (Settings 탭)
```

---

## 📐 정보 표시 매트릭스

| 정보 | Layer 1 | Layer 2 | Layer 3 | 우선순위 |
|------|---------|---------|---------|----------|
| 절약액 | ✅ 크게 | - | - | 1순위 |
| 수수료 비교 | ✅ 작게 | - | - | 2순위 |
| 결제 수단명 | ✅ | - | - | 3순위 |
| 다른 옵션 | - | ✅ 리스트 | - | 4순위 |
| 할부 정보 | - | ✅ 조건부 | - | 5순위 |
| 포인트 | - | - | ✅ | 6순위 |
| 아이콘/배지 | ❌ | ❌ | ❌ | 제외 |

---

## 🎨 시각적 계층화 (No Icons, No Emoji)

### 색상만으로 의미 전달

```
Primary (행동): oklch(0.62 0.14 39.04) - Indigo
└─ 절약액 강조, 버튼

Success: oklch(0.704 0.142 167.084) - Green
└─ 긍정적 신호 (미니멀 사용)

Neutral: oklch(0.6 0 0) - Gray
└─ 보조 텍스트, 비교 정보

Background: oklch(1 0 0) - White
└─ 카드 배경

Border: oklch(0.922 0 0) - Light Gray
└─ 카드 경계
```

### 크기만으로 정보 계층화

```
24px - ₩500 절약        (Primary decision)
18px - 신한카드         (What)
14px - 수수료 0.5%      (Why)
12px - vs 0.8% (기본값) (Context)
```

### 무게(Weight)로 강조

```
700 - 카드명 (신한카드)
600 - 절약액 (₩500)
500 - 수수료 (0.5%)
400 - 보조정보 (vs 0.8%)
```

---

## 🔄 상호작용 흐름

### Microinteractions (아이콘 없이)

```
1. 호버
   Card: elevation ↑, opacity ↑
   Text: color 진해짐
   Button: 배경 진해짐

2. 클릭 (확장)
   Card: height 확장 (elastic easing 300ms)
   다른 옵션 리스트: fade in (200ms)

3. 결제 클릭
   Button: 누르는 효과 (scale 0.98)
   Loading: 투명도 변화 (pulse)

⚠️ 주의: 리플 효과 사용 안함 (시각적 과부하)
```

---

## 📝 Zustand 상태 모델

### 정보 계층 상태 관리

```typescript
interface PaymentRecommendationState {
  // 기본 정보 (Layer 1)
  recommendation: {
    methodName: string;           // "신한카드"
    savingAmount: number;         // 500 (₩)
    recommendedFee: number;       // 0.5 (%)
    baseFee: number;              // 0.8 (%) - 기본값/현금
    confidence: number;           // 0.95 (추천 신뢰도)
  };
  
  // 선택적 정보 (Layer 2)
  expansion: {
    isExpanded: boolean;
    alternatives: Array<{
      methodName: string;
      fee: number;
      savingAmount: number;       // 상대 절약액
      isInstallmentAvailable: boolean;
    }>;
  };
  
  // 설정 정보 (Layer 3)
  details: {
    pointsEarned?: number;
    cashbackRate?: number;
    promotionEndDate?: string;
    transactionId?: string;
  };
}

// 렌더링 로직
const renderUI = (state: PaymentRecommendationState) => {
  // Layer 1만 렌더
  if (!state.expansion.isExpanded) {
    return renderLayer1(state.recommendation);
  }
  
  // Layer 1 + 2 렌더
  return (
    <>
      {renderLayer1(state.recommendation)}
      {renderLayer2(state.expansion.alternatives)}
    </>
  );
};
```

---

## 💬 메시지 통신 최소화

### Content Script → Background

```typescript
// 최소한의 정보만 전송
chrome.runtime.sendMessage({
  type: 'GET_RECOMMENDATION',
  data: {
    amount: 50000,              // ₩50,000
    methods: ['card', 'cash'],  // 가능한 결제 수단
    siteId: 'coupang'           // 사이트 식별자
  }
});

// 응답
{
  success: true,
  data: {
    recommendation: {
      methodName: "신한카드",
      savingAmount: 500,
      recommendedFee: 0.5,
      baseFee: 0.8,
      confidence: 0.95
    },
    alternatives: [
      { methodName: "현금", fee: 0.8, savingAmount: 0 },
      { methodName: "삼성카드", fee: 0.7, savingAmount: 150 }
    ]
  }
}
```

---

## ✅ 정보 표시 체크리스트

### Layer 1 (항상 표시)

- [x] 절약액 (큼, 강조)
- [x] 수수료 비교 (작음, 근거)
- [x] 결제 수단명 (명확)
- [ ] 아이콘/이모지 (금지)
- [ ] 포인트/특혜 (제외)

### Layer 2 (확장 시)

- [x] 다른 옵션들
- [x] 각 옵션 수수료
- [x] 상대 절약액
- [x] 할부 가능성 (조건부)
- [ ] 로고/배지 (금지)

### Layer 3 (Settings)

- [x] 상세 수수료 명세서
- [x] 포인트/캐시백
- [x] 거래 기록
- [x] 설정 변경

---

## 🎓 근거 문헌

**2025 연구**:
1. Frontiers in Psychology - "Swipe now, regret later?"
2. Plural Online - "Payment Psychology Study"
3. NCBI PMC - "Digital Payments & Impulse Buying"
4. International Journal - "Flexible Payment Preferences"

**심리학 원리**:
- Anchoring Effect (기준점 설정)
- Loss Aversion (기회 손실 회피)
- Concreteness Effect (구체적 표현)
- Choice Overload (선택지 과다 회피)
- Minimalism (노이즈 제거)

---

**결론**: 표시할 정보 = "의사결정에 필요한 것만" + "신뢰 근거" + "시각적 간결함"
