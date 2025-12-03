/**
 * 11번가 Parser (11st.co.kr)
 * 책임: 11번가 상품 페이지 파싱
 */

import { BaseParser } from '../base/index';
import { ParsedProductInfo } from '../../../shared/types';
import { ELEVEN_ST_SELECTORS, ELEVEN_ST_URL_PATTERNS, ELEVEN_ST_CONSTANTS } from './constants';
import * as Product from './modules/product';
import * as Price from './modules/price';
import * as Benefits from './modules/benefits';
import { formatCardBenefits } from './helpers/formatCardBenefits';

export class ElevenStreetParser extends BaseParser {
  readonly siteName = ELEVEN_ST_CONSTANTS.siteName;

  readonly selectors = {
    amount: [
      ELEVEN_ST_SELECTORS.price.salePrice,
      ELEVEN_ST_SELECTORS.price.salePriceAlt,
      ELEVEN_ST_SELECTORS.price.maxDiscountPrice,
    ],
    title: [
      ELEVEN_ST_SELECTORS.product.title,
      ELEVEN_ST_SELECTORS.product.titleAlt,
    ],
    image: [
      ELEVEN_ST_SELECTORS.image.main,
      ELEVEN_ST_SELECTORS.image.mainAlt,
    ],
  };

  /**
   * 11번가 상품 페이지인지 확인
   */
  static isProductPage(url: string): boolean {
    const isProduct = ELEVEN_ST_URL_PATTERNS.some(pattern => pattern.test(url));
    console.log(`[ElevenStreetParser] isProductPage("${url}") = ${isProduct}`);
    return isProduct;
  }

  /**
   * URL에서 상품 ID 추출
   */
  static extractProductId(url: string): string | null {
    return Product.extractProductId(url);
  }

  /**
   * 상품 페이지 파싱
   */
  parse(doc: Document): ParsedProductInfo | null {
    try {
      console.log('[ElevenStreetParser] 🔍 Parsing 11번가 page...');

      // 1. 상품명 & 이미지
      const title = Product.extractTitle(doc);
      const subtitle = Product.extractSubtitle(doc);
      const imageUrl = Product.extractProductImage(doc);
      const images = Product.extractAllProductImages(doc);
      const sellerInfo = Product.extractSellerInfo(doc);

      // 2. 가격 정보
      const priceResult = Price.extractPrices(doc);
      let amount = priceResult.amount;
      const { originalPrice, discountPrice, maxDiscountPrice, discountRate, maxDiscountRate } = priceResult;

      // 가격이 없으면 DOM에서 추가 검색
      if (!amount) {
        amount = Price.findPriceInDOM(doc);
      }

      if (!amount) {
        console.debug('[ElevenStreetParser] ❌ No price found');
        return null;
      }

      // 할인 상세 정보
      const discountDetails = Price.extractDiscountDetails(doc);

      // 3. 혜택 정보
      const benefitsResult = Benefits.extractBenefits(doc);
      const { points, cardBenefits, installments, coupons, totalPointAmount, totalCardBenefitAmount, maxInstallmentMonths } = benefitsResult;

      // CardBenefits를 ParsedProductInfo 형식에 맞게 변환
      const formattedCardBenefits = formatCardBenefits(cardBenefits, installments);

      // Discounts 배열 생성
      const discounts: Array<{ rate: number; type: string; description?: string }> = [];
      
      if (discountRate) {
        discounts.push({
          rate: discountRate,
          type: 'SALE_DISCOUNT',
          description: '할인가',
        });
      }

      discountDetails.forEach(detail => {
        discounts.push({
          rate: detail.amount,
          type: detail.type.toUpperCase().replace(/\s+/g, '_'),
          description: detail.type,
        });
      });

      console.log(`[ElevenStreetParser] ✅ Found: ${amount.toLocaleString()} ${ELEVEN_ST_CONSTANTS.currency}`);
      console.log(`[ElevenStreetParser] 📌 Title: ${title}`);
      console.log(`[ElevenStreetParser] 🎁 총 포인트: ${totalPointAmount.toLocaleString()}P`);
      console.log(`[ElevenStreetParser] 💳 카드 혜택 수: ${cardBenefits.length}`);
      console.log(`[ElevenStreetParser] 🏦 무이자 할부 카드 수: ${installments.length}, 최대 ${maxInstallmentMonths}개월`);

      return {
        price: amount,
        amount,
        currency: ELEVEN_ST_CONSTANTS.currency,
        title: title ? `${title}${subtitle ? ` ${subtitle}` : ''}` : undefined,
        imageUrl: imageUrl || undefined,
        images,
        originalPrice: originalPrice || undefined,
        discountPrice: discountPrice || maxDiscountPrice || undefined,
        discountRate: discountRate || undefined,
        cardBenefits: formattedCardBenefits,
        discounts,
        // @ts-expect-error: Extended fields for 11st
        elevenst: {
          maxDiscountPrice,
          maxDiscountRate,
          maxInstallmentMonths,
          points,
          installments,
          coupons,
          totalPointAmount,
          totalCardBenefitAmount,
          seller: sellerInfo.seller,
          sellerRating: sellerInfo.rating,
          discountDetails,
        },
      };
    } catch (error) {
      console.error('[ElevenStreetParser] ❌ Parse error:', error);
      return null;
    }
  }
}
