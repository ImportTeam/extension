/**
 * Footer Section 컴포넌트
 * 확인 버튼 표시 (클릭 시 토글바 닫기)
 */

import type { ToggleProductData } from '../types';
import { state } from '../state';

export const createFooterSection = (_data: ToggleProductData): HTMLElement | null => {
	const footer = document.createElement('footer');
	footer.className = 'picsel-footer';

	// 버튼 요소로 변경
	const confirmBtn = document.createElement('button');
	confirmBtn.className = 'picsel-footer-confirm';
	confirmBtn.textContent = '확인했습니다';
	confirmBtn.type = 'button';
	
	// 클릭 시 토글바 닫기
	confirmBtn.addEventListener('click', () => {
		if (state.panelEl) {
			state.panelEl.classList.remove('show');
		}
	});

	footer.appendChild(confirmBtn);

	return footer;
};
