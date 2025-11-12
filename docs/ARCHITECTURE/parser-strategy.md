# Parser 전략 가이드

> 플러그인형 사이트별 파서 아키텍처

## 목차
- [개요](#개요)
- [Base Parser](#base-parser)
- [사이트별 Parser](#사이트별-parser)
- [Fallback 전략](#fallback-전략)
- [테스트](#테스트)

## 개요

### 설계 원칙
- **플러그인형**: 사이트별 독립적 구현
- **Confidence Score**: 파싱 신뢰도 반환
- **Fallback**: 실패 시 텍스트 휴리스틱
- **테스트 가능**: HTML 스냅샷 기반

### 파서 구조
```
BaseParser (추상 클래스)
 ├─ CoupangParser
 ├─ NaverParser
 ├─ GmarketParser
 └─ FallbackParser
```

## Base Parser

**파일**: `src/content/parsers/baseParser.ts`

```typescript
export type ParsedData = {
  amount: number;
  currency: string;
  methods: string[];
  confidence: number; // 0-1
  metadata?: Record<string, any>;
};

export abstract class BaseParser {
  abstract siteName: string;
  abstract patterns: {
    amount: string | RegExp;
    currency?: string | RegExp;
    methods: string | RegExp;
  };

  abstract parse(doc: Document): ParsedData | null;

  protected extractAmount(text: string): number | null {
    const match = text.match(/(\d{1,3}(,\d{3})*)/);
    return match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
  }

  protected extractCurrency(text: string): string {
    if (text.includes('원') || text.includes('KRW')) return 'KRW';
    if (text.includes('$') || text.includes('USD')) return 'USD';
    return 'KRW'; // Default
  }
}
```

## 사이트별 Parser

### Coupang Parser

**파일**: `src/content/parsers/coupangParser.ts`

```typescript
import { BaseParser, ParsedData } from './baseParser';

export class CoupangParser extends BaseParser {
  siteName = 'Coupang';
  patterns = {
    amount: '.total-price',
    methods: '.payment-method-item'
  };

  parse(doc: Document): ParsedData | null {
    try {
      // Amount
      const amountEl = doc.querySelector(this.patterns.amount);
      if (!amountEl) return null;
      
      const amount = this.extractAmount(amountEl.textContent || '');
      if (!amount) return null;

      // Methods
      const methodEls = doc.querySelectorAll(this.patterns.methods);
      const methods = Array.from(methodEls).map(el => 
        el.textContent?.trim() || ''
      ).filter(Boolean);

      return {
        amount,
        currency: 'KRW',
        methods,
        confidence: methodEls.length > 0 ? 0.95 : 0.7
      };
    } catch (err) {
      console.error('Coupang parse error:', err);
      return null;
    }
  }
}
```

## Fallback 전략

**파일**: `src/content/parsers/fallbackParser.ts`

```typescript
import { BaseParser, ParsedData } from './baseParser';

export class FallbackParser extends BaseParser {
  siteName = 'Fallback';
  patterns = {
    amount: /(\d{1,3}(,\d{3})*)원/,
    methods: /카드|페이팔|계좌이체/gi
  };

  parse(doc: Document): ParsedData | null {
    const bodyText = doc.body.textContent || '';

    // Extract amount
    const amountMatch = bodyText.match(this.patterns.amount);
    const amount = amountMatch ? 
      parseInt(amountMatch[1].replace(/,/g, ''), 10) : null;

    if (!amount) return null;

    // Extract methods
    const methodMatches = bodyText.match(this.patterns.methods) || [];
    const methods = [...new Set(methodMatches)];

    return {
      amount,
      currency: 'KRW',
      methods,
      confidence: 0.3 // Low confidence
    };
  }
}
```

## 테스트

**파일**: `tests/unit/parsers.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { CoupangParser } from '@/content/parsers/coupangParser';
import fs from 'fs';

describe('Coupang Parser', () => {
  it('should parse checkout page', () => {
    const html = fs.readFileSync('./fixtures/coupang-checkout.html', 'utf-8');
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const coupangParser = new CoupangParser();
    const result = coupangParser.parse(doc);

    expect(result).not.toBeNull();
    expect(result!.amount).toBeGreaterThan(0);
    expect(result!.confidence).toBeGreaterThan(0.7);
  });
});
```

## 다음 단계

- [Content Script 구현](./content-script.md)
- [보안 가이드](./security.md)
