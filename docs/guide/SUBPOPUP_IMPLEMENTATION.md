# SubPopup 구현 가이드

## 📋 개요

PicSel의 **SubPopup**은 결제 수단을 추가, 수정, 삭제할 수 있는 독립적인 UI입니다. Iframe을 통해 MainPopup과 분리되어 있으며, Zustand + Chrome Storage로 상태를 관리합니다.

### 특징
- ✅ 독립적인 팝업 윈도우 (420x600px)
- ✅ 탭 기반 네비게이션 (추가 / 목록)
- ✅ 결제 수단 CRUD 기능
- ✅ Tailwind CSS 스타일링
- ✅ Chrome Storage 동기화
- ✅ Zustand 상태 관리

---

## 🏗️ 아키텍처

### 파일 구조

```
src/
├── subpopup/
│   ├── index.html              # SubPopup HTML entry
│   ├── index.tsx               # React 마운트 포인트
│   └── components/
│       ├── SubPopup.tsx        # 메인 컴포넌트 (헤더, 탭)
│       ├── AddPaymentForm.tsx  # 결제 수단 추가 폼
│       ├── PaymentMethodsList.tsx  # 결제 수단 목록
│       └── index.ts            # Exports
│
├── shared/
│   ├── store/
│   │   ├── recommendationStore.ts   # 기존 추천 스토어
│   │   └── subpopupStore.ts         # SubPopup 상태 관리 ✨ NEW
│   ├── types/
│   │   └── index.ts            # 타입 정의 (확장됨)
│   └── utils/
│       ├── index.ts
│       └── subpopupMessaging.ts  # Iframe 통신 유틸 ✨ NEW
│
└── popup/
    └── styles/
        └── subpopup.css         # SubPopup 스타일 ✨ NEW
```

---

## 🎯 주요 컴포넌트

### 1. SubPopup.tsx (메인 컴포넌트)

**역할**: 전체 레이아웃 관리, 탭 네비게이션

```tsx
export const SubPopup: React.FC = () => {
  const activeTab = useSubPopupActiveTab();
  const { setActiveTab } = useSubPopupActions();

  return (
    <div>
      {/* Header with 💳 icon and close button */}
      <div className="subpopup-header">...</div>

      {/* Tab Navigation */}
      <div className="subpopup-tabs">
        <button onClick={() => setActiveTab('add')}>+ 추가</button>
        <button onClick={() => setActiveTab('list')}>📋 목록</button>
      </div>

      {/* Content Area */}
      <div className="subpopup-content">
        {activeTab === 'add' && <AddPaymentForm />}
        {activeTab === 'list' && <PaymentMethodsList />}
      </div>
    </div>
  );
};
```

### 2. AddPaymentForm.tsx

**역할**: 새로운 결제 수단 추가

**입력 필드**:
- `name`: 결제 수단 이름 (필수)
- `savingAmount`: 예상 절약 금액 (필수)
- `fee`: 현재 수수료 % (필수)
- `baseFee`: 기준 수수료 % (필수)
- `confidence`: 신뢰도 0-1 (필수)
- `hasInstallment`: 할부 지원 여부 (선택)
- `installmentInfo`: 할부 정보 텍스트 (선택)

**기능**:
- ✅ Form validation
- ✅ Error/Success 메시지
- ✅ Zustand에 저장
- ✅ Chrome Storage 자동 동기화

### 3. PaymentMethodsList.tsx

**역할**: 저장된 결제 수단 목록 표시 및 관리

**기능**:
- ✅ 목록 표시 (생성일, 신뢰도 배지)
- ✅ 상세 정보 표시 (절약액, 수수료, 신뢰도, 기준수수료)
- ✅ 삭제 버튼
- ✅ 빈 상태 메시지

---

## 💾 상태 관리 (Zustand Store)

### `subpopupStore.ts`

```typescript
export const useSubPopupStore = create<SubPopupState>()(
  persist(
    (set) => ({
      // State
      isOpen: false,
      activeTab: 'list',
      customMethods: CustomPaymentMethod[],

      // Actions
      setIsOpen(open: boolean),
      setActiveTab(tab: 'add' | 'list'),
      addPaymentMethod(method),
      updatePaymentMethod(id, updates),
      deletePaymentMethod(id),
      setCustomMethods(methods),
      reset(),
    }),
    {
      name: 'subpopup-store',
      storage: chromeStorageAdapter,
      partialize: (state) => ({
        customMethods: state.customMethods, // Only persist this
      }),
    }
  )
);
```

### Selectors (성능 최적화)

```typescript
export const useIsSubPopupOpen = () => useSubPopupStore((state) => state.isOpen);
export const useSubPopupActiveTab = () => useSubPopupStore((state) => state.activeTab);
export const useCustomPaymentMethods = () => useSubPopupStore((state) => state.customMethods);
export const useSubPopupActions = () => useSubPopupStore((state) => ({...}));
```

---

## 🎨 스타일링 (CSS)

### 파일: `src/popup/styles/subpopup.css`

#### CSS 변수 (컬러 시스템)

```css
:root {
  /* Light Theme */
  --subpopup-bg: #ffffff;
  --subpopup-bg-secondary: #f5f5f5;
  --subpopup-card-bg: #f9fafb;
  
  --subpopup-primary: #4f46e5;
  --subpopup-success: #10b981;
  --subpopup-danger: #ef4444;
  
  /* Text */
  --subpopup-text-primary: #1a1a1a;
  --subpopup-text-secondary: #555555;
  --subpopup-text-tertiary: #888888;
}
```

#### 주요 클래스

| 클래스 | 용도 |
|--------|------|
| `.subpopup-header` | 헤더 영역 |
| `.subpopup-tabs` | 탭 네비게이션 |
| `.subpopup-content` | 콘텐츠 영역 (스크롤 가능) |
| `.form-section` | 폼 섹션 |
| `.form-group` | 폼 그룹 |
| `.form-input` | 입력 필드 |
| `.payment-item` | 결제 수단 카드 |
| `.btn` | 버튼 (primary, secondary, danger) |

#### Tailwind 통합

현재는 **인라인 스타일**과 **클래스**를 혼합 사용합니다.

#### 반응형 설계

```css
/* Header 고정, Content 스크롤 */
.subpopup-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

/* 스크롤바 스타일 */
.subpopup-content::-webkit-scrollbar {
  width: 6px;
}
```

---

## 🔄 MainPopup과의 통신

### 메시징 유틸: `subpopupMessaging.ts`

```typescript
// MainPopup에서 SubPopup 열기
export const openSubPopup = () => {
  chrome.windows.create({
    url: chrome.runtime.getURL('src/subpopup/index.html'),
    type: 'popup',
    width: 420,
    height: 600,
  });
};

// SubPopup → MainPopup
export const sendToMainPopup = (message: SubPopupMessage) => {
  if (window.opener && !window.opener.closed) {
    window.opener.postMessage(message, '*');
  }
};

// MainPopup에서 메시지 수신
export const onSubPopupMessage = (callback) => {
  window.addEventListener('message', (event) => {
    if (event.source === window) return; // 같은 윈도우 제외
    callback(event.data);
  });
};
```

### 사용 예시

**MainPopup에서 SubPopup 열기** (`Popup.tsx`):

```tsx
const handleOpenSettings = () => {
  chrome.windows.create({
    url: chrome.runtime.getURL('src/subpopup/index.html'),
    type: 'popup',
    width: 420,
    height: 600,
  });
};

<button onClick={handleOpenSettings} title="결제 수단 설정">
  <Gear weight="bold" size={20} />
</button>
```

---

## 📝 타입 정의 (확장)

### `shared/types/index.ts`

```typescript
export interface CustomPaymentMethod extends PaymentMethod {
  createdAt: number;
  updatedAt: number;
  isCustom: true;
}

export interface SubPopupState {
  isOpen: boolean;
  activeTab: 'add' | 'list';
  isLoading: boolean;
  error: string | null;
  customMethods: CustomPaymentMethod[];
  
  setIsOpen(open: boolean): void;
  setActiveTab(tab: 'add' | 'list'): void;
  addPaymentMethod(method): void;
  updatePaymentMethod(id: string, updates): void;
  deletePaymentMethod(id: string): void;
  setCustomMethods(methods): void;
  reset(): void;
}
```

---

## ✨ 주요 기능

### 1. 결제 수단 추가

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  const newMethod = {
    id: `custom-${Date.now()}`,
    name: formData.name,
    savingAmount: formData.savingAmount,
    fee: formData.fee,
    baseFee: formData.baseFee,
    confidence: formData.confidence,
    hasInstallment: formData.hasInstallment,
    installmentInfo: formData.installmentInfo,
  };
  
  addPaymentMethod(newMethod);
};
```

### 2. 결제 수단 삭제

```tsx
const handleDelete = (id: string) => {
  if (window.confirm('이 결제 수단을 삭제하시겠습니까?')) {
    deletePaymentMethod(id);
  }
};
```

### 3. Chrome Storage 동기화

Zustand의 `persist` 미들웨어가 자동으로 처리:

```typescript
persist(..., {
  name: 'subpopup-store',
  storage: chromeStorageAdapter, // Chrome Storage 사용
  partialize: (state) => ({
    customMethods: state.customMethods, // 이것만 저장
  }),
})
```

---

## 🚀 빌드 및 배포

### Vite 설정

`vite.config.ts`에 이미 설정되어 있음:

```typescript
input: {
  background: resolve(__dirname, 'src/background/index.ts'),
  content: resolve(__dirname, 'src/content/index.ts'),
  popup: resolve(__dirname, 'src/popup/index.html'),
  options: resolve(__dirname, 'src/options/index.html'),
  subpopup: resolve(__dirname, 'src/subpopup/index.html'), // ✅
}
```

### Manifest 설정

`manifest.json`에 이미 설정되어 있음:

```json
"web_accessible_resources": [
  {
    "resources": [
      "assets/*",
      "src/subpopup/index.html"
    ],
    "matches": ["<all_urls>"]
  }
]
```

### 빌드 명령

```bash
pnpm build
```

결과:
- `dist/src/subpopup/index.html`
- `dist/assets/subpopup-*.js`
- `dist/assets/subpopup-*.css`

---

## 🧪 테스트 (향후)

```typescript
// tests/subpopup.test.ts
describe('SubPopup Store', () => {
  it('should add payment method', () => {
    const { addPaymentMethod, getState } = useSubPopupStore();
    
    addPaymentMethod({
      id: 'test',
      name: '테스트카드',
      // ...
    });
    
    expect(getState().customMethods.length).toBe(1);
  });
});
```

---

## 🎯 향후 개선

- [ ] Edit 기능 추가 (현재는 삭제만 가능)
- [ ] Drag & Drop으로 순서 변경
- [ ] 즐겨찾기 기능
- [ ] 통계 대시보드
- [ ] 다크모드 완성
- [ ] E2E 테스트
- [ ] 성능 최적화 (가상화)

---

## 📚 참고

- **상태 관리**: Zustand + Chrome Storage
- **스타일링**: CSS + Inline styles
- **번들러**: Vite
- **프레임워크**: React 18
- **언어**: TypeScript

---

## ✅ 체크리스트

- [x] SubPopup 컴포넌트 구조 설계
- [x] Zustand Store 구현
- [x] CSS 스타일 정의
- [x] AddPaymentForm 구현
- [x] PaymentMethodsList 구현
- [x] MainPopup 통합 (Settings 버튼)
- [x] Vite 빌드 설정
- [x] Manifest 설정
- [x] 빌드 성공 확인 ✅

---

**마지막 수정**: 2025년 11월 2일  
**상태**: ✅ 완성
