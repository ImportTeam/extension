/**
 * Coupang Parser (완전한 데이터 추출)
 */

import { BaseParser } from '../base/index';
import { ParsedProductInfo } from '../../../shared/types';
import { COUPANG_SELECTORS } from './constants';
import * as Product from './modules/product';
import * as Price from './modules/price';
import * as Benefits from './modules/benefits';
import * as Variants from './modules/variants';
import * as Shipping from './modules/shipping';

export class CoupangParser extends BaseParser {
  readonly siteName = 'Coupang';

  readonly selectors = {
    amount: COUPANG_SELECTORS.amount,
  };

  static isCheckoutPage(url: string): boolean {
    const isCheckout = /coupang\.com\/vp\//.test(url) || /coupang\.com\/n\//.test(url) || /coupang\.com\/products\//.test(url);
    console.log(`[CoupangParser] isCheckoutPage("${url}") = ${isCheckout}`);
    return isCheckout;
  }

  parse(doc: Document): ParsedProductInfo | null {
    try {
      console.log('[CoupangParser] 🔍 Parsing Coupang page...');

      // 1. 상품명 & 이미지
      const title = Product.extractTitle(doc);
      const imageUrl = Product.extractProductImage(doc);
      const images = Product.extractAllProductImages(doc);

      // 2. 가격
      const priceResult = Price.extractPrices(doc);
      let amount = priceResult.amount;
      const { originalPrice, discountPrice } = priceResult;

      if (!amount) {
        amount = Price.findPriceInDOM(doc);
      }

      if (!amount) {
        // Try element scan fallback
        amount = Price.findPriceByElementScan(doc);
      }

      if (!amount) {
        console.debug('[CoupangParser] ❌ No price found');
        return null;
      }

      // 3. 혜택
      const cardBenefits = Benefits.extractCardBenefits(doc).map(b => ({
        card: b.cardName,
        benefit: b.benefit,
        discount: b.rate
      }));

      const giftCardDiscount = Benefits.extractGiftCardDiscount(doc);
      const cashback = Benefits.extractCashback(doc);

      // 4. 배송 & 옵션
      const shippingInfo = Shipping.extractShippingInfo(doc);
      const variants = Variants.extractVariants(doc);

      console.log(`[CoupangParser] ✅ Found: ${amount} KRW`);

      return {
        price: amount,
        amount,
        currency: 'KRW',
        title: title || undefined,
        imageUrl: imageUrl || undefined,
        images,
        variants,
        originalPrice: originalPrice || undefined,
        discountPrice: discountPrice || undefined,
        cardBenefits,
        giftCardDiscount: giftCardDiscount || undefined,
        cashback: cashback || undefined,
        shippingInfo: shippingInfo || undefined,
        discounts: [],
      };
    } catch (error) {
      console.error('[CoupangParser] ❌ Parse error:', error);
      return null;
    }
  }
}
