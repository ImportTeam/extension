/**
 * eBay Parser (SRP: eBay 사이트만 담당)
 */

import { BaseParser } from './baseParser';
import { ParsedProductInfo } from '../../shared/types';

export class EbayParser extends BaseParser {
  readonly siteName = 'eBay';

  readonly selectors = {
    amount: [
      '.vi-VR-cvipPrice',
      '[id*="vi_ird_finalPrice"]',
      '.vi-acc-del-range',
      '[class*="price"]',
    ],
  };

  /**
   * eBay 페이지 감지
   */
  static isCheckoutPage(url: string): boolean {
    return /ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(url);
  }

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
