import type { Meta, StoryObj } from '@storybook/react';
import PricingTierTable from './PricingTierTable';

const meta: Meta<typeof PricingTierTable> = {
	title: 'Organisms/PricingTierTable',
	component: PricingTierTable,
	parameters: {
		layout: 'centered',
	},
	args: {
		title: 'API event pricing',
		description: 'Unit prices decrease as usage grows during the billing period.',
		currency: 'USD',
		pricingModel: 'tiered',
		tiers: [
			{ from: 1, to: 10000, unitAmountCents: 8 },
			{ from: 10001, to: 100000, unitAmountCents: 5 },
			{ from: 100001, unitAmountCents: 3 },
		],
	},
	argTypes: {
		title: { control: 'text' },
		description: { control: 'text' },
		currency: { control: 'text' },
		pricingModel: {
			control: 'select',
			options: ['tiered', 'graduated', 'flat'],
		},
		tiers: { control: 'object' },
	},
};

export default meta;
type Story = StoryObj<typeof PricingTierTable>;

export const Default: Story = {
	render: (args) => (
		<div className='w-[720px]'>
			<PricingTierTable {...args} />
		</div>
	),
};

export const GraduatedPricing: Story = {
	args: {
		title: 'Graduated usage pricing',
		description: 'Each unit is billed at the price for its own usage band.',
		pricingModel: 'graduated',
		tiers: [
			{ from: 1, to: 1000, unitAmountCents: 12 },
			{ from: 1001, to: 10000, unitAmountCents: 9 },
			{ from: 10001, unitAmountCents: 6 },
		],
	},
	render: Default.render,
};

export const FlatPricing: Story = {
	args: {
		title: 'Flat unit pricing',
		description: 'Every unit is charged at the same price.',
		pricingModel: 'flat',
		tiers: [{ from: 1, unitAmountCents: 10 }],
	},
	render: Default.render,
};

export const EnterpriseTiers: Story = {
	args: {
		title: 'Enterprise credits',
		description: 'Volume discounts for prepaid credit drawdown.',
		pricingModel: 'tiered',
		tiers: [
			{ from: 1, to: 50000, unitAmountCents: 4 },
			{ from: 50001, to: 250000, unitAmountCents: 3 },
			{ from: 250001, to: 1000000, unitAmountCents: 2 },
			{ from: 1000001, unitAmountCents: 1 },
		],
	},
	render: Default.render,
};
