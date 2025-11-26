import { COUPANG_SELECTORS } from '../constants';

export const extractShippingInfo = (doc: Document): string | null => {
  const shippingEl = doc.querySelector(COUPANG_SELECTORS.shipping);
  return shippingEl?.textContent?.trim() || null;
};
