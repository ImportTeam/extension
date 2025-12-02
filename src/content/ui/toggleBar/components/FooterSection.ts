/**
 * Footer Section 컴포넌트
 * 확인 버튼 표시
 */

import type { ToggleProductData } from '../types';
import { setPanelOpen } from '../mount';

export const createFooterSection = (_data: ToggleProductData): HTMLElement | null => {
	const footer = document.createElement('footer');
	footer.className = 'picsel-footer';

	// 버튼 컨테이너
	const btnContainer = document.createElement('div');
	btnContainer.className = 'picsel-footer-buttons';

	// 확인 버튼
	const confirmBtn = document.createElement('button');
	confirmBtn.className = 'picsel-footer-confirm';
	confirmBtn.textContent = '확인했습니다';
	confirmBtn.type = 'button';
	confirmBtn.addEventListener('click', () => {
		setPanelOpen(false);
	});
	btnContainer.appendChild(confirmBtn);

	footer.appendChild(btnContainer);

	return footer;
};
