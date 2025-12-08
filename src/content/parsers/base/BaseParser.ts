/**
 * Base Parser Module
 * 책임: 추상 클래스 정의 및 공통 유틸리티
 */

import { ParsedProductInfo } from '../../../shared/types';
import { parserLog, ErrorCode } from '../../../shared/utils/logger';
import { extractNumber, extractCurrency, isValidPrice } from '../utils';

export abstract class BaseParser {
  abstract readonly siteName: string;
  abstract readonly selectors: {
    amount: string[];
    title?: string[];
    image?: string[];
  };

  abstract parse(doc: Document): ParsedProductInfo | null;

  /**
   * 텍스트에서 숫자 추출 (utils.ts 위임)
   */
  protected extractNumber(text: string): number | null {
    return extractNumber(text);
  }

  /**
   * 텍스트에서 통화 추출 (utils.ts 위임)
   */
  protected extractCurrency(text: string): string {
    return extractCurrency(text);
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
        parserLog.error(ErrorCode.PAR_E004, `Selector error: ${selector}`, {
          data: { siteName: this.siteName, selector },
          error: err instanceof Error ? err : undefined,
        });
      }
    }
    return null;
  }

  /**
   * 가격 유효성 검증 (utils.ts 위임)
   */
  protected isValidPrice(price: number): boolean {
    return isValidPrice(price);
  }

  protected searchPriceInDOM(doc: Document, pattern: RegExp): string | null {
    // 성능 최적화: 가격 관련 요소만 검색 (전체 body 순회 방지)
    const priceContainers = doc.querySelectorAll(
      '[class*="price"], [class*="Price"], [class*="cost"], [class*="amount"], [id*="price"], [id*="Price"]'
    );

    for (const container of priceContainers) {
      const text = container.textContent || '';
      const match = text.match(pattern);
      if (match) {
        parserLog.debug('Found price in container', { siteName: this.siteName, price: match[0] });
        return match[0];
      }
    }

    // 폴백: 제한된 깊이의 TreeWalker (최대 1000 노드)
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
    let node;
    let nodeCount = 0;
    const MAX_NODES = 1000;

    while ((node = walker.nextNode()) && nodeCount < MAX_NODES) {
      nodeCount++;
      const text = node.textContent || '';
      const match = text.match(pattern);
      if (match) {
        parserLog.debug('Found price via TreeWalker', { siteName: this.siteName, price: match[0], nodesScanned: nodeCount });
        return match[0];
      }
    }

    if (nodeCount >= MAX_NODES) {
      parserLog.warn('TreeWalker hit node limit', { siteName: this.siteName, limit: MAX_NODES });
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
