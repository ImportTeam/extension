/**
 * Amazon Parser (amazon.com)
 * 책임: Amazon 상품 페이지 파싱
 */

import { BaseParser } from '../base/index';
import { ParsedProductInfo } from '../../../shared/types';
import { AMAZON_SELECTORS } from './constants';

export class AmazonParser extends BaseParser {
  readonly siteName = 'Amazon';

  readonly selectors = {
    amount: AMAZON_SELECTORS.amount,
  };

  /**
   * Amazon 페이지 감지
   */
  static isCheckoutPage(url: string): boolean {
    return /amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(url);
  }

  /**
   * 상품 페이지 파싱
   */
  parse(doc: Document): ParsedProductInfo | null {
    try {
      console.log('[AmazonParser] 🔍 Parsing Amazon page...');

      let amountText = this.getTextBySelectors(doc, this.selectors.amount);

      if (!amountText) {
        console.log('[AmazonParser] Trying full DOM search...');
        amountText = this.searchPriceInDOM(doc, /\$[\d,]+\.?\d*/);
      }

      if (!amountText) {
        console.debug('[AmazonParser] ❌ Amount not found');
        return null;
      }

      const amount = this.extractNumber(amountText);
      if (!amount || !this.isValidPrice(amount)) {
        console.debug('[AmazonParser] ❌ Invalid amount:', amount);
        return null;
      }

      const currency = this.extractCurrency(amountText);
      const { title, imageUrl } = this.extractCommonInfo(doc);

      console.log(`[AmazonParser] ✅ Found: ${amount} ${currency}`);

      return {
        price: amount,
        amount,
        currency,
        title: title || undefined,
        imageUrl: imageUrl || undefined,
        discounts: [],
      };
    } catch (error) {
      console.error('[AmazonParser] ❌ Parse error:', error);
      return null;
    }
  }
}
