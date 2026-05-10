import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import EmptyState from '@/components/organisms/EmptyState';

describe('EmptyState', () => {
	it('renders title and description', () => {
		render(<EmptyState title='No invoices' description='Invoices will appear here' />);

		expect(screen.getByText('No invoices')).toBeInTheDocument();

		expect(screen.getByText('Invoices will appear here')).toBeInTheDocument();
	});
});
