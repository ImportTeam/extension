# PicSel Extension - 브랜드 기반 UI/UX 재설계

## 📋 개요

**목표**: PicSel 브랜드 아이덴티티를 반영한 독자적인 디자인 시스템 구축
**인증**: PASS 본인인증 → 마이데이터 API 연동
**API**: 한국은행 환율 API 통합

---

## 🎨 Part 1: PicSel 브랜드 컬러 시스템

### 1.1 로고 분석 및 컬러 추출

#### PicSel 로고 특징
- **주색상**: 다크 차콜 그레이 (#4A5568 ~ #475569)
- **시그니처 요소**: 'i' 위의 4개 픽셀 그리드
- **디자인 철학**: 미니멀, 모던, 기술적

#### 브랜드 컬러 팔레트

```css
/* global.css */
@import "tailwindcss";

@theme {
  /* ============================================
     PicSel 브랜드 Primary - 차콜 그레이
     ============================================ */
  --color-picsel-50: oklch(0.98 0.005 250);   /* 거의 화이트 */
  --color-picsel-100: oklch(0.95 0.008 250);  /* 라이트 그레이 */
  --color-picsel-200: oklch(0.88 0.012 250);  
  --color-picsel-300: oklch(0.75 0.015 250);
  --color-picsel-400: oklch(0.60 0.018 250);
  --color-picsel-500: oklch(0.48 0.020 250);  /* 로고 메인 컬러 */
  --color-picsel-600: oklch(0.38 0.018 250);
  --color-picsel-700: oklch(0.30 0.015 250);
  --color-picsel-800: oklch(0.22 0.012 250);  /* 다크 모드 배경 */
  --color-picsel-900: oklch(0.15 0.008 250);  /* 거의 블랙 */
  
  /* ============================================
     Accent - 픽셀 강조색 (틸/시안)
     ============================================ */
  --color-pixel-50: oklch(0.96 0.02 200);
  --color-pixel-100: oklch(0.92 0.04 200);
  --color-pixel-200: oklch(0.85 0.08 200);
  --color-pixel-300: oklch(0.75 0.12 200);
  --color-pixel-400: oklch(0.65 0.15 200);
  --color-pixel-500: oklch(0.55 0.18 200);    /* 메인 액센트 */
  --color-pixel-600: oklch(0.45 0.16 200);
  --color-pixel-700: oklch(0.35 0.13 200);
  --color-pixel-800: oklch(0.25 0.10 200);
  --color-pixel-900: oklch(0.18 0.07 200);
  
  /* ============================================
     Functional - 기능별 시맨틱 컬러
     ============================================ */
  /* Success - 절약 금액 강조 */
  --color-savings-50: oklch(0.96 0.03 145);
  --color-savings-100: oklch(0.92 0.06 145);
  --color-savings-500: oklch(0.65 0.18 145);  /* 그린 */
  --color-savings-600: oklch(0.55 0.16 145);
  --color-savings-700: oklch(0.45 0.14 145);
  
  /* Warning - 주의사항 */
  --color-warning-50: oklch(0.96 0.03 85);
  --color-warning-500: oklch(0.75 0.15 85);   /* 옐로우 */
  --color-warning-700: oklch(0.55 0.12 85);
  
  /* Error - 오류 */
  --color-error-50: oklch(0.96 0.03 25);
  --color-error-500: oklch(0.60 0.22 25);     /* 레드 */
  --color-error-700: oklch(0.45 0.18 25);
  
  /* ============================================
     시맨틱 토큰 - Light Mode
     ============================================ */
  --color-background: var(--color-picsel-50);
  --color-surface: #FFFFFF;
  --color-surface-hover: var(--color-picsel-100);
  --color-border: var(--color-picsel-200);
  --color-border-strong: var(--color-picsel-300);
  
  --color-text-primary: var(--color-picsel-900);
  --color-text-secondary: var(--color-picsel-600);
  --color-text-tertiary: var(--color-picsel-400);
  
  --color-primary: var(--color-picsel-500);
  --color-primary-hover: var(--color-picsel-600);
  --color-primary-active: var(--color-picsel-700);
  
  --color-accent: var(--color-pixel-500);
  --color-accent-hover: var(--color-pixel-600);
  
  /* ============================================
     시맨틱 토큰 - Dark Mode
     ============================================ */
  @media (prefers-color-scheme: dark) {
    --color-background: var(--color-picsel-900);
    --color-surface: var(--color-picsel-800);
    --color-surface-hover: var(--color-picsel-700);
    --color-border: var(--color-picsel-700);
    --color-border-strong: var(--color-picsel-600);
    
    --color-text-primary: var(--color-picsel-50);
    --color-text-secondary: var(--color-picsel-300);
    --color-text-tertiary: var(--color-picsel-400);
    
    --color-primary: var(--color-picsel-400);
    --color-primary-hover: var(--color-picsel-300);
    --color-primary-active: var(--color-picsel-200);
    
    --color-accent: var(--color-pixel-400);
    --color-accent-hover: var(--color-pixel-300);
  }
}
```

### 1.2 Tailwind 유틸리티 클래스

```tsx
// 사용 예시
<div className="bg-picsel-500 text-white">PicSel Brand</div>
<button className="bg-pixel-500 hover:bg-pixel-600">Accent Button</button>
<span className="text-savings-500">₩15,420 절약</span>
```

---

## ✍️ Part 2: 타이포그래피 & 스페이싱

### 2.1 폰트 시스템

```css
@theme {
  /* 한글 최적화 폰트 */
  --font-sans: "Pretendard Variable", "Pretendard", -apple-system, 
               BlinkMacSystemFont, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", "Consolas", monospace;
  
  /* 폰트 크기 스케일 */
  --font-size-xs: 0.75rem;     /* 12px */
  --font-size-sm: 0.875rem;    /* 14px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;    /* 18px */
  --font-size-xl: 1.25rem;     /* 20px */
  --font-size-2xl: 1.5rem;     /* 24px */
  --font-size-3xl: 2rem;       /* 32px */
  --font-size-4xl: 2.5rem;     /* 40px */
  
  /* 폰트 굵기 */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### 2.2 타이포그래피 컴포넌트

```tsx
// src/shared/components/Typography.tsx
export const Typography = {
  H1: ({ children, className = '' }) => (
    <h1 className={`text-3xl font-bold text-text-primary ${className}`}>
      {children}
    </h1>
  ),
  
  H2: ({ children, className = '' }) => (
    <h2 className={`text-2xl font-semibold text-text-primary ${className}`}>
      {children}
    </h2>
  ),
  
  Body: ({ children, className = '' }) => (
    <p className={`text-base text-text-secondary ${className}`}>
      {children}
    </p>
  ),
  
  Caption: ({ children, className = '' }) => (
    <span className={`text-sm text-text-tertiary ${className}`}>
      {children}
    </span>
  ),
  
  Stat: ({ children, className = '' }) => (
    <span className={`text-3xl font-bold text-text-primary ${className}`}>
      {children}
    </span>
  ),
};
```

### 2.3 스페이싱 시스템 (8pt Grid)

```css
@theme {
  --spacing-0: 0;
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-5: 1.25rem;  /* 20px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-10: 2.5rem;  /* 40px */
  --spacing-12: 3rem;    /* 48px */
  --spacing-16: 4rem;    /* 64px */
}
```

---

## 🧩 Part 3: 컴포넌트 디자인

### 3.1 픽셀 모티프 활용

#### PixelGrid 컴포넌트
```tsx
// src/shared/components/PixelGrid.tsx
export const PixelGrid = ({ size = 'md', animated = false }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`
            ${sizeClasses[size]}
            bg-pixel-500 
            rounded-sm
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{
            animationDelay: animated ? `${i * 100}ms` : '0ms'
          }}
        />
      ))}
    </div>
  );
};
```

### 3.2 Card 컴포넌트 재설계

```tsx
// src/shared/components/Card.tsx
export const Card = ({ 
  children, 
  variant = 'default',
  hoverable = false,
  className = '' 
}) => {
  const variants = {
    default: 'bg-surface border border-border',
    elevated: 'bg-surface shadow-lg border-0',
    gradient: 'bg-gradient-to-br from-picsel-500 to-picsel-700 text-white border-0',
    savings: 'bg-gradient-to-br from-savings-50 to-pixel-50 border border-savings-200',
  };
  
  return (
    <div className={`
      rounded-2xl p-6
      ${variants[variant]}
      ${hoverable ? 'hover:shadow-xl transition-all duration-300 cursor-pointer' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};
```

### 3.3 Dashboard 재설계

```tsx
// src/popup/components/Dashboard.tsx
import { PixelGrid } from '@/shared/components/PixelGrid';
import { Card } from '@/shared/components/Card';
import { Typography } from '@/shared/components/Typography';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSavings: 750420,
    cardsCount: 5,
    transactionsCount: 124,
  });

  return (
    <div className="space-y-6 p-6 bg-background min-h-[600px]">
      {/* Header with Pixel Grid */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PixelGrid size="lg" animated />
          <Typography.H1>PicSel</Typography.H1>
        </div>
        <button className="p-2 rounded-lg hover:bg-surface-hover">
          <SettingsIcon />
        </button>
      </div>

      {/* Hero Stats - Savings Focus */}
      <Card variant="gradient" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <PixelPattern size={100} />
        </div>
        <div className="relative z-10">
          <Typography.Caption className="text-picsel-100">
            총 절약 금액
          </Typography.Caption>
          <Typography.Stat className="text-white mt-2">
            ₩{stats.totalSavings.toLocaleString()}
          </Typography.Stat>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <TrendUpIcon className="w-4 h-4" />
              <span>지난 달 대비 +12%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card hoverable>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-pixel-100 dark:bg-pixel-800 
                            flex items-center justify-center">
              <CreditCardIcon className="w-5 h-5 text-pixel-500" />
            </div>
            <div>
              <Typography.Stat className="text-xl">
                {stats.cardsCount}
              </Typography.Stat>
              <Typography.Caption>등록 카드</Typography.Caption>
            </div>
          </div>
        </Card>

        <Card hoverable>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-savings-100 dark:bg-savings-800 
                            flex items-center justify-center">
              <ReceiptIcon className="w-5 h-5 text-savings-500" />
            </div>
            <div>
              <Typography.Stat className="text-xl">
                {stats.transactionsCount}
              </Typography.Stat>
              <Typography.Caption>이번 달 거래</Typography.Caption>
            </div>
          </div>
        </Card>
      </div>

      {/* Smart Recommendation */}
      <Card variant="savings">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-pixel-500 
                          flex items-center justify-center flex-shrink-0">
            <SparklesIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <Typography.H2 className="text-lg mb-2">
              지금 쇼핑몰에서 최적의 카드
            </Typography.H2>
            <div className="flex items-center justify-between 
                            bg-white dark:bg-picsel-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <img src="/cards/kb.svg" className="w-12 h-12" />
                <div>
                  <Typography.Body className="font-semibold">
                    KB국민 Liiv Mate
                  </Typography.Body>
                  <Typography.Caption className="text-savings-600">
                    ₩2,340 더 절약 가능
                  </Typography.Caption>
                </div>
              </div>
              <button className="px-4 py-2 bg-pixel-500 text-white 
                                 rounded-lg hover:bg-pixel-600 transition-colors">
                사용하기
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <Typography.H2>최근 거래</Typography.H2>
          <button className="text-pixel-500 text-sm hover:text-pixel-600">
            전체보기 →
          </button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </div>
      </Card>
    </div>
  );
};
```

### 3.4 Loading States - 픽셀 애니메이션

```tsx
// src/shared/components/PixelLoader.tsx
export const PixelLoader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-4 h-4 bg-pixel-500 rounded-sm animate-bounce"
            style={{
              animationDelay: `${i * 150}ms`,
              animationDuration: '600ms',
            }}
          />
        ))}
      </div>
    </div>
  );
};
```

---

## 🔐 Part 4: PASS 인증 통합

### 4.1 PASS 인증 플로우

```
사용자 액션
    ↓
[마이데이터 연동] 버튼 클릭
    ↓
PASS 본인인증 페이지 새 탭 오픈
    ↓
사용자 휴대폰 인증 (PASS 앱)
    ↓
인증 완료 → Callback URL로 리디렉션
    ↓
Extension이 인증 토큰 획득
    ↓
OAuth 2.0 flow 시작
    ↓
마이데이터 API 접근 권한 획득
    ↓
거래 내역 동기화 시작
```

### 4.2 PASS 인증 서비스 구현

```typescript
// src/services/auth/pass-auth.ts
export interface PassAuthRequest {
  merchant_uid: string;      // 주문번호 (unique)
  company: string;           // 회사명
  name?: string;             // 사용자 이름 (선택)
  phone?: string;            // 휴대폰 번호 (선택)
}

export interface PassAuthResponse {
  success: boolean;
  imp_uid: string;           // 아임포트 고유번호
  merchant_uid: string;      // 주문번호
  name: string;              // 인증된 이름
  phone: string;             // 인증된 휴대폰
  birth: string;             // 생년월일
  gender: string;            // 성별
  carrier: string;           // 통신사
  unique_key: string;        // CI (Connecting Information)
  unique_in_site: string;    // DI (Duplication Information)
}

export class PassAuthService {
  private readonly IMP_CODE = 'imp12345678'; // 아임포트 가맹점 코드
  private readonly CALLBACK_URL = chrome.runtime.getURL('callback.html');

  /**
   * PASS 본인인증 시작
   */
  async startAuthentication(): Promise<PassAuthResponse> {
    return new Promise((resolve, reject) => {
      const merchant_uid = `pass_${Date.now()}`;
      
      // 인증 창 열기
      const authWindow = window.open(
        this.buildAuthUrl(merchant_uid),
        'passAuth',
        'width=500,height=700,scrollbars=yes'
      );

      // 메시지 리스너 등록 (callback에서 결과 수신)
      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === 'PASS_AUTH_RESULT') {
          window.removeEventListener('message', messageHandler);
          
          if (event.data.success) {
            resolve(event.data.result);
          } else {
            reject(new Error(event.data.error || '인증 실패'));
          }
        }
      };

      window.addEventListener('message', messageHandler);

      // 창 닫힘 감지
      const checkClosed = setInterval(() => {
        if (authWindow?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageHandler);
          reject(new Error('인증 창이 닫혔습니다'));
        }
      }, 500);
    });
  }

  private buildAuthUrl(merchant_uid: string): string {
    const params = new URLSearchParams({
      imp_code: this.IMP_CODE,
      merchant_uid,
      company: 'PicSel',
      callback_url: this.CALLBACK_URL,
    });
    
    return `https://cert.iamport.kr/certifications?${params}`;
  }

  /**
   * 인증 결과 검증
   */
  async verifyAuthentication(imp_uid: string): Promise<PassAuthResponse> {
    const response = await fetch(
      `https://api.iamport.kr/certifications/${imp_uid}`,
      {
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`,
        },
      }
    );

    const data = await response.json();
    
    if (data.code !== 0) {
      throw new Error(data.message || '인증 검증 실패');
    }

    return data.response;
  }

  private async getAccessToken(): Promise<string> {
    // 아임포트 REST API 토큰 발급
    const response = await fetch('https://api.iamport.kr/users/getToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imp_key: 'YOUR_API_KEY',
        imp_secret: 'YOUR_API_SECRET',
      }),
    });

    const data = await response.json();
    return data.response.access_token;
  }
}
```

### 4.3 Callback 페이지

```html
<!-- public/callback.html -->
<!DOCTYPE html>
<html>
<head>
  <title>PicSel 인증 완료</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #4A5568 0%, #2D3748 100%);
      color: white;
    }
    .container {
      text-align: center;
    }
    .pixel-loader {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 20px;
    }
    .pixel {
      width: 16px;
      height: 16px;
      background: #5BCBDB;
      border-radius: 4px;
      animation: bounce 0.6s infinite;
    }
    .pixel:nth-child(2) { animation-delay: 0.15s; }
    .pixel:nth-child(3) { animation-delay: 0.3s; }
    .pixel:nth-child(4) { animation-delay: 0.45s; }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="pixel-loader">
      <div class="pixel"></div>
      <div class="pixel"></div>
      <div class="pixel"></div>
      <div class="pixel"></div>
    </div>
    <h2>인증 처리 중...</h2>
    <p>잠시만 기다려주세요</p>
  </div>

  <script>
    // URL 파라미터 파싱
    const params = new URLSearchParams(window.location.search);
    const imp_uid = params.get('imp_uid');
    const success = params.get('success') === 'true';
    const error_msg = params.get('error_msg');

    // 부모 창으로 결과 전송
    if (window.opener) {
      window.opener.postMessage({
        type: 'PASS_AUTH_RESULT',
        success,
        result: success ? { imp_uid } : null,
        error: error_msg,
      }, '*');
      
      // 3초 후 창 닫기
      setTimeout(() => window.close(), 3000);
    }
  </script>
</body>
</html>
```

### 4.4 Settings에서 PASS 인증 UI

```tsx
// src/popup/components/SettingsPage.tsx
import { PassAuthService } from '@/services/auth/pass-auth';

export const SettingsPage = () => {
  const [authStatus, setAuthStatus] = useState<'none' | 'authenticated'>('none');
  const [loading, setLoading] = useState(false);

  const handlePassAuth = async () => {
    setLoading(true);
    try {
      const passAuth = new PassAuthService();
      const result = await passAuth.startAuthentication();
      
      // 인증 정보 저장
      await storage.set('pass_auth', {
        name: result.name,
        phone: result.phone,
        ci: result.unique_key,
        di: result.unique_in_site,
        authenticatedAt: new Date().toISOString(),
      });
      
      setAuthStatus('authenticated');
      
      // 마이데이터 OAuth 시작
      await startMyDataOAuth(result.unique_key);
      
    } catch (error) {
      console.error('PASS 인증 실패:', error);
      alert('인증에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Typography.H1>설정</Typography.H1>

      {/* PASS 인증 섹션 */}
      <Card>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-pixel-100 dark:bg-pixel-800
                          flex items-center justify-center flex-shrink-0">
            <ShieldCheckIcon className="w-6 h-6 text-pixel-500" />
          </div>
          <div className="flex-1">
            <Typography.H2 className="text-lg mb-1">
              마이데이터 연동
            </Typography.H2>
            <Typography.Body className="text-sm mb-4">
              PASS 본인인증을 통해 안전하게 카드사와 연동하고 실시간 거래 내역을 확인하세요.
            </Typography.Body>
            
            {authStatus === 'none' ? (
              <button
                onClick={handlePassAuth}
                disabled={loading}
                className="w-full px-6 py-3 bg-pixel-500 hover:bg-pixel-600 
                           text-white rounded-xl font-semibold
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <PixelLoader />
                    <span>인증 진행 중...</span>
                  </>
                ) : (
                  <>
                    <LockIcon className="w-5 h-5" />
                    <span>PASS 본인인증 시작</span>
                  </>
                )}
              </button>
            ) : (
              <div className="p-4 bg-savings-50 dark:bg-savings-900/20 
                              border border-savings-200 dark:border-savings-700
                              rounded-xl">
                <div className="flex items-center gap-2 text-savings-600 dark:text-savings-400">
                  <CheckCircleIcon className="w-5 h-5" />
                  <Typography.Body className="font-semibold">
                    인증 완료 · 마이데이터 연동됨
                  </Typography.Body>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
```

---

## 🔌 Part 5: 마이데이터 API 통합

### 5.1 OAuth 2.0 Flow (PASS 인증 후)

```typescript
// src/services/mydata/oauth.ts
export class MyDataOAuth {
  private readonly CLIENT_ID = 'YOUR_CLIENT_ID';
  private readonly CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
  private readonly REDIRECT_URI = chrome.runtime.getURL('oauth-callback.html');
  private readonly AUTH_URL = 'https://mydata.example.kr/oauth/authorize';
  private readonly TOKEN_URL = 'https://mydata.example.kr/oauth/token';

  /**
   * OAuth 인증 시작 (PASS CI 값 사용)
   */
  async startOAuth(ci: string): Promise<void> {
    const state = this.generateState();
    await storage.set('oauth_state', state);
    await storage.set('oauth_ci', ci);

    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      redirect_uri: this.REDIRECT_URI,
      response_type: 'code',
      scope: 'card.read transaction.read',
      state,
      ci, // PASS 인증에서 받은 CI 값
    });

    const authUrl = `${this.AUTH_URL}?${params}`;
    window.open(authUrl, 'mydataOAuth', 'width=500,height=700');
  }

  /**
   * Authorization Code를 Access Token으로 교환
   */
  async exchangeToken(code: string, state: string): Promise<TokenResponse> {
    const savedState = await storage.get('oauth_state');
    
    if (state !== savedState) {
      throw new Error('Invalid state parameter');
    }

    const response = await fetch(this.TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        redirect_uri: this.REDIRECT_URI,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error_description || 'Token exchange failed');
    }

    // 토큰 저장
    await storage.set('mydata_tokens', {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + (data.expires_in * 1000),
    });

    return data;
  }

  private generateState(): string {
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
```

### 5.2 마이데이터 Transaction API

```typescript
// src/services/mydata/transactions.ts
export class MyDataTransactions {
  private readonly API_BASE = 'https://api.mydata.example.kr/v1';

  async fetchTransactions(params: {
    startDate: string;
    endDate: string;
    cardIds?: string[];
  }): Promise<Transaction[]> {
    const tokens = await storage.get('mydata_tokens');
    
    if (!tokens || Date.now() >= tokens.expires_at) {
      throw new Error('Token expired. Please re-authenticate.');
    }

    const queryParams = new URLSearchParams({
      start_date: params.startDate,
      end_date: params.endDate,
      ...(params.cardIds && { card_ids: params.cardIds.join(',') }),
    });

    const response = await fetch(
      `${this.API_BASE}/transactions?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        // 토큰 갱신 시도
        await this.refreshToken();
        return this.fetchTransactions(params);
      }
      throw new Error('Failed to fetch transactions');
    }

    const data = await response.json();
    return this.transformTransactions(data.transactions);
  }

  private transformTransactions(raw: any[]): Transaction[] {
    return raw.map(tx => ({
      id: tx.transaction_id,
      store: tx.merchant_name,
      amount: tx.amount,
      date: tx.transaction_date,
      category: this.mapCategory(tx.category_code),
      cardId: tx.card_id,
      savings: this.calculateSavings(tx),
      status: 'completed' as TransactionStatus,
    }));
  }

  private calculateSavings(tx: any): number {
    // 실제 혜택 계산 로직
    const discountRate = tx.discount_rate || 0;
    return Math.floor(tx.amount * discountRate / 100);
  }

  private async refreshToken(): Promise<void> {
    const tokens = await storage.get('mydata_tokens');
    const oauth = new MyDataOAuth();
    
    // Refresh token 로직 구현
    // ...
  }
}
```

### 5.3 Background Worker - 자동 동기화

```typescript
// src/background/sync-manager.ts
export class SyncManager {
  private readonly SYNC_INTERVAL = 30; // 30분마다

  initialize() {
    // 주기적 동기화 알람 설정
    if (chrome.alarms) {
      chrome.alarms.create('syncMyData', {
        periodInMinutes: this.SYNC_INTERVAL,
      });

      chrome.alarms.onAlarm.addListener(async (alarm) => {
        if (alarm.name === 'syncMyData') {
          await this.syncTransactions();
        }
      });
    }

    // Extension 시작 시 즉시 동기화
    this.syncTransactions();
  }

  async syncTransactions() {
    try {
      logger.info('Starting transaction sync');

      const tokens = await storage.get('mydata_tokens');
      if (!tokens) {
        logger.warn('No MyData tokens found, skipping sync');
        return;
      }

      const mydata = new MyDataTransactions();
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

      const transactions = await mydata.fetchTransactions({
        startDate,
        endDate,
      });

      // 기존 거래와 병합
      const existing = await storage.getTransactions();
      const merged = this.mergeTransactions(existing, transactions);
      
      await storage.setTransactions(merged);

      logger.info('Transaction sync completed', {
        fetched: transactions.length,
        total: merged.length,
      });

      // 뱃지 업데이트
      const newCount = transactions.filter(tx => 
        new Date(tx.date) > new Date(Date.now() - 24 * 60 * 60 * 1000)
      ).length;

      if (newCount > 0) {
        chrome.action.setBadgeText({ text: String(newCount) });
        chrome.action.setBadgeBackgroundColor({ color: '#5BCBDB' });
      }

    } catch (error) {
      logger.error('Transaction sync failed', error as Error);
    }
  }

  private mergeTransactions(
    existing: Transaction[],
    fetched: Transaction[]
  ): Transaction[] {
    const map = new Map(existing.map(tx => [tx.id, tx]));
    
    for (const tx of fetched) {
      map.set(tx.id, tx);
    }

    return Array.from(map.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}
```

---

## 💱 Part 6: 한국은행 환율 API

### 6.1 환율 서비스

```typescript
// src/services/exchange-rate.ts
export class ExchangeRateService {
  private readonly API_KEY = 'YOUR_BOK_API_KEY';
  private readonly API_URL = 'https://ecos.bok.or.kr/api/StatisticSearch';

  async getCurrentRates(currencies = ['USD', 'JPY', 'EUR', 'CNY']) {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    
    const rates = await Promise.all(
      currencies.map(currency => this.fetchRate(currency, today))
    );

    return rates.filter(Boolean);
  }

  private async fetchRate(currency: string, date: string) {
    const params = new URLSearchParams({
      ServiceKey: this.API_KEY,
      KEYSTAT: 'StatisticCode',
      ITEMCODE1: this.getCurrencyCode(currency),
      CYCLE: 'D',
      START_DATE: date,
      END_DATE: date,
      REQ_TYPE: 'json',
    });

    try {
      const response = await fetch(`${this.API_URL}/${this.API_KEY}json/kr/1/1/${params}`);
      const data = await response.json();
      
      if (data.StatisticSearch?.row?.[0]) {
        const row = data.StatisticSearch.row[0];
        return {
          currency,
          rate: parseFloat(row.DATA_VALUE),
          date: row.TIME,
        };
      }
    } catch (error) {
      logger.error('Failed to fetch exchange rate', error, { currency });
    }
    
    return null;
  }

  private getCurrencyCode(currency: string): string {
    const codes: Record<string, string> = {
      'USD': '0000001',
      'JPY': '0000002',
      'EUR': '0000003',
      'CNY': '0000004',
    };
    return codes[currency] || codes.USD;
  }
}
```

### 6.2 환율 위젯

```tsx
// src/popup/components/ExchangeRateWidget.tsx
export const ExchangeRateWidget = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRates();
    const interval = setInterval(loadRates, 3600000); // 1시간마다
    return () => clearInterval(interval);
  }, []);

  const loadRates = async () => {
    try {
      const service = new ExchangeRateService();
      const data = await service.getCurrentRates();
      setRates(data);
    } catch (error) {
      console.error('Failed to load rates:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PixelLoader />;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CurrencyIcon className="w-5 h-5 text-pixel-500" />
          <Typography.H2>실시간 환율</Typography.H2>
        </div>
        <Typography.Caption>
          {new Date().toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })} 기준
        </Typography.Caption>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {rates.map(rate => (
          <div key={rate.currency} 
               className="p-3 rounded-xl bg-picsel-50 dark:bg-picsel-800 
                          border border-picsel-100 dark:border-picsel-700">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-text-secondary">
                {rate.currency}
              </span>
              <CurrencyFlag currency={rate.currency} className="w-5 h-5" />
            </div>
            <Typography.Stat className="text-lg">
              ₩{rate.rate.toFixed(2)}
            </Typography.Stat>
          </div>
        ))}
      </div>
    </Card>
  );
};
```

---

## 📅 Part 7: 구현 타임라인

### Week 1-2: 브랜드 디자인 시스템 구축
- [ ] global.css에 PicSel 컬러 시스템 구현
- [ ] Typography, Card, Button 컴포넌트 재설계
- [ ] PixelGrid, PixelLoader 브랜드 컴포넌트 제작
- [ ] Dark mode 완벽 지원

### Week 3: Dashboard 재설계
- [ ] 새로운 Dashboard 레이아웃 구현
- [ ] Stats 카드 픽셀 모티프 적용
- [ ] 스마트 추천 UI 구현
- [ ] 반응형 레이아웃 최적화

### Week 4: PASS 인증 통합
- [ ] PassAuthService 구현
- [ ] Callback 페이지 제작
- [ ] Settings에서 인증 UI 추가
- [ ] 인증 상태 관리 및 저장

### Week 5: 마이데이터 API 연동
- [ ] OAuth 2.0 flow 구현
- [ ] Transaction API 통합
- [ ] Background worker 자동 동기화
- [ ] 에러 핸들링 및 재시도 로직

### Week 6: 환율 API & 최종 마무리
- [ ] 한국은행 환율 API 연동
- [ ] ExchangeRateWidget 구현
- [ ] 전체 UI 폴리싱
- [ ] 성능 최적화 및 테스트

---

## 🎯 핵심 차별화 포인트

### 1. **PicSel 브랜드 아이덴티티**
- 독자적인 차콜 그레이 + 틸 컬러 시스템
- 픽셀 모티프를 활용한 브랜드 요소
- 미니멀하고 세련된 UI

### 2. **완벽한 보안**
- PASS 본인인증 → 마이데이터 연동
- OAuth 2.0 표준 준수
- 민감 데이터 암호화 저장

### 3. **실시간 데이터**
- 마이데이터 API로 실제 거래 동기화
- 30분마다 자동 업데이트
- 한국은행 환율 실시간 조회

### 4. **스마트 추천**
- AI 기반 최적 카드 추천
- 실시간 절약 금액 계산
- 개인화된 인사이트 제공

---

## 📦 필요한 패키지

```bash
# 추가 설치
pnpm add @types/chrome
pnpm add date-fns zod
pnpm add clsx tailwind-merge

# 환율 차트 (옵션)
pnpm add recharts
```

---

## 🔧 환경 변수

```env
# .env.local
VITE_IMP_CODE=imp12345678
VITE_IMP_API_KEY=your_api_key
VITE_IMP_API_SECRET=your_api_secret

VITE_MYDATA_CLIENT_ID=your_client_id
VITE_MYDATA_CLIENT_SECRET=your_client_secret

VITE_BOK_API_KEY=your_bok_api_key
```

---

**업데이트**: 2025년 10월 15일
**버전**: PicSel Brand v2.0
**상태**: 설계 완료 → 구현 시작 준비
