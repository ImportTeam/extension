/**
 * Lowest Price Section 컴포넌트
 * 최저가 비교 결과를 image-2 스타일로 렌더링
 */

import type { ComparisonResponse, ComparisonState } from '../../core/types';
import { formatCurrency } from '../../core/utils';

interface CheapestItem {
	provider: string;
	name: string;
	price: number;
	currency?: string;
	url?: string;
	free_shipping?: boolean;
	delivery?: string;
}

const formatPriceText = (value: number, currency?: string): string => {
	const formatted = formatCurrency(value, currency ?? 'KRW');
	return formatted ?? `${value.toLocaleString()}원`;
};

const formatSavingsText = (value: number): string => {
	const formatted = formatCurrency(value, 'KRW');
	return formatted ?? `${value.toLocaleString()}원`;
};

// BE 응답 구조에서 최저가 상품 추출 (상위 3개)
const extractCheapest = (data: ComparisonResponse): CheapestItem[] => {
	// top_prices 배열이 있으면 사용
	if (Array.isArray(data.top_prices) && data.top_prices.length > 0) {
		return data.top_prices
			.map((p) => ({
				provider: p.mall || 'Unknown',
				name: p.mall || 'Unknown',
				price: p.price,
				currency: 'KRW',
				url: p.link,
				free_shipping: p.free_shipping,
				delivery: p.delivery,
			}))
			.filter((p) => typeof p.price === 'number' && p.price > 0)
			.slice(0, 3);
	}

	// 이전 구조 호환성 유지 (results 배열 방식)
	const results = Array.isArray(data.results) ? data.results : [];

	return results
		.filter((r) => r && r.success && Array.isArray(r.products))
		.flatMap((r) =>
			r.products.map((p) => ({
				provider: r.provider,
				name: p.name,
				price: p.price,
				currency: p.currency,
				url: p.url,
			}))
		)
		.filter((p) => typeof p.price === 'number' && p.price > 0)
		.sort((a, b) => a.price - b.price)
		.slice(0, 3);
};

const checkIconSvg =
	'<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.333 4L6.667 11.333 3.333 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export const createLowestPriceSection = (params: { panelIsOpen: boolean; comparison: ComparisonState }): HTMLElement => {
	const { panelIsOpen, comparison } = params;

	const section = document.createElement('section');
	section.className = 'picsel-section picsel-lowest-price-section';

	if (!panelIsOpen) {
		const hint = document.createElement('div');
		hint.className = 'picsel-empty-state';
		hint.textContent = '패널을 열면 최저가 비교를 시작합니다.';
		section.appendChild(hint);
		return section;
	}

	if (comparison.status === 'loading') {
		const loading = document.createElement('div');
		loading.className = 'picsel-empty-state';
		loading.textContent = '가격 비교 중...';
		section.appendChild(loading);
		return section;
	}

	if (comparison.status === 'error') {
		const error = document.createElement('div');
		error.className = 'picsel-empty-state';
		error.textContent = comparison.error || '가격 비교 중 오류가 발생했습니다.';
		section.appendChild(error);
		return section;
	}

	if (comparison.status !== 'success' || !comparison.data) {
		const empty = document.createElement('div');
		empty.className = 'picsel-empty-state';
		empty.textContent = '상품명을 찾을 수 없어 가격 비교를 실행할 수 없습니다.';
		section.appendChild(empty);
		return section;
	}

	const comparisonData = comparison.data;

	// 최저가 상품 추출
	const cheapest = extractCheapest(comparisonData);

	// 가격 절감액 계산 (현재 가격 vs 최저가)
	const lowestPrice = cheapest.length > 0 ? cheapest[0].price : null;
	const currentPrice = typeof comparisonData.current_price === 'number' ? comparisonData.current_price : null;
	const savings = lowestPrice && currentPrice && currentPrice > lowestPrice ? currentPrice - lowestPrice : null;

	// 절감 배너 표시
	if (savings && savings > 0) {
		const savingsBanner = document.createElement('div');
		savingsBanner.className = 'picsel-savings-banner';

		const icon = document.createElement('span');
		icon.className = 'picsel-savings-icon';
		icon.innerHTML = checkIconSvg;

		const text = document.createElement('span');
		text.className = 'picsel-savings-text';
		text.textContent = `지금 ${formatSavingsText(savings)} 더 아낄 수 있어요!`;

		savingsBanner.appendChild(icon);
		savingsBanner.appendChild(text);
		section.appendChild(savingsBanner);
	} else if (lowestPrice && currentPrice && currentPrice <= lowestPrice) {
		const noBetterBanner = document.createElement('div');
		noBetterBanner.className = 'picsel-no-savings-banner';

		const icon = document.createElement('span');
		icon.className = 'picsel-savings-icon';
		icon.innerHTML = checkIconSvg;

		const text = document.createElement('span');
		text.className = 'picsel-savings-text';
		text.textContent = '현재 가격이 가장 저렴합니다.';

		noBetterBanner.appendChild(icon);
		noBetterBanner.appendChild(text);
		section.appendChild(noBetterBanner);
	}

	if (cheapest.length === 0) {
		const empty = document.createElement('div');
		empty.className = 'picsel-empty-state';
		empty.textContent = '검색 결과가 없습니다.';
		section.appendChild(empty);
		return section;
	}

	const sectionHeader = document.createElement('div');
	sectionHeader.className = 'picsel-section-header';

	const sectionTitle = document.createElement('span');
	sectionTitle.className = 'picsel-section-title';
	sectionTitle.textContent = '최저가 추천';

	const sectionNote = document.createElement('span');
	sectionNote.className = 'picsel-section-note';
	sectionNote.textContent = '배송비 포함 기준';

	sectionHeader.appendChild(sectionTitle);
	sectionHeader.appendChild(sectionNote);
	section.appendChild(sectionHeader);

	const list = document.createElement('div');
	list.className = 'picsel-price-list';

	cheapest.forEach((item, index) => {
		const isTop = index === 0;

		const row = document.createElement('a');
		row.href = item.url || '#';
		row.target = '_blank';
		row.rel = 'noreferrer';
		row.className = isTop ? 'picsel-price-item picsel-price-item-top' : 'picsel-price-item';

		const left = document.createElement('div');
		left.className = 'picsel-price-item-left';

		const mallRow = document.createElement('div');
		mallRow.className = 'picsel-mall-row';

		const mallName = document.createElement('span');
		mallName.className = 'picsel-mall-name';
		mallName.textContent = (item.name || item.provider || '알 수 없음').trim();
		mallRow.appendChild(mallName);

		if (isTop) {
			const badge = document.createElement('span');
			badge.className = 'picsel-lowest-badge';
			badge.textContent = '최저가';
			mallRow.appendChild(badge);
		}

		left.appendChild(mallRow);

		const right = document.createElement('div');
		right.className = 'picsel-price-item-right';

		const priceText = document.createElement('span');
		priceText.className = 'picsel-price-value';
		priceText.textContent = formatPriceText(item.price, item.currency);

		const arrow = document.createElement('span');
		arrow.className = 'picsel-price-arrow';
		arrow.innerHTML =
			'<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

		right.appendChild(priceText);
		right.appendChild(arrow);

		row.appendChild(left);
		row.appendChild(right);
		list.appendChild(row);
	});

	section.appendChild(list);

	if (comparisonData.link) {
		const footerLink = document.createElement('a');
		footerLink.href = comparisonData.link;
		footerLink.target = '_blank';
		footerLink.rel = 'noreferrer';
		footerLink.className = 'picsel-footer-link';
		footerLink.innerHTML =
			'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2h7m0 0v7m0-7L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 정확한 정보 확인하기';
		section.appendChild(footerLink);
	}

	return section;
};
