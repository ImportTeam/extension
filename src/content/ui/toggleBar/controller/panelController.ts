/**
 * Toggle Bar Panel Controller
 * 열기/닫기 상태 전환만 책임 (요청/렌더는 서비스/뷰로 위임)
 */

import { state } from '../core/state';
import { renderContent } from '../view/contentRenderer';
import { startLowestPriceComparison } from '../services/comparison';
import { useSettingsStore } from '@/shared/store/slices/settings';

export const setPanelOpen = (open: boolean): void => {
	const { panelEl, toggleButton, buttonLabelEl } = state;
	if (!panelEl || !toggleButton || !buttonLabelEl) {
		return;
	}

	if (open) {
		panelEl.classList.add('open');
		panelEl.setAttribute('aria-hidden', 'false');
		toggleButton.setAttribute('aria-expanded', 'true');
		buttonLabelEl.textContent = 'PicSel 혜택 닫기';

		const { displayMode } = useSettingsStore.getState();
		if (displayMode === 'lowest-price' && state.cachedData?.title) {
			startLowestPriceComparison(state.cachedData.title, renderContent);
			return;
		}

		renderContent();
		return;
	}

	panelEl.classList.remove('open');
	panelEl.setAttribute('aria-hidden', 'true');
	toggleButton.setAttribute('aria-expanded', 'false');
	buttonLabelEl.textContent = 'PicSel 혜택 보기';
};
