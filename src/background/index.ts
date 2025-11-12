/**
 * Background Service Worker
 *
 * 책임:
 * 1. Content Script에서 SAVE_PRODUCT_DATA 메시지 받음
 * 2. chrome.storage에 데이터 저장
 * 3. Content Script에 성공 응답
 * 4. Popup을 자동 표시 (optional)
 */

console.log('[Background] 🟢 Service Worker initialized');

chrome.runtime.onMessage.addListener(
  (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void
  ) => {
    console.log('[Background] 📨 Message received', {
      type: message.type,
      senderUrl: sender.url,
      senderTab: sender.tab?.id,
    });

    try {
      if (message.type === 'SAVE_PRODUCT_DATA') {
        const { data, url, timestamp } = message;

        console.log('[Background] 💾 Saving product data:', {
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
            console.log('[Background] ✅ Data saved to chrome.storage.local');
            console.log('[Background] 📊 Stored product:', {
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
        console.log('[Background] 🔍 GET_PRODUCT_DATA request');
        chrome.storage.local.get(['currentProduct'], (result) => {
          console.log('[Background] 📦 Retrieved product data:', {
            exists: !!result.currentProduct,
            amount: result.currentProduct?.amount,
            title: result.currentProduct?.title?.substring(0, 50) + '...',
          });
          sendResponse({
            success: true,
            data: result.currentProduct || null,
          });
        });

        return true;
      }

      if (message.type === 'OPEN_AUTO_POPUP') {
        console.log('[Background] 🎪 Opening Auto Popup (SubPopup window)');
        chrome.windows.create({
          url: chrome.runtime.getURL('src/subpopup/index.html?auto=true'),
          type: 'popup',
          width: 420,
          height: 300,
        }, (window) => {
          if (chrome.runtime.lastError) {
            console.error('[Background] ❌ Failed to open Auto Popup:', chrome.runtime.lastError);
            sendResponse({
              success: false,
              error: chrome.runtime.lastError.message,
            });
          } else {
            console.log('[Background] ✅ Auto Popup window created:', {
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

      if (message.type === 'UPDATE_PRODUCT_DATA') {
        const { data, timestamp, source } = message;

        console.log('[Background] 🔄 Updating product data (dynamic content):', {
          amount: data.amount,
          currency: data.currency,
          title: data.title?.substring(0, 50) + '...',
          source,
          timestamp: new Date(timestamp).toISOString(),
        });

        // 기존 데이터 조회
        chrome.storage.local.get(['currentProduct'], (result) => {
          const existingData = result.currentProduct;
          
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
              console.log('[Background] ✅ Product data updated:', {
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

      console.warn('[Background] ⚠️ Unknown message type:', message.type);
      sendResponse({
        success: false,
        error: 'Unknown message type',
      });
    } catch (error) {
      console.error('[Background] ❌ Error:', error);
      sendResponse({
        success: false,
        error: String(error),
      });
    }

    return false;
  }
);
