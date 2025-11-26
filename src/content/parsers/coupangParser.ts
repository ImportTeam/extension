/**
 * Coupang Parser (완전한 데이터 추출)
 *
 * 추출 대상:
 * 1. 상품명
 * 2. 판매가
 * 3. 와우할인가
 * 4. 카드혜택 (iframe 포함)
 * 5. 배송정보 등
 */

import { BaseParser } from './baseParser';
import { ParsedProductInfo } from '../../shared/types';

export class CoupangParser extends BaseParser {
  readonly siteName = 'Coupang';

  readonly selectors = {
    amount: [
      '.price-amount.sales-price-amount',
      '.price-amount.final-price-amount',
      '.total-price',
      '[data-testid="total-price"]',
      '.price-amount',
    ],
  };

  static isCheckoutPage(url: string): boolean {
    // Coupang 제품 페이지만 인식 (검색 결과나 다른 페이지 배제)
    // 패턴: www.coupang.com/vp/products/... 또는 coupang.com/vp/...
    return /coupang\.com\/vp\//.test(url) || /coupang\.com\/n\//.test(url) || /coupang\.com\/products\//.test(url);
  }

  /**
   * 모든 상품 데이터 추출 (단순 가격 추출 아님)
   */
  parse(doc: Document): ParsedProductInfo | null {
    try {
      console.log('[CoupangParser] 🔍 Parsing Coupang page...');

      // 1. 상품명
      const title = this.extractTitle(doc);
      console.log(`[CoupangParser] Title: ${title || '(not found)'}`);

      // 1-1. 상품 이미지
      const imageUrl = this.extractProductImage(doc);
      if (imageUrl) {
        console.log(`[CoupangParser] Image: ${imageUrl.substring(0, 60)}...`);
      }

      // 1-2. 모든 상품 이미지 수집 (슬라이드용)
      const images = this.extractAllProductImages(doc);
      if (images.length > 0) {
        console.log(`[CoupangParser] Additional images: ${images.length} found`);
      }

      // 2. 가격 (판매가 + 와우할인가)
      const { amount, originalPrice, discountPrice } = this.extractPrices(doc);

      if (!amount) {
        console.debug('[CoupangParser] ❌ No price found');
        return null;
      }

      console.log(`[CoupangParser] Price: ${amount} (original: ${originalPrice}, discount: ${discountPrice})`);

      // 3. 카드혜택
      const cardBenefits = this.extractCardBenefits(doc).map(b => ({
        card: b.cardName,
        benefit: b.benefit,
        discount: b.rate
      }));
      console.log(`[CoupangParser] Card benefits: ${cardBenefits.length} found`);

      // 4. 기프트카드 할인
      const giftCardDiscount = this.extractGiftCardDiscount(doc);
      if (giftCardDiscount) {
        console.log(`[CoupangParser] Gift card discount: ${giftCardDiscount.rate}%`);
      }

      // 5. 쿠팡캐시 적립
      const cashback = this.extractCashback(doc);
      if (cashback) {
        console.log(`[CoupangParser] Cashback: ${cashback.amount.toLocaleString()} KRW`);
      }

      // 6. 배송정보
      const shippingInfo = this.extractShippingInfo(doc);
      console.log(`[CoupangParser] Shipping: ${shippingInfo || '(not found)'}`);

      // 7. 다른 구성 (가격별, 색상별, 크기별 옵션)
      const variants = this.extractVariants(doc);
      if (variants.length > 0) {
        console.log(`[CoupangParser] Variants: ${variants.length} found`);
      }

      return {
        price: amount,
        amount,
        currency: 'KRW',
        // confidence: 0.95, // ParsedProductInfo doesn't have confidence? It was in ParsedData.
        // metadata: { source: 'coupang-dom' }, // ParsedProductInfo doesn't have metadata?
        title: title || undefined,
        imageUrl: imageUrl || undefined,
        images,
        variants,
        originalPrice: originalPrice || undefined,
        discountPrice: discountPrice || undefined, // ParsedProductInfo has discountPrice? Yes I added it.
        cardBenefits,
        giftCardDiscount: giftCardDiscount || undefined,
        cashback: cashback || undefined,
        shippingInfo: shippingInfo || undefined,
        discounts: [], // Required by ParsedProductInfo
      };
    } catch (error) {
      console.error('[CoupangParser] ❌ Parse error:', error);
      return null;
    }
  }

  /**
   * 상품명 추출
   * Selector: .product-title ... 또는 h1, h2
   */
  private extractTitle(doc: Document): string | null {
    const selectors = [
      '.product-title',
      'h1.product-name',
      'h2[class*="title"]',
      '[data-testid="product-title"]',
    ];

    for (const selector of selectors) {
      const el = doc.querySelector(selector);
      if (el?.textContent) {
        return el.textContent.trim();
      }
    }

    return null;
  }

  /**
   * 가격 추출 (판매가, 와우할인가, 최종 가격)
   */
  private extractPrices(doc: Document): {
    amount: number | null;
    originalPrice: number | null;
    discountPrice: number | null;
  } {
    let amount: number | null = null;
    let originalPrice: number | null = null;
    let discountPrice: number | null = null;

    // 방법 1: 선택자 기반 (우선순위)
    const salesPriceEl = doc.querySelector('.price-amount.sales-price-amount');
    if (salesPriceEl?.textContent) {
      originalPrice = this.extractNumber(salesPriceEl.textContent);
      amount = originalPrice;
    }

    const discountPriceEl = doc.querySelector('.price-amount.final-price-amount');
    if (discountPriceEl?.textContent) {
      discountPrice = this.extractNumber(discountPriceEl.textContent);
      if (discountPrice) amount = discountPrice; // 최종 가격 (할인 적용)
    }

    // 방법 2: 실패시 DOM 탐색
    if (!amount) {
      const result = this.findPriceInDOM(doc);
      amount = result;
    }

    return { amount, originalPrice, discountPrice };
  }

  /**
   * 카드혜택 추출
   *
   * ⚠️ 중요: 이 메서드는 페이지 로드 시점에 '정적으로 렌더링된' 데이터만 추출합니다.
   *
   * 구조:
   * 1. 카드 혜택 (정적, 파싱 가능)
   *    - div.ccid-detail-benefits > a.ccid-benefit-badge
   *    - 카드사 이미지들 (benefit-ico)
   *    - 혜택 텍스트: "최대 X% 즉시할인" + "와우전용"
   *
   * 2. 기프트카드 할인 (iframe 내부, 접근 불가)
   *    - "기프트카드 60% 적용 시" → 사용자가 버튼 클릭하면 iframe 로드됨
   *    - Content Script는 iframe 보안상 접근 불가
   *    - 추출 불가능 ❌
   *
   * 3. 쿠팡캐시 적립 (일부 정적)
   *    - "최대 16,086원" → 추출 가능
   *    - "쿠팡캐시 적립" 버튼 내 상세정보 → iframe, 접근 불가
   */
  private extractCardBenefits(doc: Document): Array<{
    cardName: string;
    benefit: string;
    rate?: number;
  }> {
    const benefits: Array<{ cardName: string; benefit: string; rate?: number }> = [];

    // 1. Coupang 카드혜택 섹션 찾기 (정적, 즉시 파싱 가능)
    const benefitBadge = doc.querySelector('.ccid-benefit-badge');
    if (!benefitBadge) {
      console.log('[CoupangParser] 📌 No card benefit badge found');
      return benefits;
    }

    // 2. 카드사 이미지 추출 (여러 카드사 지원)
    const cardIcons = benefitBadge.querySelectorAll('img.benefit-ico');
    const cardNames: string[] = [];

    cardIcons.forEach((icon) => {
      const src = icon.getAttribute('src');

      if (src) {
        // src URL에서 카드사명 추출 (예: shinhan@2x.png → 신한)
        const cardName = this.extractCardNameFromUrl(src);
        if (cardName) {
          cardNames.push(cardName);
        }
      }
    });

    // 3. 혜택 텍스트 추출
    const benefitText = benefitBadge.querySelector('.benefit-label')?.textContent?.trim();
    const woowonOnly = benefitBadge.querySelector('.benefit-label-highlight')?.textContent?.trim();

    if (benefitText) {
      // "최대 1% 즉시할인" 형태
      const rate = this.extractPercentage(benefitText);

      // 모든 카드사를 하나의 혜택으로 통합
      const displayCards = cardNames.length > 0
        ? `${cardNames.slice(0, 3).join(', ')}${cardNames.length > 3 ? ' 외' : ''}`
        : '쿠팡 파트너 카드';

      benefits.push({
        cardName: displayCards,
        benefit: `${benefitText}${woowonOnly ? ` (${woowonOnly})` : ''}`,
        rate: rate,
      });

      console.log('[CoupangParser] ✅ Card benefit extracted:', {
        cards: displayCards,
        benefit: benefitText,
        rate: rate,
      });
    }

    return benefits;
  }

  /**
   * URL에서 카드사명 추출
   * 예: shinhan@2x.png → "신한카드"
   */
  private extractCardNameFromUrl(url: string): string | null {
    const cardMapping: { [key: string]: string } = {
      'shinhan': '신한카드',
      'woori': '우리카드',
      'bc': 'BC카드',
      'lotte': '롯데카드',
      'kb': 'KB국민카드',
      'nh': 'NH농협카드',
      'samsung': '삼성카드',
      'hana-sk': '하나SK카드',
    };

    for (const [key, value] of Object.entries(cardMapping)) {
      if (url.includes(key)) {
        return value;
      }
    }

    return null;
  }

  /**
   * 텍스트에서 퍼센티지 추출
   * 예: "최대 1% 즉시할인" → 1
   */
  private extractPercentage(text: string): number | undefined {
    const match = text.match(/(\d+(?:\.\d+)?)\s*%/);
    return match ? parseFloat(match[1]) : undefined;
  }

  /**
   * 배송정보 추출
   */
  private extractShippingInfo(doc: Document): string | null {
    const shippingEl = doc.querySelector('[class*="shipping"]');
    return shippingEl?.textContent?.trim() || null;
  }

  /**
   * DOM 전체 탐색 (TreeWalker로 "원" 포함 텍스트 찾기)
   */
  private findPriceInDOM(doc: Document): number | null {
    const pricePattern = /(\d{1,3}(?:,\d{3})*)\s*원/;
    // BaseParser의 searchPriceInDOM 사용
    const matchedText = this.searchPriceInDOM(doc, pricePattern);

    if (matchedText) {
      const match = matchedText.match(pricePattern);
      if (match) {
        console.log(`[CoupangParser] Found price via TreeWalker: "${match[1]}원"`);
        return this.extractNumber(match[1]);
      }
    }

    return null;
  }

  /**
   * 기프트카드 할인 추출
   *
   * HTML 예시:
   * <div>기프트카드 60% 적용 시</div>
   */
  private extractGiftCardDiscount(doc: Document): { rate: number; description: string } | null {
    // 1. 텍스트 기반 검색: "기프트카드" 포함 섹션
    const allText = doc.body.innerText;
    const giftCardMatch = allText.match(/기프트카드\s*(\d+)\s*%/);

    if (giftCardMatch) {
      const rate = parseInt(giftCardMatch[1], 10);
      return {
        rate,
        description: `기프트카드 ${rate}% 할인`,
      };
    }

    // 2. DOM 탐색: 특정 요소 찾기
    const sections = doc.querySelectorAll('div, span, p');
    for (const section of sections) {
      const text = section.textContent || '';
      if (text.includes('기프트카드') && text.includes('%')) {
        const rateMatch = text.match(/(\d+)\s*%/);
        if (rateMatch) {
          const rate = parseInt(rateMatch[1], 10);
          return {
            rate,
            description: text.trim(),
          };
        }
      }
    }

    return null;
  }

  /**
   * 쿠팡캐시 적립 추출
   *
   * HTML 예시:
   * <span>최대 16,086원</span>
   * <span>쿠팡캐시 적립</span>
   */
  private extractCashback(doc: Document): { amount: number; description: string } | null {
    // 1. "쿠팡캐시" 관련 섹션 찾기
    const cashbackSections = doc.querySelectorAll('[class*="cashback"], [class*="적립"]');

    for (const section of cashbackSections) {
      const text = section.textContent || '';

      // "최대 16,086원" 형태의 금액 추출
      const amountMatch = text.match(/(\d{1,3}(?:,\d{3})*)\s*원/);

      if (amountMatch && text.includes('쿠팡캐시')) {
        const amount = this.extractNumber(amountMatch[1]);
        if (amount) {
          return {
            amount,
            description: `쿠팡캐시 ${amount.toLocaleString()} 원 적립`,
          };
        }
      }
    }

    // 2. 텍스트 기반 검색
    const allText = doc.body.innerText;
    const cashbackMatch = allText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);

    if (cashbackMatch) {
      const amount = this.extractNumber(cashbackMatch[1]);
      if (amount) {
        return {
          amount,
          description: `쿠팡캐시 ${amount.toLocaleString()} 원 적립`,
        };
      }
    }

    return null;
  }

  /**
   * 상품 이미지 추출
   * 
   * Coupang 상품 페이지의 메인 이미지 추출
   * 선택자: img[alt*="상품"], .product-image 등
   */
  private extractProductImage(doc: Document): string | null {
    try {
      // 1. img.twc-w-full.twc-max-h-[546px] 직접 선택
      const mainImage = doc.querySelector('img.twc-w-full.twc-max-h-\\[546px\\]') as HTMLImageElement;

      if (mainImage?.src) {
        let src = mainImage.src;
        if (src.startsWith('//')) src = 'https:' + src;
        src = src.split('?')[0];
        console.log('[CoupangParser] Main product image from direct selector:', src.substring(0, 100));
        return src;
      }

      // 2. 썸네일 갤러리의 첫 번째 이미지 (Fallback)
      const thumbnailContainer = doc.querySelector('div.twc-w-\\[70px\\]');

      if (thumbnailContainer) {
        const firstThumbnail = thumbnailContainer.querySelector('ul > li:first-child img');

        if (firstThumbnail) {
          let src = (firstThumbnail as HTMLImageElement).src;

          if (src) {
            if (src.startsWith('//')) {
              src = 'https:' + src;
            }

            // 48x48ex → 800x800ex로 변환
            if (src.includes('thumbnails/remote/')) {
              src = src.replace(/thumbnails\/remote\/\d+x\d+ex/, 'thumbnails/remote/800x800ex');
            }

            src = src.split('?')[0];

            console.log('[CoupangParser] Main product image from gallery:', src.substring(0, 100));
            return src;
          }
        }
      }

      console.log('[CoupangParser] No main product image found');
      return null;
    } catch (err) {
      console.error('[CoupangParser] Error extracting main image:', err);
      return null;
    }
  }

  private extractAllProductImages(doc: Document): string[] {
    try {
      const images: string[] = [];
      const seen = new Set<string>();

      // 전략: 썸네일 갤러리에서 모든 슬라이드 이미지 추출
      // 쿠팡은 보통 div.twc-w-[70px] 안에 작은 썸네일들을 나열하고
      // 각 썸네일은 같은 이미지의 48x48 버전 또는 70x70 버전임

      const thumbnailContainer = doc.querySelector('div.twc-w-\\[70px\\]');

      if (thumbnailContainer) {
        // 모든 썸네일 리스트 아이템에서 이미지 추출
        const allThumbnails = thumbnailContainer.querySelectorAll('ul > li img');
        console.log('[CoupangParser] Thumbnail gallery found with', allThumbnails.length, 'items');

        for (const el of allThumbnails) {
          const imgEl = el as HTMLImageElement;
          let src = imgEl.src;

          if (!src) continue;
          if (seen.has(src)) continue;

          if (src.startsWith('//')) {
            src = 'https:' + src;
          }

          // 쿠팡 썸네일: thumbnails/remote/48x48ex 또는 70x70ex 형태
          // 이를 큰 버전 800x800ex로 변환하여 슬라이드용으로 사용
          if (src.includes('thumbnails/remote/')) {
            // 48x48ex, 70x70ex 등을 800x800ex로 변환
            src = src.replace(/thumbnails\/remote\/\d+x\d+ex/, 'thumbnails/remote/800x800ex');
          }

          src = src.split('?')[0]; // 쿼리 파라미터 제거

          if (seen.has(src)) continue;

          images.push(src);
          seen.add(src);
          console.log('[CoupangParser] Added slide image:', src.substring(0, 100));

          if (images.length >= 10) break; // 최대 10장
        }
      }

      console.log('[CoupangParser] Total product slide images collected:', images.length);
      return images;
    } catch (err) {
      console.error('[CoupangParser] Error extracting all images:', err);
      return [];
    }
  }

  /**
   * 다른 구성 (색상, 크기, 옵션별 다른 가격) 추출
   */
  private extractVariants(doc: Document): Array<{ name: string; price: number; discount?: string }> {
    try {
      const variants: Array<{ name: string; price: number; discount?: string }> = [];
      const seen = new Set<string>();

      // .instant-option 클래스 찾기 (다른 구성 보기 섹션)
      const instantOption = doc.querySelector('.instant-option');
      if (!instantOption) {
        console.log('[CoupangParser] No .instant-option found');
        return variants;
      }

      console.log('[CoupangParser] Found .instant-option section');

      // section > ul > li 아이템 추출
      const listItems = instantOption.querySelectorAll('section > ul > li');
      console.log('[CoupangParser] List items in instant-option:', listItems.length);

      for (const li of listItems) {
        try {
          // 각 li 내에서 옵션명과 가격 추출
          // 첫 번째 div (옵션명): "512GB", "1TB", "WIN11 Home" 등
          // 두 번째 div (가격): "339,620원" 등

          const divs = li.querySelectorAll('div');
          if (divs.length < 2) continue;

          // 옵션명 찾기
          let name = '';
          for (const div of divs) {
            const text = div.textContent || '';
            // 가격이 아닌 텍스트 찾기
            if (!text.includes('원') && text.trim().length > 0 && !text.includes('px')) {
              name = text.trim();
              break;
            }
          }

          // 가격 찾기
          let priceStr = '';
          for (const div of divs) {
            const text = div.textContent || '';
            const match = text.match(/[\d,]+원/);
            if (match) {
              priceStr = match[0].replace(/[,원]/g, '');
              break;
            }
          }

          if (!priceStr) continue;

          const price = parseInt(priceStr);
          if (!price || price < 100) continue;

          if (!name || name.length < 2) continue;

          const key = `${name}-${price}`;
          if (seen.has(key)) continue;

          variants.push({ name, price });
          seen.add(key);
          console.log(`[CoupangParser] Added variant: ${name} - ₩${price.toLocaleString()}`);

          if (variants.length >= 15) break;
        } catch (err) {
          console.warn('[CoupangParser] Error parsing list item:', err);
          continue;
        }
      }

      console.log('[CoupangParser] Total variants extracted:', variants.length);
      return variants;
    } catch (err) {
      console.error('[CoupangParser] Error extracting variants:', err);
      return [];
    }
  }
}
