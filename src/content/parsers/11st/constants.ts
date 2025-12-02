/**
 * 11번가 셀렉터 상수 정의
 * 
 * DOM 구조 기반 2025년 업데이트
 */

export const ELEVEN_ST_SELECTORS = {
  // ===== 가격 관련 =====
  price: {
    // 가격 블록 컨테이너
    container: '.price_block',
    // 정가 (취소선 가격)
    originalPrice: '.price_regular del',
    // 할인가 (현재 판매가)
    salePrice: '.price_info .price .value',
    salePriceAlt: '#finalDscPrcArea .price .value',
    // 할인율
    discountRate: '.price_info .rate .value',
    // 최대할인가
    maxDiscountPrice: '#maxDiscountResult .price .value',
    maxDiscountRate: '#maxDiscountResult .rate .value',
    // 최대할인가 레이어 (상세)
    maxDiscountLayer: '#arMaximumDiscount',
    maxDiscountItems: '#arMaximumDiscount .discount_prices .field',
    // 즉시할인, 쿠폰할인 금액
    discountDetail: '#arMaximumDiscount .discount_prices.list_type .price',
  },

  // ===== 상품 정보 =====
  product: {
    // 상품명
    title: '.c_product_info_title h1.title',
    titleAlt: '.c_product_info_title_coupon h1.title',
    // 부제목
    subtitle: '.c_product_info_title .title_sub',
  },

  // ===== 이미지 =====
  image: {
    // 메인 이미지 컨테이너
    container: '.c_product_view_img',
    // 큰 이미지 (display: block인 것이 현재 보이는 이미지)
    main: '.img_full img',
    mainAlt: '.img_full[style*="display: block"] img',
    // 확대 이미지 (고해상도)
    expandImage: '.expand_img img',
    // 썸네일 리스트
    thumbnailContainer: '#smallImg .list',
    thumbnail: '#smallImg .list li img',
    thumbnailAlt: '.c_product_view_img .list li img',
  },

  // ===== 포인트/적립 혜택 =====
  benefits: {
    // 최대 적립 포인트 컨테이너
    container: '#max_saveing_point_layer',
    // 포인트 레이어 (extractPoints에서 사용)
    pointLayer: '#max_saveing_point_layer',
    // 총 최대 적립 포인트
    pointAmount: '.point',
    totalPoint: '#max_saveing_point_layer dt + dd .point',
    totalPointAlt: '.max_saveing_point .point',
    // 11pay 포인트
    elevenPayPoint: '.elevenpay_point .total .value',
    // 기본 포인트
    basicPoint: '.max_saveing_point .point, [class*="point_value"]',
    // 포인트 상세 리스트
    pointList: '.saving_history .list',
    pointItems: '.saving_history .point',
    // 개별 포인트 항목
    pointItemButton: '.c_layer_expand button.c_product_btn',
    pointItemValue: '.c_layer_expand + .value',
    // 포인트 상세 레이어
    pointDetailLayer: '.c_layer_item',
    pointDetailTitle: '.c_layer_item .cont_title, .c_layer_item .title',
    pointDetailValue: '.c_layer_item .value, .c_layer_item .text_em2',
  },

  // ===== 카드 혜택 =====
  cardBenefits: {
    // 카드 혜택 레이어
    layer: '[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',
    // 신한카드 등 카드 결제 혜택
    cardSection: '[id*="arSavePoint"][id*="_layer"]',
    benefitButton: '[data-log-body*="카드"], .c_product_btn[data-log-body]',
    cardButton: '[data-log-body*="카드"]',
    cardName: '.layer_title .title, .cont_title',
    // 카드 상세 아이템
    cardItem: '.c-detail-cont__item, .c_layer_item',
    cardTitle: '.c-detail-cont__title, .layer_title .title',
    cardAmount: '.c-detail-cont__discription .value, .text_em2',
    cardDetail: '.c-detail-cont',
    cardDetailItem: '.c-detail-cont__item',
    cardDetailTitle: '.c-detail-cont__title',
    cardDetailDesc: '.c-detail-cont__discription',
  },

  // ===== 쿠폰 =====
  coupon: {
    // 쿠폰받기 버튼
    downloadButton: '.coupon button[onclick*="openCouponDownloadPopup"]',
    downloadButtonAlt: '.c_product_btn[aria-controls="couponDown"]',
    // 쿠폰 배지
    badge: '.coupon_badge, [class*="coupon"]',
    // 쿠폰 아이템
    item: '.coupon_item, .c_coupon_item',
    // 쿠폰명
    name: '.coupon_name, .c_coupon_name',
    // 쿠폰 할인
    discount: '.coupon_discount, .c_coupon_discount',
    // 쿠폰 할인 금액 (최대할인가 레이어 내)
    couponDiscount: '#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price',
  },

  // ===== 배송 정보 =====
  shipping: {
    // 배송 정보 영역 (추후 DOM 확인 후 업데이트)
    container: '.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',
    deliveryType: '.delivery_type',
    deliveryDate: '.delivery_date',
    deliveryFee: '.delivery_fee',
  },

  // ===== 옵션/변형 =====
  variants: {
    // 옵션 선택 영역 (추후 DOM 확인 후 업데이트)
    container: '.c_product_option, [class*="option"]',
    optionGroup: '.option_group',
    optionItem: '.option_item',
  },

  // ===== 판매자 정보 =====
  seller: {
    name: '.c_product_store_info .store_name, .seller_name',
    rating: '.c_product_store_info .store_rating, .seller_rating',
    storeName: '.c_product_store_info .store_name',
    storeLink: '.c_product_store_info a',
  },
};

// URL 패턴 (배열)
export const ELEVEN_ST_URL_PATTERNS = [
  // 상품 상세 페이지
  /11st\.co\.kr\/products\/(\d+)/,
  // 모바일 상품 페이지
  /m\.11st\.co\.kr\/products\/(\d+)/,
];

// 11번가 상수
export const ELEVEN_ST_CONSTANTS = {
  siteName: '11번가',
  currency: 'KRW',
  baseUrl: 'https://www.11st.co.kr',
  mobileBaseUrl: 'https://m.11st.co.kr',
};
