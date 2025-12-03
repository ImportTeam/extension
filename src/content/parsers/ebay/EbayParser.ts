/**
 * eBay Parser (ebay.com)
 * 책임: eBay 상품 페이지 파싱
 */

import { BaseParser } from '../base/index';
import { ParsedProductInfo } from '../../../shared/types';
import { EBAY_SELECTORS } from './constants';

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
      console.log('[EbayParser] 🔍 Parsing eBay page...');

      let amountText = this.getTextBySelectors(doc, this.selectors.amount);

      if (!amountText) {
        console.log('[EbayParser] Trying full DOM search...');
        amountText = this.searchPriceInDOM(doc, /\$[\d,]+\.?\d*/);
      }

      if (!amountText) {
        console.debug('[EbayParser] ❌ Amount not found');
        return null;
      }

      const amount = this.extractNumber(amountText);
      if (!amount || !this.isValidPrice(amount)) {
        console.debug('[EbayParser] ❌ Invalid amount:', amount);
        return null;
      }

      const currency = this.extractCurrency(amountText);
      const { title, imageUrl } = this.extractCommonInfo(doc);

      console.log(`[EbayParser] ✅ Found: ${amount} ${currency}`);

      return {
        price: amount,
        amount,
        currency,
        title: title || undefined,
        imageUrl: imageUrl || undefined,
        discounts: [],
      };
    } catch (error) {
      console.error('[EbayParser] ❌ Parse error:', error);
      return null;
    }
  }
}
