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

export const mountToggleBar = (data: ToggleProductData): void => {
	state.cachedData = { ...data };
	ensureMounted({ setPanelOpen });
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
