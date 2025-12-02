/**
 * Background Service Worker 테스트
 *
 * Chrome Extension 환경에서 실행되는 Background Script 테스트
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { testUtils, mockFetch } from '../setup';

// Background 메시지 핸들러 시뮬레이션
// 실제 background/index.ts의 로직을 테스트용으로 분리
const COMPARISON_SERVER_URL = 'http://localhost:8000';

interface ProductData {
  amount: number;
  currency: string;
  title?: string;
  url?: string;
  timestamp?: number;
  cardBenefits?: unknown[];
  cashback?: boolean;
  [key: string]: unknown;
}

interface ComparisonResponse {
  success: boolean;
  query: string;
  results: Array<{
    provider: string;
    success: boolean;
    products: Array<{
      id: string;
      name: string;
      price: number;
      currency: string;
      url: string;
      image?: string;
    }>;
    error?: string;
    duration: number;
  }>;
  totalDuration: number;
  fromCache?: boolean;
}

// 가격 비교 API 호출 함수
async function fetchPriceComparison(query: string, providers?: string[]): Promise<ComparisonResponse> {
  const response = await fetch(`${COMPARISON_SERVER_URL}/api/compare`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      providers,
      maxResults: 5,
    }),
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
}

// 메시지 핸들러 등록
function setupMessageHandler() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SAVE_PRODUCT_DATA') {
      const { data, url, timestamp } = message as {
        data: ProductData;
        url: string;
        timestamp: number;
      };

      const productData = {
        ...data,
        url,
        timestamp,
        savedAt: new Date().toISOString(),
      };

      chrome.storage.local.set(
        {
          currentProduct: productData,
          lastUpdated: timestamp,
        },
        () => {
          sendResponse({
            success: true,
            message: 'Data saved to storage',
            savedData: {
              amount: productData.amount,
              currency: productData.currency,
            },
          });
        }
      );

      return true;
    }

    if (message.type === 'GET_PRODUCT_DATA') {
      chrome.storage.local.get(['currentProduct'], (result) => {
        sendResponse({
          success: true,
          data: result.currentProduct || null,
        });
      });

      return true;
    }

    if (message.type === 'COMPARE_PRICES') {
      const { query, providers: targetProviders } = message as {
        query: string;
        providers?: string[];
      };

      fetchPriceComparison(query, targetProviders)
        .then((result) => {
          sendResponse({
            success: true,
            data: result,
          });
        })
        .catch((error) => {
          sendResponse({
            success: false,
            error: error instanceof Error ? error.message : '가격 비교 실패',
          });
        });

      return true;
    }

    if (message.type === 'CHECK_COMPARISON_SERVER') {
      fetch(`${COMPARISON_SERVER_URL}/api/health`)
        .then((response) => response.json())
        .then((data) => {
          sendResponse({
            success: true,
            data,
          });
        })
        .catch(() => {
          sendResponse({
            success: false,
            error: '가격 비교 서버에 연결할 수 없습니다',
          });
        });

      return true;
    }

    if (message.type === 'OPEN_AUTO_POPUP') {
      chrome.windows.create(
        {
          url: chrome.runtime.getURL('src/subpopup/index.html?auto=true'),
          type: 'popup',
          width: 420,
          height: 300,
        },
        (window) => {
          sendResponse({
            success: true,
            windowId: window?.id,
          });
        }
      );

      return true;
    }

    sendResponse({
      success: false,
      error: 'Unknown message type',
    });

    return false;
  });
}

describe('Background Service Worker', () => {
  beforeEach(() => {
    setupMessageHandler();
  });

  describe('SAVE_PRODUCT_DATA', () => {
    it('상품 데이터를 저장하고 성공 응답을 반환해야 함', async () => {
      const productData: ProductData = {
        amount: 1299000,
        currency: 'KRW',
        title: '아이폰 15 Pro 256GB',
        url: 'https://www.coupang.com/vp/products/123456',
      };

      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'SAVE_PRODUCT_DATA',
            data: productData,
            url: productData.url,
            timestamp: Date.now(),
          },
          resolve
        );
      });

      expect(response).toEqual(
        expect.objectContaining({
          success: true,
          message: 'Data saved to storage',
          savedData: {
            amount: 1299000,
            currency: 'KRW',
          },
        })
      );

      // Storage에 저장되었는지 확인
      const storage = testUtils.getMockStorage();
      expect(storage.currentProduct).toBeDefined();
      expect((storage.currentProduct as ProductData).amount).toBe(1299000);
    });

    it('카드 혜택 데이터와 함께 저장해야 함', async () => {
      const productData: ProductData = {
        amount: 500000,
        currency: 'KRW',
        title: '갤럭시 버즈 3 Pro',
        cardBenefits: [
          { card: '삼성카드', discount: 50000 },
          { card: '현대카드', discount: 30000 },
        ],
        cashback: true,
      };

      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'SAVE_PRODUCT_DATA',
            data: productData,
            url: 'https://www.samsung.com/product/123',
            timestamp: Date.now(),
          },
          resolve
        );
      });

      expect(response).toEqual(
        expect.objectContaining({
          success: true,
        })
      );

      const storage = testUtils.getMockStorage();
      const saved = storage.currentProduct as ProductData;
      expect(saved.cardBenefits).toHaveLength(2);
      expect(saved.cashback).toBe(true);
    });
  });

  describe('GET_PRODUCT_DATA', () => {
    it('저장된 상품 데이터를 반환해야 함', async () => {
      // 먼저 데이터 저장
      testUtils.setMockStorage({
        currentProduct: {
          amount: 899000,
          currency: 'KRW',
          title: '맥북 에어 M3',
        },
      });

      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'GET_PRODUCT_DATA',
          },
          resolve
        );
      });

      expect(response).toEqual({
        success: true,
        data: {
          amount: 899000,
          currency: 'KRW',
          title: '맥북 에어 M3',
        },
      });
    });

    it('데이터가 없으면 null을 반환해야 함', async () => {
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'GET_PRODUCT_DATA',
          },
          resolve
        );
      });

      expect(response).toEqual({
        success: true,
        data: null,
      });
    });
  });

  describe('COMPARE_PRICES', () => {
    it('가격 비교 API를 호출하고 결과를 반환해야 함', async () => {
      const mockComparisonResponse: ComparisonResponse = {
        success: true,
        query: '아이폰 15',
        results: [
          {
            provider: 'danawa',
            success: true,
            products: [
              {
                id: 'danawa-1',
                name: '아이폰 15 Pro 256GB',
                price: 1290000,
                currency: 'KRW',
                url: 'https://danawa.com/product/1',
                image: 'https://img.danawa.com/1.jpg',
              },
            ],
            duration: 1500,
          },
          {
            provider: 'naver',
            success: true,
            products: [
              {
                id: 'naver-1',
                name: '아이폰 15 Pro 256GB',
                price: 1285000,
                currency: 'KRW',
                url: 'https://shopping.naver.com/product/1',
              },
            ],
            duration: 1200,
          },
        ],
        totalDuration: 2700,
        fromCache: false,
      };

      testUtils.mockFetchResponse(mockComparisonResponse);

      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'COMPARE_PRICES',
            query: '아이폰 15',
          },
          resolve
        );
      });

      expect(response).toEqual({
        success: true,
        data: mockComparisonResponse,
      });

      // fetch가 올바른 파라미터로 호출되었는지 확인
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/compare',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });

    it('특정 Provider만 지정하여 검색할 수 있어야 함', async () => {
      testUtils.mockFetchResponse({
        success: true,
        query: '갤럭시 S24',
        results: [
          {
            provider: 'coupang',
            success: true,
            products: [],
            duration: 1000,
          },
        ],
        totalDuration: 1000,
      });

      await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'COMPARE_PRICES',
            query: '갤럭시 S24',
            providers: ['coupang'],
          },
          resolve
        );
      });

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.providers).toEqual(['coupang']);
    });

    it('API 오류 시 에러 응답을 반환해야 함', async () => {
      testUtils.mockFetchError('Network error');

      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'COMPARE_PRICES',
            query: '테스트 상품',
          },
          resolve
        );
      });

      expect(response).toEqual({
        success: false,
        error: 'Network error',
      });
    });

    it('API 응답이 실패 상태코드일 때 에러를 반환해야 함', async () => {
      testUtils.mockFetchResponse({ error: 'Bad request' }, false, 400);

      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'COMPARE_PRICES',
            query: '',
          },
          resolve
        );
      });

      expect(response).toEqual({
        success: false,
        error: 'API 요청 실패: 400',
      });
    });
  });

  describe('CHECK_COMPARISON_SERVER', () => {
    it('서버가 정상일 때 상태를 반환해야 함', async () => {
      const healthResponse = {
        status: 'ok',
        timestamp: Date.now(),
        uptime: 3600,
      };

      testUtils.mockFetchResponse(healthResponse);

      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'CHECK_COMPARISON_SERVER',
          },
          resolve
        );
      });

      expect(response).toEqual({
        success: true,
        data: healthResponse,
      });

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:8000/api/health');
    });

    it('서버 연결 실패 시 에러를 반환해야 함', async () => {
      testUtils.mockFetchError('Connection refused');

      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'CHECK_COMPARISON_SERVER',
          },
          resolve
        );
      });

      expect(response).toEqual({
        success: false,
        error: '가격 비교 서버에 연결할 수 없습니다',
      });
    });
  });

  describe('OPEN_AUTO_POPUP', () => {
    it('SubPopup 윈도우를 생성해야 함', async () => {
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'OPEN_AUTO_POPUP',
          },
          resolve
        );
      });

      expect(response).toEqual(
        expect.objectContaining({
          success: true,
          windowId: expect.any(Number),
        })
      );

      expect(chrome.windows.create).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining('subpopup/index.html?auto=true'),
          type: 'popup',
          width: 420,
          height: 300,
        }),
        expect.any(Function)
      );
    });
  });

  describe('Unknown Message Type', () => {
    it('알 수 없는 메시지 타입에 에러를 반환해야 함', async () => {
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'UNKNOWN_TYPE',
          },
          resolve
        );
      });

      expect(response).toEqual({
        success: false,
        error: 'Unknown message type',
      });
    });
  });
});
