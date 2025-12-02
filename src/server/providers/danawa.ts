/**
 * 다나와 가격 스크래퍼
 * 
 * 다나와는 가격비교 사이트로, 여러 쇼핑몰의 가격을 한눈에 볼 수 있다.
 * Selector 구조: li.prod_item > .prod_name, .price_sect, .thumb_image
 */

import { Page } from 'playwright';
import { BaseProvider } from './base';
import type { ComparedProduct, ProviderType, ScrapeResult } from '../../shared/types/comparison';

export class DanawaProvider extends BaseProvider {
  readonly name: ProviderType = 'danawa';
  readonly displayName = '다나와';
  readonly baseUrl = 'https://www.danawa.com';
  readonly searchUrl = 'https://search.danawa.com/dsearch.php?k1=';
  readonly currency = 'KRW';

  // 다나와 전용 셀렉터
  private readonly selectors = {
    productList: 'li.prod_item.prod_layer:not(.ad_item)',
    productName: 'p.prod_name a',
    priceArea: '.price_sect',
    lowestPrice: '.price_sect .lwst_prc a strong',
    priceLink: '.price_sect .lwst_prc a',
    image: 'div.thumb_image img',
    thumbLink: 'a.thumb_link',
    spec: '.spec_list li',
    mallList: '.mall_list li',
    mallName: '.logo_over img',
    mallPrice: 'a strong',
  };

  /**
   * 다나와에서 상품 검색
   */
  async search(query: string, maxResults = 10): Promise<ScrapeResult<ComparedProduct[]>> {
    const startTime = Date.now();
    let page: Page | null = null;

    try {
      page = await this.newPage();
      const searchUrl = this.getSearchUrl(query);

      console.log(`[Danawa] 검색 시작: ${query}`);
      console.log(`[Danawa] URL: ${searchUrl}`);

      // 페이지 로드
      await page.goto(searchUrl, {
        waitUntil: 'domcontentloaded',
        timeout: this.defaultTimeout,
      });

      // 동적 콘텐츠 로딩 대기
      await this.randomDelay(1000, 2000);

      // 상품 목록 대기
      try {
        await page.waitForSelector(this.selectors.productList, { timeout: 10000 });
      } catch {
        console.log('[Danawa] 상품 목록을 찾을 수 없음');
        return {
          success: false,
          error: '검색 결과가 없습니다',
          duration: Date.now() - startTime,
        };
      }

      // 스크롤하여 lazy loading 이미지 로드
      await this.scrollPage(page, 2);
      await this.randomDelay(500, 1000);

      // 상품 파싱
      const products = await this.parseProducts(page, maxResults);

      console.log(`[Danawa] 검색 완료: ${products.length}개 상품 발견`);

      return {
        success: true,
        data: products,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      console.error('[Danawa] 검색 에러:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
        duration: Date.now() - startTime,
      };
    } finally {
      if (page) {
        await page.close();
      }
    }
  }

  /**
   * 상품 목록 파싱
   */
  private async parseProducts(page: Page, maxResults: number): Promise<ComparedProduct[]> {
    const products: ComparedProduct[] = [];

    const items = await page.$$(this.selectors.productList);
    const itemsToProcess = items.slice(0, maxResults);

    for (const item of itemsToProcess) {
      try {
        // 상품명
        const nameEl = await item.$(this.selectors.productName);
        const name = nameEl ? (await nameEl.textContent())?.trim() : null;
        if (!name) continue;

        // 가격
        const priceEl = await item.$(this.selectors.lowestPrice);
        const priceText = priceEl ? await priceEl.textContent() : null;
        const price = this.parsePrice(priceText || '');
        if (!price) continue;

        // 링크
        const linkEl = await item.$(this.selectors.thumbLink);
        const href = linkEl ? await linkEl.getAttribute('href') : null;
        const url = href ? (href.startsWith('http') ? href : `${this.baseUrl}${href}`) : '';

        // 이미지 (lazy loading 대응)
        const imgEl = await item.$(this.selectors.image);
        let image: string | undefined;
        if (imgEl) {
          image = (await imgEl.getAttribute('data-original')) || (await imgEl.getAttribute('src')) || undefined;
          if (image && image.startsWith('//')) {
            image = `https:${image}`;
          }
        }

        // 스펙 정보
        const specEls = await item.$$(this.selectors.spec);
        const specs: string[] = [];
        for (const spec of specEls.slice(0, 3)) {
          const text = await spec.textContent();
          if (text) specs.push(text.trim());
        }

        products.push({
          id: this.generateId(url || name),
          name,
          price,
          currency: this.currency,
          url,
          image,
          deliveryInfo: specs.length > 0 ? specs.join(' | ') : undefined,
        });
      } catch (err) {
        console.warn('[Danawa] 상품 파싱 실패:', err);
        continue;
      }
    }

    return products;
  }

  /**
   * 상품 상세 페이지에서 쇼핑몰별 가격 추출
   */
  async getMallPrices(productUrl: string): Promise<
    Array<{
      mallName: string;
      price: number;
      url: string;
    }>
  > {
    let page: Page | null = null;

    try {
      page = await this.newPage();
      await page.goto(productUrl, {
        waitUntil: 'domcontentloaded',
        timeout: this.defaultTimeout,
      });

      await this.randomDelay(1000, 2000);

      const mallPrices: Array<{ mallName: string; price: number; url: string }> = [];

      // 쇼핑몰 목록 가져오기
      const mallItems = await page.$$('.mall_list li, .box__mall-price');

      for (const item of mallItems.slice(0, 10)) {
        try {
          const nameImg = await item.$('img');
          const mallName = nameImg ? ((await nameImg.getAttribute('alt')) || '').trim() : '';

          const priceEl = await item.$('a strong, .price');
          const priceText = priceEl ? await priceEl.textContent() : null;
          const price = this.parsePrice(priceText || '');

          const linkEl = await item.$('a');
          const url = linkEl ? (await linkEl.getAttribute('href')) || '' : '';

          if (mallName && price) {
            mallPrices.push({ mallName, price, url });
          }
        } catch {
          continue;
        }
      }

      return mallPrices;
    } finally {
      if (page) {
        await page.close();
      }
    }
  }
}

// 싱글톤 인스턴스
export const danawaProvider = new DanawaProvider();
