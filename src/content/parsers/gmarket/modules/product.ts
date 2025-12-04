/**
 * G마켓 상품 정보 추출 모듈
 * 책임: 상품명, 이미지 URL 추출
 */

import { GMARKET_SELECTORS } from '../constants';
import { parseLog } from '../../../../shared/utils/logger';

/**
 * 상품명 추출
 */
export const extractTitle = (doc: Document): string | null => {
  const titleEl = doc.querySelector(GMARKET_SELECTORS.product.title);
  if (titleEl?.textContent) {
    const title = titleEl.textContent.trim();
    parseLog.debug('상품명', { title });
    return title;
  }

  parseLog.warn('상품명을 찾을 수 없음');
  return null;
};

/**
 * 상품 이미지 URL 추출
 * gdimg.gmarket.co.kr에서 이미지 가져오기
 */
export const extractProductImage = (doc: Document): string | null => {
  // 1. 메인 이미지 직접 찾기 (600px 버전 우선)
  const mainImages = doc.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]');
  
  for (const img of mainImages) {
    const imgEl = img as HTMLImageElement;
    const src = imgEl.src;
    
    // 600px 이미지 우선
    if (src.includes('/still/600')) {
      parseLog.debug('메인 이미지 (600px)', { src });
      return src;
    }
  }
  
  // 2. 400px 또는 300px 버전
  for (const img of mainImages) {
    const imgEl = img as HTMLImageElement;
    const src = imgEl.src;
    
    if (src.includes('/still/')) {
      parseLog.debug('메인 이미지', { src });
      return src;
    }
  }

  // 3. 대체 선택자
  const altImage = doc.querySelector(GMARKET_SELECTORS.product.mainImage) as HTMLImageElement;
  if (altImage?.src) {
    parseLog.debug('대체 이미지', { src: altImage.src });
    return altImage.src;
  }

  parseLog.warn('상품 이미지를 찾을 수 없음');
  return null;
};

/**
 * 모든 상품 이미지 추출
 */
export const extractAllProductImages = (doc: Document): string[] => {
  const images: string[] = [];
  const imageEls = doc.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]');

  imageEls.forEach((img) => {
    const imgEl = img as HTMLImageElement;
    let src = imgEl.src;
    
    // 프로토콜 없는 URL 처리
    if (src.startsWith('//')) {
      src = `https:${src}`;
    }
    
    // 중복 및 너무 작은 이미지 제외
    if (src && !images.includes(src) && !src.includes('/50?') && !src.includes('/30?')) {
      images.push(src);
    }
  });

  parseLog.debug('총 이미지', { count: images.length });
  return images;
};

/**
 * 브랜드/판매자 정보 추출
 */
export const extractSellerInfo = (doc: Document): { brand?: string; isOfficial?: boolean; seller?: string } => {
  const info: { brand?: string; isOfficial?: boolean; seller?: string } = {};

  // 브랜드명
  const brandEl = doc.querySelector(GMARKET_SELECTORS.seller.brand);
  if (brandEl?.textContent) {
    info.brand = brandEl.textContent.trim();
  }

  // 공식 판매자 여부
  const officialEl = doc.querySelector(GMARKET_SELECTORS.seller.official);
  info.isOfficial = !!officialEl;

  // 판매자 (스타배송 등)
  const sellerEl = doc.querySelector(GMARKET_SELECTORS.seller.seller);
  if (sellerEl?.textContent) {
    info.seller = sellerEl.textContent.trim();
  }

  return info;
};
