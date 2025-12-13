/**
 * Toggle Bar Panel Title
 * 타이틀 텍스트 결정/반영만 책임
 */

import { state, getPlatformDisplayName } from '../core/state';
import { useSettingsStore } from '@/shared/store/slices/settings';

export const updatePanelTitle = (): void => {
	const { displayMode } = useSettingsStore.getState();
	if (!state.panelTitleEl) return;

	if (displayMode === 'lowest-price') {
		state.panelTitleEl.textContent = '가격 비교 리포트';
		return;
	}

	if (state.cachedData?.site) {
		const displayName = getPlatformDisplayName(state.cachedData.site);
		state.panelTitleEl.textContent = `${displayName} 혜택 정보`;
		return;
	}

	state.panelTitleEl.textContent = 'PicSel 혜택 정보';
};
