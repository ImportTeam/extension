/**
 * 네이버 쇼핑 가격 스크래퍼
 * 
 * 네이버 쇼핑은 다양한 쇼핑몰의 상품을 검색할 수 있는 플랫폼
 * Selector 구조가 자주 변경되므로 여러 대체 selector 준비
 */

import { Page } from 'playwright';
import { BaseProvider } from './base';
import type { ComparedProduct, ProviderType, ScrapeResult } from '../../shared/types/comparison';

export class NaverShoppingProvider extends BaseProvider {
  readonly name: ProviderType = 'naver';
  readonly displayName = '네이버쇼핑';
  readonly baseUrl = 'https://shopping.naver.com';
  readonly searchUrl = 'https://search.shopping.naver.com/search/all?query=';
  readonly currency = 'KRW';

  // 네이버 쇼핑 셀렉터 (여러 버전 대응)
  private readonly selectors = {
    // 상품 목록 컨테이너
    productList: [
      '.basicList_item__0T9JD',
      'div[class*="product_item"]',
      '.product_item',
      'li[class*="product"]',
    ],
    // 상품명
    productName: [
      '.basicList_title__VfX3c a',
      'a[class*="product_title"]',
      '.product_title a',
      'a.basicList_link__JLQJf',
    ],
    // 가격
    price: ['.price_num__S2p_v', 'span[class*="price"]', '.product_price', '.price em'],
    // 이미지
    image: [
      '.thumbnail_thumb__Bxb6Z img',
      'img[class*="product_img"]',
      '.product_img img',
      'img[class*="thumb"]',
    ],
    // 판매처
    seller: ['.basicList_mall__3FKZY', 'span[class*="mall"]', '.product_mall'],
    // 리뷰
    review: ['.basicList_review__KMlFu', 'span[class*="review"]', '.product_review'],
    // 별점
    rating: ['.basicList_star__UzKiv', 'span[class*="star"]', '.product_rating'],
  };

  /**
   * 네이버 쇼핑에서 상품 검색
   */
  async search(query: string, maxResults = 10): Promise<ScrapeResult<ComparedProduct[]>> {
    const startTime = Date.now();
    let page: Page | null = null;

    try {
      page = await this.newPage();
      const searchUrl = this.getSearchUrl(query);

      console.log(`[Naver] 검색 시작: ${query}`);
      console.log(`[Naver] URL: ${searchUrl}`);

      // 페이지 로드
      await page.goto(searchUrl, {
        waitUntil: 'networkidle',
        timeout: this.defaultTimeout,
      });

      // 동적 콘텐츠 로딩 대기
      await this.randomDelay(1500, 2500);

      // 상품 목록 대기 (여러 selector 시도)
      let foundSelector: string | null = null;
      for (const selector of this.selectors.productList) {
        try {
          await page.waitForSelector(selector, { timeout: 5000 });
          foundSelector = selector;
          break;
        } catch {
          continue;
        }
      }

      if (!foundSelector) {
        console.log('[Naver] 상품 목록을 찾을 수 없음');
        return {
          success: false,
          error: '검색 결과가 없습니다',
          duration: Date.now() - startTime,
        };
      }

      // 스크롤하여 더 많은 상품 로드
      await this.scrollPage(page, 3);
      await this.randomDelay(500, 1000);

      // 상품 파싱
      const products = await this.parseProducts(page, foundSelector, maxResults);

      console.log(`[Naver] 검색 완료: ${products.length}개 상품 발견`);

      return {
        success: true,
        data: products,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      console.error('[Naver] 검색 에러:', error);
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
  private async parseProducts(
    page: Page,
    listSelector: string,
    maxResults: number
  ): Promise<ComparedProduct[]> {
    const products: ComparedProduct[] = [];

    const items = await page.$$(listSelector);
    const itemsToProcess = items.slice(0, maxResults);

    for (const item of itemsToProcess) {
      try {
        // 상품명 추출 (여러 selector 시도)
        let name: string | null = null;
        let url: string | null = null;
        for (const selector of this.selectors.productName) {
          const el = await item.$(selector);
          if (el) {
            name = (await el.textContent())?.trim() || null;
            url = await el.getAttribute('href');
            if (name) break;
          }
        }
        if (!name) continue;

        // 가격 추출
        let price: number | null = null;
        for (const selector of this.selectors.price) {
          const el = await item.$(selector);
          if (el) {
            const priceText = await el.textContent();
            price = this.parsePrice(priceText || '');
            if (price) break;
          }
        }
        if (!price) continue;

        // URL 정규화
        if (url && !url.startsWith('http')) {
          url = `https://search.shopping.naver.com${url}`;
        }

        // 이미지 추출
        let image: string | undefined;
        for (const selector of this.selectors.image) {
          const el = await item.$(selector);
          if (el) {
            image = (await el.getAttribute('src')) || (await el.getAttribute('data-src')) || undefined;
            if (image) {
              if (image.startsWith('//')) image = `https:${image}`;
              break;
            }
          }
        }

        // 판매처 추출
        let seller: string | undefined;
        for (const selector of this.selectors.seller) {
          const el = await item.$(selector);
          if (el) {
            seller = (await el.textContent())?.trim() || undefined;
            if (seller) break;
          }
        }

        // 별점 추출
        let rating: number | undefined;
        for (const selector of this.selectors.rating) {
          const el = await item.$(selector);
          if (el) {
            const ratingText = await el.textContent();
            if (ratingText) {
              const match = ratingText.match(/(\d+\.?\d*)/);
              if (match) {
                rating = parseFloat(match[1]);
                break;
              }
            }
          }
        }

        // 리뷰 수 추출
        let ratingCount: number | undefined;
        for (const selector of this.selectors.review) {
          const el = await item.$(selector);
          if (el) {
            const reviewText = await el.textContent();
            if (reviewText) {
              const match = reviewText.match(/(\d+)/);
              if (match) {
                ratingCount = parseInt(match[1], 10);
                break;
              }
            }
          }
        }

        products.push({
          id: this.generateId(url || name),
          name,
          price,
          currency: this.currency,
          url: url || '',
          image,
          seller,
          rating,
          ratingCount,
        });
      } catch (err) {
        console.warn('[Naver] 상품 파싱 실패:', err);
        continue;
      }
    }

    return products;
  }
}

// 싱글톤 인스턴스
export const naverShoppingProvider = new NaverShoppingProvider();
