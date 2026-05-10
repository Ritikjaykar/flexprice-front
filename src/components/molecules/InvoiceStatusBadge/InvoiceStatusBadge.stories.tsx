import type { Meta, StoryObj } from '@storybook/react';
import InvoiceStatusBadge from './InvoiceStatusBadge';

const meta: Meta<typeof InvoiceStatusBadge> = {
	title: 'Molecules/InvoiceStatusBadge',
	component: InvoiceStatusBadge,
	parameters: {
		layout: 'centered',
	},
	args: {
		status: 'paid',
	},
	argTypes: {
		status: {
			control: 'select',
			options: ['draft', 'paid', 'overdue', 'void', 'refunded', 'pending', 'unknown'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof InvoiceStatusBadge>;

export const Default: Story = {};

export const Statuses: Story = {
	render: (args) => (
		<div className='flex flex-col gap-5'>
			<div className='flex flex-col gap-2'>
				<p className='text-sm text-muted-foreground'>Controlled preview</p>
				<InvoiceStatusBadge status={args.status} />
			</div>

			<div className='flex flex-col gap-2'>
				<p className='text-sm text-muted-foreground'>Invoice lifecycle states</p>
				<div className='flex flex-wrap gap-2'>
					<InvoiceStatusBadge status='draft' />
					<InvoiceStatusBadge status='pending' />
					<InvoiceStatusBadge status='paid' />
					<InvoiceStatusBadge status='overdue' />
					<InvoiceStatusBadge status='refunded' />
					<InvoiceStatusBadge status='void' />
				</div>
			</div>
		</div>
	),
};
