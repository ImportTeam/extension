/**
 * Site Detection
 * 책임: URL 기반 사이트 감지
 */

import { CoupangParser, AmazonParser, EbayParser, ElevenStreetParser } from './parsers';

export interface SiteInfo {
  site: string;
  isCheckout: boolean;
}

export function detectSite(url: string): SiteInfo | null {
  if (CoupangParser.isCheckoutPage(url)) {
    return { site: 'coupang', isCheckout: true };
  }
  if (ElevenStreetParser.isProductPage(url)) {
    return { site: '11st', isCheckout: true };
  }
  if (AmazonParser.isCheckoutPage(url)) {
    return { site: 'amazon', isCheckout: true };
  }
  if (EbayParser.isCheckoutPage(url)) {
    return { site: 'ebay', isCheckout: true };
  }
  return null;
}
