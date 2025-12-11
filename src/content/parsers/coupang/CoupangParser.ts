/**
 * Coupang Parser (coupang.com)
 * 책임: 쿠팡 상품 페이지 파싱
 */

import { BaseParser } from '../base/index';
import { ParsedProductInfo } from '../../../shared/types';
import { COUPANG_SELECTORS } from './constants';
import * as Product from './modules/product';
import * as Price from './modules/price';
import * as Benefits from './modules/benefits';
import * as Variants from './modules/variants';
import * as Shipping from './modules/shipping';
import { normalizeAndSortCardBenefits, deduplicateCardBenefits } from '../cardBenefitCalculator';
import { parseLog, ErrorCode } from '../../../shared/utils/logger';

export class CoupangParser extends BaseParser {
  readonly siteName = 'Coupang';

  readonly selectors = {
    amount: COUPANG_SELECTORS.amount,
  };

  /**
   * 쿠팡 상품 페이지인지 확인
   * 전략: 도메인 기반 - 명확히 상품이 아닌 페이지만 제외
   */
  static isCheckoutPage(url: string): boolean {
    // 1. 쿠팡 도메인 체크
    if (!/coupang\.com/.test(url)) {
      return false;
    }

    // 2. 제외 패턴 (상품 페이지가 아닌 것)
    const excludePatterns = [
      /coupang\.com\/?$/,                    // 홈페이지
      /coupang\.com\/np\/categories/,        // 카테고리 목록
      /coupang\.com\/np\/search/,            // 검색 결과
      /coupang\.com\/np\/campaigns/,         // 캠페인 목록
      /coupang\.com\/np\/cart/,              // 장바구니
      /coupang\.com\/np\/checkout/,          // 체크아웃
      /coupang\.com\/my\//,                  // 마이페이지
      /coupang\.com\/np\/login/,             // 로그인
      /coupang\.com\/np\/register/,          // 회원가입
    ];

    const isExcluded = excludePatterns.some(pattern => pattern.test(url));
    const isCheckout = !isExcluded;
    parseLog.debug(`isCheckoutPage("${url}") = ${isCheckout}`);
    return isCheckout;
  }

  /**
   * 상품 페이지 파싱
   */
  parse(doc: Document): ParsedProductInfo | null {
    try {
      parseLog.info('🔍 Parsing Coupang page...');

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
        amount = Price.findPriceByElementScan(doc);
      }

      if (!amount) {
        parseLog.debug('❌ No price found');
        return null;
      }

      // 3. 카드 혜택 - 공통 유틸리티 사용
      const rawCardBenefits = Benefits.extractCardBenefits(doc);
      const normalizedBenefits = normalizeAndSortCardBenefits(rawCardBenefits, amount);
      const cardBenefits = deduplicateCardBenefits(normalizedBenefits);

      const giftCardDiscount = Benefits.extractGiftCardDiscount(doc);
      const cashback = Benefits.extractCashback(doc);

      // 4. 배송 & 옵션
      const shippingInfo = Shipping.extractShippingInfo(doc);
      const variants = Variants.extractVariants(doc);

      parseLog.info(`✅ Found: ${amount} KRW, Cards: ${cardBenefits.length}`);

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
      parseLog.error(ErrorCode.PAR_E001, 'Coupang parse error', {
        error: error instanceof Error ? error : new Error(String(error)),
      });
      return null;
    }
  }
}
