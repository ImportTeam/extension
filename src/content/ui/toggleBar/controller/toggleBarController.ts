/**
 * Toggle Bar Controller
 * 외부에서 호출되는 mount/update 시퀀스만 책임
 */

import type { ToggleProductData } from '../core/types';
import { state } from '../core/state';
import { ensureMounted } from '../dom/ensureMounted';
import { updatePanelTitle } from './panelTitle';
import { renderContent } from '../view/contentRenderer';
import { setPanelOpen } from './panelController';
import { startLowestPriceComparison } from '../services/comparison';

export const mountToggleBar = (data: ToggleProductData): void => {
	state.cachedData = { ...data };
	
	// 최저가 모드: 패널 안 열고 비교 시작 후 완료 시 패널 오픈
	const startLowestPriceComparisonNoPanel = (): void => {
		if (!state.cachedData?.title) return;
		
		startLowestPriceComparison(
			state.cachedData.title,
			renderContent,
			() => {
				// 비교 완료 시 패널 자동 오픈 후 콘텐츠 다시 렌더링
				setPanelOpen(true);
				renderContent();
			}
		);
	};

	ensureMounted({ 
		setPanelOpen,
		startLowestPriceComparisonNoPanel,
	});
	updatePanelTitle();
	renderContent();
	setPanelOpen(false);
};

export const updateToggleBar = (data: ToggleProductData): void => {
	state.cachedData = { ...(state.cachedData ?? {}), ...data } as ToggleProductData;

	if (!state.mounted) {
		mountToggleBar(state.cachedData);
		return;
	}

	updatePanelTitle();
	renderContent();
};
