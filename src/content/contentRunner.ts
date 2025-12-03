/**
 * Content Script Runner
 * 책임: 파싱 실행 및 UI 마운트 조율
 */

import { ParsedProductInfo } from '../shared/types';
import { mountToggleBar, updateToggleBar, type ToggleProductData } from './ui/toggleBar';
import { detectSite } from './siteDetector';
import { createParser, createFallbackParser } from './parserFactory';
import { saveProductData, type MessageSource } from './backgroundMessaging';
import { setupDynamicContentObserver } from './dynamicObserver';
import { setupElevenStreetBenefitWatcher } from './elevenStreetBenefits';

const isMainFrame = window.self === window.top;
let hasRun = false;

export interface ExtractionResult {
  paymentInfo: ParsedProductInfo;
  site: string;
}

export function extractPaymentInfo(): ExtractionResult | null {
  const url = window.location.href;
  const siteInfo = detectSite(url);

  if (!siteInfo) {
    console.log('[Content] ❌ Not a supported page');
    return null;
  }

  console.log(`[Content] ✅ Site detected: ${siteInfo.site}`);

  const parser = createParser(siteInfo.site);
  let result = parser.parse(document);

  if (!result) {
    console.warn('[Content] ⚠️ Primary parser failed, trying fallback');
    result = createFallbackParser().parse(document);
    if (!result) {
      console.warn('[Content] ❌ Fallback parser also failed');
      return null;
    }
  }

  console.log('[Content] ✅ Parse successful:', {
    title: result.title?.substring(0, 50),
    amount: result.amount,
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
    console.warn('[ContentScript] ❌ Failed to extract payment info');
    return;
  }

  mountToggleBar(toToggleData(result.paymentInfo, result.site));
  saveProductData(result.paymentInfo, 'initial');
}

export function runContentScript(): void {
  if (!isMainFrame || hasRun) return;
  hasRun = true;

  init();
  setupDynamicContentObserver((source) => reparseAndNotify(source as MessageSource));
  setupElevenStreetBenefitWatcher((source) => {
    reparseAndNotify(source as MessageSource);
  });
}
