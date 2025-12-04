/**
 * Background Service Worker
 *
 * 책임:
 * 1. Content Script에서 SAVE_PRODUCT_DATA 메시지 받음
 * 2. chrome.storage에 데이터 저장
 * 3. Content Script에 성공 응답
 * 4. Popup을 자동 표시 (optional)
 * 5. 가격 비교 API 호출
 */

import { extLog, networkLog, storeLog, ErrorCode } from '../shared/utils/logger';

extLog.info('🟢 Service Worker initialized');

// 가격 비교 서버 URL
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
      originalPrice?: number;
      currency: string;
      url: string;
      image?: string;
      rating?: number;
      ratingCount?: number;
      isFreeShipping?: boolean;
      deliveryInfo?: string;
    }>;
    error?: string;
    duration: number;
  }>;
  totalDuration: number;
  fromCache?: boolean;
}

interface PriceComparisonMessage {
  type: 'COMPARE_PRICES';
  query: string;
  providers?: string[];
}

/**
 * 가격 비교 API 호출
 */
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

chrome.runtime.onMessage.addListener(
  (
    message: { type: string;[key: string]: unknown },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: unknown) => void
  ) => {
    networkLog.info('📨 Message received', {
      type: message.type,
      senderUrl: sender.url,
      senderTab: sender.tab?.id,
    });

    try {
      if (message.type === 'SAVE_PRODUCT_DATA') {
        const { data, url, timestamp } = message as unknown as {
        data: ProductData;
        url: string;
        timestamp: number;
      };   storeLog.info('💾 Saving product data', {
          amount: data.amount,
          currency: data.currency,
          title: data.title?.substring(0, 50) + '...',
          url,
          timestamp: new Date(timestamp).toISOString(),
        });

        // 데이터 저장
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
            storeLog.info('✅ Data saved to chrome.storage.local');
            storeLog.debug('📊 Stored product', {
              amount: productData.amount,
              currency: productData.currency,
              title: productData.title?.substring(0, 50) + '...',
            });

            // Popup 자동 표시 (선택적)
            // TODO: Auto popup trigger needed?
            // chrome.action.openPopup();

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
        storeLog.debug('🔍 GET_PRODUCT_DATA request');
        chrome.storage.local.get(['currentProduct'], (result) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const currentProduct = result.currentProduct as any;
          storeLog.debug('📦 Retrieved product data', {
            exists: !!currentProduct,
            amount: currentProduct?.amount,
            title: currentProduct?.title?.substring(0, 50) + '...',
          });
          sendResponse({
            success: true,
            data: result.currentProduct || null,
          });
        });

        return true;
      }

      if (message.type === 'OPEN_AUTO_POPUP') {
        extLog.info('🎪 Opening Auto Popup (SubPopup window)');
        chrome.windows.create({
          url: chrome.runtime.getURL('src/subpopup/index.html?auto=true'),
          type: 'popup',
          width: 420,
          height: 300,
        }, (window) => {
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
        });

        return true;
      }

      // 가격 비교 요청 처리
      if (message.type === 'COMPARE_PRICES') {
        const { query, providers: targetProviders } = message as unknown as PriceComparisonMessage;
        
        networkLog.info('💰 Price comparison request', {
          query,
          providers: targetProviders || 'all',
        });

        fetchPriceComparison(query, targetProviders)
          .then((result) => {
            networkLog.info('✅ Price comparison completed', {
              success: result.success,
              resultCount: result.results.length,
              totalDuration: result.totalDuration,
              fromCache: result.fromCache,
            });
            sendResponse({
              success: true,
              data: result,
            });
          })
          .catch((error) => {
            networkLog.error(ErrorCode.NET_E002, 'Price comparison failed', {
              error: error instanceof Error ? error : new Error(String(error)),
            });
            sendResponse({
              success: false,
              error: error instanceof Error ? error.message : '가격 비교 실패',
            });
          });

        return true;
      }

      // 가격 비교 서버 상태 확인
      if (message.type === 'CHECK_COMPARISON_SERVER') {
        networkLog.debug('🔍 Checking comparison server status');
        
        fetch(`${COMPARISON_SERVER_URL}/api/health`)
          .then((response) => response.json())
          .then((data) => {
            networkLog.info('✅ Comparison server is healthy', data);
            sendResponse({
              success: true,
              data,
            });
          })
          .catch((error) => {
            networkLog.error(ErrorCode.NET_E001, 'Comparison server is down', {
              error: error instanceof Error ? error : new Error(String(error)),
            });
            sendResponse({
              success: false,
              error: '가격 비교 서버에 연결할 수 없습니다',
            });
          });

        return true;
      }

      if (message.type === 'UPDATE_PRODUCT_DATA') {
        const { data, timestamp, source } = message as unknown as { data: ProductData; timestamp: number; source: string };

        storeLog.info('🔄 Updating product data (dynamic content)', {
          amount: data.amount,
          currency: data.currency,
          title: data.title?.substring(0, 50) + '...',
          source,
          timestamp: new Date(timestamp).toISOString(),
        });

        // 기존 데이터 조회
        chrome.storage.local.get(['currentProduct'], (result) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const existingData = (result.currentProduct || {}) as any;

          // 기존 데이터와 새로운 데이터 병합
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

        return true;
      }

      networkLog.warn('⚠️ Unknown message type', { type: message.type });
      sendResponse({
        success: false,
        error: 'Unknown message type',
      });
    } catch (error) {
      networkLog.error(ErrorCode.NET_E001, 'Message handling error', {
        error: error instanceof Error ? error : new Error(String(error)),
      });
      sendResponse({
        success: false,
        error: String(error),
      });
    }

    return false;
  }
);
