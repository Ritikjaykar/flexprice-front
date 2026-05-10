import type { Meta, StoryObj } from '@storybook/react';
import MeterProgress from './MeterProgress';

const meta: Meta<typeof MeterProgress> = {
	title: 'Molecules/MeterProgress',
	component: MeterProgress,
	parameters: {
		layout: 'centered',
	},
	args: {
		label: 'API calls',
		used: 78420,
		limit: 100000,
		unit: 'calls',
		description: 'Usage resets at the end of the current billing period.',
	},
	argTypes: {
		label: { control: 'text' },
		used: { control: { type: 'number', min: 0, step: 1000 } },
		limit: { control: { type: 'number', min: 0, step: 1000 } },
		unit: { control: 'text' },
		description: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof MeterProgress>;

export const Default: Story = {};

export const States: Story = {
	render: (args) => (
		<div className='grid w-[680px] gap-4'>
			<MeterProgress {...args} />
			<MeterProgress
				label='Credits'
				used={420}
				limit={1000}
				unit='credits'
				description='Credits are consumed before invoice overages are charged.'
			/>
			<MeterProgress
				label='Events'
				used={125000}
				limit={100000}
				unit='events'
				description='This customer has crossed the included event limit.'
			/>
		</div>
	),
};

export const EmptyUsage: Story = {
	args: {
		label: 'Seats',
		used: 0,
		limit: 50,
		unit: 'seats',
		description: 'No seat usage has been recorded yet.',
	},
};

export const OverLimit: Story = {
	args: {
		label: 'Usage events',
		used: 125000,
		limit: 100000,
		unit: 'events',
		description: 'Overages will be billed according to the active plan.',
	},
};
