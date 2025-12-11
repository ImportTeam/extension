/**
 * G마켓 Parser Constants
 * G마켓 상품 페이지 파싱을 위한 선택자 정의
 */

export const GMARKET_SELECTORS = {
  // 상품 기본 정보
  product: {
    title: 'h1.itemtit',
    titleAlt: 'h1[class*="title"]',
    titleAlt2: '.box__item-title h1',
    titleAlt3: 'h1',
    image: 'img[src*="gdimg.gmarket.co.kr"]',
    mainImage: '.box__item-main-image img',
    mainImageAlt: 'img[class*="main"]',
  },

  // 가격 정보
  price: {
    // 결제할인가 (최종가)
    discountPrice: '.box__payment-discount .text__price strong',
    discountPriceAlt: '#paymentDiscountDetail-title .text__price',
    discountPriceAlt2: '[class*="discount"] strong',
    // 판매가
    salePrice: '.price_real',
    salePriceAlt: 'strong.price_real',
    salePriceAlt2: '.box__price strong',
    salePriceAlt3: '[class*="price"] strong',
    // 정가 (원가)
    originalPrice: '.text__price-original .text__price',
    originalPriceAlt: '.box__original-price .text__price',
    // 할인율
    discountRate: '.text__discount-rate',
    discountRateAlt: '[class*="discount"][class*="rate"]',
    // 특수 페이지 fallback
    dealPrice: '.deal-price strong, [class*="deal"] strong',
    specialPrice: '.special-price strong',
  },

  // G마켓 제휴카드
  cardBenefit: {
    // 제휴카드 툴팁 컨테이너
    container: '#tooltip_gmarketcard',
    // 제휴카드 이미지
    cardImage: '#tooltip_gmarketcard .gmarketcard_area img',
    // 제휴카드 링크
    cardLink: '#tooltip_gmarketcard .gmarketcard_area a',
    // 제휴카드 제목
    title: '#tooltip_gmarketcard .tit_tooltip',
    // 카드사별 할인 정보 (결제할인가 섹션)
    discountItem: '.box__discount-item .list-item',
    discountItemTitle: '.text__title',
    discountItemDesc: '.text',
    discountItemPrice: '.text__price',
  },

  // 추가 혜택 (신세계포인트 등)
  additionalBenefits: {
    // 혜택 리스트 아이템
    benefitItem: '.list-item-point',
    // 혜택 타이틀
    benefitTitle: '.box__information-title .box__information',
    // 혜택 상세 리스트
    benefitDetail: '.list__reward-detail .list-item',
    benefitLabel: '.text__label',
    benefitValue: '.text__value',
  },

  // 배송 정보
  shipping: {
    starDelivery: '.link__seller[href*="stardelivery"]',
    shippingInfo: '.box__delivery',
  },

  // 브랜드/판매자 정보
  seller: {
    brand: '.text__brand .text',
    official: '.text__official',
    seller: '.text__seller',
  },
} as const;

/**
 * G마켓 URL 패턴
 */
export const GMARKET_URL_PATTERNS = {
  // 상품 상세 페이지
  productPage: /gmarket\.co\.kr\/item/i,
  // VIP 페이지
  vipPage: /gmarket\.co\.kr\/n\/(?:vip|item)/i,
  // 일반 상품 URL
  generalProduct: /gmarket\.co\.kr.*(?:goodscode|itemno)=/i,
} as const;
