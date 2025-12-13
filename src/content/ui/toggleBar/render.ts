/**
 * Toggle Bar 렌더링 모듈
 * UI 렌더링 로직을 담당
 */

import type { ToggleProductData } from './types';
import { formatCurrency } from './utils';
import { state } from './state';
import { createHeroSection, createCardBenefitsSection, createFooterSection } from './components';
import { useSettingsStore } from '@/shared/store/slices/settings';

interface ComparisonProduct {
	name: string;
	price: number;
	currency?: string;
	url?: string;
}

interface ComparisonProviderResult {
	provider: string;
	success: boolean;
	products: ComparisonProduct[];
	error?: string;
}

interface ComparisonResponse {
	query: string;
	results: ComparisonProviderResult[];
	fromCache?: boolean;
	// 새 API 스펙에서 추가된 필드
	is_cheaper?: boolean;
	price_diff?: number;
	lowest_price?: number;
	mall?: string;
	link?: string;
}

const PROVIDER_LABELS: Record<string, string> = {
	danawa: '다나와',
	naver: '네이버쇼핑',
	coupang: '쿠팡',
	'11st': '11번가',
	gmarket: 'G마켓',
};

const ensureLowestPriceComparison = async (query: string): Promise<void> => {
	if (!query) return;
	// 이미 로딩 중이거나 성공한 쿼리면 스킵
	if (state.comparison.status === 'loading') return;
	if (state.comparison.status === 'success' && state.comparison.query === query) return;
	if (state.comparison.status === 'error' && state.comparison.query === query) return;

	// 상태를 loading으로 설정 (리렌더는 호출자가 이미 수행)
	state.comparison = { status: 'loading', query, error: null, data: null };

	try {
		if (!chrome?.runtime?.sendMessage) {
			state.comparison = {
				status: 'error',
				query,
				error: 'Chrome extension API를 사용할 수 없습니다.',
				data: null,
			};
			return;
		}

		const serverCheck = await chrome.runtime.sendMessage({ type: 'CHECK_COMPARISON_SERVER' });
		if (!serverCheck?.success) {
			state.comparison = {
				status: 'error',
				query,
				error:
					serverCheck?.error ||
					'가격 비교 서버가 실행 중이 아닙니다.',
				data: null,
			};
			return;
		}

		const result = await chrome.runtime.sendMessage({
			type: 'COMPARE_PRICES',
			query,
		});

		if (result?.success) {
			state.comparison = { status: 'success', query, error: null, data: result.data as ComparisonResponse };
		} else {
			state.comparison = {
				status: 'error',
				query,
				error: result?.error || '가격 비교 검색 실패',
				data: null,
			};
		}
	} catch (e) {
		state.comparison = {
			status: 'error',
			query,
			error: e instanceof Error ? e.message : '알 수 없는 오류',
			data: null,
		};
	}
};

// 패널 열림 시 가격 비교 시작 + 리렌더
export const startLowestPriceComparisonAndRender = (query: string): void => {
	if (!query) return;
	if (state.comparison.status === 'loading') {
		// 이미 로딩중이면 스킵
		return;
	}
	if ((state.comparison.status === 'success' || state.comparison.status === 'error') && state.comparison.query === query) {
		// 동일 쿼리로 이미 완료됨
		return;
	}

	// 상태를 loading으로 먼저 설정하고 리렌더
	state.comparison = { status: 'loading', query, error: null, data: null };
	renderContent();

	// 비동기로 요청 후 리렌더
	ensureLowestPriceComparison(query).finally(() => {
		renderContent();
	});
};

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
		// 최저가 비교 UI
		const lowestPriceSection = document.createElement('section');
		lowestPriceSection.className = 'picsel-section picsel-lowest-price-section';
		
		const title = document.createElement('h4');
		title.className = 'picsel-section-title';
		title.textContent = '💰 최저가 비교';
		lowestPriceSection.appendChild(title);

		const panelIsOpen = !!state.panelEl?.classList.contains('open');
		
		// 패널이 열릴 때만 비교 시작 (mount.ts의 setPanelOpen에서 호출)
		// renderContent 내부에서 직접 호출하지 않음 (recursive 방지)

		const status = state.comparison.status;
		const comparisonData = state.comparison.data as ComparisonResponse | null;

		if (!panelIsOpen) {
			const hint = document.createElement('div');
			hint.className = 'picsel-empty-state';
			hint.textContent = '패널을 열면 최저가 비교를 시작합니다.';
			lowestPriceSection.appendChild(hint);
		} else if (status === 'loading') {
			const loading = document.createElement('div');
			loading.className = 'picsel-empty-state';
			loading.textContent = '가격 비교 중입니다...';
			lowestPriceSection.appendChild(loading);
		} else if (status === 'error') {
			const error = document.createElement('div');
			error.className = 'picsel-empty-state';
			error.textContent = state.comparison.error || '가격 비교 중 오류가 발생했습니다.';
			lowestPriceSection.appendChild(error);
		} else if (status === 'success' && comparisonData) {
			// 가격 차이 표시
			if (comparisonData.is_cheaper !== undefined && comparisonData.price_diff !== undefined) {
				const priceInfo = document.createElement('div');
				priceInfo.style.padding = '12px';
				priceInfo.style.marginBottom = '12px';
				priceInfo.style.background = comparisonData.is_cheaper ? '#f0fdf4' : '#fef2f2';
				priceInfo.style.border = `1px solid ${comparisonData.is_cheaper ? '#86efac' : '#fecaca'}`;
				priceInfo.style.borderRadius = '8px';
				priceInfo.style.fontSize = '13px';
				priceInfo.style.fontWeight = '600';
				priceInfo.style.color = comparisonData.is_cheaper ? '#166534' : '#991b1b';
				
				if (comparisonData.is_cheaper) {
					priceInfo.textContent = `✅ 다나와가 ${formatCurrency(comparisonData.price_diff, 'KRW')} 더 저렴합니다!`;
				} else {
					priceInfo.textContent = `❌ 현재 가격이 더 저렴하거나 비슷합니다.`;
				}
				lowestPriceSection.appendChild(priceInfo);
			}

			const results = Array.isArray(comparisonData.results) ? comparisonData.results : [];
			const cheapest = results
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

			if (!cheapest.length) {
				const empty = document.createElement('div');
				empty.className = 'picsel-empty-state';
				empty.textContent = '검색 결과가 없습니다.';
				lowestPriceSection.appendChild(empty);
			} else {
				const list = document.createElement('div');
				list.style.display = 'flex';
				list.style.flexDirection = 'column';
				list.style.gap = '8px';

				cheapest.forEach((item) => {
					const row = document.createElement('a');
					row.href = item.url || '#';
					row.target = '_blank';
					row.rel = 'noreferrer';
					row.style.display = 'flex';
					row.style.alignItems = 'center';
					row.style.justifyContent = 'space-between';
					row.style.gap = '10px';
					row.style.padding = '10px 12px';
					row.style.background = '#ffffff';
					row.style.border = '1px solid #e5e7eb';
					row.style.borderRadius = '12px';
					row.style.textDecoration = 'none';
					row.style.color = 'inherit';
					row.style.transition = 'background-color 0.15s ease';

					const left = document.createElement('div');
					left.style.display = 'flex';
					left.style.flexDirection = 'column';
					left.style.gap = '2px';
					left.style.minWidth = '0';

					const provider = document.createElement('span');
					provider.style.fontSize = '11px';
					provider.style.color = '#6b7280';
					provider.textContent = PROVIDER_LABELS[item.provider] || item.provider;

					const name = document.createElement('span');
					name.style.fontSize = '12px';
					name.style.fontWeight = '600';
					name.style.color = '#111827';
					name.style.whiteSpace = 'nowrap';
					name.style.overflow = 'hidden';
					name.style.textOverflow = 'ellipsis';
					name.textContent = item.name;

					left.appendChild(provider);
					left.appendChild(name);

					const price = document.createElement('strong');
					price.style.fontSize = '13px';
					price.style.fontWeight = '800';
					price.style.color = '#111827';
					price.style.flexShrink = '0';
					price.textContent =
						formatCurrency(item.price, (item.currency as string | undefined) ?? 'KRW') ||
						`${item.price}`;

					row.appendChild(left);
					row.appendChild(price);
					list.appendChild(row);
				});

				lowestPriceSection.appendChild(list);
			}
		} else {
			const empty = document.createElement('div');
			empty.className = 'picsel-empty-state';
			empty.textContent = '상품명을 찾을 수 없어 가격 비교를 실행할 수 없습니다.';
			lowestPriceSection.appendChild(empty);
		}

		contentEl.appendChild(lowestPriceSection);
	} else {
		// 기존: 카드 혜택 우선
		const cardSection = createCardBenefitsSection(data);
		if (cardSection) {
			contentEl.appendChild(cardSection);
		}

		// 3. Footer Section (추가 혜택)
		const footerSection = createFooterSection(data);
		if (footerSection) {
			contentEl.appendChild(footerSection);
		}
	}

	// Note: "다른 구성" 섹션은 PRD에 따라 삭제됨
	// 사용자 관점: "다른 구성을 알려줘서 뭘 하자는거지?"

	if (displayMode === 'lowest-price') {
		updateBadge(null);
	} else {
		updateBadge(data);
	}
};
