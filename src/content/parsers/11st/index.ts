/**
 * 11번가 Parser (11st.co.kr)
 */

import { BaseParser } from '../base/index';
import { ParsedProductInfo } from '../../../shared/types';
import { ELEVEN_ST_SELECTORS, ELEVEN_ST_URL_PATTERNS, ELEVEN_ST_CONSTANTS } from './constants';
import * as Product from './modules/product';
import * as Price from './modules/price';
import * as Benefits from './modules/benefits';

/**
 * 카드명 정규화 함수
 * '11번가 신한카드' → '신한카드'
 * '11번가 신한 신용카드' → '신한카드'
 */
function normalizeCardName(cardName: string): string {
  // '11번가' 제거
  let normalized = cardName.replace(/11번가\s*/g, '').trim();
  
  // '신용카드', '체크카드' → '카드'로 통일
  normalized = normalized
    .replace(/\s*신용카드/g, '카드')
    .replace(/\s*체크카드/g, '카드');
  
  // 특정 카드사 매핑 (정확한 이름으로 정규화)
  const cardMapping: Array<{ keywords: string[]; name: string }> = [
    { keywords: ['신한', 'SHINHAN'], name: '신한카드' },
    { keywords: ['KB', '국민', '케이비'], name: 'KB국민카드' },
    { keywords: ['현대', 'HYUNDAI'], name: '현대카드' },
    { keywords: ['삼성', 'SAMSUNG'], name: '삼성카드' },
    { keywords: ['롯데', 'LOTTE'], name: '롯데카드' },
    { keywords: ['하나', 'HANA'], name: '하나카드' },
    { keywords: ['우리', 'WOORI'], name: '우리카드' },
    { keywords: ['농협', 'NH'], name: 'NH농협카드' },
    { keywords: ['BC', '비씨'], name: 'BC카드' },
    { keywords: ['씨티', 'CITI'], name: '씨티카드' },
  ];
  
  for (const { keywords, name } of cardMapping) {
    for (const keyword of keywords) {
      if (normalized.toUpperCase().includes(keyword.toUpperCase())) {
        return name;
      }
    }
  }
  
  // 매핑이 없으면 정규화된 이름 반환
  return normalized || cardName;
}

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
      // 포인트/적립 혜택은 rate=0으로 설정하여 할인율 계산 방지
      const formattedCardBenefits = cardBenefits.map(cb => {
        const normalizedName = normalizeCardName(cb.cardName);
        const isPointBenefit = cb.benefitType === '적립' || cb.benefitType === '포인트';
        const isDiscountBenefit = cb.benefitType === '할인';
        
        // 할인 혜택: rate로 계산 (단, 100% 이하만)
        // 포인트 혜택: rate=0, 별도 표시
        let rate = 0;
        if (isDiscountBenefit && cb.benefitAmount <= 100) {
          rate = cb.benefitAmount;
        } else if (!isPointBenefit && cb.benefitAmount <= 100) {
          rate = cb.benefitAmount;
        }
        
        return {
          card: normalizedName,
          cardName: normalizedName,
          benefit: cb.benefitType === '할인' 
            ? `${cb.benefitAmount.toLocaleString()}원 ${cb.benefitType}`
            : cb.benefitType === '적립' && cb.benefitAmount < 100
              ? `${cb.benefitAmount}% ${cb.benefitType}`
              : `${cb.benefitAmount.toLocaleString()}P ${cb.benefitType}`,
          discount: isDiscountBenefit ? cb.benefitAmount : 0,
          rate,
          condition: cb.condition,
          benefitType: isPointBenefit ? 'point' : isDiscountBenefit ? 'discount' : 'other',
          pointAmount: isPointBenefit ? cb.benefitAmount : 0,
        };
      });

      // 무이자 할부 정보를 카드 혜택에 추가 (요약 정보 제외)
      installments.forEach(inst => {
        // '__INSTALLMENT_SUMMARY__'는 요약 정보이므로 제외
        if (inst.cardName === '__INSTALLMENT_SUMMARY__') return;
        
        formattedCardBenefits.push({
          card: normalizeCardName(inst.cardName),
          cardName: normalizeCardName(inst.cardName),
          benefit: `${inst.months} 무이자`,
          discount: 0,
          rate: 0, // 무이자 할부는 rate를 0으로 설정 (할인율 계산 방지)
          condition: inst.condition,
          benefitType: 'installment', // 할부 타입 명시
          pointAmount: 0,
        });
      });

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
        // 11번가 특화 정보 (확장 필드로 추가 가능)
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
