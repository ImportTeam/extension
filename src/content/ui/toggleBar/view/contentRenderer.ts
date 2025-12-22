/**
 * Toggle Bar Content Renderer
 * 화면(DOM) 렌더링만 책임
 */

import { state } from '../core/state';
import { createCardBenefitsSection, createFooterSection, createHeroSection, createLowestPriceSection } from './components';
import { updateBadge } from '../services/badge';
import { useSettingsStore } from '@/shared/store/slices/settings';

export const renderContent = (): void => {
	const { contentEl, cachedData, panelEl, buttonLabelEl } = state;

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
	const panelIsOpen = !!panelEl?.classList.contains('open');

	contentEl.appendChild(createHeroSection(data));

	if (displayMode === 'lowest-price') {
		contentEl.appendChild(
			createLowestPriceSection({
				panelIsOpen,
				comparison: state.comparison,
			})
		);
		
		// 최저가 모드: 비교 완료 시 badge에 최저가 정보 표시
		if (state.comparison.status === 'success' && state.comparison.data) {
			const lowestPrice = state.comparison.data.lowest_price;
			if (typeof lowestPrice === 'number' && lowestPrice > 0) {
				updateBadge({
					...data,
					cardBenefits: [
						{
							card: '최저가',
							benefit: `${lowestPrice.toLocaleString()}원`,
							discount: 0,
						},
					],
				});
			} else {
				updateBadge(null);
			}
		} else {
			updateBadge(null);
		}
		return;
	}

	// card-benefits 모드: 버튼 레이블 관리
	if (buttonLabelEl && !panelIsOpen) {
		// 패널이 닫혀있을 때: "PicSel 혜택 보기"
		buttonLabelEl.textContent = 'PicSel 혜택 보기';
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
