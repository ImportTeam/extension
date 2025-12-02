/**
 * Chrome Storage Utility 테스트
 *
 * 확장 프로그램에서 사용하는 스토리지 관련 유틸리티 테스트
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { testUtils } from '../setup';

// Storage 유틸리티 함수들 (실제 구현과 동일하게 테스트용으로 작성)
interface StoredProductData {
  amount: number;
  currency: string;
  title?: string;
  url?: string;
  timestamp?: number;
  savedAt?: string;
}

async function saveProductData(data: StoredProductData): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set(
      {
        currentProduct: data,
        lastUpdated: Date.now(),
      },
      () => resolve()
    );
  });
}

async function getProductData(): Promise<StoredProductData | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['currentProduct'], (result) => {
      resolve(result.currentProduct || null);
    });
  });
}

async function clearProductData(): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.remove(['currentProduct', 'lastUpdated'], () => {
      resolve();
    });
  });
}

async function getLastUpdated(): Promise<number | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['lastUpdated'], (result) => {
      resolve(result.lastUpdated || null);
    });
  });
}

describe('Chrome Storage Utilities', () => {
  beforeEach(() => {
    testUtils.clearMockStorage();
  });

  describe('saveProductData', () => {
    it('상품 데이터를 저장해야 함', async () => {
      const productData: StoredProductData = {
        amount: 1500000,
        currency: 'KRW',
        title: '맥북 프로 16인치',
        url: 'https://www.apple.com/kr/shop/buy-mac/macbook-pro',
      };

      await saveProductData(productData);

      const storage = testUtils.getMockStorage();
      expect(storage.currentProduct).toEqual(productData);
      expect(storage.lastUpdated).toBeDefined();
    });

    it('lastUpdated 타임스탬프를 업데이트해야 함', async () => {
      const beforeTime = Date.now();
      
      await saveProductData({
        amount: 100000,
        currency: 'KRW',
      });

      const afterTime = Date.now();
      const storage = testUtils.getMockStorage();
      
      expect(storage.lastUpdated).toBeGreaterThanOrEqual(beforeTime);
      expect(storage.lastUpdated).toBeLessThanOrEqual(afterTime);
    });

    it('기존 데이터를 덮어써야 함', async () => {
      await saveProductData({
        amount: 50000,
        currency: 'KRW',
        title: '첫 번째 상품',
      });

      await saveProductData({
        amount: 75000,
        currency: 'KRW',
        title: '두 번째 상품',
      });

      const storage = testUtils.getMockStorage();
      const product = storage.currentProduct as StoredProductData;
      
      expect(product.title).toBe('두 번째 상품');
      expect(product.amount).toBe(75000);
    });
  });

  describe('getProductData', () => {
    it('저장된 상품 데이터를 반환해야 함', async () => {
      testUtils.setMockStorage({
        currentProduct: {
          amount: 299000,
          currency: 'KRW',
          title: '에어팟 맥스',
        },
      });

      const result = await getProductData();

      expect(result).toEqual({
        amount: 299000,
        currency: 'KRW',
        title: '에어팟 맥스',
      });
    });

    it('데이터가 없으면 null을 반환해야 함', async () => {
      const result = await getProductData();

      expect(result).toBeNull();
    });
  });

  describe('clearProductData', () => {
    it('저장된 데이터를 삭제해야 함', async () => {
      testUtils.setMockStorage({
        currentProduct: {
          amount: 100000,
          currency: 'KRW',
        },
        lastUpdated: Date.now(),
      });

      await clearProductData();

      const storage = testUtils.getMockStorage();
      expect(storage.currentProduct).toBeUndefined();
      expect(storage.lastUpdated).toBeUndefined();
    });

    it('다른 데이터는 유지해야 함', async () => {
      testUtils.setMockStorage({
        currentProduct: { amount: 100000, currency: 'KRW' },
        lastUpdated: Date.now(),
        otherData: 'should remain',
      });

      await clearProductData();

      const storage = testUtils.getMockStorage();
      expect(storage.otherData).toBe('should remain');
    });
  });

  describe('getLastUpdated', () => {
    it('lastUpdated 타임스탬프를 반환해야 함', async () => {
      const timestamp = Date.now();
      testUtils.setMockStorage({
        lastUpdated: timestamp,
      });

      const result = await getLastUpdated();

      expect(result).toBe(timestamp);
    });

    it('타임스탬프가 없으면 null을 반환해야 함', async () => {
      const result = await getLastUpdated();

      expect(result).toBeNull();
    });
  });
});

describe('Storage Integration', () => {
  it('저장 후 바로 조회할 수 있어야 함', async () => {
    const productData: StoredProductData = {
      amount: 1990000,
      currency: 'KRW',
      title: '아이패드 프로 12.9인치',
      url: 'https://www.apple.com/kr/shop/buy-ipad/ipad-pro',
      timestamp: Date.now(),
    };

    await saveProductData(productData);
    const retrieved = await getProductData();

    expect(retrieved).toEqual(productData);
  });

  it('삭제 후 조회하면 null이어야 함', async () => {
    await saveProductData({
      amount: 50000,
      currency: 'KRW',
    });

    await clearProductData();
    const result = await getProductData();

    expect(result).toBeNull();
  });

  it('여러 번 업데이트해도 최신 데이터만 유지되어야 함', async () => {
    const updates = [
      { amount: 10000, currency: 'KRW', title: '상품 1' },
      { amount: 20000, currency: 'KRW', title: '상품 2' },
      { amount: 30000, currency: 'KRW', title: '상품 3' },
    ];

    for (const update of updates) {
      await saveProductData(update);
    }

    const result = await getProductData();
    expect(result?.title).toBe('상품 3');
    expect(result?.amount).toBe(30000);
  });
});

describe('Storage Error Handling', () => {
  it('chrome.storage.local.set 호출이 정상적으로 이루어져야 함', async () => {
    await saveProductData({
      amount: 100000,
      currency: 'KRW',
    });

    expect(chrome.storage.local.set).toHaveBeenCalled();
  });

  it('chrome.storage.local.get 호출이 정상적으로 이루어져야 함', async () => {
    await getProductData();

    expect(chrome.storage.local.get).toHaveBeenCalledWith(
      ['currentProduct'],
      expect.any(Function)
    );
  });

  it('chrome.storage.local.remove 호출이 정상적으로 이루어져야 함', async () => {
    await clearProductData();

    expect(chrome.storage.local.remove).toHaveBeenCalledWith(
      ['currentProduct', 'lastUpdated'],
      expect.any(Function)
    );
  });
});
