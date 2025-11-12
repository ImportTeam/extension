/**
 * eBay Parser (SRP: eBay 사이트만 담당)
 */

import { BaseParser, ParsedData } from './baseParser';

export class EbayParser extends BaseParser {
  readonly siteName = 'eBay';

  readonly selectors = {
    amount: [
      '.vi-VR-cvipPrice',                 // eBay 가격
      '[id*="vi_ird_finalPrice"]',        // Final price ID
      '.vi-acc-del-range',                // 범위 가격
      '[class*="price"]',                 // 가격 포함된 모든 클래스
    ],
  };

  /**
   * eBay 페이지 감지
   */
  static isCheckoutPage(url: string): boolean {
    return /ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(url);
  }

  parse(doc: Document): ParsedData | null {
    try {
      console.log('[EbayParser] 🔍 Parsing eBay page...');

      let amountText = this.getTextBySelectors(doc, this.selectors.amount);
      
      if (!amountText) {
        console.log('[EbayParser] Trying full DOM search...');
        amountText = this.searchPriceInDOM(doc);
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

      console.log(`[EbayParser] ✅ Found: ${amount} ${currency}`);

      return {
        amount,
        currency,
        confidence: 0.85,
        metadata: { source: 'ebay-dom' },
      };
    } catch (error) {
      console.error('[EbayParser] ❌ Parse error:', error);
      return null;
    }
  }

  private searchPriceInDOM(doc: Document): string | null {
    const walker = doc.createTreeWalker(
      doc.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    const pricePattern = /\$[\d,]+\.?\d*/;

    while ((node = walker.nextNode())) {
      const text = node.textContent || '';
      const match = text.match(pricePattern);
      if (match) {
        console.log(`[EbayParser] Found price in text: "${match[0]}"`);
        return match[0];
      }
    }

    return null;
  }
}
