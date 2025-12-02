/**
 * 가격 비교 엔진 타입 정의
 */

// Provider 종류
export type ProviderType = 'danawa' | 'naver' | 'coupang';

// 개별 상품 정보
export interface ComparedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: string;
  url: string;
  image?: string;
  rating?: number;
  ratingCount?: number;
  seller?: string;
  deliveryInfo?: string;
  isRocketDelivery?: boolean; // 쿠팡
  isFreeShipping?: boolean;
}

// Provider별 검색 결과
export interface ProviderResult {
  provider: ProviderType;
  success: boolean;
  products: ComparedProduct[];
  totalCount?: number;
  duration: number; // ms
  error?: string;
}

// 가격 비교 응답
export interface ComparisonResponse {
  success: boolean;
  query: string;
  timestamp: number;
  results: ProviderResult[];
  totalDuration: number;
  fromCache: boolean;
  error?: string;
  lowestPrice?: {
    provider: ProviderType;
    product: ComparedProduct;
  };
}

// 가격 비교 요청
export interface ComparisonRequest {
  query: string;
  providers?: ProviderType[];
  maxResults?: number;
  useCache?: boolean;
}

// Provider 설정
export interface ProviderConfig {
  name: ProviderType;
  displayName: string;
  baseUrl: string;
  searchUrl: string;
  enabled: boolean;
  rateLimit: number; // requests per minute
  selectors: Record<string, string | string[]>;
}

// 스크래핑 결과 (내부용)
export interface ScrapeResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  duration: number;
}

// 캐시 엔트리
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Provider Selector 정의
export const PROVIDER_SELECTORS = {
  danawa: {
    searchUrl: 'https://search.danawa.com/dsearch.php?k1=',
    productList: 'li.prod_item.prod_layer:not(.ad_item)',
    productName: 'p.prod_name a',
    price: '.price_sect .lwst_prc',
    priceNumber: '.price_sect .lwst_prc a strong',
    mallList: '.mall_list',
    mallItem: '.mall_list li',
    mallPrice: '.box__mall-price .link__full-cover',
    image: 'div.thumb_image img',
    imageAttr: ['data-original', 'src'],
    link: 'a.thumb_link',
    spec: '.spec_list',
  },
  naver: {
    searchUrl: 'https://search.shopping.naver.com/search/all?query=',
    productList: '.basicList_item__0T9JD, div[class*="product_item"]',
    productName: '.basicList_title__VfX3c a, a[class*="product_title"]',
    price: '.price_num__S2p_v, span[class*="price"]',
    image: '.thumbnail_thumb__Bxb6Z img, img[class*="product_img"]',
    link: '.basicList_title__VfX3c a, a[class*="product_link"]',
    seller: '.basicList_mall__3FKZY, span[class*="mall"]',
    rating: '.basicList_star__UzKiv, span[class*="star"]',
    reviewCount: '.basicList_review__KMlFu, span[class*="review"]',
  },
  coupang: {
    searchUrl: 'https://www.coupang.com/np/search?component=&q=',
    productList: 'li.search-product, ul.search-product-list > li',
    productName: '.name, .product-title',
    price: '.price-value, strong.price',
    originalPrice: '.base-price',
    image: 'img.search-product-wrap-img, .product-image img',
    link: 'a.search-product-link, a[href*="/vp/products/"]',
    rating: '.rating',
    ratingCount: '.rating-total-count',
    rocketDelivery: '.badge-rocket, .rocket-delivery',
  },
  amazon: {
    searchUrl: 'https://www.amazon.com/s?k=',
    productList: 'div[data-component-type="s-search-result"]',
    productName: 'h2 a span, .a-text-normal',
    price: '.a-price-whole',
    priceFraction: '.a-price-fraction',
    image: '.s-image',
    link: 'h2 a',
    rating: '.a-icon-star-small span',
    ratingCount: '.a-size-base.s-underline-text',
  },
} as const;

// Provider 메타데이터
export const PROVIDER_META: Record<ProviderType, { displayName: string; currency: string; locale: string }> = {
  danawa: { displayName: '다나와', currency: 'KRW', locale: 'ko-KR' },
  naver: { displayName: '네이버쇼핑', currency: 'KRW', locale: 'ko-KR' },
  coupang: { displayName: '쿠팡', currency: 'KRW', locale: 'ko-KR' },
};
