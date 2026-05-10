import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './MetricCard';

const meta: Meta<typeof MetricCard> = {
	title: 'Molecules/MetricCard',
	component: MetricCard,
	parameters: {
		layout: 'centered',
	},
	args: {
		label: 'Monthly recurring revenue',
		value: '$42,840',
		trend: '+12.4%',
		trendDirection: 'up',
		description: 'Compared with the previous billing period.',
	},
	argTypes: {
		label: { control: 'text' },
		value: { control: 'text' },
		trend: { control: 'text' },
		trendDirection: {
			control: 'select',
			options: ['up', 'down', 'flat'],
		},
		description: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {};

export const Variants: Story = {
	render: (args) => (
		<div className='grid w-[760px] grid-cols-3 gap-4'>
			<MetricCard {...args} />
			<MetricCard label='Active customers' value='1,284' trend='+34' trendDirection='up' description='New customers this month.' />
			<MetricCard label='Failed invoices' value='18' trend='-5' trendDirection='down' description='Lower than last billing cycle.' />
		</div>
	),
};
