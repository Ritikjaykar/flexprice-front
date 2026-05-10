import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Select } from './index';

type SelectStoryArgs = {
	label?: string;
	placeholder?: string;
	description?: string;
	error?: string;
	value?: string;
	disabled?: boolean;
	required?: boolean;
	isRadio?: boolean;
};

const planOptions = [
	{ value: 'starter', label: 'Starter', description: 'For early-stage teams' },
	{ value: 'growth', label: 'Growth', description: 'For usage-based billing at scale' },
	{ value: 'enterprise', label: 'Enterprise', description: 'Custom pricing and controls' },
	{ value: 'archived', label: 'Archived plan', disabled: true },
];

const meta: Meta<SelectStoryArgs> = {
	title: 'Atoms/Select',
	parameters: {
		layout: 'centered',
	},
	args: {
		label: 'Plan',
		placeholder: 'Select a plan',
		description: 'Choose the plan attached to this subscription.',
		value: '',
		disabled: false,
		required: false,
		isRadio: false,
	},
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		description: { control: 'text' },
		error: { control: 'text' },
		value: {
			control: 'select',
			options: ['', 'starter', 'growth', 'enterprise'],
		},
		disabled: { control: 'boolean' },
		required: { control: 'boolean' },
		isRadio: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<SelectStoryArgs>;

const ControlledSelect = (args: SelectStoryArgs) => {
	const [value, setValue] = useState(args.value ?? '');

	return (
		<div className='w-80'>
			<Select
				options={planOptions}
				value={value}
				onChange={setValue}
				label={args.label}
				placeholder={args.placeholder}
				description={args.description}
				error={args.error}
				disabled={args.disabled}
				required={args.required}
				isRadio={args.isRadio}
			/>
		</div>
	);
};

export const Default: Story = {
	args: {
		value: '',
	},

	render: (args) => <ControlledSelect {...args} />,
};

export const WithError: Story = {
	args: {
		error: 'Plan is required before creating a subscription.',
	},
	render: (args) => <ControlledSelect {...args} />,
};

export const Disabled: Story = {
	args: {
		value: 'growth',
		disabled: true,
	},
	render: (args) => <ControlledSelect {...args} />,
};

export const RadioStyle: Story = {
	args: {
		isRadio: true,
	},
	render: (args) => <ControlledSelect {...args} />,
};

export const EmptyOptions: Story = {
	render: () => (
		<div className='w-80'>
			<Select options={[]} label='Plan' placeholder='Select a plan' noOptionsText='No plans available' />
		</div>
	),
};

export const SelectInteraction: Story = {
	render: (args) => <ControlledSelect {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole('combobox'));
		await userEvent.click(await canvas.findByText('Growth'));

		await expect(canvas.getByText('Growth')).toBeInTheDocument();
	},
};
