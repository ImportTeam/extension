import { COUPANG_SELECTORS } from '../constants';
import { extractNumber } from '../../utils';

const extractCardNameFromUrl = (url: string): string | null => {
  const cardMapping: { [key: string]: string } = {
    'shinhan': '신한카드',
    'woori': '우리카드',
    'bc': 'BC카드',
    'lotte': '롯데카드',
    'kb': 'KB국민카드',
    'nh': 'NH농협카드',
    'samsung': '삼성카드',
    'hana-sk': '하나SK카드',
  };

  for (const [key, value] of Object.entries(cardMapping)) {
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

export const extractCardBenefits = (doc: Document): Array<{
  cardName: string;
  benefit: string;
  rate?: number;
}> => {
  const benefits: Array<{ cardName: string; benefit: string; rate?: number }> = [];

  const benefitBadge = doc.querySelector(COUPANG_SELECTORS.benefitBadge);
  if (!benefitBadge) {
    return benefits;
  }

  const cardIcons = benefitBadge.querySelectorAll('img.benefit-ico');
  const cardNames: string[] = [];

  cardIcons.forEach((icon) => {
    const src = icon.getAttribute('src');

    if (src) {
      const cardName = extractCardNameFromUrl(src);
      if (cardName) {
        cardNames.push(cardName);
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
      cardName: displayCards,
      benefit: `${benefitText}${woowonOnly ? ` (${woowonOnly})` : ''}`,
      rate: rate,
    });
  }

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
