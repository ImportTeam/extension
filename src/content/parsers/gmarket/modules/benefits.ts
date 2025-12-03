/**
 * G마켓 카드 혜택 추출 모듈
 * 책임: 제휴카드 정보, 결제 할인 정보 추출
 */

import { GMARKET_SELECTORS } from '../constants';

interface CardBenefitDetail {
  card: string;
  cardName?: string;
  benefit: string;
  discount?: number;
  rate?: number;
  imageUrl?: string;
}

interface PaymentDiscount {
  title: string;
  description: string;
  discountPrice?: number;
}

/**
 * G마켓 제휴카드 정보 추출
 * #tooltip_gmarketcard에서 카드 정보 가져오기
 */
export const extractPartnerCards = (doc: Document): CardBenefitDetail[] => {
  const benefits: CardBenefitDetail[] = [];
  const selectors = GMARKET_SELECTORS.cardBenefit;

  // 제휴카드 컨테이너 찾기
  const container = doc.querySelector(selectors.container);
  if (!container) {
    console.log('[GmarketParser] 제휴카드 컨테이너를 찾을 수 없음');
    return benefits;
  }

  // 제휴카드 이미지들 추출
  const cardImages = container.querySelectorAll('.gmarketcard_area img');
  
  cardImages.forEach((img) => {
    const imgEl = img as HTMLImageElement;
    const src = imgEl.src;
    const alt = imgEl.alt || '';
    
    if (src) {
      // 이미지 URL에서 카드명 추론
      let cardName = alt;
      if (!cardName) {
        if (src.includes('smile') || src.includes('Smile')) {
          cardName = '스마일카드';
        } else if (src.includes('samsung')) {
          cardName = '삼성카드';
        } else {
          cardName = 'G마켓 제휴카드';
        }
      }

      benefits.push({
        card: cardName,
        cardName: cardName,
        benefit: 'G마켓 제휴카드 혜택',
        imageUrl: src,
      });

      console.log('[GmarketParser] 제휴카드:', cardName, src);
    }
  });

  return benefits;
};

/**
 * 결제 할인 정보 추출
 * .box__discount-item에서 카드별 할인 정보 가져오기
 */
export const extractPaymentDiscounts = (doc: Document): PaymentDiscount[] => {
  const discounts: PaymentDiscount[] = [];
  const selectors = GMARKET_SELECTORS.cardBenefit;

  const discountItems = doc.querySelectorAll(selectors.discountItem);
  
  discountItems.forEach((item) => {
    const titleEl = item.querySelector(selectors.discountItemTitle);
    const descEl = item.querySelector(selectors.discountItemDesc);
    const priceEl = item.querySelector(selectors.discountItemPrice);

    const title = titleEl?.textContent?.trim() || '';
    const description = descEl?.textContent?.trim() || '';
    
    let discountPrice: number | undefined;
    if (priceEl?.textContent) {
      const priceMatch = priceEl.textContent.match(/(\d{1,3}(?:,\d{3})*)/);
      if (priceMatch) {
        discountPrice = parseInt(priceMatch[1].replace(/,/g, ''), 10);
      }
    }

    if (title) {
      discounts.push({
        title,
        description,
        discountPrice,
      });

      console.log('[GmarketParser] 결제 할인:', title, description);
    }
  });

  return discounts;
};

/**
 * 전체 카드 혜택 추출
 * 제휴카드 + 결제 할인 정보 통합
 */
export const extractCardBenefits = (doc: Document): CardBenefitDetail[] => {
  console.log('[GmarketParser] 카드 혜택 추출 시작...');

  const benefits: CardBenefitDetail[] = [];

  // 1. 제휴카드 정보
  const partnerCards = extractPartnerCards(doc);
  benefits.push(...partnerCards);

  // 2. 결제 할인 정보에서 카드 혜택 추출
  const paymentDiscounts = extractPaymentDiscounts(doc);
  
  paymentDiscounts.forEach((discount) => {
    // 제목에서 카드사 추출
    const cardMatch = discount.title.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC|스마일)(?:카드)?/i);
    
    if (cardMatch) {
      const cardName = cardMatch[1].includes('카드') ? cardMatch[1] : `${cardMatch[1]}카드`;
      
      // 할인율 추출
      const rateMatch = discount.title.match(/(\d+(?:\.\d+)?)\s*%/);
      const rate = rateMatch ? parseFloat(rateMatch[1]) : undefined;

      // 중복 체크
      if (!benefits.some((b) => b.cardName === cardName)) {
        benefits.push({
          card: cardName,
          cardName: cardName,
          benefit: discount.title,
          discount: rate,
          rate: rate,
        });
      }
    }
  });

  // 3. G마켓 삼성카드 특별 처리 (결제할인가 섹션)
  const paymentDiscountBox = doc.querySelector('.box__payment-discount');
  if (paymentDiscountBox) {
    const text = paymentDiscountBox.textContent || '';
    
    // "G마켓 삼성카드 결제 20%" 패턴
    const gmarketSamsungMatch = text.match(/G마켓\s*삼성카드.*?(\d+)\s*%/i);
    if (gmarketSamsungMatch) {
      const rate = parseInt(gmarketSamsungMatch[1], 10);
      
      if (!benefits.some((b) => b.card === 'G마켓 삼성카드')) {
        benefits.push({
          card: 'G마켓 삼성카드',
          cardName: 'G마켓 삼성카드',
          benefit: `G마켓 삼성카드 결제 시 ${rate}% 할인`,
          discount: rate,
          rate: rate,
        });
      }
    }
  }

  // 할인율 기준 내림차순 정렬
  benefits.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));

  console.log('[GmarketParser] 최종 카드 혜택:', benefits);
  return benefits;
};
