# PicSel UI/UX 개선 계획 (설계 이론 기반)

## 📋 목차
1. [현재 상태 분석](#현재-상태-분석)
2. [UI/UX 설계 이론](#uiux-설계-이론)
3. [Chrome Extension UI 모범 사례](#chrome-extension-ui-모범-사례)
4. [개선 계획](#개선-계획)
5. [구현 로드맵](#구현-로드맵)

---

## 🔍 현재 상태 분석

### 현재 Dashboard (스크린샷 분석)
```
크기: 380px × 600px
레이아웃: 3-column grid
컬러: PicSel 브랜드 (차콜 그레이 + 틸 액센트)
타이포그래피: Pretendard Variable
```

### 문제점
1. **시각적 위계 부족**
   - 헤더와 본문 간 구분이 약함
   - 카드들이 같은 시각적 무게를 가짐

2. **공간 활용 비효율**
   - 380px 폭에서 3-column은 너무 촘촘함
   - 여백(spacing)이 일관성 없음

3. **사용성 문제**
   - CTA(Call-to-Action)가 명확하지 않음
   - 데이터 스캔(scanning) 어려움

---

## 📐 UI/UX 설계 이론

### 1. Material Design Principles

#### (1) Material as a Metaphor
- **Elevation (고도)**: 카드 계층 구조로 정보 우선순위 표현
- **Surface (표면)**: 배경, 카드, 컴포넌트를 명확히 구분
- **Shadow (그림자)**: Z-axis 깊이로 상호작용 가능성 표시

**적용 방안**:
```css
/* 레벨 1: 배경 */
background: bg-background (고도 0dp)

/* 레벨 2: 컨테이너 */
card: shadow-sm (고도 1dp)

/* 레벨 3: 호버/액티브 */
card:hover: shadow-md (고도 3dp)

/* 레벨 4: 모달/드롭다운 */
modal: shadow-lg (고도 8dp)
```

#### (2) Bold, Graphic, Intentional
- **Typography Hierarchy**: 6단계 텍스트 크기
- **Color Intention**: 각 색상이 명확한 의미 전달
- **Grid System**: 8pt 그리드 기반 정렬

**적용 방안**:
```typescript
// Typography Scale (Pretendard Variable)
h1: 32px / 40px (2rem / 2.5rem) - Dashboard Title
h2: 24px / 32px (1.5rem / 2rem) - Section Headers
h3: 20px / 28px (1.25rem / 1.75rem) - Card Titles
body: 16px / 24px (1rem / 1.5rem) - Primary Text
small: 14px / 20px (0.875rem / 1.25rem) - Secondary Text
caption: 12px / 16px (0.75rem / 1rem) - Metadata
```

#### (3) Motion Provides Meaning
- **Transition Duration**: 200ms (fast), 300ms (standard), 500ms (slow)
- **Easing**: cubic-bezier(0.4, 0.0, 0.2, 1) - Material easing
- **Purposeful Animation**: 사용자 행동에 대한 즉각적 피드백

**적용 방안**:
```css
/* Fast: Hover states */
transition: background-color 200ms cubic-bezier(0.4, 0.0, 0.2, 1);

/* Standard: Card expand/collapse */
transition: all 300ms cubic-bezier(0.4, 0.0, 0.2, 1);

/* Slow: Page transitions */
transition: transform 500ms cubic-bezier(0.4, 0.0, 0.2, 1);
```

### 2. 8pt Grid System

#### 핵심 원칙
- **모든 요소의 크기와 간격은 8의 배수**
- **작은 요소는 4pt 사용 가능** (아이콘, 구분선)
- **일관성**: 디자인 시스템 전체 일관성 확보

#### Spacing Scale
```typescript
const spacing = {
  0: '0px',      // 0pt
  1: '4px',      // 4pt - 매우 작은 간격 (아이콘 여백)
  2: '8px',      // 8pt - 작은 간격 (요소 내부)
  3: '12px',     // 12pt - 기본 간격
  4: '16px',     // 16pt - 섹션 내부 간격
  6: '24px',     // 24pt - 섹션 간 간격
  8: '32px',     // 32pt - 큰 섹션 간격
  12: '48px',    // 48pt - 매우 큰 간격
  16: '64px',    // 64pt - 페이지 레벨 간격
};
```

#### Sizing Scale
```typescript
const sizing = {
  icon-sm: 16px,   // 작은 아이콘
  icon-md: 24px,   // 중간 아이콘
  icon-lg: 32px,   // 큰 아이콘
  button-h: 40px,  // 버튼 높이 (터치 최소 48px 고려)
  input-h: 40px,   // 입력 필드 높이
  card-min: 80px,  // 카드 최소 높이
};
```

### 3. Chrome Extension UI Guidelines

#### (1) Popup Constraints
- **Width**: 최소 25px, 최대 800px
- **Height**: 최소 25px, 최대 600px
- **권장 크기**: 380px × 500-600px
- **반응형**: 사용자가 크기 조절 불가능

#### (2) Performance
- **Initial Load**: < 200ms
- **Interaction**: < 100ms
- **Animation**: 60fps (16.67ms/frame)

#### (3) Accessibility
- **Contrast Ratio**: 4.5:1 (일반 텍스트), 7:1 (강조 텍스트)
- **Touch Target**: 최소 44×44px
- **Keyboard Navigation**: Tab 순서, Focus indicators

#### (4) Best Practices (연구 결과)
1. **Silent Updates**: 업데이트 시 페이지 열지 않기
2. **Context-Aware**: 현재 페이지 정보 활용
3. **Minimal Permissions**: 필요한 권한만 요청
4. **Value Proposition**: 명확한 기능 제시

---

## 🎯 개선 계획

### Phase 1: 레이아웃 재설계 (8pt Grid 적용)

#### 개선안 1: Header 강화
```tsx
// Before
<header className="border-b flex-shrink-0">
  <div className="flex items-center justify-between p-4">
    <PixelGridIcon variant="accent" />
    <h1 className="text-xl font-bold tracking-tight">PicSel</h1>
  </div>
</header>

// After (8pt Grid)
<header className="bg-gradient-to-r from-picsel-600 to-pixel-600 flex-shrink-0">
  <div className="flex items-center justify-between px-6 py-4"> {/* 24px/16px */}
    <div className="flex items-center gap-3"> {/* 12px */}
      <PixelGridIcon variant="primary" />
      <div>
        <h1 className="text-xl font-bold text-white">PicSel</h1>
        <p className="text-xs text-white/70">스마트 결제 매니저</p>
      </div>
    </div>
    <ThemeToggle />
  </div>
</header>
```

#### 개선안 2: Quick Stats - 1-Column 레이아웃
```tsx
// Before: 3-column grid (너무 촘촘)
<div className="grid gap-4 grid-cols-3">

// After: 1-column stacked (명확한 위계)
<div className="space-y-3"> {/* 12px */}
  {/* 절약 금액 카드 (가장 중요) */}
  <Card className="bg-gradient-to-br from-savings-500 to-savings-600 text-white">
    <CardContent className="p-6"> {/* 24px */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/90">이번 달 절약</p>
          <h2 className="text-4xl font-bold mt-2">₩21,400</h2>
        </div>
        <div className="text-6xl opacity-20">💰</div>
      </div>
    </CardContent>
  </Card>

  {/* 통계 카드 (2-column 하위 그리드) */}
  <div className="grid grid-cols-2 gap-3"> {/* 12px */}
    <MiniStatCard 
      title="결제수단" 
      value="3개" 
      icon="💳"
      gradient="from-picsel-600 to-picsel-700"
    />
    <MiniStatCard 
      title="이번 달" 
      value="7건" 
      icon="📊"
      gradient="from-pixel-500 to-pixel-600"
    />
  </div>
</div>
```

#### 개선안 3: List Items - Information Density 최적화
```tsx
// Before: 너무 많은 정보
<div className="flex items-center justify-between p-4">
  <div className="flex items-center space-x-4">
    <span className="text-3xl">💳</span>
    <div>
      <p className="font-semibold">Toss Money</p>
      <p className="text-sm text-muted-foreground">₩125,000</p>
    </div>
  </div>
  <span className="text-xs bg-pixel-500 text-white px-3 py-1.5 rounded-full">
    주 결제수단
  </span>
</div>

// After: 스캔 가능한 레이아웃
<div className="flex items-center gap-4 p-4 rounded-lg hover:bg-pixel-50/30 transition-colors">
  <div className="flex-shrink-0">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-picsel-500 to-picsel-600 flex items-center justify-center text-2xl">
      💳
    </div>
  </div>
  <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2">
      <p className="font-semibold text-base">Toss Money</p>
      {isPrimary && <Badge variant="pixel" size="sm">주</Badge>}
    </div>
    <p className="text-sm text-muted-foreground truncate">₩125,000 잔액</p>
  </div>
  <ChevronRight className="w-5 h-5 text-muted-foreground" />
</div>
```

### Phase 2: Color System 정제

#### Contrast Ratio 개선
```css
/* 현재: picsel-50 bg + picsel-900 text */
/* Contrast: ~16:1 (과도하게 높음, 눈부심) */

/* 개선: picsel-50 bg + picsel-800 text */
/* Contrast: ~12:1 (최적) */

:root {
  --text-primary: var(--color-picsel-800);      /* AAA (7:1 이상) */
  --text-secondary: var(--color-picsel-600);    /* AA (4.5:1 이상) */
  --text-tertiary: var(--color-picsel-500);     /* 메타데이터용 */
}

.dark {
  --text-primary: var(--color-picsel-100);      /* AAA */
  --text-secondary: var(--color-picsel-300);    /* AA */
  --text-tertiary: var(--color-picsel-400);
}
```

#### Semantic Color Mapping
```css
/* Success (절약 금액) */
--color-success: var(--color-savings-500);
--color-success-hover: var(--color-savings-600);

/* Info (정보 카드) */
--color-info: var(--color-pixel-500);
--color-info-hover: var(--color-pixel-600);

/* Warning (주의사항) */
--color-warning: var(--color-warning-500);

/* Error (오류) */
--color-error: var(--color-error-500);

/* Neutral (기본 UI) */
--color-neutral: var(--color-picsel-500);
```

### Phase 3: Typography Hierarchy 강화

#### Font Size Scale (8pt 기반)
```css
/* Headings */
--text-5xl: 48px;  /* 6rem - 매우 큰 숫자 (절약 금액) */
--text-4xl: 36px;  /* 4.5rem - Dashboard Title (사용 안 함) */
--text-3xl: 30px;  /* 3.75rem - (사용 안 함) */
--text-2xl: 24px;  /* 3rem - 섹션 타이틀 */
--text-xl: 20px;   /* 2.5rem - 카드 타이틀 */
--text-lg: 18px;   /* 2.25rem - 강조 텍스트 */

/* Body */
--text-base: 16px; /* 2rem - 본문 */
--text-sm: 14px;   /* 1.75rem - 보조 텍스트 */
--text-xs: 12px;   /* 1.5rem - 메타데이터 */
```

#### Line Height
```css
/* 가독성 최적화 */
--leading-tight: 1.25;   /* Headings */
--leading-snug: 1.375;   /* Subheadings */
--leading-normal: 1.5;   /* Body */
--leading-relaxed: 1.625; /* Long-form content */
```

#### Font Weight
```css
/* Pretendard Variable */
--font-light: 300;    /* 보조 텍스트 */
--font-normal: 400;   /* 본문 */
--font-medium: 500;   /* 강조 */
--font-semibold: 600; /* 제목 */
--font-bold: 700;     /* 숫자, 중요 정보 */
```

### Phase 4: Motion Design

#### Animation Tokens
```css
/* Duration */
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-base: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;

/* Easing (Material Design) */
--ease-linear: cubic-bezier(0, 0, 1, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);  /* 기본 */
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1); /* 강조 */
```

#### Transition Classes
```tsx
// Hover states (fast)
<Card className="transition-all duration-fast ease-in-out hover:shadow-md hover:-translate-y-0.5">

// Loading states (base)
<PixelLoader className="animate-pulse duration-base" />

// Page transitions (slow)
<Dashboard className="transition-opacity duration-slow ease-emphasized" />
```

---

## 🏗️ 구현 로드맵

### Week 1: Foundation
- [ ] 8pt Grid Spacing Tokens 정의
- [ ] Typography Scale 적용
- [ ] Color Contrast 개선

### Week 2: Layout Refactoring
- [ ] Header 재설계 (그라데이션 배경)
- [ ] Quick Stats 1-column 변경
- [ ] Card Component 개선

### Week 3: Interaction Design
- [ ] Hover/Focus States
- [ ] Transition Animations
- [ ] Loading States (PixelLoader 활용)

### Week 4: Accessibility & Polish
- [ ] Keyboard Navigation
- [ ] ARIA Labels
- [ ] Contrast Ratio 검증
- [ ] Performance Optimization

---

## 📊 성과 지표

### Before (현재)
- Contrast Ratio: ~16:1 (과도함)
- Typography Scale: 4단계
- Spacing: 비일관적
- Animation: 기본적

### After (목표)
- Contrast Ratio: 7-12:1 (최적)
- Typography Scale: 6단계 (8pt 기반)
- Spacing: 8pt Grid 일관성
- Animation: Material Design Easing

---

## 🔗 참고 자료

### Material Design
- Guidelines: https://m2.material.io/design/guidelines-overview
- Motion: https://m2.material.io/design/motion

### Chrome Extension
- Best Practices: https://developer.chrome.com/docs/webstore/program-policies/best-practices
- UI Guidelines: https://lab.interface-design.co.uk/the-ultimate-guide-to-browser-extensions-design

### Design Systems
- 8pt Grid: https://medium.com/design-bootcamp/designing-in-the-8pt-grid-system-f3c1183ea6e8
- Spacing Best Practices: https://cieden.com/book/sub-atomic/spacing/spacing-best-practices

---

## ✅ Quick Wins (즉시 적용 가능)

### 1. Spacing 일관성
```css
/* 현재: p-4, p-6, space-y-6 혼용 */
/* 개선: 8pt Grid 기반 */
p-2  /* 8px */
p-3  /* 12px */
p-4  /* 16px */
p-6  /* 24px */
gap-3 /* 12px */
gap-4 /* 16px */
```

### 2. Typography Weight
```css
/* 현재: font-bold, font-semibold 혼용 */
/* 개선: 명확한 위계 */
font-bold      /* 숫자만 */
font-semibold  /* 제목 */
font-medium    /* 강조 텍스트 */
font-normal    /* 본문 */
```

### 3. Border Radius
```css
/* 현재: rounded-lg, rounded-full 혼용 */
/* 개선: 8pt 기반 */
rounded-none   /* 0px */
rounded-sm     /* 4px - 작은 요소 */
rounded-md     /* 8px - 카드, 버튼 */
rounded-lg     /* 12px - 큰 카드 */
rounded-full   /* 완전 원형 - 배지, 아바타 */
```
