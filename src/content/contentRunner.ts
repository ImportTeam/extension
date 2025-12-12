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

const isMainFrame = window.self === window.top;
let hasRun = false;

/** cleanup 함수들 모음 */
const cleanupFns: CleanupFn[] = [];

export interface ExtractionResult {
  paymentInfo: ParsedProductInfo;
  site: string;
}

/**
 * 최저가 비교 요청 전송
 */
async function sendPriceComparisonRequest(
  productUrl: string,
  productName: string
): Promise<void> {
  try {
    logger.info(LogDomain.NETWORK, 'Sending price comparison request', {
      url: productUrl,
      product: productName,
    });

    const response = await chrome.runtime.sendMessage({
      type: 'COMPARE_PRICES',
      query: productName,
      providers: ['coupang', '11st', 'gmarket'],
    });

    if (response?.success) {
      logger.info(LogDomain.NETWORK, 'Price comparison completed', {
        resultCount: response.data?.results?.length || 0,
      });
    } else {
      logger.warn(LogDomain.NETWORK, 'Price comparison failed', {
        error: response?.error,
      });
    }
  } catch (error) {
    logger.error(LogDomain.NETWORK, ErrorCode.NET_E002, 'Price comparison request error', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }
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

  mountToggleBar(toToggleData(result.paymentInfo, result.site));
  saveProductData(result.paymentInfo, 'initial');

  // Settings store에서 자동 최저가 검색 설정 확인
  const settings = useSettingsStore.getState();
  if (settings.autoFetchLowestPrice && result.paymentInfo.title) {
    logger.info(LogDomain.BOOTSTRAP, 'Auto fetch lowest price enabled', {
      displayMode: settings.displayMode,
    });
    
    // BE에 가격 비교 요청 전송
    sendPriceComparisonRequest(
      window.location.href,
      result.paymentInfo.title
    );
  }
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
