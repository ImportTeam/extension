/**
 * Footer Section 컴포넌트
 * 추가 혜택 (쿠팡캐시, 상품권 할인 등)을 간결하게 표시
 */

import type { ToggleProductData } from '../types';

export const createFooterSection = (data: ToggleProductData): HTMLElement | null => {
	const extras: string[] = [];
	
	if (data.giftCardDiscount?.description) {
		extras.push(`🎁 ${data.giftCardDiscount.description}`);
	}
	if (data.cashback?.description) {
		extras.push(`💰 ${data.cashback.description}`);
	}

	if (extras.length === 0) {
		return null;
	}

	const footer = document.createElement('footer');
	footer.className = 'picsel-footer';

	const list = document.createElement('div');
	list.className = 'picsel-footer-list';

	extras.forEach((text) => {
		const item = document.createElement('div');
		item.className = 'picsel-footer-item';
		item.textContent = text;
		list.appendChild(item);
	});

	footer.appendChild(list);

	return footer;
};
