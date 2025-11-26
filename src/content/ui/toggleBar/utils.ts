export const formatCurrency = (value?: number | null, currency: string = 'KRW'): string | null => {
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

export const computeDiscountRate = (original?: number | null, current?: number | null): number | null => {
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
