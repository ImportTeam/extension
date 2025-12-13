/**
 * Parsing Facade
 * 책임: 사이트 감지 + 파서 실행 + 결과 반환
 */

import type { ParsedProductInfo } from '@/shared/types';
import { logger, LogDomain, ErrorCode } from '@/shared/utils/logger';

import { detectSite } from './siteDetector';
import { createParser, createFallbackParser } from './parserFactory';

export interface ExtractionResult {
	paymentInfo: ParsedProductInfo;
	site: string;
}

export function extractPaymentInfo(): ExtractionResult | null {
	const url = window.location.href;
	const siteInfo = detectSite(url);

	if (!siteInfo) {
		logger.debug(LogDomain.PARSER, 'Not a supported page', { url });
		return null;
	}

	logger.info(LogDomain.PARSER, `Site detected: ${siteInfo.site}`, { url });

	const parser = createParser(siteInfo.site);
	let result = parser.parse(document);

	if (!result) {
		logger.warn(LogDomain.PARSER, 'Primary parser failed, trying fallback', { site: siteInfo.site });
		result = createFallbackParser().parse(document);
		if (!result) {
			logger.error(LogDomain.PARSER, ErrorCode.PAR_E002, 'Fallback parser also failed', {
				data: { site: siteInfo.site, url },
			});
			return null;
		}
	}

	logger.info(LogDomain.PARSER, 'Parse successful', {
		title: result.title?.substring(0, 50),
		amount: result.amount,
		cardBenefitsCount: result.cardBenefits?.length ?? 0,
	});

	return { paymentInfo: result, site: siteInfo.site };
}
