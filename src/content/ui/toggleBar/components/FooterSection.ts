/**
 * Footer Section 컴포넌트
 * 확인 버튼 + 가격 비교 버튼 표시
 */

import type { ToggleProductData } from '../types';
import { setPanelOpen } from '../mount';
import { state } from '../state';

// 가격 비교 패널 상태
let comparisonPanelOpen = false;
let comparisonPanel: HTMLDivElement | null = null;

/**
 * 가격 비교 패널 생성 및 표시
 */
const showComparisonPanel = (data: ToggleProductData): void => {
	if (comparisonPanelOpen || !state.shadowRoot) {
		return;
	}

	comparisonPanel = document.createElement('div');
	comparisonPanel.className = 'picsel-comparison-panel';
	comparisonPanel.innerHTML = `
		<div class="picsel-comparison-header">
			<h3>💰 가격 비교</h3>
			<button class="picsel-comparison-close" type="button">✕</button>
		</div>
		<div class="picsel-comparison-loading">
			<div class="picsel-spinner"></div>
			<p>다나와, 네이버쇼핑, 쿠팡에서 검색 중...</p>
		</div>
	`;

	// 닫기 버튼 이벤트
	const closeBtn = comparisonPanel.querySelector('.picsel-comparison-close');
	closeBtn?.addEventListener('click', hideComparisonPanel);

	state.shadowRoot.appendChild(comparisonPanel);
	comparisonPanelOpen = true;

	// 서버에 가격 비교 요청
	requestPriceComparison(data);
};

/**
 * 가격 비교 패널 숨기기
 */
const hideComparisonPanel = (): void => {
	if (comparisonPanel && state.shadowRoot) {
		state.shadowRoot.removeChild(comparisonPanel);
		comparisonPanel = null;
		comparisonPanelOpen = false;
	}
};

/**
 * 가격 비교 API 요청
 */
const requestPriceComparison = async (data: ToggleProductData): Promise<void> => {
	if (!comparisonPanel) return;

	const query = data.title || '';
	const currentPrice = data.amount || 0;

	try {
		// Background로 가격 비교 요청
		const response = await chrome.runtime.sendMessage({
			type: 'COMPARE_PRICES',
			query,
		});

		if (!comparisonPanel) return;

		if (response.success && response.data) {
			renderComparisonResults(response.data, currentPrice);
		} else {
			renderComparisonError(response.error || '가격 비교 서버에 연결할 수 없습니다');
		}
	} catch (error) {
		if (!comparisonPanel) return;
		renderComparisonError(error instanceof Error ? error.message : '오류 발생');
	}
};

/**
 * 가격 비교 결과 렌더링
 */
const renderComparisonResults = (data: ComparisonData, currentPrice: number): void => {
	if (!comparisonPanel) return;

	const loadingEl = comparisonPanel.querySelector('.picsel-comparison-loading');
	if (loadingEl) {
		loadingEl.remove();
	}

	// 현재 가격 표시
	const currentPriceEl = document.createElement('div');
	currentPriceEl.className = 'picsel-comparison-current';
	currentPriceEl.innerHTML = `
		<span>현재 페이지 가격:</span>
		<strong>${currentPrice.toLocaleString('ko-KR')}원</strong>
	`;
	comparisonPanel.appendChild(currentPriceEl);

	// 결과 컨테이너
	const resultsEl = document.createElement('div');
	resultsEl.className = 'picsel-comparison-results';

	const providerNames: Record<string, string> = {
		danawa: '다나와',
		naver: '네이버쇼핑',
		coupang: '쿠팡',
	};

	const providerColors: Record<string, string> = {
		danawa: '#0066cc',
		naver: '#03cf5d',
		coupang: '#f73c00',
	};

	for (const result of data.results) {
		const sectionEl = document.createElement('div');
		sectionEl.className = 'picsel-comparison-provider';

		const headerEl = document.createElement('div');
		headerEl.className = 'picsel-comparison-provider-header';
		headerEl.innerHTML = `
			<span style="color: ${providerColors[result.provider] || '#333'}; font-weight: 600;">
				${providerNames[result.provider] || result.provider}
			</span>
			${result.success 
				? `<span class="picsel-comparison-count">${result.products.length}개</span>`
				: '<span class="picsel-comparison-error-badge">실패</span>'
			}
		`;
		sectionEl.appendChild(headerEl);

		if (result.success && result.products.length > 0) {
			const listEl = document.createElement('div');
			listEl.className = 'picsel-comparison-product-list';

			for (const product of result.products.slice(0, 3)) {
				const isCheaper = product.price < currentPrice;
				const priceDiff = currentPrice - product.price;

				const itemEl = document.createElement('a');
				itemEl.className = 'picsel-comparison-product';
				itemEl.href = product.url;
				itemEl.target = '_blank';
				itemEl.rel = 'noopener noreferrer';
				itemEl.innerHTML = `
					${product.image ? `<img src="${product.image}" alt="" class="picsel-comparison-img" />` : ''}
					<div class="picsel-comparison-info">
						<p class="picsel-comparison-name">${product.name}</p>
						<div class="picsel-comparison-price-row">
							<span class="picsel-comparison-price" style="color: ${isCheaper ? '#e91e63' : '#333'};">
								${product.price.toLocaleString('ko-KR')}원
							</span>
							${isCheaper ? `<span class="picsel-comparison-saving">${priceDiff.toLocaleString('ko-KR')}원 저렴</span>` : ''}
						</div>
						<div class="picsel-comparison-meta">
							${product.rating ? `<span>⭐ ${product.rating}</span>` : ''}
							${product.deliveryInfo ? `<span style="color: #4caf50;">${product.deliveryInfo}</span>` : ''}
						</div>
					</div>
				`;
				listEl.appendChild(itemEl);
			}

			sectionEl.appendChild(listEl);
		} else if (result.error) {
			const errorEl = document.createElement('p');
			errorEl.className = 'picsel-comparison-provider-error';
			errorEl.textContent = result.error;
			sectionEl.appendChild(errorEl);
		} else {
			const emptyEl = document.createElement('p');
			emptyEl.className = 'picsel-comparison-empty';
			emptyEl.textContent = '검색 결과 없음';
			sectionEl.appendChild(emptyEl);
		}

		resultsEl.appendChild(sectionEl);
	}

	comparisonPanel.appendChild(resultsEl);

	// 메타 정보
	const metaEl = document.createElement('div');
	metaEl.className = 'picsel-comparison-meta-info';
	metaEl.innerHTML = `
		${data.fromCache ? '<span class="picsel-comparison-cache">캐시</span>' : ''}
		<span>${(data.totalDuration / 1000).toFixed(1)}초</span>
	`;
	comparisonPanel.appendChild(metaEl);
};

/**
 * 에러 렌더링
 */
const renderComparisonError = (message: string): void => {
	if (!comparisonPanel) return;

	const loadingEl = comparisonPanel.querySelector('.picsel-comparison-loading');
	if (loadingEl) {
		loadingEl.innerHTML = `
			<div class="picsel-comparison-error">
				<p>⚠️ ${message}</p>
				<code>pnpm run server</code>
				<p class="picsel-comparison-help">터미널에서 위 명령어를 실행 후 다시 시도해주세요.</p>
			</div>
		`;
	}
};

// 타입 정의
interface ComparisonData {
	success: boolean;
	query: string;
	results: Array<{
		provider: string;
		success: boolean;
		products: Array<{
			id: string;
			name: string;
			price: number;
			url: string;
			image?: string;
			rating?: number;
			deliveryInfo?: string;
		}>;
		error?: string;
	}>;
	totalDuration: number;
	fromCache?: boolean;
}

export const createFooterSection = (data: ToggleProductData): HTMLElement | null => {
	const footer = document.createElement('footer');
	footer.className = 'picsel-footer';

	// 버튼 컨테이너
	const btnContainer = document.createElement('div');
	btnContainer.className = 'picsel-footer-buttons';

	// 가격 비교 버튼
	const compareBtn = document.createElement('button');
	compareBtn.className = 'picsel-footer-compare';
	compareBtn.textContent = '💰 가격 비교';
	compareBtn.type = 'button';
	compareBtn.addEventListener('click', () => {
		if (comparisonPanelOpen) {
			hideComparisonPanel();
		} else {
			showComparisonPanel(data);
		}
	});
	btnContainer.appendChild(compareBtn);

	// 확인 버튼
	const confirmBtn = document.createElement('button');
	confirmBtn.className = 'picsel-footer-confirm';
	confirmBtn.textContent = '확인했습니다';
	confirmBtn.type = 'button';
	confirmBtn.addEventListener('click', () => {
		hideComparisonPanel();
		setPanelOpen(false);
	});
	btnContainer.appendChild(confirmBtn);

	footer.appendChild(btnContainer);

	return footer;
};
