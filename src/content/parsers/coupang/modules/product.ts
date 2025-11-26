import { COUPANG_SELECTORS } from '../constants';

export const extractTitle = (doc: Document): string | null => {
  for (const selector of COUPANG_SELECTORS.title) {
    const el = doc.querySelector(selector);
    if (el?.textContent) {
      return el.textContent.trim();
    }
  }
  return null;
};

export const extractProductImage = (doc: Document): string | null => {
  try {
    // 1. Direct selector
    const mainImage = doc.querySelector(COUPANG_SELECTORS.mainImage) as HTMLImageElement;

    if (mainImage?.src) {
      let src = mainImage.src;
      if (src.startsWith('//')) src = 'https:' + src;
      src = src.split('?')[0];
      return src;
    }

    // 2. Fallback: First thumbnail
    const thumbnailContainer = doc.querySelector(COUPANG_SELECTORS.thumbnailContainer);

    if (thumbnailContainer) {
      const firstThumbnail = thumbnailContainer.querySelector('ul > li:first-child img');

      if (firstThumbnail) {
        let src = (firstThumbnail as HTMLImageElement).src;

        if (src) {
          if (src.startsWith('//')) {
            src = 'https:' + src;
          }

          if (src.includes('thumbnails/remote/')) {
            src = src.replace(/thumbnails\/remote\/\d+x\d+ex/, 'thumbnails/remote/800x800ex');
          }

          src = src.split('?')[0];
          return src;
        }
      }
    }

    return null;
  } catch (err) {
    console.error('[CoupangParser] Error extracting main image:', err);
    return null;
  }
};

export const extractAllProductImages = (doc: Document): string[] => {
  try {
    const images: string[] = [];
    const seen = new Set<string>();

    const thumbnailContainer = doc.querySelector(COUPANG_SELECTORS.thumbnailContainer);

    if (thumbnailContainer) {
      const allThumbnails = thumbnailContainer.querySelectorAll('ul > li img');

      for (const el of allThumbnails) {
        const imgEl = el as HTMLImageElement;
        let src = imgEl.src;

        if (!src) continue;
        if (seen.has(src)) continue;

        if (src.startsWith('//')) {
          src = 'https:' + src;
        }

        if (src.includes('thumbnails/remote/')) {
          src = src.replace(/thumbnails\/remote\/\d+x\d+ex/, 'thumbnails/remote/800x800ex');
        }

        src = src.split('?')[0];

        if (seen.has(src)) continue;

        images.push(src);
        seen.add(src);

        if (images.length >= 10) break;
      }
    }

    return images;
  } catch (err) {
    console.error('[CoupangParser] Error extracting all images:', err);
    return [];
  }
};
