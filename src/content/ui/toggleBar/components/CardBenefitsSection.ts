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

export const createCardBenefitsSection = (data: ToggleProductData): HTMLElement | null => {
	const benefits = Array.isArray(data.cardBenefits) ? data.cardBenefits : [];
	
	if (benefits.length === 0) {
		// 카드 혜택이 없으면 안내 메시지 표시
		const emptySection = document.createElement('section');
		emptySection.className = 'picsel-section picsel-card-section';

		const title = document.createElement('h4');
		title.className = 'picsel-section-title';
		title.innerHTML = '💳 카드별 혜택';
		emptySection.appendChild(title);

		const emptyMsg = document.createElement('div');
		emptyMsg.className = 'picsel-empty-benefits';
		emptyMsg.textContent = '카드 혜택 정보를 불러오는 중...';
		emptyMsg.style.padding = '16px';
		emptyMsg.style.textAlign = 'center';
		emptyMsg.style.color = '#64748b';
		emptyMsg.style.fontSize = '13px';
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
			// 타입 호환성을 위해 캐스팅
			const item = b as CardBenefitItem;
			// rate 또는 discount 중 하나 사용
			const rate = item.rate ?? item.discount;
			const discountAmount = calculateDiscountAmount(basePrice, rate);
			const finalPrice = calculateFinalPrice(basePrice, discountAmount);
			return {
				...item,
				// 카드명 정규화: cardName 또는 card 필드 사용
				cardName: item.cardName ?? item.card,
				rate,
				discountAmount: discountAmount ?? undefined,
				finalPrice: finalPrice ?? undefined,
			};
		})
		.sort((a, b) => {
			// 할인 금액 내림차순 정렬
			const aDiscount = a.discountAmount ?? 0;
			const bDiscount = b.discountAmount ?? 0;
			return bDiscount - aDiscount;
		});

	const section = document.createElement('section');
	section.className = 'picsel-section picsel-card-section';

	const title = document.createElement('h4');
	title.className = 'picsel-section-title';
	title.innerHTML = '💳 카드별 혜택 비교';
	section.appendChild(title);

	const list = document.createElement('div');
	list.className = 'picsel-card-benefit-list';

	enrichedBenefits.forEach((benefit, idx) => {
		const isRecommended = idx === 0 && (benefit.discountAmount ?? 0) > 0;

		const item = document.createElement('div');
		item.className = `picsel-card-benefit-item${isRecommended ? ' recommended' : ''}`;

		// 왼쪽: 카드명 + 혜택 설명
		const leftCol = document.createElement('div');
		leftCol.className = 'picsel-card-left';

		const cardNameRow = document.createElement('div');
		cardNameRow.className = 'picsel-card-name-row';

		if (isRecommended) {
			const badge = document.createElement('span');
			badge.className = 'picsel-recommended-badge';
			badge.textContent = '🏆 최고 혜택';
			cardNameRow.appendChild(badge);
		}

		const cardName = document.createElement('span');
		cardName.className = 'picsel-card-name';
		// 카드명이 여러 개일 경우 줄바꿈으로 분리 ("신한카드, 우리카드, 롯데카드 외" -> 각각 줄바꿈)
		const cardNameText = benefit.cardName || '제휴 카드';
		if (cardNameText.includes(',')) {
			// 여러 카드사를 줄바꿈으로 분리
			const cards = cardNameText.split(',').map(c => c.trim());
			cards.forEach((c, i) => {
				const cardSpan = document.createElement('span');
				cardSpan.textContent = c;
				cardName.appendChild(cardSpan);
				if (i < cards.length - 1) {
					cardName.appendChild(document.createElement('br'));
				}
			});
		} else {
			cardName.textContent = cardNameText;
		}
		cardNameRow.appendChild(cardName);

		leftCol.appendChild(cardNameRow);

		if (benefit.benefit) {
			const desc = document.createElement('div');
			desc.className = 'picsel-card-benefit-desc';
			desc.textContent = benefit.benefit;
			leftCol.appendChild(desc);
		}

		// 오른쪽: 할인 금액 + 최종 가격
		const rightCol = document.createElement('div');
		rightCol.className = 'picsel-card-right';

		if (typeof benefit.discountAmount === 'number' && benefit.discountAmount > 0) {
			const discountEl = document.createElement('div');
			discountEl.className = 'picsel-card-discount';
			const formatted = formatCurrency(benefit.discountAmount, data.currency ?? 'KRW');
			discountEl.textContent = `-${formatted}`;
			rightCol.appendChild(discountEl);

			if (typeof benefit.finalPrice === 'number') {
				const finalEl = document.createElement('div');
				finalEl.className = 'picsel-card-final';
				const formattedFinal = formatCurrency(benefit.finalPrice, data.currency ?? 'KRW');
				finalEl.textContent = `최종 ${formattedFinal}`;
				rightCol.appendChild(finalEl);
			}
		} else if (typeof benefit.rate === 'number') {
			const rateEl = document.createElement('div');
			rateEl.className = 'picsel-card-rate';
			rateEl.textContent = `${benefit.rate}%`;
			rightCol.appendChild(rateEl);
		}

		item.appendChild(leftCol);
		item.appendChild(rightCol);
		list.appendChild(item);
	});

	section.appendChild(list);

	// 추가 혜택 (sub) - 카드 섹션 아래에 작게 표시
	const extras: string[] = [];
	if (data.giftCardDiscount?.description) {
		extras.push(`🎁 ${data.giftCardDiscount.description}`);
	}
	if (data.cashback?.description) {
		extras.push(`💰 ${data.cashback.description}`);
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
