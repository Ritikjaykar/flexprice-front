import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import Input from './Input';

type InputStoryArgs = {
	id?: string;
	label?: string;
	placeholder?: string;
	description?: string;
	error?: string;
	disabled?: boolean;
	value?: string;
	inputPrefix?: string;
	suffix?: string;
	variant?: 'text' | 'number' | 'formatted-number' | 'integer';
	size?: 'xs' | 'sm' | 'default' | 'lg';
};

const meta: Meta<InputStoryArgs> = {
	title: 'Atoms/Input',
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'light',
		},
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		error: { control: 'text' },
		description: { control: 'text' },
		disabled: { control: 'boolean' },
		variant: {
			control: 'select',
			options: ['text', 'number', 'formatted-number', 'integer'],
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'default', 'lg'],
		},
	},
};

export default meta;
type Story = StoryObj<InputStoryArgs>;

const ControlledInput = (args: InputStoryArgs) => {
	const [value, setValue] = useState(String(args.value ?? ''));

	return <Input {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
	args: {
		id: 'plan-name',
		label: 'Plan name',
		placeholder: 'Growth plan',
		description: 'Use a short name customers can recognize.',
	},
	render: (args) => <ControlledInput {...args} />,
};

export const WithError: Story = {
	args: {
		id: 'price',
		label: 'Unit price',
		placeholder: '0.00',
		error: 'Unit price is required',
		inputPrefix: '$',
	},
	render: (args) => <ControlledInput {...args} />,
};

export const Disabled: Story = {
	args: {
		id: 'customer-id',
		label: 'Customer ID',
		value: 'cus_9x2a1',
		disabled: true,
		description: 'System-generated after the customer is created.',
	},
	render: (args) => <ControlledInput {...args} />,
};

export const FormattedNumber: Story = {
	args: {
		id: 'included-events',
		label: 'Included usage events',
		variant: 'formatted-number',
		value: '10000',
		suffix: 'events',
	},
	render: (args) => <ControlledInput {...args} />,
};

export const TypingInteraction: Story = {
	args: {
		id: 'customer-email',
		label: 'Customer email',
		placeholder: 'billing@example.com',
	},
	render: (args) => <ControlledInput {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText(/customer email/i);

		await userEvent.type(input, 'ops@acme.test');

		await expect(input).toHaveValue('ops@acme.test');
	},
};

export const Xyz: Story = {
	args: {
		id: 'name-names',
		label: 'abcd',
		placeholder: 'ritik',
		description: 'this is just for testing and trying',
		error: 'capital letters only',
		disabled: false,
		size: 'default',
	},

	render: (args) => <ControlledInput {...args} />,
};
