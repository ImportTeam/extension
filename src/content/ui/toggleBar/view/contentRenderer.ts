/**
 * Toggle Bar Content Renderer
 * 화면(DOM) 렌더링만 책임
 */

import { state } from '../core/state';
import { createCardBenefitsSection, createFooterSection, createHeroSection, createLowestPriceSection } from './components';
import { updateBadge } from '../services/badge';
import { useSettingsStore } from '@/shared/store/slices/settings';
import { formatCurrency } from '../core/utils';

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
		
		// 최저가 모드: badge 상태 관리
		// 1. 로딩 중 → null (loading indicator가 badge 영역을 담당)
		// 2. 완료됨 → 최저가 정보 표시
		if (state.comparison.status === 'loading') {
			// 로딩 중에는 badge 숨김 (loadingIndicator가 표시)
			updateBadge(null);
		} else if (state.comparison.status === 'success' && state.comparison.data) {
			// top_prices 배열에서 최저가 플랫폼 추출
			const topPrices = state.comparison.data.top_prices;
			const lowestItem = Array.isArray(topPrices) && topPrices.length > 0 ? topPrices[0] : null;
			
			// 최저가 정보가 있으면 badge에 표시
			if (lowestItem && typeof lowestItem.price === 'number' && lowestItem.price > 0) {
				const platform = lowestItem.mall || '최저가';
				const displayText = `${formatCurrency(lowestItem.price, 'KRW')} (${platform})`;
				
				updateBadge({
					price: data.amount || 0,
					amount: data.amount,
					currency: data.currency,
					title: data.title,
					// badge 표시를 위해 dummy cardBenefit 추가
					cardBenefits: [{
						card: '최저가',
						benefit: displayText,
						discount: 0,
					}],
				} as any);
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
