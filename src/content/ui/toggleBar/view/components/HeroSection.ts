/**
 * Hero Section 컴포넌트
 * 상품 이미지, 제목, 가격 정보를 간결하게 표시
 */

import type { ToggleProductData } from '../../core/types';
import { formatCurrency, computeDiscountRate } from '../../core/utils';

export const createHeroSection = (data: ToggleProductData): HTMLElement => {
	const productEl = document.createElement('div');
	productEl.className = 'picsel-product';

	// 썸네일
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

	// 상품 정보
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
		discountTag.textContent = `-${discountRate}%`;

		priceEl.appendChild(originalEl);
		priceEl.appendChild(discountTag);
	}

	infoEl.appendChild(titleEl);
	infoEl.appendChild(priceEl);

	// 배송 정보
	if (data.shippingInfo) {
		const shippingEl = document.createElement('div');
		shippingEl.className = 'picsel-shipping';
		shippingEl.textContent = `배송: ${data.shippingInfo}`;
		infoEl.appendChild(shippingEl);
	}

	productEl.appendChild(thumbEl);
	productEl.appendChild(infoEl);

	return productEl;
};
