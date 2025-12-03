/**
 * Fallback Parser
 * 책임: 텍스트 휴리스틱으로 가격 추출 (최후의 수단)
 */

import { BaseParser } from '../base/index';
import { ParsedProductInfo } from '../../../shared/types';
import { FALLBACK_SELECTORS } from './constants';

export class FallbackParser extends BaseParser {
  readonly siteName = 'Fallback';

  readonly selectors = {
    amount: FALLBACK_SELECTORS.amount,
  };

  /**
   * 페이지 파싱 (텍스트 휴리스틱)
   */
  parse(doc: Document): ParsedProductInfo | null {
    try {
      console.log('[FallbackParser] 🔍 Fallback parsing (text heuristic)...');

      const bodyText = doc.body?.textContent || '';

      // 한글 "원" 기호로 끝나는 가격 찾기
      const match = bodyText.match(/(\d{1,3}(?:,\d{3})*)\s*원/);
      if (!match) {
        console.debug('[FallbackParser] ❌ No price with "원" found');
        return null;
      }

      const amount = this.extractNumber(match[1]);
      if (!amount || !this.isValidPrice(amount)) {
        console.debug('[FallbackParser] ❌ Invalid amount:', amount);
        return null;
      }

      const { title, imageUrl } = this.extractCommonInfo(doc);

      console.log(`[FallbackParser] ✅ Found: ${amount} KRW (via text heuristic)`);

      return {
        price: amount,
        amount,
        currency: 'KRW',
        title: title || undefined,
        imageUrl: imageUrl || undefined,
        discounts: [],
      };
    } catch (error) {
      console.error('[FallbackParser] ❌ Parse error:', error);
      return null;
    }
  }
}
