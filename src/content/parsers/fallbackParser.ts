/**
 * Fallback Parser (SRP: 텍스트 휴리스틱만 담당)
 *
 * 사이트별 파서가 모두 실패했을 때 최후의 수단
 * 페이지의 텍스트 콘텐츠에서 정규식으로 가격 추출
 */

import { BaseParser } from './baseParser';
import { ParsedProductInfo } from '../../shared/types';

export class FallbackParser extends BaseParser {
  readonly siteName = 'Fallback';

  readonly selectors = {
    amount: [], // 사용 안 함
  };

  parse(doc: Document): ParsedProductInfo | null {
    try {
      console.log('[FallbackParser] 🔍 Fallback parsing (text heuristic)...');

      const bodyText = doc.body?.textContent || '';

      // 한글 "원" 기호로 끝나는 가격 찾기
      // 예: "123,456원", "50,000원"
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
