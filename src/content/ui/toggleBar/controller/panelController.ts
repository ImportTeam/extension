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

	const { displayMode } = useSettingsStore.getState();
	const isLowestPriceMode = displayMode === 'lowest-price';

	if (open) {
		panelEl.classList.add('open');
		panelEl.setAttribute('aria-hidden', 'false');
		toggleButton.setAttribute('aria-expanded', 'true');

		if (isLowestPriceMode && state.cachedData?.title) {
			// 최저가 모드: 비교 요청 (이미 완료된 비교면 콜백만 호출, 아니면 새로 시작)
			startLowestPriceComparison(state.cachedData.title, renderContent, undefined, state.cachedData.selectedOptions);
			// startLowestPriceComparison 내부에서 renderContent 호출됨
		} else {
			renderContent();
		}
		
		// 최저가 모드에서만 indicator 업데이트
		if (isLowestPriceMode) {
			updateIdleLoadingIndicator();
		}
		return;
	}

	panelEl.classList.remove('open');
	panelEl.setAttribute('aria-hidden', 'true');
	toggleButton.setAttribute('aria-expanded', 'false');
	
	// 최저가 모드에서만 loading indicator 표시
	if (isLowestPriceMode) {
		updateIdleLoadingIndicator();
	} else {
		// card-benefits 모드: "PicSel 혜택 보기" 텍스트로 복원
		renderContent();
	}
};
