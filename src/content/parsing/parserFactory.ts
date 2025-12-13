/**
 * Parser Factory
 * 책임: 사이트별 파서 인스턴스 생성
 */

import {
	CoupangParser,
	AmazonParser,
	EbayParser,
	FallbackParser,
	BaseParser,
	ElevenStreetParser,
	GmarketParser,
} from '@/content/parsers';

export function createParser(site: string): BaseParser {
	switch (site) {
		case 'coupang':
			return new CoupangParser();
		case '11st':
			return new ElevenStreetParser();
		case 'gmarket':
			return new GmarketParser();
		case 'amazon':
			return new AmazonParser();
		case 'ebay':
			return new EbayParser();
		default:
			return new FallbackParser();
	}
}

export function createFallbackParser(): FallbackParser {
	return new FallbackParser();
}
