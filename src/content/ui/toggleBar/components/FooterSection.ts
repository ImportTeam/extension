/**
 * Footer Section 컴포넌트
 * 확인 메시지 표시 (추가 혜택은 CardBenefitsSection 아래로 이동)
 */

import type { ToggleProductData } from '../types';

export const createFooterSection = (_data: ToggleProductData): HTMLElement | null => {
	const footer = document.createElement('footer');
	footer.className = 'picsel-footer';

	const confirmMsg = document.createElement('div');
	confirmMsg.className = 'picsel-footer-confirm';
	confirmMsg.textContent = '✅ 확인했습니다.';

	footer.appendChild(confirmMsg);

	return footer;
};
