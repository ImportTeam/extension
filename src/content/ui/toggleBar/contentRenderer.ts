/**
 * Toggle Bar Content Renderer
 * 화면(DOM) 렌더링만 책임
 */

import { state } from './state';
import { createCardBenefitsSection, createFooterSection, createHeroSection, createLowestPriceSection } from './components';
import { updateBadge } from './badge';
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

	// 1. Hero
	contentEl.appendChild(createHeroSection(data));

	// 2. Mode specific
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

	// default: card benefits
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
