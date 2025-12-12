/**
 * Toggle Bar 렌더링 모듈
 * UI 렌더링 로직을 담당
 */

import type { ToggleProductData } from './types';
import { formatCurrency } from './utils';
import { state } from './state';
import { createHeroSection, createCardBenefitsSection, createFooterSection } from './components';
import { useSettingsStore } from '@/shared/store/slices/settings';

/**
 * 버튼 배지 업데이트
 * 최고 할인율 또는 캐시백 정보를 표시
 */
export const updateBadge = (data: ToggleProductData | null): void => {
	const { buttonBadgeEl } = state;
	
	if (!buttonBadgeEl) {
		return;
	}

	if (!data) {
		buttonBadgeEl.style.display = 'none';
		return;
	}

	// 카드별 할인율 중 최고값 찾기
	const rates = Array.isArray(data.cardBenefits)
		? data.cardBenefits
				.map((benefit) => {
					const b = benefit as { rate?: number; discount?: number };
					const r = b.rate ?? b.discount;
					return typeof r === 'number' ? r : 0;
				})
				.filter((rate: number) => rate > 0)
		: [];

	if (rates.length > 0) {
		const bestRate = Math.max(...rates);
		buttonBadgeEl.textContent = `최대 ${bestRate}%`;
		buttonBadgeEl.style.display = 'inline-flex';
		return;
	}

	// 캐시백 정보
	const cashbackAmount = data.cashback?.amount;
	if (typeof cashbackAmount === 'number' && cashbackAmount > 0) {
		const formatted = formatCurrency(cashbackAmount, data.currency ?? 'KRW');
		buttonBadgeEl.textContent = formatted ? `${formatted} 적립` : '캐시백 혜택';
		buttonBadgeEl.style.display = 'inline-flex';
		return;
	}

	buttonBadgeEl.style.display = 'none';
};

/**
 * 메인 콘텐츠 렌더링
 * PRD 기준: Hero → 카드 혜택 비교 → 추가 혜택 (Footer)
 */
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

	// Settings에서 표시 모드 가져오기
	const { displayMode } = useSettingsStore.getState();

	// 1. Hero Section (상품 정보)
	const heroSection = createHeroSection(data);
	contentEl.appendChild(heroSection);

	// 2. 표시 모드에 따라 분기
	if (displayMode === 'lowest-price') {
		// TODO: 최저가 비교 UI 구현
		const lowestPriceSection = document.createElement('section');
		lowestPriceSection.className = 'picsel-section picsel-lowest-price-section';
		
		const title = document.createElement('h4');
		title.className = 'picsel-section-title';
		title.textContent = '💰 최저가 비교';
		lowestPriceSection.appendChild(title);

		const placeholder = document.createElement('div');
		placeholder.className = 'picsel-empty-state';
		placeholder.textContent = '최저가 비교 기능은 개발 중입니다. 카드 혜택 모드로 전환하거나 수동으로 가격 비교를 시도해보세요.';
		lowestPriceSection.appendChild(placeholder);

		contentEl.appendChild(lowestPriceSection);
	} else {
		// 기존: 카드 혜택 우선
		const cardSection = createCardBenefitsSection(data);
		if (cardSection) {
			contentEl.appendChild(cardSection);
		}
	}

	// 3. Footer Section (추가 혜택)
	const footerSection = createFooterSection(data);
	if (footerSection) {
		contentEl.appendChild(footerSection);
	}

	// Note: "다른 구성" 섹션은 PRD에 따라 삭제됨
	// 사용자 관점: "다른 구성을 알려줘서 뭘 하자는거지?"

	updateBadge(data);
};
