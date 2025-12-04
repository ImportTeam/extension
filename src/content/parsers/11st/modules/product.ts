/**
 * 11번가 상품 정보 추출 모듈
 */

import { ELEVEN_ST_SELECTORS } from '../constants';
import { parseLog, ErrorCode } from '../../../../shared/utils/logger';

export interface ProductInfo {
  title: string | null;
  subtitle: string | null;
  productId: string | null;
  seller: string | null;
  sellerRating: string | null;
}

/**
 * 상품 제목 추출
 */
export const extractTitle = (doc: Document): string | null => {
  const selectors = ELEVEN_ST_SELECTORS.product;

  try {
    // 메인 제목
    const titleEl = doc.querySelector(selectors.title);
    if (titleEl?.textContent) {
      const title = titleEl.textContent.trim();
      parseLog.debug('제목 추출', { title });
      return title;
    }

    // 대체 제목 셀렉터
    const altTitleEl = doc.querySelector(selectors.titleAlt);
    if (altTitleEl?.textContent) {
      const title = altTitleEl.textContent.trim();
      parseLog.debug('제목 추출 (alt)', { title });
      return title;
    }
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E001, '제목 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return null;
};

/**
 * 부제목 추출
 */
export const extractSubtitle = (doc: Document): string | null => {
  try {
    const subtitleEl = doc.querySelector(ELEVEN_ST_SELECTORS.product.subtitle);
    if (subtitleEl?.textContent) {
      const subtitle = subtitleEl.textContent.trim();
      parseLog.debug('부제목 추출', { subtitle });
      return subtitle;
    }
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E001, '부제목 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return null;
};

/**
 * 상품 ID 추출 (URL에서)
 */
export const extractProductId = (url: string): string | null => {
  try {
    // URL 패턴: https://www.11st.co.kr/products/6823058399
    const patterns = [
      /11st\.co\.kr\/products\/(\d+)/,
      /11st\.co\.kr\/product\/.*?\/(\d+)/,
      /prdNo=(\d+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match?.[1]) {
        parseLog.debug('상품ID 추출', { productId: match[1] });
        return match[1];
      }
    }
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E001, '상품ID 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return null;
};

/**
 * 메인 상품 이미지 추출
 */
export const extractProductImage = (doc: Document): string | null => {
  const selectors = ELEVEN_ST_SELECTORS.image;

  try {
    // 메인 이미지
    const mainImgEl = doc.querySelector(selectors.main) as HTMLImageElement;
    if (mainImgEl?.src) {
      const src = normalizeImageUrl(mainImgEl.src);
      parseLog.debug('메인 이미지 추출', { src });
      return src;
    }

    // 대체 메인 이미지
    const altImgEl = doc.querySelector(selectors.mainAlt) as HTMLImageElement;
    if (altImgEl?.src) {
      const src = normalizeImageUrl(altImgEl.src);
      parseLog.debug('메인 이미지 추출 (alt)', { src });
      return src;
    }

    // data-src 속성 확인
    const lazyImgEl = doc.querySelector(`${selectors.main}[data-src]`) as HTMLElement;
    if (lazyImgEl?.dataset?.src) {
      const src = normalizeImageUrl(lazyImgEl.dataset.src);
      parseLog.debug('메인 이미지 추출 (lazy)', { src });
      return src;
    }
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E001, '이미지 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return null;
};

/**
 * 모든 상품 이미지 추출 (썸네일 포함)
 */
export const extractAllProductImages = (doc: Document): string[] => {
  const images: string[] = [];
  const seenUrls = new Set<string>();
  const selectors = ELEVEN_ST_SELECTORS.image;

  try {
    // 메인 이미지
    const mainImage = extractProductImage(doc);
    if (mainImage) {
      images.push(mainImage);
      seenUrls.add(mainImage);
    }

    // 썸네일 이미지들
    const thumbnails = doc.querySelectorAll(selectors.thumbnail);
    thumbnails.forEach((thumb) => {
      const img = thumb as HTMLImageElement;
      const src = img.src || img.dataset?.src;
      if (src) {
        const normalizedSrc = normalizeImageUrl(src);
        // 고화질 이미지 URL로 변환 (썸네일 → 원본)
        const highResSrc = convertToHighResImage(normalizedSrc);
        if (!seenUrls.has(highResSrc)) {
          images.push(highResSrc);
          seenUrls.add(highResSrc);
        }
      }
    });

    // 대체 셀렉터로 이미지 검색
    const altThumbnails = doc.querySelectorAll(selectors.thumbnailAlt);
    altThumbnails.forEach((thumb) => {
      const img = thumb as HTMLImageElement;
      const src = img.src || img.dataset?.src;
      if (src) {
        const normalizedSrc = normalizeImageUrl(src);
        const highResSrc = convertToHighResImage(normalizedSrc);
        if (!seenUrls.has(highResSrc)) {
          images.push(highResSrc);
          seenUrls.add(highResSrc);
        }
      }
    });

    parseLog.debug('전체 이미지 추출', { count: images.length });
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E001, '전체 이미지 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return images;
};

/**
 * 판매자 정보 추출
 */
export const extractSellerInfo = (doc: Document): { seller: string | null; rating: string | null } => {
  const selectors = ELEVEN_ST_SELECTORS.seller;
  const result = { seller: null as string | null, rating: null as string | null };

  try {
    // 판매자명
    const sellerEl = doc.querySelector(selectors.name);
    if (sellerEl?.textContent) {
      result.seller = sellerEl.textContent.trim();
      parseLog.debug('판매자 추출', { seller: result.seller });
    }

    // 판매자 등급
    const ratingEl = doc.querySelector(selectors.rating);
    if (ratingEl?.textContent) {
      result.rating = ratingEl.textContent.trim();
      parseLog.debug('판매자 등급 추출', { rating: result.rating });
    }
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E001, '판매자 정보 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return result;
};

/**
 * 이미지 URL 정규화
 */
function normalizeImageUrl(url: string): string {
  if (!url) return url;
  
  // 프로토콜 추가
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  
  return url;
}

/**
 * 썸네일 이미지를 고화질 이미지로 변환
 * 예: /100/thumb → /600/origin (11번가 CDN 패턴에 맞게 조정 필요)
 */
function convertToHighResImage(url: string): string {
  if (!url) return url;
  
  // 11번가 CDN 이미지 크기 변환 패턴
  // 예: cdn.011st.com/.../100/... → cdn.011st.com/.../600/...
  return url
    .replace(/\/(?:50|70|100|110|140|160)\//, '/600/')
    .replace(/\/thumb/, '/origin');
}
