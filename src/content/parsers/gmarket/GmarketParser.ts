/**
 * G마켓 Parser (gmarket.co.kr)
 * 책임: G마켓 상품 페이지 파싱
 */

import { BaseParser } from '../base';
import { ParsedProductInfo } from '../../../shared/types';
import { GMARKET_SELECTORS } from './constants';
import * as Product from './modules/product';
import * as Price from './modules/price';
import * as Benefits from './modules/benefits';
import * as AdditionalBenefits from './modules/additionalBenefits';
import * as Shipping from './modules/shipping';
import * as SelectedOptions from './modules/selectedOptions';
import { normalizeAndSortCardBenefits, deduplicateCardBenefits } from '../cardBenefitCalculator';
import { parserLog, ErrorCode } from '../../../shared/utils/logger';

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
   * 전략: 도메인 기반 - 명확히 상품이 아닌 페이지만 제외
   */
  static isCheckoutPage(url: string): boolean {
    // 1. G마켓 도메인 체크
    if (!/gmarket\.co\.kr/.test(url)) {
      return false;
    }

    // 2. 제외 패턴 (상품 페이지가 아닌 것)
    const excludePatterns = [
      /gmarket\.co\.kr\/?$/,                 // 홈페이지
      /gmarket\.co\.kr\/n\/category/,        // 카테고리 목록
      /gmarket\.co\.kr\/n\/search/,          // 검색 결과
      /gmarket\.co\.kr\/n\/best$/,           // 베스트 목록
      /gmarket\.co\.kr\/n\/deals$/,          // 딜 목록
      /gmarket\.co\.kr\/n\/event$/,          // 이벤트 목록
      /gmarket\.co\.kr\/cart/,               // 장바구니
      /gmarket\.co\.kr\/order/,              // 주문
      /gmarket\.co\.kr\/my/,                 // 마이페이지
      /gmarket\.co\.kr\/login/,              // 로그인
      /gmarket\.co\.kr\/join/,               // 회원가입
    ];

    const isExcluded = excludePatterns.some(pattern => pattern.test(url));
    const isCheckout = !isExcluded;
    parserLog.debug(`isCheckoutPage check`, { url, isCheckout });
    return isCheckout;
  }

  /**
   * G마켓 상품 페이지 파싱
   */
  parse(doc: Document): ParsedProductInfo | null {
    try {
      parserLog.info('Parsing Gmarket page...');

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
        parserLog.warn('No price found in Gmarket page');
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

      // 6. 선택된 옵션
      const selectedOptions = SelectedOptions.extractSelectedOptions(doc);

      parserLog.info('Parse successful', { amount, cardCount: cardBenefits.length, selectedOptionsCount: selectedOptions.length });

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
        selectedOptions: selectedOptions.length > 0 ? selectedOptions : undefined,
        discounts: [],
      };
    } catch (error) {
      parserLog.error(ErrorCode.PAR_E002, 'Gmarket parse error', {
        error: error instanceof Error ? error : new Error(String(error)),
      });
      return null;
    }
  }
}
