import { COUPANG_SELECTORS } from '../constants';
import { extractNumber } from '../../utils';
import { CARD_NAME_MAPPING } from '../../../../shared/types';

interface CardBenefitDetail {
  card: string;        // 카드사명
  cardName?: string;   // 카드사명 (별칭)
  benefit: string;     // 혜택 설명
  discount?: number;   // 할인율 (%)
  rate?: number;       // 할인율 (별칭)
  imageUrl?: string;   // 카드 이미지 URL
}

// 카드 이미지 매핑 (카드사명 -> 이미지 URL 패턴)
interface CardImageInfo {
  src: string;
  alt: string;
  cardName: string;
}

const extractCardNameFromUrl = (url: string): string | null => {
  for (const [key, value] of Object.entries(CARD_NAME_MAPPING)) {
    if (url.includes(key)) {
      return value;
    }
  }

  return null;
};

const extractPercentage = (text: string): number | undefined => {
  const match = text.match(/(\d+(?:\.\d+)?)\s*%/);
  return match ? parseFloat(match[1]) : undefined;
};

/**
 * 페이지에서 카드 이미지 정보 추출
 * w-[76px] 클래스 또는 유사한 카드 아이콘 컨테이너에서 이미지 추출
 */
const extractCardImages = (doc: Document): CardImageInfo[] => {
  const cardImages: CardImageInfo[] = [];
  const selectors = COUPANG_SELECTORS.cardImages;

  // 여러 선택자 시도
  const containers = doc.querySelectorAll(selectors.container);
  
  containers.forEach((container) => {
    const img = container.querySelector(selectors.image) as HTMLImageElement | null;
    if (img && img.src) {
      const alt = img.alt || '';
      const src = img.src;
      
      // alt 또는 src에서 카드사명 추출
      let cardName = alt.replace(/\s*(카드|로고|아이콘|이미지)/g, '').trim();
      
      // alt가 없으면 src URL에서 추출 시도
      if (!cardName) {
        cardName = extractCardNameFromUrl(src) || '';
      }
      
      // 카드명 정규화
      if (cardName && !cardName.includes('카드')) {
        cardName = `${cardName}카드`;
      }
      
      if (src && cardName) {
        // 중복 체크
        if (!cardImages.some(c => c.cardName === cardName)) {
          cardImages.push({ src, alt, cardName });
        }
      }
    }
  });

  // 추가: 일반 카드 아이콘 이미지 검색
  const allCardImages = doc.querySelectorAll('img[src*="card"], img[alt*="카드"], img[class*="card"]');
  allCardImages.forEach((img) => {
    const imgEl = img as HTMLImageElement;
    const src = imgEl.src;
    const alt = imgEl.alt || '';
    
    // 이미지 크기 체크 (너무 큰 이미지는 제외)
    const width = imgEl.width || imgEl.naturalWidth;
    if (width > 150) return; // 150px 이상은 제외
    
    let cardName = alt.replace(/\s*(카드|로고|아이콘|이미지)/g, '').trim();
    if (!cardName) {
      cardName = extractCardNameFromUrl(src) || '';
    }
    
    if (cardName && !cardName.includes('카드')) {
      cardName = `${cardName}카드`;
    }
    
    if (src && cardName && !cardImages.some(c => c.cardName === cardName)) {
      cardImages.push({ src, alt, cardName });
    }
  });

  console.log('[CoupangParser] 추출된 카드 이미지:', cardImages);
  return cardImages;
};

/**
 * creditCardBenefitPopup iframe에서 상세 카드 혜택 파싱
 * 각 카드사별 구체적인 혜택 정보를 추출
 */
const extractCardBenefitsFromPopup = (doc: Document): CardBenefitDetail[] => {
  const benefits: CardBenefitDetail[] = [];
  const selectors = COUPANG_SELECTORS.cardBenefitPopup;

  // 팝업 컨테이너 찾기
  const popup = doc.querySelector(selectors.container);
  if (!popup) {
    console.log('[CoupangParser] 카드 혜택 팝업을 찾을 수 없음');
    return benefits;
  }

  // iframe 시도
  const iframe = popup.querySelector(selectors.iframe) as HTMLIFrameElement | null;
  if (iframe) {
    try {
      // Same-origin 체크
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        return parseCardBenefitsFromDocument(iframeDoc);
      }
    } catch {
      // Cross-origin이면 접근 불가
      console.log('[CoupangParser] iframe 접근 불가 (cross-origin)');
    }
  }

  // 팝업 콘텐츠에서 직접 파싱
  const content = popup.querySelector(selectors.content);
  if (content) {
    return parseCardBenefitsFromElement(content as HTMLElement);
  }

  return benefits;
};

/**
 * Document에서 카드 혜택 파싱
 */
const parseCardBenefitsFromDocument = (doc: Document): CardBenefitDetail[] => {
  const benefits: CardBenefitDetail[] = [];
  const selectors = COUPANG_SELECTORS.cardBenefitPopup;

  // 각 카드 항목 찾기
  const cardItems = doc.querySelectorAll(selectors.cardItem);
  
  cardItems.forEach((item) => {
    const cardNameEl = item.querySelector(selectors.cardName);
    const rateEl = item.querySelector(selectors.benefitRate);
    const descEl = item.querySelector(selectors.benefitDesc);

    const cardName = cardNameEl?.textContent?.trim() || '';
    const rateText = rateEl?.textContent?.trim() || '';
    const descText = descEl?.textContent?.trim() || item.textContent?.trim() || '';

    if (cardName) {
      const rate = extractPercentage(rateText || descText);
      benefits.push({
        card: cardName,
        cardName: cardName,
        benefit: descText || rateText || '혜택 제공',
        discount: rate,
        rate: rate,
      });
    }
  });

  return benefits;
};

/**
 * Element에서 카드 혜택 파싱 (대체 로직)
 */
const parseCardBenefitsFromElement = (element: HTMLElement): CardBenefitDetail[] => {
  const benefits: CardBenefitDetail[] = [];
  
  // 텍스트 기반 파싱: "삼성카드 5%", "현대카드 3%" 패턴
  const text = element.textContent || '';
  const cardPatterns = [
    /([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,
    /(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,
  ];

  for (const pattern of cardPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const cardName = match[1].includes('카드') ? match[1] : `${match[1]}카드`;
      const rate = parseFloat(match[2]);
      
      // 중복 체크
      if (!benefits.some(b => b.card === cardName)) {
        benefits.push({
          card: cardName,
          cardName: cardName,
          benefit: `최대 ${rate}% 할인/적립`,
          discount: rate,
          rate: rate,
        });
      }
    }
  }

  return benefits;
};

/**
 * 페이지 전체에서 카드 혜택 정보 스캔
 * 더 넓은 범위에서 카드 혜택 정보 추출
 */
const scanPageForCardBenefits = (doc: Document): CardBenefitDetail[] => {
  const benefits: CardBenefitDetail[] = [];
  
  // 카드 혜택 관련 섹션들 찾기
  const potentialSections = doc.querySelectorAll(
    '[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]'
  );

  potentialSections.forEach((section) => {
    const text = section.textContent || '';
    
    // 카드사 + 할인율 패턴 매칭
    const cardMatch = text.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);
    
    if (cardMatch) {
      const cardName = cardMatch[1].includes('카드') ? cardMatch[1] : `${cardMatch[1]}카드`;
      const rate = parseFloat(cardMatch[2]);
      
      // 중복 체크
      if (!benefits.some(b => b.card === cardName)) {
        // 혜택 설명 추출 시도
        let benefitDesc = `최대 ${rate}% 할인/적립`;
        const descMatch = text.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);
        if (descMatch) {
          benefitDesc = `최대 ${rate}% ${descMatch[0]}`;
        }

        benefits.push({
          card: cardName,
          cardName: cardName,
          benefit: benefitDesc,
          discount: rate,
          rate: rate,
        });
      }
    }
  });

  return benefits;
};

export const extractCardBenefits = (doc: Document): CardBenefitDetail[] => {
  let benefits: CardBenefitDetail[] = [];

  // 0. 카드 이미지 먼저 추출
  const cardImages = extractCardImages(doc);

  // 1. creditCardBenefitPopup iframe에서 상세 정보 파싱 시도
  const popupBenefits = extractCardBenefitsFromPopup(doc);
  if (popupBenefits.length > 0) {
    console.log('[CoupangParser] ✅ 팝업에서 카드 혜택 파싱:', popupBenefits.length);
    benefits = popupBenefits;
  }

  // 2. 페이지 전체 스캔으로 추가 혜택 찾기
  const scannedBenefits = scanPageForCardBenefits(doc);
  scannedBenefits.forEach((sb) => {
    if (!benefits.some(b => b.card === sb.card)) {
      benefits.push(sb);
    }
  });

  // 3. 기존 benefitBadge 파싱 (폴백)
  if (benefits.length === 0) {
    const benefitBadge = doc.querySelector(COUPANG_SELECTORS.benefitBadge);
    if (benefitBadge) {
      const cardIcons = benefitBadge.querySelectorAll('img.benefit-ico');
      const cardNames: string[] = [];
      const cardImageUrls: string[] = [];

      cardIcons.forEach((icon) => {
        const src = icon.getAttribute('src');
        if (src) {
          const cardName = extractCardNameFromUrl(src);
          if (cardName) {
            cardNames.push(cardName);
            cardImageUrls.push(src);
          }
        }
      });

      const benefitText = benefitBadge.querySelector('.benefit-label')?.textContent?.trim();
      const woowonOnly = benefitBadge.querySelector('.benefit-label-highlight')?.textContent?.trim();

      if (benefitText) {
        const rate = extractPercentage(benefitText);
        const displayCards = cardNames.length > 0
          ? `${cardNames.slice(0, 3).join(', ')}${cardNames.length > 3 ? ' 외' : ''}`
          : '쿠팡 파트너 카드';

        benefits.push({
          card: displayCards,
          cardName: displayCards,
          benefit: `${benefitText}${woowonOnly ? ` (${woowonOnly})` : ''}`,
          discount: rate,
          rate: rate,
          imageUrl: cardImageUrls[0], // 첫 번째 카드 이미지
        });
      }
    }
  }

  // 4. 카드 이미지 매칭
  benefits = benefits.map((benefit) => {
    if (!benefit.imageUrl) {
      // 카드명으로 이미지 매칭
      const cardName = benefit.cardName || benefit.card || '';
      const matchedImage = cardImages.find((img) => {
        const imgCardName = img.cardName.toLowerCase();
        const benefitCardName = cardName.toLowerCase();
        return imgCardName.includes(benefitCardName.replace('카드', '')) || 
               benefitCardName.includes(imgCardName.replace('카드', ''));
      });
      
      if (matchedImage) {
        return { ...benefit, imageUrl: matchedImage.src };
      }
    }
    return benefit;
  });

  // 할인율 기준 내림차순 정렬
  benefits.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));

  console.log('[CoupangParser] 최종 카드 혜택:', benefits);
  return benefits;
};

export const extractGiftCardDiscount = (doc: Document): { rate: number; description: string } | null => {
  const allText = doc.body.innerText;
  const giftCardMatch = allText.match(/기프트카드\s*(\d+)\s*%/);

  if (giftCardMatch) {
    const rate = parseInt(giftCardMatch[1], 10);
    return {
      rate,
      description: `기프트카드 ${rate}% 할인`,
    };
  }

  const sections = doc.querySelectorAll('div, span, p');
  for (const section of sections) {
    const text = section.textContent || '';
    if (text.includes('기프트카드') && text.includes('%')) {
      const rateMatch = text.match(/(\d+)\s*%/);
      if (rateMatch) {
        const rate = parseInt(rateMatch[1], 10);
        return {
          rate,
          description: text.trim(),
        };
      }
    }
  }

  return null;
};

export const extractCashback = (doc: Document): { amount: number; description: string } | null => {
  const cashbackSections = doc.querySelectorAll('[class*="cashback"], [class*="적립"]');

  for (const section of cashbackSections) {
    const text = section.textContent || '';
    const amountMatch = text.match(/(\d{1,3}(?:,\d{3})*)\s*원/);

    if (amountMatch && text.includes('쿠팡캐시')) {
      const amount = extractNumber(amountMatch[1]);
      if (amount) {
        return {
          amount,
          description: `쿠팡캐시 ${amount.toLocaleString()} 원 적립`,
        };
      }
    }
  }

  const allText = doc.body.innerText;
  const cashbackMatch = allText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);

  if (cashbackMatch) {
    const amount = extractNumber(cashbackMatch[1]);
    if (amount) {
      return {
        amount,
        description: `쿠팡캐시 ${amount.toLocaleString()} 원 적립`,
      };
    }
  }

  return null;
};
