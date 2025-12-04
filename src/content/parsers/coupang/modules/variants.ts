import { COUPANG_SELECTORS } from '../constants';
import { parseLog, ErrorCode } from '../../../../shared/utils/logger';

export const extractVariants = (doc: Document): Array<{ name: string; price: number; discount?: string }> => {
  try {
    const variants: Array<{ name: string; price: number; discount?: string }> = [];
    const seen = new Set<string>();

    const instantOption = doc.querySelector(COUPANG_SELECTORS.instantOption);
    if (!instantOption) {
      return variants;
    }

    const listItems = instantOption.querySelectorAll('section > ul > li');

    for (const li of listItems) {
      try {
        const divs = li.querySelectorAll('div');
        if (divs.length < 2) continue;

        let name = '';
        for (const div of divs) {
          const text = div.textContent || '';
          if (!text.includes('원') && text.trim().length > 0 && !text.includes('px')) {
            name = text.trim();
            break;
          }
        }

        let priceStr = '';
        for (const div of divs) {
          const text = div.textContent || '';
          const match = text.match(/[\d,]+원/);
          if (match) {
            priceStr = match[0].replace(/[,원]/g, '');
            break;
          }
        }

        if (!priceStr) continue;

        const price = parseInt(priceStr);
        if (!price || price < 100) continue;

        if (!name || name.length < 2) continue;

        const key = `${name}-${price}`;
        if (seen.has(key)) continue;

        variants.push({ name, price });
        seen.add(key);

        if (variants.length >= 15) break;
      } catch (err) {
        parseLog.warn('Error parsing list item', { error: err });
        continue;
      }
    }

    return variants;
  } catch (err) {
    parseLog.error(ErrorCode.PAR_E001, 'Error extracting variants', {
      error: err instanceof Error ? err : new Error(String(err)),
    });
    return [];
  }
};
