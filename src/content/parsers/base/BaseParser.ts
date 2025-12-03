/**
 * Base Parser Module
 * 책임: 추상 클래스 정의 및 공통 유틸리티
 */

import { ParsedProductInfo } from '../../../shared/types';

export abstract class BaseParser {
  abstract readonly siteName: string;
  abstract readonly selectors: {
    amount: string[];
    title?: string[];
    image?: string[];
  };

  abstract parse(doc: Document): ParsedProductInfo | null;

  protected extractNumber(text: string): number | null {
    const cleaned = text.replace(/[,₩$€£\s]/g, '').trim();
    const match = cleaned.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  protected extractCurrency(text: string): string {
    if (text.includes('원') || text.includes('KRW')) return 'KRW';
    if (text.includes('$') || text.includes('USD')) return 'USD';
    if (text.includes('€') || text.includes('EUR')) return 'EUR';
    if (text.includes('¥') || text.includes('JPY')) return 'JPY';
    return 'KRW';
  }

  protected getTextBySelector(doc: Document, selector: string): string | null {
    const element = doc.querySelector(selector);
    return element?.textContent?.trim() || null;
  }

  protected getTextBySelectors(doc: Document, selectors: string[]): string | null {
    for (const selector of selectors) {
      try {
        const text = this.getTextBySelector(doc, selector);
        if (text) return text;
      } catch (err) {
        console.debug(`[${this.siteName}] Selector error: ${selector}`, err);
      }
    }
    return null;
  }

  protected isValidPrice(price: number): boolean {
    return price > 100 && price < 100_000_000;
  }

  protected searchPriceInDOM(doc: Document, pattern: RegExp): string | null {
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
      const text = node.textContent || '';
      const match = text.match(pattern);
      if (match) {
        console.log(`[${this.siteName}] Found price via TreeWalker: "${match[0]}"`);
        return match[0];
      }
    }
    return null;
  }

  protected extractMetaContent(doc: Document, property: string): string | null {
    const meta = doc.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
    return meta?.getAttribute('content') || null;
  }

  protected extractCommonInfo(doc: Document): { title?: string; imageUrl?: string } {
    const title =
      this.extractMetaContent(doc, 'og:title') ||
      this.extractMetaContent(doc, 'twitter:title') ||
      doc.title;

    const imageUrl =
      this.extractMetaContent(doc, 'og:image') ||
      this.extractMetaContent(doc, 'twitter:image');

    return {
      title: title || undefined,
      imageUrl: imageUrl || undefined,
    };
  }
}
