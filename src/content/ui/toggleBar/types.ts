import type { ParsedProductInfo } from '../../../shared/types';

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
		site?: string; // e.g. 'coupang', 'amazon'
	}>;
