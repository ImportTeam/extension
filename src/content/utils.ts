/**
 * Content Script Utilities
 */

import { contentLogger as logger } from '@/shared/logger';

/**
 * Detect if current page is a checkout page
 */
export function detectCheckoutPage(url: string): boolean {
  const checkoutPatterns = [
    /coupang\.com\/checkout/,
    /order\.pay\.naver\.com/,
    /checkout\.gmarket\.co\.kr/
  ];

  return checkoutPatterns.some(pattern => pattern.test(url));
}

/**
 * Extract basic payment information from DOM
 */
export function extractBasicInfo(doc: Document) {
  // TODO: Implement site-specific parsers
  // This is a placeholder implementation

  const bodyText = doc.body.textContent || '';

  // Simple amount extraction (placeholder)
  const amountMatch = bodyText.match(/(\d{1,3}(,\d{3})*)원/);
  const amount = amountMatch ?
    parseInt(amountMatch[1].replace(/,/g, ''), 10) : null;

  logger.debug('Extracted basic payment info', { amount, hasMatch: !!amountMatch });

  if (!amount) {
    return null;
  }

  return {
    amount,
    currency: 'KRW',
    methods: ['card', 'paypal'], // placeholder
    confidence: 0.3 // low confidence for fallback
  };
}
