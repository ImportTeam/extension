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
	condition?: string;      // 조건 (결제 시 등)
	benefitType?: string;    // 혜택 타입 (installment, discount, point 등)
	pointAmount?: number;    // 포인트 금액 (포인트 혜택인 경우)
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
 * 카드사명에서 이니셜 추출
 */
const getCardInitial = (cardName: string): string => {
	// 대표적인 카드사 이니셜 매핑
	const cardInitials: Record<string, string> = {
		'삼성': 'SS',
		'현대': 'HD',
		'신한': 'SH',
		'국민': 'KB',
		'KB': 'KB',
		'롯데': 'LT',
		'하나': 'HN',
		'우리': 'WR',
		'농협': 'NH',
		'BC': 'BC',
		'씨티': 'CT',
	};

	for (const [key, initial] of Object.entries(cardInitials)) {
		if (cardName.includes(key)) {
			return initial;
		}
	}

	// 매핑이 없으면 첫 2글자
	return cardName.replace('카드', '').substring(0, 2).toUpperCase();
};

/**
 * 카드사명에서 SVG 파일명 추출
 * assets/card/*.svg 파일과 매핑
 * 
 * 매칭 우선순위: 정확한 키워드 → 부분 문자열
 * BC카드가 다른 카드로 잘못 매칭되지 않도록 순서 조정
 */
const getCardSvgPath = (cardName: string): string | null => {
	const normalizedName = cardName.toUpperCase();

	// 우선순위가 높은 정확한 매칭 (짧은 키워드가 다른 단어에 포함될 수 있으므로)
	// 배열로 순서 보장
	const cardSvgMapping: Array<{ keywords: string[]; svg: string }> = [
		// BC는 가장 먼저 체크 (다른 단어에 포함될 가능성 낮음)
		{ keywords: ['BC', 'BC카드', '비씨'], svg: 'bcCard.svg' },
		// KB/국민 - KB가 다른 단어에 포함될 수 있으므로 국민과 함께
		{ keywords: ['KB', '국민', 'KB국민', '케이비'], svg: 'kbCard.svg' },
		// NH/농협
		{ keywords: ['NH', '농협', 'NH농협'], svg: 'nhCard.svg' },
		// 나머지 카드사 (긴 이름 우선)
		{ keywords: ['삼성', 'SAMSUNG', '삼성카드'], svg: 'samsungCard.svg' },
		{ keywords: ['현대', 'HYUNDAI', '현대카드'], svg: 'hyundaiCard.svg' },
		{ keywords: ['신한', 'SHINHAN', '신한카드'], svg: 'shinhanCard.svg' },
		{ keywords: ['롯데', 'LOTTE', '롯데카드'], svg: 'lotteCard.svg' },
		{ keywords: ['하나', 'HANA', '하나카드', 'SK'], svg: 'hanaCard.svg' },
		{ keywords: ['우리', 'WOORI', '우리카드'], svg: 'wooriCard.svg' },
		{ keywords: ['씨티', 'CITI', '씨티카드', 'CITIBANK'], svg: 'citiCard.svg' },
		// 해외 카드
		{ keywords: ['VISA', '비자'], svg: 'visaCard.svg' },
		{ keywords: ['MASTER', '마스터', 'MASTERCARD'], svg: 'masterCard.svg' },
		{ keywords: ['AMEX', '아멕스', 'AMERICAN EXPRESS'], svg: 'amexCard.svg' },
	];

	for (const { keywords, svg } of cardSvgMapping) {
		for (const keyword of keywords) {
			if (normalizedName.includes(keyword.toUpperCase())) {
				return chrome.runtime.getURL(`assets/card/${svg}`);
			}
		}
	}

	return null;
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

	const cardNameText = benefit.cardName || benefit.card || '카드';

	// 카드 이미지: 1) SVG 매핑, 2) 외부 URL, 3) 이니셜 표시
	const svgPath = getCardSvgPath(cardNameText);
	const imageSrc = svgPath || benefit.imageUrl;

	if (imageSrc) {
		const imageWrapper = document.createElement('div');
		imageWrapper.className = 'picsel-card-image-wrapper';
		
		const img = document.createElement('img');
		img.src = imageSrc;
		img.alt = cardNameText;
		img.className = 'picsel-card-image';
		img.onerror = () => {
			// 이미지 로드 실패 시 이니셜로 대체
			const initial = getCardInitial(cardNameText);
			imageWrapper.innerHTML = `
				<div class="picsel-card-initial">${initial}</div>
			`;
		};
		
		imageWrapper.appendChild(img);
		item.appendChild(imageWrapper);
	} else {
		// SVG도 없고 외부 이미지도 없으면 이니셜 표시
		const initial = getCardInitial(cardNameText);
		const imageWrapper = document.createElement('div');
		imageWrapper.className = 'picsel-card-image-wrapper';
		imageWrapper.innerHTML = `<div class="picsel-card-initial">${initial}</div>`;
		item.appendChild(imageWrapper);
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

	// 무이자 할부는 별도 표시
	const benefitItem = benefit as CardBenefitItem;
	if (benefitItem.benefitType === 'installment') {
		const installmentEl = document.createElement('div');
		installmentEl.className = 'picsel-card-installment';
		installmentEl.textContent = benefit.benefit || '무이자';
		amountArea.appendChild(installmentEl);
	} else if (typeof benefit.discountAmount === 'number' && benefit.discountAmount > 0) {
		// 최종 가격을 위에 표시 (더 중요한 정보)
		if (typeof benefit.finalPrice === 'number') {
			const finalEl = document.createElement('div');
			finalEl.className = 'picsel-card-final-price';
			const formattedFinal = formatCurrency(benefit.finalPrice, currency);
			finalEl.textContent = formattedFinal;
			amountArea.appendChild(finalEl);
		}

		// 할인 금액을 아래에 표시 (보조 정보)
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
		.map((b): CardBenefitItem | null => {
			const item = b as CardBenefitItem;
			
			// 포인트 혜택(point 타입)은 카드 목록에서 제외
			// 카드 할인/적립율만 표시
			if (item.benefitType === 'point') {
				return null;
			}
			
			// 무이자 할부는 할인 계산하지 않음
			if (item.benefitType === 'installment') {
				return {
					...item,
					cardName: item.cardName ?? item.card,
					rate: 0,
					discountAmount: 0,
					finalPrice: basePrice,
				};
			}
			
			// 할인 혜택: rate가 100 이하인 경우만 계산
			const rate = item.rate ?? item.discount;
			const safeRate = (typeof rate === 'number' && rate <= 100) ? rate : 0;
			const discountAmount = calculateDiscountAmount(basePrice, safeRate);
			const finalPrice = calculateFinalPrice(basePrice, discountAmount);
			return {
				...item,
				cardName: item.cardName ?? item.card,
				rate: safeRate,
				discountAmount: discountAmount ?? undefined,
				finalPrice: finalPrice ?? undefined,
			};
		})
		.filter((item): item is CardBenefitItem => item !== null)
		.sort((a, b) => {
			const aDiscount = a?.discountAmount ?? 0;
			const bDiscount = b?.discountAmount ?? 0;
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

	// 추가 혜택 (sub) - 최대 적립 포인트, 쿠팡캐시 등
	const extras: string[] = [];
	
	// 최대 적립 포인트 표시 (11번가: elevenst.totalPointAmount, 쿠팡: 등)
	// @ts-expect-error: Extended field for 11st
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
			item.textContent = text;
			subBenefits.appendChild(item);
		});
		section.appendChild(subBenefits);
	}

	return section;
};
