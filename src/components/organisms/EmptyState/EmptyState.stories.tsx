import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { CreditCard, Users } from 'lucide-react';
import EmptyState from './EmptyState';

type EmptyStateStoryArgs = {
	title: string;
	description: string;
	actionLabel?: string;
	onAction?: () => void;
};

const meta: Meta<EmptyStateStoryArgs> = {
	title: 'Organisms/EmptyState',
	parameters: {
		layout: 'centered',
	},
	args: {
		title: 'No invoices yet',
		description: 'Invoices will appear here once customers start a billing cycle.',
		actionLabel: 'Create invoice',
		onAction: fn(),
	},
	argTypes: {
		title: { control: 'text' },
		description: { control: 'text' },
		actionLabel: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<EmptyStateStoryArgs>;

export const Default: Story = {
	render: (args) => (
		<div className='w-[640px]'>
			<EmptyState {...args} />
		</div>
	),
};

export const NoCustomers: Story = {
	render: (args) => (
		<div className='w-[640px]'>
			<EmptyState
				{...args}
				icon={<Users className='size-5' />}
				title='No customers found'
				description='Create a customer before attaching subscriptions, invoices, or credits.'
				actionLabel='Add customer'
			/>
		</div>
	),
};

export const NoPaymentMethods: Story = {
	render: (args) => (
		<div className='w-[640px]'>
			<EmptyState
				{...args}
				icon={<CreditCard className='size-5' />}
				title='No payment methods'
				description='Saved payment methods will appear here after a customer adds one.'
				actionLabel='Send payment link'
			/>
		</div>
	),
};

export const WithoutAction: Story = {
	args: {
		actionLabel: undefined,
		title: 'No usage events',
		description: 'Usage events will appear once your integration starts sending meter data.',
	},
	render: Default.render,
};

export const ActionInteraction: Story = {
	render: Default.render,
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Create invoice' }));
		await expect(args.onAction).toHaveBeenCalled();
	},
};
