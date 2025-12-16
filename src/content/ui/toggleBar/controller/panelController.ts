/**
 * Toggle Bar Panel Controller
 * 열기/닫기 상태 전환만 책임 (요청/렌더는 서비스/뷰로 위임)
 */

import { state } from '../core/state';
import { renderContent } from '../view/contentRenderer';
import { startLowestPriceComparison } from '../services/comparison';
import { useSettingsStore } from '@/shared/store/slices/settings';
import { updateIdleLoadingIndicator } from '../core/loadingIndicator';

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
			// 최저가 모드: 비교 요청 (이미 완료된 비교면 콜백만 호출, 아니면 새로 시작)
			startLowestPriceComparison(state.cachedData.title, renderContent);
			// startLowestPriceComparison 내부에서 renderContent 호출됨
		} else {
			renderContent();
		}
		return;
	}

	panelEl.classList.remove('open');
	panelEl.setAttribute('aria-hidden', 'true');
	toggleButton.setAttribute('aria-expanded', 'false');
	buttonLabelEl.textContent = 'PicSel 혜택 보기';
	
	// Idle 상태: circle + 고정 메시지 표시
	updateIdleLoadingIndicator();
};
