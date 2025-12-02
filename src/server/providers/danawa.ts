/**
 * 다나와 가격 스크래퍼
 * 
 * 다나와는 가격비교 사이트로, 여러 쇼핑몰의 가격을 한눈에 볼 수 있다.
 * 2024년 업데이트된 셀렉터 구조 적용
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

  // 다나와 전용 셀렉터 (여러 버전 대응)
  private readonly selectors = {
    // 상품 목록 셀렉터들 (여러 버전 지원)
    productLists: [
      'li.prod_item',
      'ul.product_list > li',
      '.main_prodlist li[data-productcode]',
      '.product_list li.product_item',
    ],
    // 광고 제외 셀렉터
    adMarker: '.ad_badge, .prod_ad_item, [class*="ad_"]',
    // 상품명 셀렉터들
    productNames: [
      'p.prod_name a',
      '.prod_name a',
      'a.prod_name',
      '.product_name a',
      '.prod_info .name a',
    ],
    // 가격 셀렉터들
    prices: [
      '.price_sect .lwst_prc a strong',
      '.price_sect strong',
      '.prod_pricelist .price_sect .price strong',
      '.prod_pricelist .price',
      '.price strong',
      '.price em',
    ],
    // 이미지 셀렉터들
    images: [
      'div.thumb_image img',
      '.thumb_image img',
      '.product_image img',
      'img.lazy',
      'img[data-original]',
    ],
    // 링크 셀렉터들
    links: [
      'a.thumb_link',
      'a.prod_link',
      '.prod_name a',
      'a[href*="prod_detail"]',
    ],
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
        waitUntil: 'networkidle',
        timeout: this.defaultTimeout,
      });

      // 동적 콘텐츠 로딩 대기
      await this.randomDelay(2000, 3000);

      // 스크롤하여 lazy loading 이미지 로드
      await this.scrollPage(page, 3);
      await this.randomDelay(1000, 1500);

      // 상품 파싱
      const products = await this.parseProducts(page, maxResults);

      if (products.length === 0) {
        // 디버깅: 페이지 HTML 일부 출력
        const html = await page.content();
        console.log('[Danawa] 페이지 HTML 샘플:', html.substring(0, 1000));
        
        return {
          success: false,
          error: '검색 결과가 없습니다',
          duration: Date.now() - startTime,
        };
      }

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

    // 여러 셀렉터 시도하여 상품 목록 찾기
    let items: Awaited<ReturnType<Page['$$']>> = [];
    for (const selector of this.selectors.productLists) {
      try {
        const found = await page.$$(selector);
        if (found.length > 0) {
          console.log(`[Danawa] 셀렉터 "${selector}"로 ${found.length}개 요소 발견`);
          items = found;
          break;
        }
      } catch {
        continue;
      }
    }

    if (items.length === 0) {
      console.log('[Danawa] 어떤 셀렉터로도 상품을 찾지 못함');
      return products;
    }

    // 광고 아이템 필터링
    const nonAdItems = [];
    for (const item of items) {
      const isAd = await item.$(this.selectors.adMarker);
      if (!isAd) {
        nonAdItems.push(item);
      }
    }

    const itemsToProcess = nonAdItems.slice(0, maxResults);
    console.log(`[Danawa] 처리할 상품 수: ${itemsToProcess.length}`);

    for (const item of itemsToProcess) {
      try {
        // 상품명 찾기
        let name: string | null = null;
        for (const selector of this.selectors.productNames) {
          const nameEl = await item.$(selector);
          if (nameEl) {
            name = ((await nameEl.textContent()) || '').trim();
            if (name) break;
          }
        }
        if (!name) continue;

        // 가격 찾기
        let priceText: string | null = null;
        for (const selector of this.selectors.prices) {
          const priceEl = await item.$(selector);
          if (priceEl) {
            priceText = await priceEl.textContent();
            if (priceText && priceText.match(/\d/)) break;
          }
        }
        const price = this.parsePrice(priceText || '');
        if (!price) continue;

        // 링크 찾기
        let url = '';
        for (const selector of this.selectors.links) {
          const linkEl = await item.$(selector);
          if (linkEl) {
            const href = await linkEl.getAttribute('href');
            if (href) {
              url = href.startsWith('http') ? href : `${this.baseUrl}${href}`;
              break;
            }
          }
        }

        // 이미지 찾기 (lazy loading 대응)
        let image: string | undefined;
        for (const selector of this.selectors.images) {
          const imgEl = await item.$(selector);
          if (imgEl) {
            image =
              (await imgEl.getAttribute('data-original')) ||
              (await imgEl.getAttribute('data-src')) ||
              (await imgEl.getAttribute('src')) ||
              undefined;
            if (image) {
              if (image.startsWith('//')) {
                image = `https:${image}`;
              }
              break;
            }
          }
        }

        products.push({
          id: this.generateId(url || name),
          name,
          price,
          currency: this.currency,
          url,
          image,
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
