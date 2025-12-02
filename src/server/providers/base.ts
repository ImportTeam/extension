/**
 * Base Provider - 모든 스크래퍼의 추상 클래스
 */

import { chromium, Browser, Page, BrowserContext } from 'playwright';
import type { ComparedProduct, ProviderType, ScrapeResult } from '../../shared/types/comparison';

export abstract class BaseProvider {
  abstract readonly name: ProviderType;
  abstract readonly displayName: string;
  abstract readonly baseUrl: string;
  abstract readonly searchUrl: string;
  abstract readonly currency: string;

  protected browser: Browser | null = null;
  protected context: BrowserContext | null = null;

  // 스크래핑 설정
  protected readonly defaultTimeout = 30000;
  protected readonly defaultMaxResults = 10;

  // User-Agent 목록 (랜덤 선택)
  protected readonly userAgents = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  ];

  /**
   * 브라우저 초기화
   */
  async initBrowser(): Promise<void> {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
        ],
      });
    }

    if (!this.context) {
      this.context = await this.browser.newContext({
        userAgent: this.getRandomUserAgent(),
        viewport: { width: 1920, height: 1080 },
        locale: 'ko-KR',
        timezoneId: 'Asia/Seoul',
      });
    }
  }

  /**
   * 브라우저 종료
   */
  async closeBrowser(): Promise<void> {
    if (this.context) {
      await this.context.close();
      this.context = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * 새 페이지 생성
   */
  protected async newPage(): Promise<Page> {
    await this.initBrowser();
    if (!this.context) {
      throw new Error('Browser context not initialized');
    }
    return this.context.newPage();
  }

  /**
   * 랜덤 User-Agent 선택
   */
  protected getRandomUserAgent(): string {
    return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
  }

  /**
   * 검색 URL 생성
   */
  protected getSearchUrl(query: string): string {
    return `${this.searchUrl}${encodeURIComponent(query)}`;
  }

  /**
   * 가격 문자열 파싱 (숫자 추출)
   */
  protected parsePrice(priceStr: string): number | null {
    if (!priceStr) return null;
    const cleaned = priceStr.replace(/[^\d.]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  }

  /**
   * 안전한 텍스트 추출
   */
  protected async safeText(page: Page, selector: string): Promise<string | null> {
    try {
      const element = await page.$(selector);
      if (!element) return null;
      return (await element.textContent())?.trim() || null;
    } catch {
      return null;
    }
  }

  /**
   * 안전한 속성 추출
   */
  protected async safeAttr(page: Page, selector: string, attr: string): Promise<string | null> {
    try {
      const element = await page.$(selector);
      if (!element) return null;
      return await element.getAttribute(attr);
    } catch {
      return null;
    }
  }

  /**
   * 랜덤 지연 (봇 감지 회피)
   */
  protected async randomDelay(min = 500, max = 1500): Promise<void> {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  /**
   * 스크롤 (lazy loading 대응)
   */
  protected async scrollPage(page: Page, scrollCount = 3): Promise<void> {
    for (let i = 0; i < scrollCount; i++) {
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await this.randomDelay(300, 800);
    }
  }

  /**
   * 상품 검색 (추상 메서드)
   */
  abstract search(query: string, maxResults?: number): Promise<ScrapeResult<ComparedProduct[]>>;

  /**
   * 고유 ID 생성
   */
  protected generateId(url: string): string {
    return Buffer.from(url).toString('base64').substring(0, 16);
  }
}
