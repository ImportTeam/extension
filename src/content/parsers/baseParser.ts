/**
 * Base Parser - 추상 클래스 (SRP: 파싱 인터페이스 정의)
 *
 * 모든 사이트별 파서는 이 클래스를 상속받아 구현
 * 각 파서는 하나의 사이트만 담당
 */

import { ParsedProductInfo } from '../../shared/types';

export abstract class BaseParser {
  /**
   * 사이트 이름 (파서 식별용)
   */
  abstract readonly siteName: string;

  /**
   * CSS 선택자 (사이트별로 다름)
   */
  abstract readonly selectors: {
    amount: string[];
    title?: string[];
    image?: string[];
  };

  /**
   * 메인 파싱 메서드
   */
  abstract parse(doc: Document): ParsedProductInfo | null;

  /**
   * 공통 유틸: 텍스트에서 숫자 추출
   * "1,234,567원" → 1234567
   */
  protected extractNumber(text: string): number | null {
    // 쉼표, 공백, 통화 기호 제거
    const cleaned = text
      .replace(/[,₩$€£\s]/g, '')
      .trim();

    const match = cleaned.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  /**
   * 공통 유틸: 텍스트에서 통화 추출
   */
  protected extractCurrency(text: string): string {
    if (text.includes('원') || text.includes('KRW')) return 'KRW';
    if (text.includes('$') || text.includes('USD')) return 'USD';
    if (text.includes('€') || text.includes('EUR')) return 'EUR';
    if (text.includes('¥') || text.includes('JPY')) return 'JPY';
    return 'KRW'; // 기본값
  }

  /**
   * 선택자로 텍스트 추출 (첫 매칭만)
   */
  protected getTextBySelector(doc: Document, selector: string): string | null {
    const element = doc.querySelector(selector);
    return element?.textContent?.trim() || null;
  }

  /**
   * 선택자 리스트에서 첫 매칭 텍스트 추출
   */
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

  /**
   * 가격 검증 (합리적인 범위)
   * 100원 ~ 1억원
   */
  protected isValidPrice(price: number): boolean {
    return price > 100 && price < 100_000_000;
  }

  /**
   * DOM 전체 탐색 (TreeWalker로 가격 패턴 찾기)
   * 공통 로직으로 이동
   */
  protected searchPriceInDOM(doc: Document, pattern: RegExp): string | null {
    const walker = doc.createTreeWalker(
      doc.body,
      NodeFilter.SHOW_TEXT,
      null
    );

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

  /**
   * 메타 태그에서 정보 추출 (OpenGraph 등)
   */
  protected extractMetaContent(doc: Document, property: string): string | null {
    const meta = doc.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
    return meta?.getAttribute('content') || null;
  }

  /**
   * 기본 정보 추출 (Title, Image) - 메타 태그 기반 Fallback
   */
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
      imageUrl: imageUrl || undefined
    };
  }
}
