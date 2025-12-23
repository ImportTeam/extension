# PicSel 로그인 아키텍처

## 🏗️ 전체 구조 (간단함!)

```
Settings 버튼 클릭
    ↓
"로그인" 버튼 클릭
    ↓
picsel.kr/login 열기 (새 탭)
    ↓
웹에서 로그인 완료
    ↓
postMessage로 토큰 전달
    ↓
Content Script에서 수신
    ↓
Background로 전달
    ↓
chrome.storage.local에 저장
    ↓
API 요청시 자동으로 토큰 첨부
```

## 📁 파일 구조

```
src/
├── shared/
│   ├── store/slices/
│   │   └── auth.ts                 # Zustand 인증 상태
│   ├── utils/
│   │   ├── authService.ts          # API 연동
│   │   └── tokenManager.ts         # chrome.storage 관리
│   └── hooks/
│       └── useAuth.ts              # 로그인 hook
├── content/
│   └── services/
│       └── authListener.ts         # 웹 postMessage 수신
├── background/
│   └── authMessageHandler.ts       # 토큰 저장 처리
├── options/
│   └── index.tsx                   # "로그인" 버튼 추가
└── .env
    └── SERVER_URL=https://api.picsel.kr
```

## 🔑 핵심 플로우

### 1. Settings에서 로그인 버튼 클릭

```typescript
// src/options/index.tsx
const handleLogin = (): void => {
  chrome.tabs.create({
    url: 'https://picsel.kr/login',
  });
};
```

### 2. 웹에서 로그인 후 토큰 전달

```typescript
// picsel.kr/login (웹)
window.opener.postMessage({
  type: 'EXTENSION_AUTH_TOKEN',
  accessToken: 'jwt...',
  refreshToken: 'jwt...',
  expiresIn: 3600
}, 'chrome-extension://<EXTENSION_ID>');
```

### 3. Content Script에서 수신

```typescript
// src/content/services/authListener.ts
window.addEventListener('message', (event) => {
  if (event.data?.type === 'EXTENSION_AUTH_TOKEN') {
    chrome.runtime.sendMessage({
      type: 'EXTENSION_AUTH_TOKEN',
      accessToken,
      refreshToken,
      expiresIn,
    });
  }
});
```

### 4. Background에서 저장

```typescript
// src/background/authMessageHandler.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'EXTENSION_AUTH_TOKEN') {
    TokenManager.saveToken(token).then(() => sendResponse({ success: true }));
  }
});
```

### 5. API 요청 시 자동 사용

```typescript
// anywhere in extension
const response = await AuthService.fetchWithAuth('/api/endpoint');
// → 자동으로 Authorization: Bearer <token> 헤더 추가
```

## 🔐 보안

| 항목 | ✅ 구현됨 |
|-----|---------|
| 쿠키 직접 접근 | ❌ 안 함 |
| chrome.storage.local | ✅ JWT 저장 |
| postMessage origin 검증 | ✅ 화이트리스트 |
| 토큰 갱신 | ✅ Silent Refresh |
| Chrome 심사 | ✅ 안전 |

## 🎯 왜 이 구조?

✅ **Popup 깔끔함** - 로그인 UI 없음
✅ **웹과 일관성** - 웹에서만 로그인
✅ **보안 우수** - 쿠키 탈취 위험 없음
✅ **Chrome 심사** - 권한 최소화
✅ **구현 간단** - postMessage만 사용
