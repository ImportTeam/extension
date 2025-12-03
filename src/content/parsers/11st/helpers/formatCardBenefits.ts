import { CardBenefitInfo, InstallmentInfo } from '../modules/benefits';
import { normalizeCardName } from './normalizeCardName';

export interface ParsedCardBenefit {
  card: string;
  cardName: string;
  benefit: string;
  discount: number;
  rate: number;
  condition?: string;
  benefitType: 'discount' | 'rate' | 'installment';
  pointAmount: number;
}

export function formatCardBenefits(
  cardBenefits: CardBenefitInfo[],
  installments: InstallmentInfo[]
): ParsedCardBenefit[] {
  const formatted: ParsedCardBenefit[] = cardBenefits.map((cb) => {
    const normalizedName = normalizeCardName(cb.cardName);
    const isDiscountBenefit = cb.benefitType === '할인';
    const rate = cb.benefitAmount <= 100 ? cb.benefitAmount : 0;

    let benefitDesc = '';
    if (isDiscountBenefit) {
      benefitDesc = `${cb.benefitAmount.toLocaleString()}원 할인`;
    } else if (cb.benefitAmount <= 100) {
      benefitDesc = `${cb.benefitAmount}% 적립`;
    } else {
      benefitDesc = `${cb.benefitAmount.toLocaleString()}P 적립`;
    }

    return {
      card: normalizedName,
      cardName: normalizedName,
      benefit: benefitDesc,
      discount: isDiscountBenefit ? cb.benefitAmount : 0,
      rate,
      condition: cb.condition,
      benefitType: isDiscountBenefit ? 'discount' : 'rate',
      pointAmount: 0,
    };
  });

  installments.forEach((inst) => {
    if (inst.cardName === '__INSTALLMENT_SUMMARY__') return;
    const normalized = normalizeCardName(inst.cardName);
    formatted.push({
      card: normalized,
      cardName: normalized,
      benefit: `${inst.months} 무이자`,
      discount: 0,
      rate: 0,
      condition: inst.condition,
      benefitType: 'installment',
      pointAmount: 0,
    });
  });

  return formatted;
}
