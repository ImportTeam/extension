/**
 * eBay Parser (ebay.com)
 * 책임: eBay 상품 페이지 파싱
 */

import { BaseParser } from '../base/index';
import { ParsedProductInfo } from '../../../shared/types';
import { EBAY_SELECTORS } from './constants';
import { parseLog, ErrorCode } from '../../../shared/utils/logger';

export class EbayParser extends BaseParser {
  readonly siteName = 'eBay';

  readonly selectors = {
    amount: EBAY_SELECTORS.amount,
  };

  /**
   * eBay 페이지 감지
   */
  static isCheckoutPage(url: string): boolean {
    return /ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(url);
  }

  /**
   * 상품 페이지 파싱
   */
  parse(doc: Document): ParsedProductInfo | null {
    try {
      parseLog.info('🔍 Parsing eBay page...');

      let amountText = this.getTextBySelectors(doc, this.selectors.amount);

      if (!amountText) {
        parseLog.debug('Trying full DOM search...');
        amountText = this.searchPriceInDOM(doc, /\$[\d,]+\.?\d*/);
      }

      if (!amountText) {
        parseLog.debug('❌ Amount not found');
        return null;
      }

      const amount = this.extractNumber(amountText);
      if (!amount || !this.isValidPrice(amount)) {
        parseLog.debug('❌ Invalid amount', { amount });
        return null;
      }

      const currency = this.extractCurrency(amountText);
      const { title, imageUrl } = this.extractCommonInfo(doc);

      parseLog.info(`✅ Found: ${amount} ${currency}`);

      return {
        price: amount,
        amount,
        currency,
        title: title || undefined,
        imageUrl: imageUrl || undefined,
        discounts: [],
      };
    } catch (error) {
      parseLog.error(ErrorCode.PAR_E001, 'eBay parse error', {
        error: error instanceof Error ? error : new Error(String(error)),
      });
      return null;
    }
  }
}
