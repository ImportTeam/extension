/**
 * G마켓 Parser (gmarket.co.kr)
 * 책임: G마켓 상품 페이지 파싱
 */

import { BaseParser } from '../base';
import { ParsedProductInfo } from '../../../shared/types';
import { GMARKET_SELECTORS, GMARKET_URL_PATTERNS } from './constants';
import * as Product from './modules/product';
import * as Price from './modules/price';
import * as Benefits from './modules/benefits';
import * as AdditionalBenefits from './modules/additionalBenefits';
import * as Shipping from './modules/shipping';
import { normalizeAndSortCardBenefits, deduplicateCardBenefits } from '../cardBenefitCalculator';

export class GmarketParser extends BaseParser {
  readonly siteName = 'Gmarket';

  readonly selectors = {
    amount: [
      GMARKET_SELECTORS.price.discountPrice,
      GMARKET_SELECTORS.price.salePrice,
      GMARKET_SELECTORS.price.originalPrice,
    ],
  };

  /**
   * G마켓 상품 페이지인지 확인
   */
  static isCheckoutPage(url: string): boolean {
    const patterns = GMARKET_URL_PATTERNS;
    const isCheckout =
      patterns.productPage.test(url) ||
      patterns.vipPage.test(url) ||
      patterns.generalProduct.test(url);

    console.log(`[GmarketParser] isCheckoutPage("${url}") = ${isCheckout}`);
    return isCheckout;
  }

  /**
   * G마켓 상품 페이지 파싱
   */
  parse(doc: Document): ParsedProductInfo | null {
    try {
      console.log('[GmarketParser] 🔍 Parsing Gmarket page...');

      // 1. 상품명 & 이미지
      const title = Product.extractTitle(doc);
      const imageUrl = Product.extractProductImage(doc);
      const images = Product.extractAllProductImages(doc);
      const sellerInfo = Product.extractSellerInfo(doc);

      // 2. 가격
      const priceResult = Price.extractPrices(doc);
      let amount = priceResult.amount;

      if (!amount) {
        amount = Price.findPriceInDOM(doc);
      }

      if (!amount) {
        console.debug('[GmarketParser] ❌ No price found');
        return null;
      }

      // 3. 카드 혜택 - 공통 유틸리티 사용
      const rawCardBenefits = Benefits.extractCardBenefits(doc);
      const normalizedBenefits = normalizeAndSortCardBenefits(rawCardBenefits, amount);
      const cardBenefits = deduplicateCardBenefits(normalizedBenefits);

      // 4. 추가 혜택 (신세계포인트 등)
      const additionalBenefits = AdditionalBenefits.extractAdditionalBenefits(doc);
      const cashback = AdditionalBenefits.extractCashback(doc);

      // 5. 배송 정보
      const shippingInfo = Shipping.extractShippingInfo(doc);

      console.log(`[GmarketParser] ✅ Found: ${amount} KRW, Cards: ${cardBenefits.length}`);

      return {
        price: amount,
        amount,
        currency: 'KRW',
        title: title || undefined,
        imageUrl: imageUrl || undefined,
        images,
        variants: [],
        originalPrice: priceResult.originalPrice || undefined,
        discountPrice: priceResult.discountPrice || undefined,
        cardBenefits,
        additionalBenefits: additionalBenefits.length > 0 ? additionalBenefits : undefined,
        cashback: cashback || undefined,
        shippingInfo: shippingInfo || undefined,
        sellerInfo: sellerInfo || undefined,
        discounts: [],
      };
    } catch (error) {
      console.error('[GmarketParser] ❌ Parse error:', error);
      return null;
    }
  }
}
