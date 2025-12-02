export const COUPANG_SELECTORS = {
  amount: [
    // 쿠팡 최신 구조 (2024~)
    '.prod-sale-price',
    '.prod-coupon-price',
    '.total-price strong',
    '.price-value',
    // Tailwind 기반 셀렉터
    '[class*="text-"][class*="font-bold"]',
    // 기존 셀렉터
    '.price-amount.sales-price-amount',
    '.price-amount.final-price-amount',
    '.total-price',
    '[data-testid="total-price"]',
    '.price-amount',
    '[data-price]',
    // 일반 가격 패턴
    '.product-price',
    '.prod-price',
    '.product__price',
    '.prod_price',
    'strong.price',
    'span.price',
    // 더 넓은 범위 (최후 수단)
    '[class*="price"]',
  ],
  title: [
    '.product-title',
    'h1.product-name',
    'h2[class*="title"]',
    '[data-testid="product-title"]',
  ],
  mainImage: 'img.twc-w-full.twc-max-h-\\[546px\\]',
  thumbnailContainer: 'div.twc-w-\\[70px\\]',
  instantOption: '.instant-option',
  benefitBadge: '.ccid-benefit-badge',
  shipping: '[class*="shipping"]',
  // 카드 이미지 선택자 - 쿠팡 실제 구조: <img class="w-[76px]" src="..." alt="NH농협카드">
  cardImages: {
    // 직접 클래스 선택 (Tailwind arbitrary value)
    directClass: 'img.w-\\[76px\\], img[class*="w-[76px]"]',
    // 대체 선택자들
    container: '[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico',
  },
  // 카드 혜택 상세 팝업 선택자
  cardBenefitPopup: {
    container: '#creditCardBenefitPopup, .card-benefit-popup',
    content: '#creditCardBenefitContent, .card-benefit-popup__content',
    iframe: '.card-benefit-popup__content-iframe',
    // iframe 내부 선택자
    cardItem: '.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',
    cardName: '.card-name, .benefit-card-name, [class*="card-name"]',
    benefitRate: '.benefit-rate, .discount-rate, [class*="rate"]',
    benefitDesc: '.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]',
  },
};
