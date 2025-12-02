/**
 * 가격 비교 타입 테스트
 *
 * ComparisonRequest, ComparisonResponse, ProviderResult 타입 검증
 */

import { describe, it, expect } from 'vitest';
import type {
  ProviderType,
  ComparedProduct,
  ProviderResult,
  ComparisonResponse,
  ComparisonRequest,
} from '../../src/shared/types/comparison';
import { PROVIDER_META, PROVIDER_SELECTORS } from '../../src/shared/types/comparison';

describe('Comparison Types', () => {
  describe('ProviderType', () => {
    it('유효한 Provider 타입이 정의되어야 함', () => {
      const validProviders: ProviderType[] = ['danawa', 'naver', 'coupang'];
      
      validProviders.forEach((provider) => {
        expect(PROVIDER_META[provider]).toBeDefined();
        expect(PROVIDER_META[provider].displayName).toBeTruthy();
        expect(PROVIDER_META[provider].currency).toBe('KRW');
      });
    });

    it('모든 Provider에 대한 셀렉터가 정의되어야 함', () => {
      const providerKeys = Object.keys(PROVIDER_SELECTORS);
      
      expect(providerKeys).toContain('danawa');
      expect(providerKeys).toContain('naver');
      expect(providerKeys).toContain('coupang');
    });
  });

  describe('ComparedProduct', () => {
    it('필수 필드를 포함한 상품 객체가 유효해야 함', () => {
      const product: ComparedProduct = {
        id: 'test-123',
        name: '테스트 상품',
        price: 100000,
        currency: 'KRW',
        url: 'https://example.com/product/123',
      };

      expect(product.id).toBe('test-123');
      expect(product.name).toBe('테스트 상품');
      expect(product.price).toBe(100000);
      expect(product.currency).toBe('KRW');
      expect(product.url).toBeTruthy();
    });

    it('선택적 필드를 포함한 상품 객체가 유효해야 함', () => {
      const product: ComparedProduct = {
        id: 'coupang-456',
        name: '쿠팡 로켓배송 상품',
        price: 89000,
        originalPrice: 99000,
        currency: 'KRW',
        url: 'https://www.coupang.com/vp/products/456',
        image: 'https://img.coupang.com/456.jpg',
        rating: 4.8,
        ratingCount: 1234,
        seller: '쿠팡 공식판매자',
        deliveryInfo: '내일 도착',
        isRocketDelivery: true,
        isFreeShipping: true,
      };

      expect(product.originalPrice).toBe(99000);
      expect(product.rating).toBe(4.8);
      expect(product.isRocketDelivery).toBe(true);
      expect(product.isFreeShipping).toBe(true);
    });

    it('할인율 계산이 가능해야 함', () => {
      const product: ComparedProduct = {
        id: 'test-discount',
        name: '할인 상품',
        price: 80000,
        originalPrice: 100000,
        currency: 'KRW',
        url: 'https://example.com/product/discount',
      };

      const discountRate = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

      expect(discountRate).toBe(20); // 20% 할인
    });
  });

  describe('ProviderResult', () => {
    it('성공한 Provider 결과가 유효해야 함', () => {
      const result: ProviderResult = {
        provider: 'danawa',
        success: true,
        products: [
          {
            id: 'danawa-1',
            name: '다나와 상품 1',
            price: 150000,
            currency: 'KRW',
            url: 'https://danawa.com/1',
          },
          {
            id: 'danawa-2',
            name: '다나와 상품 2',
            price: 155000,
            currency: 'KRW',
            url: 'https://danawa.com/2',
          },
        ],
        duration: 1500,
        totalCount: 100,
      };

      expect(result.success).toBe(true);
      expect(result.products).toHaveLength(2);
      expect(result.duration).toBe(1500);
      expect(result.error).toBeUndefined();
    });

    it('실패한 Provider 결과가 유효해야 함', () => {
      const result: ProviderResult = {
        provider: 'coupang',
        success: false,
        products: [],
        duration: 5000,
        error: '타임아웃 발생',
      };

      expect(result.success).toBe(false);
      expect(result.products).toHaveLength(0);
      expect(result.error).toBe('타임아웃 발생');
    });
  });

  describe('ComparisonRequest', () => {
    it('기본 요청 객체가 유효해야 함', () => {
      const request: ComparisonRequest = {
        query: '아이폰 15 프로',
      };

      expect(request.query).toBe('아이폰 15 프로');
      expect(request.providers).toBeUndefined();
      expect(request.maxResults).toBeUndefined();
    });

    it('모든 옵션을 포함한 요청 객체가 유효해야 함', () => {
      const request: ComparisonRequest = {
        query: '맥북 프로',
        providers: ['danawa', 'naver'],
        maxResults: 10,
        useCache: false,
      };

      expect(request.query).toBe('맥북 프로');
      expect(request.providers).toEqual(['danawa', 'naver']);
      expect(request.maxResults).toBe(10);
      expect(request.useCache).toBe(false);
    });
  });

  describe('ComparisonResponse', () => {
    it('성공한 응답이 유효해야 함', () => {
      const response: ComparisonResponse = {
        success: true,
        query: '갤럭시 S24',
        timestamp: Date.now(),
        results: [
          {
            provider: 'naver',
            success: true,
            products: [
              {
                id: 'naver-1',
                name: '갤럭시 S24 울트라',
                price: 1650000,
                currency: 'KRW',
                url: 'https://shopping.naver.com/1',
              },
            ],
            duration: 1200,
          },
        ],
        totalDuration: 1200,
        fromCache: false,
      };

      expect(response.success).toBe(true);
      expect(response.query).toBe('갤럭시 S24');
      expect(response.results).toHaveLength(1);
      expect(response.fromCache).toBe(false);
    });

    it('캐시된 응답이 유효해야 함', () => {
      const response: ComparisonResponse = {
        success: true,
        query: '에어팟 프로',
        timestamp: Date.now() - 60000, // 1분 전
        results: [],
        totalDuration: 50, // 캐시이므로 빠름
        fromCache: true,
      };

      expect(response.fromCache).toBe(true);
      expect(response.totalDuration).toBeLessThan(100);
    });

    it('실패한 응답이 유효해야 함', () => {
      const response: ComparisonResponse = {
        success: false,
        query: '',
        timestamp: Date.now(),
        results: [],
        totalDuration: 10,
        fromCache: false,
        error: '검색어가 필요합니다',
      };

      expect(response.success).toBe(false);
      expect(response.error).toBe('검색어가 필요합니다');
    });

    it('최저가 정보를 포함할 수 있어야 함', () => {
      const lowestPriceProduct: ComparedProduct = {
        id: 'lowest-1',
        name: '최저가 상품',
        price: 50000,
        currency: 'KRW',
        url: 'https://example.com/lowest',
      };

      const response: ComparisonResponse = {
        success: true,
        query: '테스트',
        timestamp: Date.now(),
        results: [],
        totalDuration: 1000,
        fromCache: false,
        lowestPrice: {
          provider: 'danawa',
          product: lowestPriceProduct,
        },
      };

      expect(response.lowestPrice).toBeDefined();
      expect(response.lowestPrice?.provider).toBe('danawa');
      expect(response.lowestPrice?.product.price).toBe(50000);
    });
  });

  describe('PROVIDER_META', () => {
    it('다나와 메타 정보가 올바르야 함', () => {
      expect(PROVIDER_META.danawa).toEqual({
        displayName: '다나와',
        currency: 'KRW',
        locale: 'ko-KR',
      });
    });

    it('네이버 메타 정보가 올바르야 함', () => {
      expect(PROVIDER_META.naver).toEqual({
        displayName: '네이버쇼핑',
        currency: 'KRW',
        locale: 'ko-KR',
      });
    });

    it('쿠팡 메타 정보가 올바르야 함', () => {
      expect(PROVIDER_META.coupang).toEqual({
        displayName: '쿠팡',
        currency: 'KRW',
        locale: 'ko-KR',
      });
    });
  });

  describe('PROVIDER_SELECTORS', () => {
    it('다나와 셀렉터가 필수 필드를 포함해야 함', () => {
      const danawa = PROVIDER_SELECTORS.danawa;
      
      expect(danawa.searchUrl).toContain('danawa.com');
      expect(danawa.productList).toBeTruthy();
      expect(danawa.productName).toBeTruthy();
      expect(danawa.price).toBeTruthy();
    });

    it('네이버 셀렉터가 필수 필드를 포함해야 함', () => {
      const naver = PROVIDER_SELECTORS.naver;
      
      expect(naver.searchUrl).toContain('naver.com');
      expect(naver.productList).toBeTruthy();
      expect(naver.productName).toBeTruthy();
      expect(naver.price).toBeTruthy();
    });

    it('쿠팡 셀렉터가 필수 필드를 포함해야 함', () => {
      const coupang = PROVIDER_SELECTORS.coupang;
      
      expect(coupang.searchUrl).toContain('coupang.com');
      expect(coupang.productList).toBeTruthy();
      expect(coupang.productName).toBeTruthy();
      expect(coupang.price).toBeTruthy();
      expect(coupang.rocketDelivery).toBeTruthy(); // 쿠팡 특화
    });
  });
});

describe('Type Compatibility', () => {
  it('ProviderResult.products가 ComparedProduct[] 타입이어야 함', () => {
    const products: ComparedProduct[] = [
      {
        id: '1',
        name: 'Test',
        price: 10000,
        currency: 'KRW',
        url: 'https://test.com',
      },
    ];

    const result: ProviderResult = {
      provider: 'danawa',
      success: true,
      products,
      duration: 100,
    };

    // 타입 체크 - 컴파일 에러가 없으면 성공
    expect(result.products).toBe(products);
  });

  it('ComparisonResponse.results가 ProviderResult[] 타입이어야 함', () => {
    const results: ProviderResult[] = [
      {
        provider: 'naver',
        success: true,
        products: [],
        duration: 100,
      },
    ];

    const response: ComparisonResponse = {
      success: true,
      query: 'test',
      timestamp: Date.now(),
      results,
      totalDuration: 100,
      fromCache: false,
    };

    // 타입 체크 - 컴파일 에러가 없으면 성공
    expect(response.results).toBe(results);
  });
});
