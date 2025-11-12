/**
 * Amazon Parser (SRP: Amazon 사이트만 담당)
 */

import { BaseParser, ParsedData } from './baseParser';

export class AmazonParser extends BaseParser {
  readonly siteName = 'Amazon';

  readonly selectors = {
    amount: [
      '.a-price-whole',                   // 주가격
      '[data-a-color="price"]',           // 가격 속성
      '.a-price',                         // 일반 가격
      '[class*="price"]',                 // 가격 포함된 모든 클래스
    ],
  };

  /**
   * Amazon 페이지 감지
   */
  static isCheckoutPage(url: string): boolean {
    return /amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(url);
  }

  parse(doc: Document): ParsedData | null {
    try {
      console.log('[AmazonParser] 🔍 Parsing Amazon page...');

      let amountText = this.getTextBySelectors(doc, this.selectors.amount);
      
      if (!amountText) {
        console.log('[AmazonParser] Trying full DOM search...');
        amountText = this.searchPriceInDOM(doc);
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

      console.log(`[AmazonParser] ✅ Found: ${amount} ${currency}`);

      return {
        amount,
        currency,
        confidence: 0.9,
        metadata: { source: 'amazon-dom' },
      };
    } catch (error) {
      console.error('[AmazonParser] ❌ Parse error:', error);
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
        console.log(`[AmazonParser] Found price in text: "${match[0]}"`);
        return match[0];
      }
    }

    return null;
  }
}
