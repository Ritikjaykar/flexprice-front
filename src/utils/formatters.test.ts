import { describe, expect, it } from 'vitest';

const formatCurrency = (cents: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(cents / 100);
};

const formatNumber = (value: number) => {
	return new Intl.NumberFormat('en-US').format(value);
};

const calculatePercentage = (used: number, limit: number) => {
	if (limit <= 0) return 0;

	return Math.min(Math.round((used / limit) * 100), 100);
};

describe('formatters', () => {
	it('formats currency correctly', () => {
		expect(formatCurrency(1250)).toBe('$12.50');
	});

	it('formats numbers correctly', () => {
		expect(formatNumber(1000000)).toBe('1,000,000');
	});

	it('calculates percentage correctly', () => {
		expect(calculatePercentage(50, 100)).toBe(50);
	});
});
