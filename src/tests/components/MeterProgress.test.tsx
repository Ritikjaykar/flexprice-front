import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import MeterProgress from '@/components/molecules/MeterProgress';

describe('MeterProgress', () => {
	it('renders usage values', () => {
		render(<MeterProgress label='API Calls' used={500} limit={1000} />);

		expect(screen.getByText('API Calls')).toBeInTheDocument();

		expect(screen.getByText(/500 \/ 1,000/i)).toBeInTheDocument();
	});
});
