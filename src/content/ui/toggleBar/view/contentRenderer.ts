/**
 * Toggle Bar Content Renderer
 * 화면(DOM) 렌더링만 책임
 */

import { state } from '../core/state';
import { createCardBenefitsSection, createFooterSection, createHeroSection, createLowestPriceSection } from './components';
import { updateBadge } from '../services/badge';
import { useSettingsStore } from '@/shared/store/slices/settings';

export const renderContent = (): void => {
	const { contentEl, cachedData } = state;

	if (!contentEl) {
		return;
	}

	contentEl.textContent = '';

	if (!cachedData) {
		const emptyEl = document.createElement('p');
		emptyEl.className = 'picsel-empty-state';
		emptyEl.textContent = '상품 정보를 불러오는 중입니다.';
		contentEl.appendChild(emptyEl);
		updateBadge(null);
		return;
	}

	const data = cachedData;
	const { displayMode } = useSettingsStore.getState();

	contentEl.appendChild(createHeroSection(data));

	if (displayMode === 'lowest-price') {
		const panelIsOpen = !!state.panelEl?.classList.contains('open');
		contentEl.appendChild(
			createLowestPriceSection({
				panelIsOpen,
				comparison: state.comparison,
			})
		);
		updateBadge(null);
		return;
	}

	const cardSection = createCardBenefitsSection(data);
	if (cardSection) {
		contentEl.appendChild(cardSection);
	}

	const footerSection = createFooterSection(data);
	if (footerSection) {
		contentEl.appendChild(footerSection);
	}

	updateBadge(data);
};
