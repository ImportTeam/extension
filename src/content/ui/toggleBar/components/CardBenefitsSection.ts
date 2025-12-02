/**
 * Card Benefits Section 컴포넌트
 * 카드별 혜택을 비교하여 보여주는 메인 콘텐츠
 * 
 * PRD 핵심: "어떤 카드로 결제하면 가장 이득인지 한눈에 알 수 있다"
 */

import type { ToggleProductData } from '../types';
import { formatCurrency } from '../utils';

interface CardBenefitItem {
	card?: string;           // 카드사명 (원본)
	cardName?: string;       // 카드사명 (별칭)
	benefit?: string;        // 혜택 설명
	discount?: number;       // 할인율 (원본)
	rate?: number;           // 할인율 (별칭)
	discountAmount?: number; // 계산된 할인 금액
	finalPrice?: number;     // 최종 결제 예상 금액
	imageUrl?: string;       // 카드 이미지 URL
}

/**
 * 카드별 할인 금액 계산
 */
const calculateDiscountAmount = (
	price: number | undefined,
	rate: number | undefined
): number | null => {
	if (typeof price !== 'number' || typeof rate !== 'number') return null;
	return Math.round(price * (rate / 100));
};

/**
 * 최종 결제 예상 금액 계산
 */
const calculateFinalPrice = (
	price: number | undefined,
	discountAmount: number | null
): number | null => {
	if (typeof price !== 'number' || discountAmount === null) return null;
	return price - discountAmount;
};

/**
 * 개별 카드 아이템 생성
 */
const createCardItem = (
	benefit: CardBenefitItem,
	idx: number,
	currency: string
): HTMLElement => {
	const rankClass = idx === 0 ? ' recommended' : idx === 1 ? ' rank-2' : idx === 2 ? ' rank-3' : '';

	const item = document.createElement('div');
	item.className = `picsel-card-benefit-item${rankClass}`;

	// 카드 이미지 (있는 경우)
	if (benefit.imageUrl) {
		const imageWrapper = document.createElement('div');
		imageWrapper.className = 'picsel-card-image-wrapper';
		
		const img = document.createElement('img');
		img.src = benefit.imageUrl;
		img.alt = benefit.cardName || benefit.card || '카드';
		img.className = 'picsel-card-image';
		img.onerror = () => {
			// 이미지 로드 실패 시 기본 아이콘으로 대체
			imageWrapper.innerHTML = `
				<div class="picsel-card-icon-fallback">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
						<line x1="1" y1="10" x2="23" y2="10"></line>
					</svg>
				</div>
			`;
		};
		
		imageWrapper.appendChild(img);
		item.appendChild(imageWrapper);
	} else {
		// 카드 이미지가 없으면 기본 아이콘 표시
		const iconWrapper = document.createElement('div');
		iconWrapper.className = 'picsel-card-image-wrapper';
		iconWrapper.innerHTML = `
			<div class="picsel-card-icon-fallback">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
					<line x1="1" y1="10" x2="23" y2="10"></line>
				</svg>
			</div>
		`;
		item.appendChild(iconWrapper);
	}

	// 카드 정보 영역
	const infoArea = document.createElement('div');
	infoArea.className = 'picsel-card-info';

	// 상단: 순위 배지 + 카드명
	const headerRow = document.createElement('div');
	headerRow.className = 'picsel-card-header';

	// 상위 3개에 순위 배지 표시
	if (idx < 3 && (benefit.discountAmount ?? 0) > 0) {
		const badge = document.createElement('span');
		badge.className = 'picsel-recommended-badge';
		badge.textContent = `${idx + 1}위`;
		headerRow.appendChild(badge);
	}

	const cardName = document.createElement('span');
	cardName.className = 'picsel-card-name';
	const cardNameText = benefit.cardName || benefit.card || '제휴 카드';
	// 콤마로 구분된 여러 카드는 첫 번째 카드만 표시
	const primaryCard = cardNameText.includes(',') 
		? cardNameText.split(',')[0].trim() 
		: cardNameText;
	cardName.textContent = primaryCard;
	headerRow.appendChild(cardName);

	infoArea.appendChild(headerRow);

	// 혜택 설명
	if (benefit.benefit) {
		const desc = document.createElement('div');
		desc.className = 'picsel-card-benefit-desc';
		desc.textContent = benefit.benefit;
		infoArea.appendChild(desc);
	}

	item.appendChild(infoArea);

	// 할인 금액 영역
	const amountArea = document.createElement('div');
	amountArea.className = 'picsel-card-amount';

	if (typeof benefit.discountAmount === 'number' && benefit.discountAmount > 0) {
		const discountEl = document.createElement('div');
		discountEl.className = 'picsel-card-discount';
		const formatted = formatCurrency(benefit.discountAmount, currency);
		discountEl.textContent = `-${formatted}`;
		amountArea.appendChild(discountEl);

		if (typeof benefit.finalPrice === 'number') {
			const finalEl = document.createElement('div');
			finalEl.className = 'picsel-card-final';
			const formattedFinal = formatCurrency(benefit.finalPrice, currency);
			finalEl.textContent = `→ ${formattedFinal}`;
			amountArea.appendChild(finalEl);
		}
	} else if (typeof benefit.rate === 'number') {
		const rateEl = document.createElement('div');
		rateEl.className = 'picsel-card-rate';
		rateEl.textContent = `${benefit.rate}%`;
		amountArea.appendChild(rateEl);
	}

	item.appendChild(amountArea);

	return item;
};

export const createCardBenefitsSection = (data: ToggleProductData): HTMLElement | null => {
	const benefits = Array.isArray(data.cardBenefits) ? data.cardBenefits : [];
	
	if (benefits.length === 0) {
		// 카드 혜택이 없으면 안내 메시지 표시
		const emptySection = document.createElement('section');
		emptySection.className = 'picsel-section picsel-card-section';

		const title = document.createElement('h4');
		title.className = 'picsel-section-title';
		title.textContent = '카드별 혜택';
		emptySection.appendChild(title);

		const emptyMsg = document.createElement('div');
		emptyMsg.className = 'picsel-empty-benefits';
		emptyMsg.textContent = '카드 혜택 정보를 불러오는 중...';
		emptySection.appendChild(emptyMsg);

		return emptySection;
	}

	const basePrice =
		typeof data.discountPrice === 'number' && data.discountPrice > 0
			? data.discountPrice
			: data.amount;

	// 각 카드별 할인 금액 계산 및 정렬 (최고 혜택 순)
	const enrichedBenefits: CardBenefitItem[] = benefits
		.map((b) => {
			const item = b as CardBenefitItem;
			const rate = item.rate ?? item.discount;
			const discountAmount = calculateDiscountAmount(basePrice, rate);
			const finalPrice = calculateFinalPrice(basePrice, discountAmount);
			return {
				...item,
				cardName: item.cardName ?? item.card,
				rate,
				discountAmount: discountAmount ?? undefined,
				finalPrice: finalPrice ?? undefined,
			};
		})
		.sort((a, b) => {
			const aDiscount = a.discountAmount ?? 0;
			const bDiscount = b.discountAmount ?? 0;
			return bDiscount - aDiscount;
		});

	const section = document.createElement('section');
	section.className = 'picsel-section picsel-card-section';

	const title = document.createElement('h4');
	title.className = 'picsel-section-title';
	title.textContent = '카드별 혜택 비교';
	section.appendChild(title);

	const list = document.createElement('div');
	list.className = 'picsel-card-benefit-list';

	const currency = data.currency ?? 'KRW';

	enrichedBenefits.forEach((benefit, idx) => {
		const cardItem = createCardItem(benefit, idx, currency);
		list.appendChild(cardItem);
	});

	section.appendChild(list);

	// 추가 혜택 (sub) - 쿠팡캐시 등
	const extras: string[] = [];
	if (data.giftCardDiscount?.description) {
		extras.push(data.giftCardDiscount.description);
	}
	if (data.cashback?.description) {
		extras.push(data.cashback.description);
	}

	if (extras.length > 0) {
		const subBenefits = document.createElement('div');
		subBenefits.className = 'picsel-sub-benefits';
		extras.forEach((text) => {
			const item = document.createElement('div');
			item.className = 'picsel-sub-benefit-item';
			item.textContent = text;
			subBenefits.appendChild(item);
		});
		section.appendChild(subBenefits);
	}

	return section;
};
