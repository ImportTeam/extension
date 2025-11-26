import type { ParsedData } from '../parsers';

type Optional<T> = {
	[K in keyof T]?: T[K] | null;
};

export type ToggleProductData = (ParsedData & Record<string, unknown>) &
	Optional<{
		title: string;
		imageUrl: string;
		images: string[];
		originalPrice: number;
		discountPrice: number;
		cardBenefits: Array<{
			cardName: string;
			benefit: string;
			rate?: number;
		}>;
		giftCardDiscount: {
			rate: number;
			description: string;
		};
		cashback: {
			amount: number;
			description: string;
		};
		shippingInfo: string;
		variants: Array<{
			name: string;
			price: number;
			discount?: string;
		}>;
	}>;

const HOST_ID = 'picsel-toggle-host';
const PANEL_ID = 'picsel-toggle-panel';

let hostElement: HTMLDivElement | null = null;
let shadowRoot: ShadowRoot | null = null;
let toggleButton: HTMLButtonElement | null = null;
let buttonLabelEl: HTMLSpanElement | null = null;
let buttonBadgeEl: HTMLSpanElement | null = null;
let panelEl: HTMLDivElement | null = null;
let closeButtonEl: HTMLButtonElement | null = null;
let contentEl: HTMLDivElement | null = null;
let mounted = false;
let cachedData: ToggleProductData | null = null;

const formatCurrency = (value?: number | null, currency: string = 'KRW'): string | null => {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		return null;
	}

	const targetCurrency = currency || 'KRW';
	const zeroDecimalCurrencies = new Set(['KRW', 'JPY']);
	const options: Intl.NumberFormatOptions = {
		style: 'currency',
		currency: targetCurrency,
	};

	let amount = value;
	if (zeroDecimalCurrencies.has(targetCurrency)) {
		options.minimumFractionDigits = 0;
		options.maximumFractionDigits = 0;
		amount = Math.round(value);
	}

	const locale = targetCurrency === 'KRW' ? 'ko-KR' : 'en-US';
	return new Intl.NumberFormat(locale, options).format(amount);
};

const computeDiscountRate = (original?: number | null, current?: number | null): number | null => {
	if (
		typeof original !== 'number' ||
		typeof current !== 'number' ||
		original <= 0 ||
		current >= original
	) {
		return null;
	}

	return Math.round(((original - current) / original) * 100);
};

const ensureMounted = (): void => {
	if (mounted) {
		return;
	}

	if (document.getElementById(HOST_ID)) {
		const existingHost = document.getElementById(HOST_ID) as HTMLDivElement | null;
		if (existingHost) {
			hostElement = existingHost;
			shadowRoot = existingHost.shadowRoot;
			if (shadowRoot) {
				toggleButton = shadowRoot.querySelector<HTMLButtonElement>('.picsel-toggle-button');
				buttonLabelEl = shadowRoot.querySelector<HTMLSpanElement>('.picsel-toggle-label');
				buttonBadgeEl = shadowRoot.querySelector<HTMLSpanElement>('.picsel-toggle-badge');
				panelEl = shadowRoot.querySelector<HTMLDivElement>(`#${PANEL_ID}`);
				closeButtonEl = shadowRoot.querySelector<HTMLButtonElement>('.picsel-close-button');
				contentEl = shadowRoot.querySelector<HTMLDivElement>('.picsel-panel-content');
			}
		}
		mounted = true;
		return;
	}

	hostElement = document.createElement('div');
	hostElement.id = HOST_ID;
	hostElement.style.position = 'fixed';
	hostElement.style.bottom = '24px';
	hostElement.style.right = '24px';
	hostElement.style.zIndex = String(2147483647);

	shadowRoot = hostElement.attachShadow({ mode: 'open' });

	const styleEl = document.createElement('style');
	styleEl.textContent = `
		:host {
			all: initial;
			position: fixed;
			inset: auto 24px 24px auto;
			z-index: 2147483647;
			font-family: 'Pretendard', 'Noto Sans KR', 'Segoe UI', Arial, sans-serif;
		}

		*, *::before, *::after {
			box-sizing: border-box;
		}

		.picsel-toggle-container {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			gap: 12px;
			color: #0f172a;
			font-size: 14px;
			font-weight: 500;
		}

		.picsel-toggle-button {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			padding: 12px 20px;
			border-radius: 999px;
			border: none;
			cursor: pointer;
			background: linear-gradient(135deg, #2563eb, #38bdf8);
			color: #ffffff;
			box-shadow: 0 10px 24px rgba(37, 99, 235, 0.35);
			font-weight: 600;
			font-size: 15px;
			transition: transform 0.2s ease, box-shadow 0.2s ease;
		}

		.picsel-toggle-button:hover {
			transform: translateY(-1px);
			box-shadow: 0 14px 32px rgba(37, 99, 235, 0.4);
		}

		.picsel-toggle-button:active {
			transform: translateY(0);
			box-shadow: 0 8px 18px rgba(37, 99, 235, 0.32);
		}

		.picsel-toggle-label {
			white-space: nowrap;
			font-size: 15px;
		}

		.picsel-toggle-badge {
			display: none;
			align-items: center;
			justify-content: center;
			font-size: 13px;
			font-weight: 600;
			padding: 2px 8px;
			border-radius: 999px;
			background: rgba(255, 255, 255, 0.2);
			border: 1px solid rgba(255, 255, 255, 0.3);
		}

		.picsel-panel {
			width: 360px;
			max-height: 78vh;
			background: #ffffff;
			border-radius: 16px;
			box-shadow: 0 24px 48px rgba(15, 23, 42, 0.32);
			border: 1px solid rgba(148, 163, 184, 0.18);
			overflow: hidden;
			display: none;
			flex-direction: column;
		}

		.picsel-panel.open {
			display: flex;
		}

		.picsel-panel-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 16px;
			background: linear-gradient(135deg, #111827, #1f2937);
			color: #f8fafc;
		}

		.picsel-panel-title {
			font-size: 14px;
			font-weight: 600;
		}

		.picsel-close-button {
			width: 28px;
			height: 28px;
			border-radius: 999px;
			border: none;
			background: rgba(255, 255, 255, 0.15);
			color: #f8fafc;
			font-size: 14px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: background 0.2s ease;
		}

		.picsel-close-button:hover {
			background: rgba(255, 255, 255, 0.28);
		}

		.picsel-panel-content {
			padding: 20px;
			display: flex;
			flex-direction: column;
			gap: 18px;
			overflow-y: auto;
		}

		.picsel-empty-state {
			font-size: 13px;
			color: #475569;
			text-align: center;
		}

		.picsel-product {
			display: flex;
			gap: 16px;
		}

		.picsel-product-thumb {
			width: 96px;
			height: 96px;
			border-radius: 12px;
			overflow: hidden;
			background: #e2e8f0;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.picsel-product-thumb img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.picsel-product-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		.picsel-product-title {
			font-size: 15px;
			font-weight: 600;
			color: #111827;
			line-height: 1.4;
			margin: 0;
		}

		.picsel-price {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.picsel-original-price {
			font-size: 13px;
			color: #94a3b8;
			text-decoration: line-through;
		}

		.picsel-final-price {
			font-size: 20px;
			font-weight: 700;
			color: #1f2937;
		}

		.picsel-discount-tag {
			width: fit-content;
			padding: 2px 8px;
			border-radius: 999px;
			background: rgba(16, 185, 129, 0.16);
			color: #0f766e;
			font-size: 12px;
			font-weight: 600;
		}

		.picsel-section {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-section-title {
			font-size: 14px;
			font-weight: 600;
			color: #0f172a;
		}

		.picsel-benefit-list {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-benefit-item {
			padding: 12px 14px;
			border-radius: 12px;
			background: #f8fafc;
			border: 1px solid rgba(148, 163, 184, 0.24);
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		.picsel-card-name {
			font-size: 13px;
			font-weight: 600;
			color: #1f2937;
		}

		.picsel-benefit-desc {
			font-size: 12px;
			color: #475569;
		}

		.picsel-extra-list {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.picsel-extra-item {
			font-size: 13px;
			color: #1d4ed8;
			background: rgba(191, 219, 254, 0.4);
			border: 1px solid rgba(147, 197, 253, 0.7);
			padding: 8px 10px;
			border-radius: 10px;
		}

		.picsel-shipping {
			font-size: 12px;
			color: #475569;
			display: flex;
			gap: 6px;
			align-items: center;
		}

		.picsel-variants {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.picsel-variant-item {
			display: flex;
			justify-content: space-between;
			padding: 10px 12px;
			border-radius: 10px;
			background: #f1f5f9;
			font-size: 12px;
			color: #0f172a;
			border: 1px solid rgba(148, 163, 184, 0.24);
			gap: 12px;
		}

		.picsel-variant-name {
			font-weight: 500;
		}

		.picsel-variant-price {
			font-weight: 600;
			color: #1f2937;
		}

		.picsel-variant-discount {
			color: #0f766e;
		}

		::-webkit-scrollbar {
			width: 6px;
		}

		::-webkit-scrollbar-thumb {
			background: rgba(15, 23, 42, 0.2);
			border-radius: 999px;
		}

		::-webkit-scrollbar-track {
			background: transparent;
		}
	`;

	shadowRoot.appendChild(styleEl);

	const containerEl = document.createElement('div');
	containerEl.className = 'picsel-toggle-container';
	shadowRoot.appendChild(containerEl);

	toggleButton = document.createElement('button');
	toggleButton.className = 'picsel-toggle-button';
	toggleButton.type = 'button';
	toggleButton.setAttribute('aria-expanded', 'false');

	buttonLabelEl = document.createElement('span');
	buttonLabelEl.className = 'picsel-toggle-label';
	buttonLabelEl.textContent = 'PicSel 혜택 보기';
	toggleButton.appendChild(buttonLabelEl);

	buttonBadgeEl = document.createElement('span');
	buttonBadgeEl.className = 'picsel-toggle-badge';
	toggleButton.appendChild(buttonBadgeEl);

	containerEl.appendChild(toggleButton);

	panelEl = document.createElement('div');
	panelEl.className = 'picsel-panel';
	panelEl.id = PANEL_ID;
	panelEl.setAttribute('role', 'dialog');
	panelEl.setAttribute('aria-hidden', 'true');
	toggleButton.setAttribute('aria-controls', PANEL_ID);

	const panelHeaderEl = document.createElement('div');
	panelHeaderEl.className = 'picsel-panel-header';

	const panelTitleEl = document.createElement('div');
	panelTitleEl.className = 'picsel-panel-title';
	panelTitleEl.textContent = 'PicSel 혜택 정보';

	closeButtonEl = document.createElement('button');
	closeButtonEl.type = 'button';
	closeButtonEl.className = 'picsel-close-button';
	closeButtonEl.setAttribute('aria-label', '닫기');
	closeButtonEl.textContent = '✕';

	panelHeaderEl.appendChild(panelTitleEl);
	panelHeaderEl.appendChild(closeButtonEl);
	panelEl.appendChild(panelHeaderEl);

	contentEl = document.createElement('div');
	contentEl.className = 'picsel-panel-content';
	panelEl.appendChild(contentEl);

	containerEl.appendChild(panelEl);

	toggleButton.addEventListener('click', () => {
		const willOpen = !panelEl?.classList.contains('open');
		setPanelOpen(willOpen);
	});

	closeButtonEl.addEventListener('click', () => {
		setPanelOpen(false);
	});

	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			setPanelOpen(false);
		}
	});

	document.addEventListener(
		'click',
		(event) => {
			if (!panelEl?.classList.contains('open')) {
				return;
			}

			const path = event.composedPath();
			if (hostElement && !path.includes(hostElement)) {
				setPanelOpen(false);
			}
		},
		true
	);

	document.body.appendChild(hostElement);

	mounted = true;
};

const setPanelOpen = (open: boolean): void => {
	if (!panelEl || !toggleButton || !buttonLabelEl) {
		return;
	}

	if (open) {
		panelEl.classList.add('open');
		panelEl.setAttribute('aria-hidden', 'false');
		toggleButton.setAttribute('aria-expanded', 'true');
		buttonLabelEl.textContent = 'PicSel 혜택 닫기';
	} else {
		panelEl.classList.remove('open');
		panelEl.setAttribute('aria-hidden', 'true');
		toggleButton.setAttribute('aria-expanded', 'false');
		buttonLabelEl.textContent = 'PicSel 혜택 보기';
	}
};

const updateBadge = (data: ToggleProductData | null): void => {
	if (!buttonBadgeEl) {
		return;
	}

	if (!data) {
		buttonBadgeEl.style.display = 'none';
		return;
	}

	const rates = Array.isArray(data.cardBenefits)
		? data.cardBenefits
				.map((benefit) => (typeof benefit?.rate === 'number' ? benefit.rate : 0))
				.filter((rate) => rate > 0)
		: [];

	if (rates.length > 0) {
		const bestRate = Math.max(...rates);
		buttonBadgeEl.textContent = `최대 ${bestRate}%`;
		buttonBadgeEl.style.display = 'inline-flex';
		return;
	}

	const cashbackAmount = data.cashback?.amount;
	if (typeof cashbackAmount === 'number' && cashbackAmount > 0) {
		const formatted = formatCurrency(cashbackAmount, data.currency ?? 'KRW');
		buttonBadgeEl.textContent = formatted ? `${formatted} 적립` : '캐시백 혜택';
		buttonBadgeEl.style.display = 'inline-flex';
		return;
	}

	buttonBadgeEl.style.display = 'none';
};

const renderContent = (): void => {
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

	const productEl = document.createElement('div');
	productEl.className = 'picsel-product';

	const thumbEl = document.createElement('div');
	thumbEl.className = 'picsel-product-thumb';
	const primaryImage = data.imageUrl || (Array.isArray(data.images) && data.images[0]) || null;

	if (primaryImage) {
		const imgEl = document.createElement('img');
		imgEl.src = primaryImage;
		imgEl.alt = data.title ? `${data.title} 이미지` : '상품 이미지';
		thumbEl.appendChild(imgEl);
	} else {
		const placeholder = document.createElement('span');
		placeholder.textContent = 'No Image';
		placeholder.style.fontSize = '11px';
		placeholder.style.color = '#64748b';
		thumbEl.appendChild(placeholder);
	}

	const infoEl = document.createElement('div');
	infoEl.className = 'picsel-product-info';

	const titleEl = document.createElement('h3');
	titleEl.className = 'picsel-product-title';
	titleEl.textContent = data.title || '상품 정보를 찾을 수 없어요.';

	const priceEl = document.createElement('div');
	priceEl.className = 'picsel-price';

	const finalPrice =
		typeof data.discountPrice === 'number' && data.discountPrice > 0
			? data.discountPrice
			: data.amount;

	const formattedFinal = formatCurrency(finalPrice, data.currency ?? 'KRW');
	if (formattedFinal) {
		const finalPriceEl = document.createElement('div');
		finalPriceEl.className = 'picsel-final-price';
		finalPriceEl.textContent = formattedFinal;
		priceEl.appendChild(finalPriceEl);
	}

	const formattedOriginal = formatCurrency(data.originalPrice, data.currency ?? 'KRW');
	const discountRate = computeDiscountRate(data.originalPrice, finalPrice);

	if (formattedOriginal && discountRate) {
		const originalEl = document.createElement('div');
		originalEl.className = 'picsel-original-price';
		originalEl.textContent = formattedOriginal;

		const discountTag = document.createElement('div');
		discountTag.className = 'picsel-discount-tag';
		discountTag.textContent = `-${discountRate}%`; // rare comment: display highlight discount percentage

		priceEl.appendChild(originalEl);
		priceEl.appendChild(discountTag);
	}

	infoEl.appendChild(titleEl);
	infoEl.appendChild(priceEl);

	if (data.shippingInfo) {
		const shippingEl = document.createElement('div');
		shippingEl.className = 'picsel-shipping';
		shippingEl.textContent = `배송: ${data.shippingInfo}`;
		infoEl.appendChild(shippingEl);
	}

	productEl.appendChild(thumbEl);
	productEl.appendChild(infoEl);
	contentEl.appendChild(productEl);

	const benefits = Array.isArray(data.cardBenefits) ? data.cardBenefits.slice(0, 3) : [];
	if (benefits.length > 0) {
		const section = document.createElement('section');
		section.className = 'picsel-section';

		const title = document.createElement('h4');
		title.className = 'picsel-section-title';
		title.textContent = '카드 혜택 TOP';
		section.appendChild(title);

		const list = document.createElement('div');
		list.className = 'picsel-benefit-list';

		benefits.forEach((benefit) => {
			const item = document.createElement('div');
			item.className = 'picsel-benefit-item';

			const cardName = document.createElement('div');
			cardName.className = 'picsel-card-name';
			cardName.textContent = benefit.cardName || '제휴 카드';
			item.appendChild(cardName);

			if (benefit.benefit) {
				const desc = document.createElement('div');
				desc.className = 'picsel-benefit-desc';
				desc.textContent = benefit.benefit;
				item.appendChild(desc);
			}

			list.appendChild(item);
		});

		section.appendChild(list);
		contentEl.appendChild(section);
	}

	const extras: string[] = [];
	if (data.giftCardDiscount?.description) {
		extras.push(`🎁 ${data.giftCardDiscount.description}`);
	}
	if (data.cashback?.description) {
		extras.push(`💰 ${data.cashback.description}`);
	}

	if (extras.length > 0) {
		const section = document.createElement('section');
		section.className = 'picsel-section';

		const title = document.createElement('h4');
		title.className = 'picsel-section-title';
		title.textContent = '추가 혜택';
		section.appendChild(title);

		const list = document.createElement('div');
		list.className = 'picsel-extra-list';

		extras.forEach((text) => {
			const item = document.createElement('div');
			item.className = 'picsel-extra-item';
			item.textContent = text;
			list.appendChild(item);
		});

		section.appendChild(list);
		contentEl.appendChild(section);
	}

	const variants = Array.isArray(data.variants) ? data.variants.slice(0, 3) : [];
	if (variants.length > 0) {
		const section = document.createElement('section');
		section.className = 'picsel-section';

		const title = document.createElement('h4');
		title.className = 'picsel-section-title';
		title.textContent = '다른 구성';
		section.appendChild(title);

		const list = document.createElement('div');
		list.className = 'picsel-variants';

		variants.forEach((variant) => {
			const item = document.createElement('div');
			item.className = 'picsel-variant-item';

			const nameEl = document.createElement('div');
			nameEl.className = 'picsel-variant-name';
			nameEl.textContent = variant.name || '옵션';

			const priceEl = document.createElement('div');
			priceEl.className = 'picsel-variant-price';
			const formattedVariantPrice = formatCurrency(variant.price, data.currency ?? 'KRW');
			priceEl.textContent = formattedVariantPrice || '-';

			item.appendChild(nameEl);
			item.appendChild(priceEl);

			if (variant.discount) {
				const discountEl = document.createElement('div');
				discountEl.className = 'picsel-variant-discount';
				discountEl.textContent = variant.discount;
				item.appendChild(discountEl);
			}

			list.appendChild(item);
		});

		section.appendChild(list);
		contentEl.appendChild(section);
	}

	updateBadge(data);
};

export const mountToggleBar = (data: ToggleProductData): void => {
	cachedData = { ...data };
	ensureMounted();
	renderContent();
	setPanelOpen(false);
};

export const updateToggleBar = (data: ToggleProductData): void => {
	cachedData = { ...(cachedData ?? {}), ...data };
	if (!mounted) {
		mountToggleBar(cachedData);
		return;
	}
	renderContent();
};
