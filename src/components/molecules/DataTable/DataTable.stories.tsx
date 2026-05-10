import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import InvoiceStatusBadge from '@/components/molecules/InvoiceStatusBadge/InvoiceStatusBadge';
import DataTable, { type DataTableColumn } from './DataTable';

type InvoiceRow = {
	id: string;
	customer: string;
	status: string;
	amount: string;
	createdAt: string;
};

const invoiceRows: InvoiceRow[] = [
	{ id: 'inv_001', customer: 'Acme Cloud', status: 'paid', amount: '$1,240.00', createdAt: '2026-05-01' },
	{ id: 'inv_002', customer: 'BrightLayer', status: 'draft', amount: '$840.00', createdAt: '2026-05-03' },
	{ id: 'inv_003', customer: 'Northstar AI', status: 'overdue', amount: '$3,910.00', createdAt: '2026-05-04' },
	{ id: 'inv_004', customer: 'Orbit Labs', status: 'refunded', amount: '$510.00', createdAt: '2026-05-05' },
	{ id: 'inv_005', customer: 'SignalStack', status: 'pending', amount: '$2,140.00', createdAt: '2026-05-08' },
	{ id: 'inv_006', customer: 'DataHarbor', status: 'void', amount: '$0.00', createdAt: '2026-05-09' },
];

const columns: DataTableColumn<InvoiceRow>[] = [
	{ key: 'customer', header: 'Customer', sortable: true, width: '1.5fr' },
	{ key: 'status', header: 'Status', width: '1fr', render: (row) => <InvoiceStatusBadge status={row.status} /> },
	{ key: 'amount', header: 'Amount', sortable: true, width: '1fr' },
	{ key: 'createdAt', header: 'Created', sortable: true, width: '1fr' },
];

const largeRows: InvoiceRow[] = Array.from({ length: 10000 }).map((_, index) => ({
	id: `inv_${index}`,
	customer: `Customer ${index.toString().padStart(5, '0')}`,
	status: index % 5 === 0 ? 'overdue' : index % 5 === 1 ? 'draft' : index % 5 === 2 ? 'pending' : index % 5 === 3 ? 'refunded' : 'paid',
	amount: `$${(index * 13 + 240).toLocaleString()}.00`,
	createdAt: `2026-05-${String((index % 28) + 1).padStart(2, '0')}`,
}));

type DataTableStoryArgs = {
	loading: boolean;
	pageSize: number;
	virtualized: boolean;
};

const meta: Meta<DataTableStoryArgs> = {
	title: 'Molecules/DataTable',
	parameters: {
		layout: 'centered',
	},
	args: {
		pageSize: 4,
		loading: false,
		virtualized: false,
	},
	argTypes: {
		loading: { control: 'boolean' },
		pageSize: { control: { type: 'number', min: 2, max: 20, step: 1 } },
		virtualized: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<DataTableStoryArgs>;

export const Default: Story = {
	render: (args) => (
		<div className='w-[860px]'>
			<DataTable columns={columns} rows={invoiceRows} {...args} />
		</div>
	),
};

export const Loading: Story = {
	args: {
		loading: true,
	},
	render: Default.render,
};

export const Empty: Story = {
	render: (args) => (
		<div className='w-[860px]'>
			<DataTable
				columns={columns}
				rows={[]}
				emptyTitle='No invoices found'
				emptyDescription='Invoices matching the selected filters will appear here.'
				{...args}
			/>
		</div>
	),
};

export const Paginated: Story = {
	args: {
		pageSize: 3,
	},
	render: Default.render,
};

export const VirtualizedTenThousandRows: Story = {
	args: {
		virtualized: true,
		pageSize: 4,
	},
	render: (args) => (
		<div className='w-[860px]'>
			<DataTable columns={columns} rows={largeRows} height={440} estimateRowHeight={48} {...args} />
		</div>
	),
};

export const VirtualizedCompact: Story = {
	args: {
		virtualized: true,
	},
	render: (args) => (
		<div className='w-[860px]'>
			<DataTable columns={columns} rows={largeRows} height={300} estimateRowHeight={44} {...args} />
		</div>
	),
};

export const VirtualizedTall: Story = {
	args: {
		virtualized: true,
	},
	render: (args) => (
		<div className='w-[860px]'>
			<DataTable columns={columns} rows={largeRows} height={620} estimateRowHeight={52} {...args} />
		</div>
	),
};

export const SortInteraction: Story = {
	render: Default.render,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole('button', { name: /customer/i }));
		await expect(canvas.getByText('Acme Cloud')).toBeInTheDocument();
	},
};
