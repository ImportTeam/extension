import type { ParsedProductInfo, ElevenStreetExtendedInfo } from '../../../shared/types';

type Optional<T> = {
	[K in keyof T]?: T[K] | null;
};

export type ToggleProductData = (ParsedProductInfo & Record<string, unknown>) &
	Optional<{
		title: string;
		imageUrl: string;
		images: string[];
		originalPrice: number;
		discountPrice: number;
		cardBenefits: Array<{
			card: string;        // 카드사명
			cardName?: string;   // 카드사명 (별칭)
			benefit: string;     // 혜택 설명
			discount?: number;   // 할인율 (%)
			rate?: number;       // 할인율 (별칭)
			imageUrl?: string;   // 카드 이미지 URL
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
		site?: string; // e.g. 'coupang', 'amazon'
		elevenst?: ElevenStreetExtendedInfo; // 11번가 전용 확장 필드
	}>;
