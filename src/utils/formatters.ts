export const formatCurrency = (cents: number, currency = 'USD') => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(cents / 100);
};

export const formatNumber = (value: number) => {
	return new Intl.NumberFormat('en-US').format(value);
};

export const calculatePercentage = (used: number, limit: number) => {
	if (limit <= 0) return 0;

	return Math.min(Math.round((used / limit) * 100), 100);
};
