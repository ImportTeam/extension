/**
 * 11번가 Parser (11st.co.kr)
 * 책임: 11번가 상품 페이지 파싱
 */

import { BaseParser } from '../base/index';
import { ParsedProductInfo } from '../../../shared/types';
import { ELEVEN_ST_SELECTORS, ELEVEN_ST_CONSTANTS } from './constants';
import * as Product from './modules/product';
import * as Price from './modules/price';
import * as Benefits from './modules/benefits';
import * as SelectedOptions from './modules/selectedOptions';
import { formatCardBenefits } from './helpers/formatCardBenefits';
import { parseLog, ErrorCode } from '../../../shared/utils/logger';

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
   * 전략: 도메인 기반 - 명확히 상품이 아닌 페이지만 제외
   */
  static isProductPage(url: string): boolean {
    // 1. 11번가 도메인 체크 (PC + 모바일)
    if (!/11st\.co\.kr/.test(url)) {
      return false;
    }

    // 2. 제외 패턴 (상품 페이지가 아닌 것)
    const excludePatterns = [
      /11st\.co\.kr\/?$/,                    // 홈페이지
      /11st\.co\.kr\/category/,              // 카테고리 목록
      /11st\.co\.kr\/search/,                // 검색 결과
      /11st\.co\.kr\/browsing/,              // 브라우징
      /11st\.co\.kr\/best/,                  // 베스트 상품 목록
      /11st\.co\.kr\/event$/,                // 이벤트 목록
      /11st\.co\.kr\/cart/,                  // 장바구니
      /11st\.co\.kr\/order/,                 // 주문
      /11st\.co\.kr\/my11st/,                // 마이페이지
      /11st\.co\.kr\/login/,                 // 로그인
      /11st\.co\.kr\/member/,                // 회원 관련
    ];

    const isExcluded = excludePatterns.some(pattern => pattern.test(url));
    const isProduct = !isExcluded;
    parseLog.debug(`isProductPage("${url}") = ${isProduct}`);
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
      parseLog.info('🔍 Parsing 11번가 page...');

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
        parseLog.debug('❌ No price found');
        return null;
      }

      // 할인 상세 정보
      const discountDetails = Price.extractDiscountDetails(doc);

      // 3. 혜택 정보
      const benefitsResult = Benefits.extractBenefits(doc);
      const { points, cardBenefits, installments, coupons, totalPointAmount, totalCardBenefitAmount, maxInstallmentMonths } = benefitsResult;

      // CardBenefits를 ParsedProductInfo 형식에 맞게 변환
      const formattedCardBenefits = formatCardBenefits(cardBenefits, installments);

      // 4. 선택된 옵션
      const selectedOptions = SelectedOptions.extractSelectedOptions(doc);

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

      parseLog.info(`✅ Found: ${amount.toLocaleString()} ${ELEVEN_ST_CONSTANTS.currency}`);
      parseLog.debug('파싱 결과', {
        title,
        totalPointAmount,
        cardBenefitsCount: cardBenefits.length,
        installmentsCount: installments.length,
        maxInstallmentMonths,
        selectedOptionsCount: selectedOptions.length,
      });

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
        selectedOptions: selectedOptions.length > 0 ? selectedOptions : undefined,
        discounts,
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
      parseLog.error(ErrorCode.PAR_E001, '11st parse error', {
        error: error instanceof Error ? error : new Error(String(error)),
      });
      return null;
    }
  }
}
