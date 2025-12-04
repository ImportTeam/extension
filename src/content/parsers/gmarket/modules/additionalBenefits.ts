/**
 * G마켓 추가 혜택 추출 모듈
 * 책임: 신세계포인트, 스마일페이 등 추가 혜택 정보 추출
 */

import { GMARKET_SELECTORS } from '../constants';
import { AdditionalBenefit, BenefitDetail } from '../../../../shared/types/parser';
import { formatBenefitDetails } from '../../utils';
import { parseLog } from '../../../../shared/utils/logger';

// Re-export types for convenience
export type { AdditionalBenefit, BenefitDetail };

/**
 * 추가 혜택 아이템 파싱
 */
const parseBenefitItem = (item: Element): AdditionalBenefit | null => {
  const selectors = GMARKET_SELECTORS.additionalBenefits;

  // 혜택 타이틀 추출
  const titleEl = item.querySelector(selectors.benefitTitle);
  const titleText = titleEl?.textContent?.trim() || '';

  if (!titleText) return null;

  // 혜택 타입 판별
  let type = 'etc';
  if (titleText.includes('신세계포인트')) {
    type = 'shinsegae_point';
  } else if (titleText.includes('스마일페이')) {
    type = 'smile_pay';
  } else if (titleText.includes('스마일캐시')) {
    type = 'smile_cash';
  } else if (titleText.includes('OK캐쉬백')) {
    type = 'ok_cashback';
  }

  // 상세 정보 추출
  const details: BenefitDetail[] = [];
  const detailItems = item.querySelectorAll(selectors.benefitDetail);

  detailItems.forEach((detail) => {
    const labelEl = detail.querySelector(selectors.benefitLabel);
    const valueEl = detail.querySelector(selectors.benefitValue);

    const label = labelEl?.textContent?.trim() || '';
    const value = valueEl?.textContent?.trim() || '';

    if (label && value) {
      details.push({ label, value });
    }
  });

  parseLog.debug('추가 혜택', { type, title: titleText });

  return {
    type,
    title: titleText,
    details,
  };
};

/**
 * 모든 추가 혜택 추출
 */
export const extractAdditionalBenefits = (doc: Document): AdditionalBenefit[] => {
  parseLog.debug('추가 혜택 추출 시작...');

  const benefits: AdditionalBenefit[] = [];
  const selectors = GMARKET_SELECTORS.additionalBenefits;

  // 혜택 아이템들 찾기
  const benefitItems = doc.querySelectorAll(selectors.benefitItem);

  benefitItems.forEach((item) => {
    const benefit = parseBenefitItem(item);
    if (benefit) {
      benefits.push(benefit);
    }
  });

  parseLog.debug('총 추가 혜택', { count: benefits.length });
  return benefits;
};

/**
 * 추가 혜택을 포맷팅된 문자열로 변환
 * 예: "신세계포인트 적립\n적립률: 1천원 당 1포인트\n적립한도: 최대 1천점"
 */
export const formatAdditionalBenefits = (benefits: AdditionalBenefit[]): string => {
  return benefits
    .map((benefit) => {
      const detailsStr = formatBenefitDetails(benefit.details);
      return `${benefit.title}\n${detailsStr}`;
    })
    .join('\n\n');
};

/**
 * 신세계포인트 정보만 추출 (간단 버전)
 */
export const extractShinsegaePoint = (doc: Document): {
  rate: string;
  limit: string;
  condition: string;
  formatted: string;  // 포맷팅된 전체 문자열
} | null => {
  const benefits = extractAdditionalBenefits(doc);
  const shinsegae = benefits.find((b) => b.type === 'shinsegae_point');

  if (!shinsegae) return null;

  let rate = '';
  let limit = '';
  let condition = '';

  shinsegae.details.forEach((detail) => {
    if (detail.label.includes('적립률')) {
      rate = detail.value;
    } else if (detail.label.includes('적립한도')) {
      limit = detail.value;
    } else if (detail.label.includes('유의사항') || detail.label.includes('조건')) {
      condition = detail.value;
    }
  });

  // 포맷팅된 문자열 생성
  const formatted = formatBenefitDetails(shinsegae.details);

  return { rate, limit, condition, formatted };
};

/**
 * 캐시백 정보 추출
 */
export const extractCashback = (doc: Document): {
  amount: number;
  description: string;
} | null => {
  const benefits = extractAdditionalBenefits(doc);
  
  for (const benefit of benefits) {
    for (const detail of benefit.details) {
      // "1천원 당 1포인트" 같은 패턴에서 금액 추출
      const match = detail.value.match(/(\d+(?:,\d+)?)\s*(?:원|포인트)/);
      if (match) {
        const amount = parseInt(match[1].replace(/,/g, ''), 10);
        return {
          amount,
          description: `${benefit.title}: ${detail.value}`,
        };
      }
    }
  }

  return null;
};
