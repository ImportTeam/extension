/**
 * Card Benefits Section 컴포넌트
 * 카드별 혜택을 비교하여 보여주는 메인 콘텐츠
 *
 * PRD 핵심: "어떤 카드로 결제하면 가장 이득인지 한눈에 알 수 있다"
 *
 * 🔒 보안: DOMPurify 적용으로 XSS 공격 방지
 */

import DOMPurify from 'dompurify';
import type { ToggleProductData } from '../../core/types';
import { formatCurrency } from '../../core/utils';

interface CardBenefitItem {
	card?: string; // 카드사명 (원본)
	cardName?: string; // 카드사명 (별칭)
	benefit?: string; // 혜택 설명
	discount?: number; // 할인율 (원본)
	rate?: number; // 할인율 (별칭)
	discountAmount?: number; // 계산된 할인 금액
	finalPrice?: number; // 최종 결제 예상 금액
	imageUrl?: string; // 카드 이미지 URL
	condition?: string; // 조건 (결제 시 등)
	benefitType?: string; // 혜택 타입 (installment, discount, point 등)
	pointAmount?: number; // 포인트 금액 (포인트 혜택인 경우)
}

const calculateDiscountAmount = (price: number | undefined, rate: number | undefined): number | null => {
	if (typeof price !== 'number' || typeof rate !== 'number') return null;
	return Math.round(price * (rate / 100));
};

const calculateFinalPrice = (price: number | undefined, discountAmount: number | null): number | null => {
	if (typeof price !== 'number' || discountAmount === null) return null;
	return price - discountAmount;
};

const getCardInitial = (cardName: string): string => {
	const normalized = cardName.toUpperCase();
	
	// 1순위: 영문 약자 확인
	const abbreviations: Record<string, string> = {
		'KB': 'KB',
		'NH': 'NH',
		'BC': 'BC',
	};
	
	for (const [abbr, initial] of Object.entries(abbreviations)) {
		if (normalized.includes(abbr)) {
			return initial;
		}
	}
	
	// 2순위: 한글 카드사명 확인
	const cardInitials: Record<string, string> = {
		삼성: 'SS',
		현대: 'HD',
		신한: 'SH',
		국민: 'KB',
		롯데: 'LT',
		하나: 'HN',
		우리: 'WR',
		농협: 'NH',
		비씨: 'BC',
		씨티: 'CT',
	};

	for (const [key, initial] of Object.entries(cardInitials)) {
		if (cardName.includes(key)) {
			return initial;
		}
	}

	return cardName.replace('카드', '').substring(0, 2).toUpperCase();
};

const getCardSvgPath = (cardName: string): string | null => {
	const normalizedName = cardName.toUpperCase();

	const cardSvgMapping: Array<{ keywords: string[]; svg: string }> = [
		{ keywords: ['BC', 'BC카드', '비씨'], svg: 'bcCard.svg' },
		{ keywords: ['KB', '국민', 'KB국민', '케이비'], svg: 'kbCard.svg' },
		{ keywords: ['NH', '농협', 'NH농협'], svg: 'nhCard.svg' },
		{ keywords: ['삼성', 'SAMSUNG', '삼성카드', 'SAMSUNG CARD'], svg: 'samsungCard.svg' },
		{ keywords: ['현대', 'HYUNDAI', '현대카드'], svg: 'hyundaiCard.svg' },
		{ keywords: ['신한', 'SHINHAN', '신한카드'], svg: 'shinhanCard.svg' },
		{ keywords: ['롯데', 'LOTTE', '롯데카드'], svg: 'lotteCard.svg' },
		{ keywords: ['하나', 'HANA', '하나카드', 'SK'], svg: 'hanaCard.svg' },
		{ keywords: ['우리', 'WOORI', '우리카드'], svg: 'wooriCard.svg' },
		{ keywords: ['씨티', 'CITI', '씨티카드', 'CITIBANK'], svg: 'citiCard.svg' },
		{ keywords: ['VISA', '비자'], svg: 'visaCard.svg' },
		{ keywords: ['MASTER', '마스터', 'MASTERCARD'], svg: 'masterCard.svg' },
		{ keywords: ['AMEX', '아멕스', 'AMERICAN EXPRESS'], svg: 'amexCard.svg' },
	];

	for (const { keywords, svg } of cardSvgMapping) {
		for (const keyword of keywords) {
			if (normalizedName.includes(keyword.toUpperCase())) {
				try {
					return chrome?.runtime?.getURL(`assets/card/${svg}`) ?? null;
				} catch {
					return null;
				}
			}
		}
	}

	return null;
};

const createCardItem = (benefit: CardBenefitItem, idx: number, currency: string): HTMLElement => {
	const rankClass = idx === 0 ? ' recommended' : idx === 1 ? ' rank-2' : idx === 2 ? ' rank-3' : '';

	const item = document.createElement('div');
	item.className = `picsel-card-benefit-item${rankClass}`;

	const cardNameText = benefit.cardName || benefit.card || '카드';

	const svgPath = getCardSvgPath(cardNameText);
	const imageSrc = svgPath || benefit.imageUrl;

	if (imageSrc) {
		const imageWrapper = document.createElement('div');
		imageWrapper.className = 'picsel-card-image-wrapper';

		const img = document.createElement('img');
		img.src = imageSrc;
		img.alt = cardNameText;
		img.className = 'picsel-card-image';
		img.onerror = (): void => {
			const initial = getCardInitial(cardNameText);
			imageWrapper.textContent = '';
			const initialDiv = document.createElement('div');
			initialDiv.className = 'picsel-card-initial';
			initialDiv.textContent = DOMPurify.sanitize(initial, { ALLOWED_TAGS: [] });
			imageWrapper.appendChild(initialDiv);
		};

		imageWrapper.appendChild(img);
		item.appendChild(imageWrapper);
	} else {
		const initial = getCardInitial(cardNameText);
		const imageWrapper = document.createElement('div');
		imageWrapper.className = 'picsel-card-image-wrapper';
		const initialDiv = document.createElement('div');
		initialDiv.className = 'picsel-card-initial';
		initialDiv.textContent = DOMPurify.sanitize(initial, { ALLOWED_TAGS: [] });
		imageWrapper.appendChild(initialDiv);
		item.appendChild(imageWrapper);
	}

	const infoArea = document.createElement('div');
	infoArea.className = 'picsel-card-info';

	const headerRow = document.createElement('div');
	headerRow.className = 'picsel-card-header';

	if (idx < 3 && (benefit.discountAmount ?? 0) > 0) {
		const badge = document.createElement('span');
		badge.className = 'picsel-recommended-badge';
		badge.textContent = `${idx + 1}위`;
		headerRow.appendChild(badge);
	}

	const cardName = document.createElement('span');
	cardName.className = 'picsel-card-name';
	const primaryCard = cardNameText.includes(',') ? cardNameText.split(',')[0].trim() : cardNameText;
	cardName.textContent = primaryCard;
	headerRow.appendChild(cardName);

	infoArea.appendChild(headerRow);

	if (benefit.benefit) {
		const desc = document.createElement('div');
		desc.className = 'picsel-card-benefit-desc';
		desc.textContent = benefit.benefit;
		infoArea.appendChild(desc);
	}

	item.appendChild(infoArea);

	const amountArea = document.createElement('div');
	amountArea.className = 'picsel-card-amount';

	const benefitItem = benefit as CardBenefitItem;
	if (benefitItem.benefitType === 'installment') {
		const installmentEl = document.createElement('div');
		installmentEl.className = 'picsel-card-installment';
		installmentEl.textContent = benefit.benefit || '무이자';
		amountArea.appendChild(installmentEl);
	} else if (typeof benefit.discountAmount === 'number' && benefit.discountAmount > 0) {
		if (typeof benefit.finalPrice === 'number') {
			const finalEl = document.createElement('div');
			finalEl.className = 'picsel-card-final-price';
			const formattedFinal = formatCurrency(benefit.finalPrice, currency);
			finalEl.textContent = formattedFinal;
			amountArea.appendChild(finalEl);
		}

		const discountEl = document.createElement('div');
		discountEl.className = 'picsel-card-discount';
		const formatted = formatCurrency(benefit.discountAmount, currency);
		discountEl.textContent = `-${formatted}`;
		amountArea.appendChild(discountEl);
	} else if (typeof benefit.rate === 'number' && benefit.rate > 0) {
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
		const emptySection = document.createElement('section');
		emptySection.className = 'picsel-section picsel-card-section picsel-hidden';
		emptySection.setAttribute('data-empty', 'true');
		emptySection.style.display = 'none';

		const title = document.createElement('h4');
		title.className = 'picsel-section-title';
		title.textContent = '카드별 혜택';
		emptySection.appendChild(title);

		const emptyMsg = document.createElement('div');
		emptyMsg.className = 'picsel-empty-benefits';
		emptyMsg.textContent = '이 상품에는 카드 혜택이 없어요';
		emptySection.appendChild(emptyMsg);

		return emptySection;
	}

	const basePrice = typeof data.discountPrice === 'number' && data.discountPrice > 0 ? data.discountPrice : data.amount;

	const enrichedBenefits: CardBenefitItem[] = benefits
		.map((b): CardBenefitItem | null => {
			const item = b as CardBenefitItem;

			if (item.benefitType === 'point') {
				return null;
			}

			if (item.benefitType === 'installment') {
				return null;
			}

			const rate = item.rate ?? item.discount;
			let discountAmount = 0;
			let safeRate = 0;

			if ((typeof rate === 'number' && rate > 100) || item.benefitType === 'discount') {
				discountAmount = typeof rate === 'number' && rate > 100 ? rate : item.discount ?? 0;
				safeRate = 0;
			} else {
				safeRate = typeof rate === 'number' && rate <= 100 ? rate : 0;
				discountAmount = calculateDiscountAmount(basePrice, safeRate) ?? 0;
			}

			const finalPrice = calculateFinalPrice(basePrice, discountAmount);
			return {
				...item,
				cardName: item.cardName ?? item.card,
				rate: safeRate,
				discountAmount: discountAmount ?? undefined,
				finalPrice: finalPrice ?? undefined,
			};
		})
		.filter((item): item is CardBenefitItem => item !== null);

	const sortedBenefits = enrichedBenefits.sort((a, b) => {
		const aDiscount = a?.discountAmount ?? 0;
		const bDiscount = b?.discountAmount ?? 0;

		if (aDiscount !== bDiscount) {
			return bDiscount - aDiscount;
		}

		const aRate = a?.rate ?? 0;
		const bRate = b?.rate ?? 0;
		return bRate - aRate;
	});

	const topBenefit = sortedBenefits[0];
	if (!topBenefit) {
		return null;
	}

	const section = document.createElement('section');
	section.className = 'picsel-section picsel-card-section';

	const title = document.createElement('h4');
	title.className = 'picsel-section-title';
	title.textContent = '추천 카드 혜택';
	section.appendChild(title);

	const list = document.createElement('div');
	list.className = 'picsel-card-benefit-list';

	const currency = data.currency ?? 'KRW';
	const cardItem = createCardItem(topBenefit, 0, currency);
	list.appendChild(cardItem);

	section.appendChild(list);

	const extras: string[] = [];

	const totalPointAmount = data.elevenst?.totalPointAmount ?? 0;
	if (totalPointAmount > 0) {
		extras.push(`최대 적립 포인트 ${totalPointAmount.toLocaleString()}P`);
	}

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
			
			// 금액 부분을 강조하기 위해 HTML로 처리
			const amountMatch = text.match(/(\d{1,3}(,\d{3})*)/);
			if (amountMatch) {
				const beforeAmount = text.substring(0, amountMatch.index);
				const amount = amountMatch[0];
				const afterAmount = text.substring((amountMatch.index ?? 0) + amount.length);
				
				item.innerHTML = DOMPurify.sanitize(
					`${beforeAmount}<strong style="color: #1d4ed8; font-weight: 700;">${amount}</strong>${afterAmount}`,
					{ ALLOWED_TAGS: ['strong'], ALLOWED_ATTR: ['style'] }
				);
			} else {
				item.textContent = text;
			}
			
			subBenefits.appendChild(item);
		});
		section.appendChild(subBenefits);
	}

	return section;
};
