# 보안 가이드

> Production-grade 보안 체크리스트 및 구현 가이드

## CSP (Content Security Policy)

### Manifest 설정
```json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

### 금지 사항
- ❌ Inline scripts
- ❌ `eval()`, `new Function()`
- ❌ External CDN
- ❌ `unsafe-inline`, `unsafe-eval`

## DOMPurify

### 설치
```bash
pnpm add dompurify
pnpm add -D @types/dompurify
```

### 사용
```typescript
import DOMPurify from 'dompurify';

const clean = DOMPurify.sanitize(untrustedHTML);
```

## Shadow DOM

### 격리 모드
```typescript
const shadow = element.attachShadow({ mode: 'closed' });
```

### Style Reset
```css
:host {
  all: initial;
}
```

## API Keys

### ❌ 절대 금지
```typescript
// Content Script에서
const API_KEY = 'sk-xxx'; // NEVER!
```

### ✅ 올바른 방법
```typescript
// Background only
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'API_REQUEST') {
    fetch(API_URL, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
  }
});
```

## PII Masking

### Logger 구현
```typescript
function maskPII(data: any): any {
  const masked = JSON.stringify(data);
  return masked
    .replace(/\d{3}-\d{4}-\d{4}/g, '***-****-****') // Phone
    .replace(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g, '***@***.***'); // Email
}
```

## 권한 최소화

### Optional Permissions
```json
{
  "optional_permissions": ["alarms", "notifications"],
  "optional_host_permissions": ["https://api.example.com/*"]
}
```

### Runtime 요청
```typescript
const granted = await chrome.permissions.request({
  permissions: ['alarms']
});
```

## 다음 단계

- [테스팅 전략](./testing.md)
- [QA 체크리스트](./qa-checklist.md)
