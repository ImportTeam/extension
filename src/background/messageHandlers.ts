/**
 * Background Message Handlers
 *
 * 책임:
 * - Chrome Runtime 메시지 처리
 * - Storage 읽기/쓰기
 * - Popup 창 관리
 */

import { extLog, networkLog, storeLog, ErrorCode } from '@/shared/utils/logger';
import type { StoredProductData } from '@/shared/types';
import { fetchPriceComparison, checkComparisonServerHealth } from './priceComparison';

// ─────────────────────────────────────────────────────────────
// Message Type Definitions
// ─────────────────────────────────────────────────────────────

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

interface SaveProductDataMessage {
  type: 'SAVE_PRODUCT_DATA';
  data: ProductData;
  url: string;
  timestamp: number;
}

interface UpdateProductDataMessage {
  type: 'UPDATE_PRODUCT_DATA';
  data: ProductData;
  timestamp: number;
  source: string;
}

interface PriceComparisonMessage {
  type: 'COMPARE_PRICES';
  query: string;
  providers?: string[];
  currentPrice?: number;
  currentUrl?: string;
}

type MessageType =
  | SaveProductDataMessage
  | UpdateProductDataMessage
  | PriceComparisonMessage
  | { type: 'GET_PRODUCT_DATA' }
  | { type: 'OPEN_AUTO_POPUP' }
  | { type: 'CHECK_COMPARISON_SERVER' };

// ─────────────────────────────────────────────────────────────
// Message Handlers
// ─────────────────────────────────────────────────────────────

/**
 * SAVE_PRODUCT_DATA 핸들러
 */
export function handleSaveProductData(
  message: SaveProductDataMessage,
  sendResponse: (response: unknown) => void
): boolean {
  const { data, url, timestamp } = message;

  storeLog.info('💾 Saving product data', {
    amount: data.amount,
    currency: data.currency,
    title: `${data.title?.substring(0, 50)}...`,
    url,
    timestamp: new Date(timestamp).toISOString(),
  });

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
      if (chrome.runtime.lastError) {
        storeLog.error(ErrorCode.STO_E001, 'Failed to save to chrome.storage.local', {
          error: new Error(chrome.runtime.lastError.message || 'Storage error'),
        });
        sendResponse({
          success: false,
          error: chrome.runtime.lastError.message,
        });
        return;
      }

      storeLog.info('✅ Data saved to chrome.storage.local');
      storeLog.debug('📊 Stored product', {
        amount: productData.amount,
        currency: productData.currency,
        title: `${productData.title?.substring(0, 50)}...`,
      });

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

  return true; // Keep message channel open
}

/**
 * GET_PRODUCT_DATA 핸들러
 */
export function handleGetProductData(sendResponse: (response: unknown) => void): boolean {
  storeLog.debug('🔍 GET_PRODUCT_DATA request');

  chrome.storage.local.get(['currentProduct'], (result) => {
    if (chrome.runtime.lastError) {
      storeLog.error(ErrorCode.STO_E001, 'Failed to get from chrome.storage.local', {
        error: new Error(chrome.runtime.lastError.message || 'Storage error'),
      });
      sendResponse({
        success: false,
        error: chrome.runtime.lastError.message,
        data: null,
      });
      return;
    }

    const currentProduct = result.currentProduct as StoredProductData | undefined;
    storeLog.debug('📦 Retrieved product data', {
      exists: !!currentProduct,
      amount: currentProduct?.amount,
      title: currentProduct?.title ? `${currentProduct.title.substring(0, 50)}...` : 'N/A',
    });

    sendResponse({
      success: true,
      data: result.currentProduct || null,
    });
  });

  return true; // Keep message channel open
}

/**
 * OPEN_AUTO_POPUP 핸들러
 */
export function handleOpenAutoPopup(sendResponse: (response: unknown) => void): boolean {
  extLog.info('🎪 Opening Auto Popup (SubPopup window)');

  chrome.windows.create(
    {
      url: chrome.runtime.getURL('src/subpopup/index.html?auto=true'),
      type: 'popup',
      width: 420,
      height: 300,
    },
    (window) => {
      if (chrome.runtime.lastError) {
        extLog.error(ErrorCode.EXT_E002, 'Failed to open Auto Popup', {
          error: new Error(chrome.runtime.lastError.message || 'Unknown error'),
        });
        sendResponse({
          success: false,
          error: chrome.runtime.lastError.message,
        });
      } else {
        extLog.info('✅ Auto Popup window created', {
          windowId: window?.id,
          width: window?.width,
          height: window?.height,
        });
        sendResponse({
          success: true,
          windowId: window?.id,
        });
      }
    }
  );

  return true; // Keep message channel open
}

/**
 * COMPARE_PRICES 핸들러
 */
export function handleComparePrices(
  message: PriceComparisonMessage,
  sendResponse: (response: unknown) => void
): boolean {
  const { query, providers, currentPrice, currentUrl } = message;

  networkLog.info('💰 [BACKEND] Price comparison request received', {
    query,
    providers: providers || 'all',
    currentPrice,
    currentUrl,
    timestamp: new Date().toISOString(),
  });

  fetchPriceComparison(query, providers, currentPrice, currentUrl)
    .then((result) => {
      networkLog.info('✅ [BACKEND] Price comparison completed', {
        success: result.success,
        resultCount: result.results.length,
        totalDuration: result.totalDuration,
        fromCache: result.fromCache,
        query,
      });
      sendResponse({
        success: true,
        data: result,
      });
    })
    .catch((error) => {
      networkLog.error(ErrorCode.NET_E002, '[BACKEND] Price comparison failed', {
        error: error instanceof Error ? error : new Error(String(error)),
        data: { query },
      });
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : '가격 비교 실패',
      });
    });

  return true; // Keep message channel open
}

/**
 * CHECK_COMPARISON_SERVER 핸들러
 */
export function handleCheckComparisonServer(sendResponse: (response: unknown) => void): boolean {
  networkLog.debug('🔍 [BACKEND] Checking comparison server status');

  checkComparisonServerHealth()
    .then((data) => {
      networkLog.info('✅ [BACKEND] Comparison server is healthy', data);
      sendResponse({
        success: true,
        data,
      });
    })
    .catch((error) => {
      const errorMessage =
        error instanceof Error ? error.message : '가격 비교 서버에 연결할 수 없습니다';
      networkLog.error(ErrorCode.NET_E001, '❌ [BACKEND] Comparison server is down', {
        error: error instanceof Error ? error : new Error(String(error)),
      });
      sendResponse({
        success: false,
        error: errorMessage,
      });
    });

  return true; // Keep message channel open
}

/**
 * UPDATE_PRODUCT_DATA 핸들러
 */
export function handleUpdateProductData(
  message: UpdateProductDataMessage,
  sendResponse: (response: unknown) => void
): boolean {
  const { data, timestamp, source } = message;

  storeLog.info('🔄 Updating product data (dynamic content)', {
    amount: data.amount,
    currency: data.currency,
    title: `${data.title?.substring(0, 50)}...`,
    source,
    timestamp: new Date(timestamp).toISOString(),
  });

  chrome.storage.local.get(['currentProduct'], (result) => {
    if (chrome.runtime.lastError) {
      storeLog.error(ErrorCode.STO_E001, 'Failed to get existing data', {
        error: new Error(chrome.runtime.lastError.message || 'Storage error'),
      });
      sendResponse({
        success: false,
        error: chrome.runtime.lastError.message,
      });
      return;
    }

    const existingData = (result.currentProduct || {}) as Partial<StoredProductData>;

    const mergedData = {
      ...existingData,
      ...data,
      url: existingData?.url || data.url,
      timestamp: existingData?.timestamp || timestamp,
      updatedAt: new Date().toISOString(),
      updateSource: source,
    };

    chrome.storage.local.set(
      {
        currentProduct: mergedData,
        lastUpdated: timestamp,
      },
      () => {
        if (chrome.runtime.lastError) {
          storeLog.error(ErrorCode.STO_E001, 'Failed to update data', {
            error: new Error(chrome.runtime.lastError.message || 'Storage error'),
          });
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
          return;
        }

        storeLog.info('✅ Product data updated', {
          amount: mergedData.amount,
          cardBenefits: mergedData.cardBenefits?.length || 0,
          hasCashback: !!mergedData.cashback,
        });

        sendResponse({
          success: true,
          message: 'Data updated from dynamic content',
          updatedData: {
            amount: mergedData.amount,
            cardBenefits: mergedData.cardBenefits,
          },
        });
      }
    );
  });

  return true; // Keep message channel open
}

/**
 * Main Message Router
 */
export function setupMessageHandlers(): void {
  chrome.runtime.onMessage.addListener(
    (
      message: MessageType,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: unknown) => void
    ) => {
      networkLog.info('📨 Message received', {
        type: message.type,
        senderUrl: sender.url,
        senderTab: sender.tab?.id,
      });

      try {
        switch (message.type) {
          case 'SAVE_PRODUCT_DATA':
            return handleSaveProductData(message, sendResponse);

          case 'GET_PRODUCT_DATA':
            return handleGetProductData(sendResponse);

          case 'OPEN_AUTO_POPUP':
            return handleOpenAutoPopup(sendResponse);

          case 'COMPARE_PRICES':
            return handleComparePrices(message, sendResponse);

          case 'CHECK_COMPARISON_SERVER':
            return handleCheckComparisonServer(sendResponse);

          case 'UPDATE_PRODUCT_DATA':
            return handleUpdateProductData(message, sendResponse);

          default:
            networkLog.warn('⚠️ Unknown message type', { type: (message as { type: string }).type });
            sendResponse({
              success: false,
              error: 'Unknown message type',
            });
            return false;
        }
      } catch (error) {
        networkLog.error(ErrorCode.NET_E001, 'Message handling error', {
          error: error instanceof Error ? error : new Error(String(error)),
        });
        sendResponse({
          success: false,
          error: String(error),
        });
        return false;
      }
    }
  );
}
