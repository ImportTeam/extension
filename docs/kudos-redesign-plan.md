# PicSel Extension - Kudos 스타일 재설계 플랜

## 개요
Kudos (https://www.joinkudos.com/)를 참고하여 PicSel Extension의 UI/UX 및 기능을 전면 재설계

---

## ✅ 완료된 작업

### 1. 긴급 버그 수정
- ✅ `chrome.alarms` undefined 에러 수정
  - background/index.ts에 guard clause 추가
  - Service worker lifecycle 안정화
- ✅ UI 크기 최적화
  - 600x700px → **380x600px** (Kudos 스타일)
  - 모바일 친화적 크기로 변경

---

## 🎨 Phase 1: UI/UX 재설계 (우선순위: 최상)

### 1.1 디자인 시스템 구축

#### 컬러 시스템
```css
/* global.css에 추가 */
@theme {
  /* Primary - Gold/Rewards */
  --color-gold: #F5B800;
  --color-gold-light: #FFD34E;
  --color-gold-dark: #D4A000;
  
  /* Background */
  --color-bg-light: #FFFFFF;
  --color-bg-dark: #1A1A1A;
  --color-surface-light: #F9FAFB;
  --color-surface-dark: #2D2D2D;
  
  /* Text */
  --color-text-primary-light: #111827;
  --color-text-primary-dark: #F9FAFB;
  --color-text-secondary-light: #6B7280;
  --color-text-secondary-dark: #9CA3AF;
  
  /* Accent */
  --color-accent: #6366F1;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
}
```

#### 타이포그래피
```typescript
// Typography System
- Heading: font-bold text-2xl (Dashboard titles)
- Subheading: font-semibold text-lg (Section titles)
- Body: font-normal text-base (Default text)
- Caption: font-normal text-sm text-muted-foreground
- Stat: font-bold text-3xl (Numbers, amounts)
```

#### 컴포넌트 스타일
- **카드 스타일**: 
  - Border: `border border-gray-200 dark:border-gray-700`
  - Shadow: `shadow-sm hover:shadow-md transition-shadow`
  - Radius: `rounded-xl`
  - Padding: `p-6`

- **버튼 스타일**:
  ```tsx
  Primary: bg-gold hover:bg-gold-dark text-white
  Secondary: bg-surface border hover:bg-accent/10
  Danger: bg-error hover:bg-error-dark text-white
  ```

### 1.2 실제 카드사 아이콘 시스템

#### 아이콘 준비 (SVG)
```
src/assets/cards/
  ├── kb.svg           # KB국민카드
  ├── shinhan.svg      # 신한카드
  ├── woori.svg        # 우리카드
  ├── hana.svg         # 하나카드
  ├── samsung.svg      # 삼성카드
  ├── hyundai.svg      # 현대카드
  ├── lotte.svg        # 롯데카드
  ├── nh.svg           # NH농협카드
  └── default.svg      # 기본 아이콘
```

#### CardIcon 컴포넌트 생성
```tsx
// src/shared/components/CardIcon.tsx
interface CardIconProps {
  issuer: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CardIcon = ({ issuer, size = 'md', className }: CardIconProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  // Dynamic import based on issuer
  // Return SVG or default icon
};
```

### 1.3 Dashboard 재설계 (Kudos 스타일)

#### 레이아웃 구조
```tsx
<Dashboard>
  {/* Hero Section - 주요 통계 */}
  <HeroStats>
    <StatCard icon="💰" value="₩750,420" label="총 절약 금액" />
    <StatCard icon="💳" value="5개" label="등록된 카드" />
    <StatCard icon="📊" value="124건" label="이번 달 거래" />
  </HeroStats>

  {/* Smart Recommendation */}
  <SmartRecommendation>
    <div>현재 쇼핑몰에서 최고의 카드</div>
    <CardDisplay card={bestCard} savings="₩2,340 절약" />
  </SmartRecommendation>

  {/* Recent Transactions - 최근 5건 */}
  <RecentTransactions transactions={recent5} />

  {/* Quick Actions */}
  <QuickActions>
    <ActionButton icon="+" label="카드 추가" />
    <ActionButton icon="📈" label="통계 보기" />
    <ActionButton icon="⚙️" label="설정" />
  </QuickActions>
</Dashboard>
```

### 1.4 컴포넌트별 재설계

#### PaymentMethodsPage
- **Before**: 단순 리스트
- **After**: 
  - Primary card highlight (gold border)
  - Card benefits preview
  - Usage stats per card
  - Swipe to delete gesture

#### TransactionHistoryPage
- **Before**: 기본 필터
- **After**:
  - Date range picker (This week, This month, Custom)
  - Category filter with icons
  - Spending chart (Chart.js or Recharts)
  - Export to CSV

#### SettingsPage
- **Before**: 기본 설정
- **After**:
  - Profile section with avatar
  - Notification preferences
  - Theme toggle (Light/Dark/Auto)
  - Data management (Clear cache, Export data)
  - About & Version info

---

## 🔌 Phase 2: API 통합 (우선순위: 높음)

### 2.1 마이데이터 API 연동

#### 아키텍처
```
User → Extension → Background Worker → OAuth Server → Financial API
                         ↓
                  Chrome Storage (Cache)
```

#### 구현 단계

**Step 1: OAuth 2.0 Flow**
```typescript
// src/services/mydata/auth.ts
export class MyDataAuth {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  async authorize(): Promise<string> {
    // 1. Open authorization URL in new tab
    // 2. Handle callback with code
    // 3. Exchange code for access token
    // 4. Store token in chrome.storage.local
  }

  async refreshToken(): Promise<string> {
    // Auto-refresh before expiration
  }
}
```

**Step 2: Transaction Sync**
```typescript
// src/services/mydata/transactions.ts
export class MyDataTransactions {
  async fetchTransactions(params: {
    startDate: string;
    endDate: string;
    accountIds?: string[];
  }): Promise<Transaction[]> {
    const token = await storage.get('mydata_token');
    
    const response = await fetch('https://api.mydata.kr/v1/transactions', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    // Transform to our Transaction type
    return this.transformTransactions(data);
  }

  private transformTransactions(raw: any[]): Transaction[] {
    // Map API response to our data model
  }
}
```

**Step 3: Background Sync**
```typescript
// src/background/sync.ts
chrome.alarms.create('syncTransactions', {
  periodInMinutes: 30 // Sync every 30 minutes
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'syncTransactions') {
    const mydata = new MyDataTransactions();
    const transactions = await mydata.fetchTransactions({
      startDate: getStartOfMonth(),
      endDate: new Date().toISOString()
    });
    
    await storage.setTransactions(transactions);
    logger.info('Transactions synced', { count: transactions.length });
  }
});
```

### 2.2 한국은행 환율 API

#### API 정보
- **엔드포인트**: `https://www.koreaeximbankapi.kr/service/exchangeJSON.json`
- **인증**: API 키 (발급 필요)
- **업데이트**: 매일 오전 11시

#### 구현
```typescript
// src/services/exchange-rate.ts
export interface ExchangeRate {
  currency: string;      // USD, JPY, EUR, CNY
  rate: number;          // 환율
  changeRate: number;    // 전일 대비 변화율
  updatedAt: string;     // 업데이트 시간
}

export class ExchangeRateService {
  private apiKey: string = 'YOUR_API_KEY';
  private baseUrl = 'https://www.koreaeximbankapi.kr/service';

  async getCurrentRates(currencies: string[] = ['USD', 'JPY', 'EUR', 'CNY']): Promise<ExchangeRate[]> {
    const response = await fetch(
      `${this.baseUrl}/exchangeJSON.json?authkey=${this.apiKey}&data=AP01`
    );
    
    const data = await response.json();
    return this.parseRates(data, currencies);
  }

  private parseRates(data: any[], currencies: string[]): ExchangeRate[] {
    return data
      .filter(item => currencies.includes(item.cur_unit))
      .map(item => ({
        currency: item.cur_unit,
        rate: parseFloat(item.deal_bas_r.replace(',', '')),
        changeRate: parseFloat(item.change || '0'),
        updatedAt: item.cur_nm
      }));
  }
}
```

#### Dashboard에 환율 위젯 추가
```tsx
// src/popup/components/ExchangeRateWidget.tsx
export const ExchangeRateWidget = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  
  useEffect(() => {
    const loadRates = async () => {
      const service = new ExchangeRateService();
      const data = await service.getCurrentRates();
      setRates(data);
    };
    
    loadRates();
    // Refresh every hour
    const interval = setInterval(loadRates, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>실시간 환율</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {rates.map(rate => (
          <div key={rate.currency} className="flex justify-between">
            <span>{rate.currency}</span>
            <span className="font-semibold">₩{rate.rate.toFixed(2)}</span>
            <span className={rate.changeRate >= 0 ? 'text-success' : 'text-error'}>
              {rate.changeRate >= 0 ? '▲' : '▼'} {Math.abs(rate.changeRate)}%
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
```

---

## 🧠 Phase 3: 스마트 기능 구현 (우선순위: 중간)

### 3.1 최적 카드 추천 알고리즘

```typescript
// src/services/recommendation.ts
export interface CardBenefit {
  cardId: string;
  category: string;      // '쇼핑몰', '편의점', '주유소' 등
  rewardRate: number;    // 할인율 (%)
  cashbackRate: number;  // 캐시백율 (%)
  points: number;        // 포인트 적립률
}

export class RecommendationEngine {
  async getBestCard(params: {
    store: string;
    amount: number;
    category?: string;
  }): Promise<{
    card: PaymentMethod;
    expectedSavings: number;
    reason: string;
  }> {
    const userCards = await storage.getPaymentMethods();
    const benefits = await this.getCardBenefits();
    
    let bestCard = userCards[0];
    let maxSavings = 0;
    let reason = '';
    
    for (const card of userCards) {
      const benefit = benefits.find(b => b.cardId === card.id);
      if (!benefit) continue;
      
      const savings = this.calculateSavings(params.amount, benefit);
      
      if (savings > maxSavings) {
        maxSavings = savings;
        bestCard = card;
        reason = this.generateReason(benefit, params.category);
      }
    }
    
    return { card: bestCard, expectedSavings: maxSavings, reason };
  }

  private calculateSavings(amount: number, benefit: CardBenefit): number {
    const rewardSavings = amount * (benefit.rewardRate / 100);
    const cashbackSavings = amount * (benefit.cashbackRate / 100);
    return rewardSavings + cashbackSavings;
  }

  private generateReason(benefit: CardBenefit, category?: string): string {
    if (benefit.rewardRate > 0) {
      return `${category || '이 카테고리'}에서 ${benefit.rewardRate}% 할인`;
    }
    if (benefit.cashbackRate > 0) {
      return `${benefit.cashbackRate}% 캐시백 적립`;
    }
    return '포인트 적립 가능';
  }
}
```

### 3.2 Content Script - 실시간 추천

```typescript
// src/content/recommendation-overlay.ts
export class RecommendationOverlay {
  private engine: RecommendationEngine;

  async showOnCheckout() {
    // 1. Detect checkout page
    const amount = this.extractAmount();
    const store = window.location.hostname;
    
    // 2. Get recommendation
    const result = await this.engine.getBestCard({ store, amount });
    
    // 3. Show floating overlay
    this.renderOverlay(result);
  }

  private extractAmount(): number {
    // Parse page for total amount
    // Support major e-commerce sites
  }

  private renderOverlay(result: any) {
    const overlay = document.createElement('div');
    overlay.className = 'picsel-overlay';
    overlay.innerHTML = `
      <div class="picsel-card">
        <h3>💰 ${result.expectedSavings.toLocaleString()}원 절약 가능!</h3>
        <p><strong>${result.card.name}</strong> 사용 권장</p>
        <p class="reason">${result.reason}</p>
      </div>
    `;
    document.body.appendChild(overlay);
  }
}
```

### 3.3 지출 분석 & 인사이트

```typescript
// src/services/insights.ts
export interface SpendingInsight {
  type: 'warning' | 'tip' | 'achievement';
  title: string;
  description: string;
  action?: string;
}

export class InsightsEngine {
  async generateInsights(): Promise<SpendingInsight[]> {
    const transactions = await storage.getTransactions();
    const insights: SpendingInsight[] = [];
    
    // 1. 과소비 경고
    const thisMonth = this.getMonthlySpending(transactions);
    const lastMonth = this.getLastMonthSpending(transactions);
    if (thisMonth > lastMonth * 1.2) {
      insights.push({
        type: 'warning',
        title: '이번 달 지출이 높습니다',
        description: `지난 달 대비 ${((thisMonth / lastMonth - 1) * 100).toFixed(0)}% 증가`,
        action: '상세 보기'
      });
    }
    
    // 2. 절약 팁
    const missedSavings = await this.calculateMissedSavings(transactions);
    if (missedSavings > 0) {
      insights.push({
        type: 'tip',
        title: `${missedSavings.toLocaleString()}원 더 절약할 수 있었어요`,
        description: '더 나은 카드를 선택하면 더 많이 절약할 수 있습니다',
        action: '추천 카드 보기'
      });
    }
    
    // 3. 성취 배지
    const totalSavings = transactions.reduce((sum, tx) => sum + tx.savings, 0);
    if (totalSavings >= 100000) {
      insights.push({
        type: 'achievement',
        title: '🎉 10만원 절약 달성!',
        description: '지금까지 총 10만원을 절약했습니다',
      });
    }
    
    return insights;
  }

  private async calculateMissedSavings(transactions: Transaction[]): Promise<number> {
    const engine = new RecommendationEngine();
    let missed = 0;
    
    for (const tx of transactions) {
      const best = await engine.getBestCard({
        store: tx.store,
        amount: tx.amount
      });
      
      missed += Math.max(0, best.expectedSavings - tx.savings);
    }
    
    return missed;
  }
}
```

---

## 📊 Phase 4: 데이터 시각화 (우선순위: 중간)

### 4.1 라이브러리 선택

**추천: Recharts**
```bash
pnpm add recharts
```

### 4.2 월간 지출 차트

```tsx
// src/popup/components/SpendingChart.tsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SpendingChart = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      const transactions = await storage.getTransactions();
      const chartData = this.aggregateByDay(transactions);
      setData(chartData);
    };
    loadData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>이번 달 지출 추이</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `₩${value.toLocaleString()}`} />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#F5B800" 
              fill="#FFF4D5" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
```

### 4.3 카테고리별 파이 차트

```tsx
// src/popup/components/CategoryPieChart.tsx
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = {
  '식비': '#F59E0B',
  '쇼핑': '#6366F1',
  '교통': '#10B981',
  '문화': '#EC4899',
  '기타': '#6B7280'
};

export const CategoryPieChart = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      const transactions = await storage.getTransactions();
      const byCategory = this.groupByCategory(transactions);
      setData(byCategory);
    };
    loadData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>카테고리별 지출</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₩${value.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
```

---

## 🔒 Phase 5: 보안 & 성능 (우선순위: 높음)

### 5.1 민감 데이터 암호화

```typescript
// src/shared/crypto.ts
export class SecureStorage {
  private async generateKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(data: any): Promise<string> {
    const key = await this.getOrCreateKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(JSON.stringify(data))
    );
    
    return btoa(JSON.stringify({
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted))
    }));
  }

  async decrypt(encryptedData: string): Promise<any> {
    const { iv, data } = JSON.parse(atob(encryptedData));
    const key = await this.getOrCreateKey();
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(iv) },
      key,
      new Uint8Array(data)
    );
    
    return JSON.parse(new TextDecoder().decode(decrypted));
  }
}
```

### 5.2 Storage Quota 관리

```typescript
// src/services/storage-manager.ts
export class StorageManager {
  private readonly MAX_TRANSACTIONS = 1000;
  private readonly MAX_STORAGE_MB = 5;

  async checkQuota(): Promise<{ used: number; available: number }> {
    const estimate = await navigator.storage.estimate();
    return {
      used: estimate.usage || 0,
      available: estimate.quota || 0
    };
  }

  async cleanup(): Promise<void> {
    const transactions = await storage.getTransactions();
    
    // Keep only recent 1000 transactions
    if (transactions.length > this.MAX_TRANSACTIONS) {
      const recent = transactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, this.MAX_TRANSACTIONS);
      
      await storage.setTransactions(recent);
      logger.info('Old transactions cleaned up', {
        before: transactions.length,
        after: recent.length
      });
    }
  }

  async archiveOldData(): Promise<void> {
    // Archive transactions older than 1 year to IndexedDB
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const transactions = await storage.getTransactions();
    const { recent, old } = this.partitionByDate(transactions, oneYearAgo);
    
    // Store old data in IndexedDB for better quota management
    await this.storeInIndexedDB(old);
    await storage.setTransactions(recent);
  }
}
```

---

## 📱 Phase 6: 모바일 지원 (우선순위: 낮음)

### 6.1 Kiwi Browser Extension
- Chrome Extension을 Kiwi Browser에서도 사용 가능
- 모바일 최적화 레이아웃

### 6.2 반응형 디자인
```tsx
// Tailwind breakpoints
- sm: 380px (현재 popup 크기)
- md: 768px (태블릿)
- lg: 1024px (데스크탑 - options page)
```

---

## 🚀 구현 타임라인

### Week 1: UI 재설계
- [ ] 컬러 시스템 구축 (global.css)
- [ ] 카드사 아이콘 SVG 수집 및 컴포넌트화
- [ ] Dashboard 레이아웃 재설계
- [ ] Dark mode 구현

### Week 2: API 연동 기초
- [ ] 한국은행 환율 API 연동
- [ ] 환율 위젯 Dashboard에 추가
- [ ] 마이데이터 API 조사 및 OAuth 테스트 계정 발급

### Week 3: 마이데이터 연동
- [ ] OAuth 2.0 flow 구현
- [ ] Transaction sync 구현
- [ ] Background worker 자동 동기화

### Week 4: 스마트 기능
- [ ] 최적 카드 추천 알고리즘
- [ ] Content script overlay
- [ ] 지출 분석 & 인사이트

### Week 5: 데이터 시각화
- [ ] Recharts 통합
- [ ] 월간 지출 차트
- [ ] 카테고리별 파이 차트

### Week 6: 보안 & 최적화
- [ ] 민감 데이터 암호화
- [ ] Storage quota 관리
- [ ] Performance 최적화

---

## 📚 기술 스택

### 현재
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS v4
- Vite 5.4.20
- Chrome Extension Manifest V3

### 추가 필요
- `recharts` - 차트 라이브러리
- `date-fns` - 날짜 처리
- `zod` - 스키마 검증
- `axios` - HTTP 클라이언트 (API 호출)

### 설치 명령어
```bash
pnpm add recharts date-fns zod axios
pnpm add -D @types/chrome
```

---

## 🎯 성공 지표 (KPI)

1. **사용자 경험**
   - Popup 로딩 시간 < 100ms
   - 추천 정확도 > 90%
   - Dark mode 전환 부드러움

2. **기능성**
   - 마이데이터 API 연동 성공률 > 95%
   - 환율 API 업데이트 정시성 100%
   - 거래 동기화 지연 < 30분

3. **성능**
   - Storage 사용량 < 5MB
   - Memory leak 0건
   - Background worker crash 0건

---

## 🔗 참고 자료

- [Kudos Website](https://www.joinkudos.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Chrome Extension API](https://developer.chrome.com/docs/extensions/)
- [마이데이터 API 문서](https://www.mydatakr.org/)
- [한국은행 OpenAPI](https://www.bok.or.kr/portal/main/main.do)
- [Recharts Documentation](https://recharts.org/)

---

## 📝 다음 즉시 실행할 작업

1. **global.css 컬러 시스템 구축** ← START HERE
2. **Dashboard 재설계 착수**
3. **한국은행 API 키 발급**
4. **카드사 SVG 아이콘 수집**

---

**업데이트**: 2025년 10월 15일
**작성자**: AI Assistant
**상태**: 플랜 수립 완료, 구현 시작 대기
