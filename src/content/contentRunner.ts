/**
 * Content Script Runner
 * 책임: 파싱 실행 및 UI 마운트 조율
 */

import { ParsedProductInfo } from '@/shared/types';
import { mountToggleBar, updateToggleBar, type ToggleProductData } from './ui/toggleBar';
import { detectSite } from './siteDetector';
import { createParser, createFallbackParser } from './parserFactory';
import { saveProductData, type MessageSource } from './backgroundMessaging';
import { setupDynamicContentObserver, type CleanupFn } from './dynamicObserver';
import { setupElevenStreetBenefitWatcher } from './elevenStreetBenefits';
import { logger, LogDomain, ErrorCode } from '@/shared/utils/logger';
import { useSettingsStore } from '@/shared/store/slices/settings';
import { STORAGE_KEYS } from '@/shared/store/middleware';

const isMainFrame = window.self === window.top;
let hasRun = false;

let lastExtractionResult: ExtractionResult | null = null;

/** cleanup 함수들 모음 */
const cleanupFns: CleanupFn[] = [];

export interface ExtractionResult {
  paymentInfo: ParsedProductInfo;
  site: string;
}

/**
 * 최저가 비교 요청 전송 (강화된 버전)
 */
async function sendPriceComparisonRequest(
  productUrl: string,
  productName: string
): Promise<void> {
  try {
    logger.info(LogDomain.NETWORK, '💰 [LOWEST_PRICE] Initiating price comparison', {
      url: productUrl,
      product: productName,
      timestamp: new Date().toISOString(),
    });

    // Chrome API 체크
    if (!chrome?.runtime?.sendMessage) {
      logger.error(LogDomain.NETWORK, ErrorCode.NET_E002, 'Chrome extension API not available', {});
      return;
    }

    // 1. 서버 헬스 체크
    logger.debug(LogDomain.NETWORK, '[LOWEST_PRICE] Checking server health...');
    const serverCheck = await chrome.runtime.sendMessage({
      type: 'CHECK_COMPARISON_SERVER',
    });

    if (!serverCheck?.success) {
      logger.error(LogDomain.NETWORK, ErrorCode.NET_E002, '[LOWEST_PRICE] Server not available', {
        error: serverCheck?.error || 'Server check failed',
      });
      return;
    }

    logger.info(LogDomain.NETWORK, '[LOWEST_PRICE] Server healthy, sending comparison request');

    // 2. 가격 비교 요청
    const response = await chrome.runtime.sendMessage({
      type: 'COMPARE_PRICES',
      query: productName,
    });

    if (response?.success) {
      logger.info(LogDomain.NETWORK, '✅ [LOWEST_PRICE] Price comparison completed', {
        resultCount: response.data?.results?.length || 0,
        fromCache: response.data?.fromCache,
        totalDuration: response.data?.totalDuration,
      });
    } else {
      logger.warn(LogDomain.NETWORK, '[LOWEST_PRICE] Price comparison failed', {
        error: response?.error,
      });
    }
  } catch (error) {
    logger.error(LogDomain.NETWORK, ErrorCode.NET_E002, '[LOWEST_PRICE] Request error', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }
}

interface PersistApi {
  hasHydrated?: () => boolean;
  rehydrate?: () => unknown;
  onFinishHydration?: (cb: () => void) => () => void;
}

async function waitForSettingsHydration(timeoutMs = 1500, forceRehydrate = false): Promise<void> {
  const persistApi = (useSettingsStore as unknown as { persist?: PersistApi }).persist;
  if (!persistApi) return;
  if (persistApi.hasHydrated?.() && !forceRehydrate) return;

  await new Promise<void>((resolve) => {
    let done = false;
    const timeout = window.setTimeout(() => {
      if (done) return;
      done = true;
      resolve();
    }, timeoutMs);

    const unsub = persistApi.onFinishHydration?.(() => {
      if (done) return;
      done = true;
      window.clearTimeout(timeout);
      if (unsub) unsub();
      resolve();
    });

    try {
      persistApi.rehydrate?.();
    } catch {
      // ignore
    }
  });
}

export function extractPaymentInfo(): ExtractionResult | null {
  const url = window.location.href;
  const siteInfo = detectSite(url);

  if (!siteInfo) {
    logger.debug(LogDomain.PARSER, 'Not a supported page', { url });
    return null;
  }

  logger.info(LogDomain.PARSER, `Site detected: ${siteInfo.site}`, { url });

  const parser = createParser(siteInfo.site);
  let result = parser.parse(document);

  if (!result) {
    logger.warn(LogDomain.PARSER, 'Primary parser failed, trying fallback', { site: siteInfo.site });
    result = createFallbackParser().parse(document);
    if (!result) {
      logger.error(LogDomain.PARSER, ErrorCode.PAR_E002, 'Fallback parser also failed', {
        data: { site: siteInfo.site, url },
      });
      return null;
    }
  }

  logger.info(LogDomain.PARSER, 'Parse successful', {
    title: result.title?.substring(0, 50),
    amount: result.amount,
    cardBenefitsCount: result.cardBenefits?.length ?? 0,
  });

  return { paymentInfo: result, site: siteInfo.site };
}

function toToggleData(paymentInfo: ParsedProductInfo, site: string): ToggleProductData {
  return { ...paymentInfo, site } as ToggleProductData;
}

function reparseAndNotify(source: MessageSource): boolean {
  const result = extractPaymentInfo();
  if (!result) return false;

  lastExtractionResult = result;

  updateToggleBar(toToggleData(result.paymentInfo, result.site));
  saveProductData(result.paymentInfo, source);
  return true;
}

function init(): void {
  const result = extractPaymentInfo();
  if (!result) {
    logger.warn(LogDomain.BOOTSTRAP, 'Failed to extract payment info on init');
    return;
  }

  lastExtractionResult = result;

  mountToggleBar(toToggleData(result.paymentInfo, result.site));
  saveProductData(result.paymentInfo, 'initial');

  // NOTE: persist rehydrate는 비동기라서, init 시점에 getState()는 기본값(card-benefits)일 수 있다.
  // settings hydrate 완료를 기다린 뒤 모드 분기한다.
  void (async () => {
    await waitForSettingsHydration();
    const settings = useSettingsStore.getState();

    logger.info(LogDomain.BOOTSTRAP, '⚙️ Display mode check', {
      displayMode: settings.displayMode,
      autoFetchLowestPrice: settings.autoFetchLowestPrice,
      hasTitle: !!result.paymentInfo.title,
    });

    // 표시 모드가 최저가 비교일 때만 가격 비교 로직을 사용
    if (settings.displayMode === 'lowest-price') {
      if (!result.paymentInfo.title) {
        logger.warn(LogDomain.BOOTSTRAP, '⚠️ [LOWEST_PRICE] Cannot fetch: no product title');
        return;
      }

      if (settings.autoFetchLowestPrice) {
        logger.info(LogDomain.BOOTSTRAP, '🚀 [LOWEST_PRICE] Auto fetch enabled', {
          displayMode: settings.displayMode,
          productTitle: result.paymentInfo.title.substring(0, 50),
        });

        // BE(가격 비교 서버)에 가격 비교 요청 전송
        void sendPriceComparisonRequest(window.location.href, result.paymentInfo.title);
      } else {
        logger.info(LogDomain.BOOTSTRAP, '⏸️ [LOWEST_PRICE] Manual mode (will fetch when panel opens)', {
          displayMode: settings.displayMode,
        });
      }
    } else {
      logger.debug(LogDomain.BOOTSTRAP, '💳 Card benefits mode selected');
    }
  })();
}

/**
 * 모든 observer/watcher cleanup 실행
 */
function cleanupAll(): void {
  cleanupFns.forEach((cleanup) => {
    try {
      cleanup();
    } catch (e) {
      logger.warn(LogDomain.BOOTSTRAP, 'Cleanup error', { error: e });
    }
  });
  cleanupFns.length = 0;
}

export function runContentScript(): void {
  if (!isMainFrame || hasRun) return;
  hasRun = true;

  logger.info(LogDomain.BOOTSTRAP, 'Content script starting');
  init();

  // Options에서 설정을 변경해도, 이미 열려있는 탭에서는 store가 즉시 갱신되지 않을 수 있다.
  // chrome.storage 변경 이벤트를 받아 rehydrate + UI rerender를 트리거한다.
  if (chrome?.storage?.onChanged) {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== 'local') return;
      if (!changes || !Object.prototype.hasOwnProperty.call(changes, STORAGE_KEYS.SETTINGS)) return;

      void (async () => {
        await waitForSettingsHydration(1500, true);
        const settings = useSettingsStore.getState();

        // UI 갱신 (renderContent는 getState()를 읽으므로 updateToggleBar로 rerender만 시켜주면 됨)
        if (lastExtractionResult) {
          updateToggleBar(toToggleData(lastExtractionResult.paymentInfo, lastExtractionResult.site));
        }

        // 설정 변경이 최저가 모드 + 자동 검색으로 바뀌면 즉시 실행
        if (
          settings.displayMode === 'lowest-price' &&
          settings.autoFetchLowestPrice &&
          lastExtractionResult?.paymentInfo?.title
        ) {
          void sendPriceComparisonRequest(window.location.href, lastExtractionResult.paymentInfo.title);
        }
      })();
    });
  }
  
  // Observer들 설정하고 cleanup 함수 저장
  const dynamicCleanup = setupDynamicContentObserver((source) => reparseAndNotify(source as MessageSource));
  cleanupFns.push(dynamicCleanup);

  const benefitCleanup = setupElevenStreetBenefitWatcher((source) => {
    reparseAndNotify(source as MessageSource);
  });
  cleanupFns.push(benefitCleanup);

  // 페이지 언로드 시 전체 cleanup
  window.addEventListener('beforeunload', cleanupAll, { once: true });
}
