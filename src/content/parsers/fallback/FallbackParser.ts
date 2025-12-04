/**
 * Fallback Parser
 * 책임: 텍스트 휴리스틱으로 가격 추출 (최후의 수단)
 */

import { BaseParser } from '../base/index';
import { ParsedProductInfo } from '../../../shared/types';
import { FALLBACK_SELECTORS } from './constants';
import { parseLog, ErrorCode } from '../../../shared/utils/logger';

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
      parseLog.info('🔍 Fallback parsing (text heuristic)...');

      const bodyText = doc.body?.textContent || '';

      // 한글 "원" 기호로 끝나는 가격 찾기
      const match = bodyText.match(/(\d{1,3}(?:,\d{3})*)\s*원/);
      if (!match) {
        parseLog.debug('❌ No price with "원" found');
        return null;
      }

      const amount = this.extractNumber(match[1]);
      if (!amount || !this.isValidPrice(amount)) {
        parseLog.debug('❌ Invalid amount', { amount });
        return null;
      }

      const { title, imageUrl } = this.extractCommonInfo(doc);

      parseLog.info(`✅ Found: ${amount} KRW (via text heuristic)`);

      return {
        price: amount,
        amount,
        currency: 'KRW',
        title: title || undefined,
        imageUrl: imageUrl || undefined,
        discounts: [],
      };
    } catch (error) {
      parseLog.error(ErrorCode.PAR_E001, 'Fallback parse error', {
        error: error instanceof Error ? error : new Error(String(error)),
      });
      return null;
    }
  }
}
