/**
 * 쿠팡 검색 스크래퍼
 * 
 * 쿠팡 검색 결과 페이지에서 상품 정보 추출
 * 로켓배송, 로켓와우 등 배송 정보도 추출
 */

import { Page } from 'playwright';
import { BaseProvider } from './base';
import type { ComparedProduct, ProviderType, ScrapeResult } from '../../shared/types/comparison';

export class CoupangSearchProvider extends BaseProvider {
  readonly name: ProviderType = 'coupang';
  readonly displayName = '쿠팡';
  readonly baseUrl = 'https://www.coupang.com';
  readonly searchUrl = 'https://www.coupang.com/np/search?component=&q=';
  readonly currency = 'KRW';

  // 쿠팡 검색 결과 셀렉터
  private readonly selectors = {
    productList: 'li.search-product, ul.search-product-list > li',
    productName: '.name, .product-title, dl.search-product-wrap-catalog dt',
    price: '.price-value, strong.price-value',
    originalPrice: '.base-price, del.base-price',
    image: 'img.search-product-wrap-img, .search-product-wrap-img img',
    link: 'a.search-product-link, a[href*="/vp/products/"]',
    rating: '.rating, .star-rating .rating',
    ratingCount: '.rating-total-count, span.rating-total-count',
    rocketDelivery: '.badge-rocket, .rocket-delivery, img[alt*="로켓"]',
    rocketWow: '.badge-rocket-wow, img[alt*="와우"]',
    freeShipping: '.free-shipping',
  };

  /**
   * 쿠팡에서 상품 검색
   */
  async search(query: string, maxResults = 10): Promise<ScrapeResult<ComparedProduct[]>> {
    const startTime = Date.now();
    let page: Page | null = null;

    try {
      page = await this.newPage();
      const searchUrl = this.getSearchUrl(query);

      console.log(`[Coupang] 검색 시작: ${query}`);
      console.log(`[Coupang] URL: ${searchUrl}`);

      // 페이지 로드
      await page.goto(searchUrl, {
        waitUntil: 'domcontentloaded',
        timeout: this.defaultTimeout,
      });

      // 동적 콘텐츠 로딩 대기
      await this.randomDelay(1500, 2500);

      // 상품 목록 대기
      try {
        await page.waitForSelector(this.selectors.productList, { timeout: 10000 });
      } catch {
        console.log('[Coupang] 상품 목록을 찾을 수 없음');
        return {
          success: false,
          error: '검색 결과가 없습니다',
          duration: Date.now() - startTime,
        };
      }

      // 스크롤하여 더 많은 상품 로드
      await this.scrollPage(page, 2);
      await this.randomDelay(500, 1000);

      // 상품 파싱
      const products = await this.parseProducts(page, maxResults);

      console.log(`[Coupang] 검색 완료: ${products.length}개 상품 발견`);

      return {
        success: true,
        data: products,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      console.error('[Coupang] 검색 에러:', error);
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
    // 광고 상품 제외
    const nonAdItems = [];
    for (const item of items) {
      const isAd = await item.$('.ad-badge, .ad_badge, [class*="ad-"]');
      if (!isAd) {
        nonAdItems.push(item);
      }
    }

    const itemsToProcess = nonAdItems.slice(0, maxResults);

    for (const item of itemsToProcess) {
      try {
        // 상품명
        const nameEl = await item.$(this.selectors.productName);
        const name = nameEl ? (await nameEl.textContent())?.trim() : null;
        if (!name) continue;

        // 가격
        const priceEl = await item.$(this.selectors.price);
        const priceText = priceEl ? await priceEl.textContent() : null;
        const price = this.parsePrice(priceText || '');
        if (!price) continue;

        // 원가 (할인 전)
        let originalPrice: number | undefined;
        const origPriceEl = await item.$(this.selectors.originalPrice);
        if (origPriceEl) {
          const origPriceText = await origPriceEl.textContent();
          const parsedOrig = this.parsePrice(origPriceText || '');
          if (parsedOrig && parsedOrig > price) {
            originalPrice = parsedOrig;
          }
        }

        // 링크
        const linkEl = await item.$(this.selectors.link);
        const href = linkEl ? await linkEl.getAttribute('href') : null;
        const url = href ? (href.startsWith('http') ? href : `${this.baseUrl}${href}`) : '';

        // 이미지
        const imgEl = await item.$(this.selectors.image);
        let image: string | undefined;
        if (imgEl) {
          image =
            (await imgEl.getAttribute('src')) ||
            (await imgEl.getAttribute('data-img-src')) ||
            undefined;
          if (image && image.startsWith('//')) {
            image = `https:${image}`;
          }
        }

        // 별점
        let rating: number | undefined;
        const ratingEl = await item.$(this.selectors.rating);
        if (ratingEl) {
          const ratingText = await ratingEl.textContent();
          if (ratingText) {
            const match = ratingText.match(/(\d+\.?\d*)/);
            if (match) {
              rating = parseFloat(match[1]);
            }
          }
        }

        // 리뷰 수
        let ratingCount: number | undefined;
        const ratingCountEl = await item.$(this.selectors.ratingCount);
        if (ratingCountEl) {
          const countText = await ratingCountEl.textContent();
          if (countText) {
            const match = countText.match(/\((\d+(?:,\d+)*)\)/);
            if (match) {
              ratingCount = parseInt(match[1].replace(/,/g, ''), 10);
            }
          }
        }

        // 로켓배송 여부
        const rocketEl = await item.$(this.selectors.rocketDelivery);
        const isRocketDelivery = !!rocketEl;

        // 무료배송 여부
        const freeShippingEl = await item.$(this.selectors.freeShipping);
        const isFreeShipping = !!freeShippingEl || isRocketDelivery;

        // 배송 정보
        let deliveryInfo: string | undefined;
        if (isRocketDelivery) {
          const wowEl = await item.$(this.selectors.rocketWow);
          deliveryInfo = wowEl ? '로켓와우' : '로켓배송';
        } else if (isFreeShipping) {
          deliveryInfo = '무료배송';
        }

        products.push({
          id: this.generateId(url || name),
          name,
          price,
          originalPrice,
          currency: this.currency,
          url,
          image,
          rating,
          ratingCount,
          isRocketDelivery,
          isFreeShipping,
          deliveryInfo,
        });
      } catch (err) {
        console.warn('[Coupang] 상품 파싱 실패:', err);
        continue;
      }
    }

    return products;
  }
}

// 싱글톤 인스턴스
export const coupangSearchProvider = new CoupangSearchProvider();
