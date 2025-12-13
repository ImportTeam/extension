/**
 * Toggle Button Badge Service
 * 버튼 배지(최대 할인율/적립금) 표시만 책임
 */

import type { ToggleProductData } from '../core/types';
import { state } from '../core/state';
import { formatCurrency } from '../core/utils';

export const updateBadge = (data: ToggleProductData | null): void => {
	const { buttonBadgeEl } = state;

	if (!buttonBadgeEl) {
		return;
	}

	if (!data) {
		buttonBadgeEl.style.display = 'none';
		return;
	}

	const rates = Array.isArray(data.cardBenefits)
		? data.cardBenefits
				.map((benefit) => {
					const b = benefit as { rate?: number; discount?: number };
					const r = b.rate ?? b.discount;
					return typeof r === 'number' ? r : 0;
				})
				.filter((rate: number) => rate > 0)
		: [];

	if (rates.length > 0) {
		const bestRate = Math.max(...rates);
		buttonBadgeEl.textContent = `최대 ${bestRate}%`;
		buttonBadgeEl.style.display = 'inline-flex';
		return;
	}

	const cashbackAmount = data.cashback?.amount;
	if (typeof cashbackAmount === 'number' && cashbackAmount > 0) {
		const formatted = formatCurrency(cashbackAmount, data.currency ?? 'KRW');
		buttonBadgeEl.textContent = formatted ? `${formatted} 적립` : '캐시백 혜택';
		buttonBadgeEl.style.display = 'inline-flex';
		return;
	}

	buttonBadgeEl.style.display = 'none';
};
