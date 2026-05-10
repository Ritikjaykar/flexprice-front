import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import SearchBar from './SearchBar';

type SearchBarStoryArgs = {
	value?: string;
	placeholder?: string;
	debounceMs?: number;
	disabled?: boolean;
	onSearch?: (value: string) => void;
};

const meta: Meta<SearchBarStoryArgs> = {
	title: 'Molecules/SearchBar',
	parameters: {
		layout: 'centered',
	},
	args: {
		value: '',
		placeholder: 'Search customers',
		debounceMs: 300,
		disabled: false,
		onSearch: fn(),
	},
	argTypes: {
		value: { control: 'text' },
		placeholder: { control: 'text' },
		debounceMs: { control: { type: 'number', min: 0, max: 1000, step: 100 } },
		disabled: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<SearchBarStoryArgs>;

const ControlledSearchBar = (args: SearchBarStoryArgs) => {
	const [lastSearch, setLastSearch] = useState(args.value ?? '');

	return (
		<div className='w-96 space-y-3'>
			<SearchBar
				value={args.value}
				placeholder={args.placeholder}
				debounceMs={args.debounceMs}
				disabled={args.disabled}
				onSearch={(value) => {
					setLastSearch(value);
					args.onSearch?.(value);
				}}
			/>
			<p className='text-sm text-muted-foreground'>Last search: {lastSearch || 'none'}</p>
		</div>
	);
};

export const Default: Story = {
	args: {
		value: '',
		debounceMs: 300,
	},

	render: (args) => <ControlledSearchBar {...args} />,
};

export const WithInitialValue: Story = {
	args: {
		value: 'Acme',
	},
	render: (args) => <ControlledSearchBar {...args} />,
};

export const Disabled: Story = {
	args: {
		value: 'Acme',
		disabled: true,
	},
	render: (args) => <ControlledSearchBar {...args} />,
};

export const TypingInteraction: Story = {
	args: {
		debounceMs: 0,
	},
	render: (args) => <ControlledSearchBar {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Search customers');

		await userEvent.type(input, 'Acme');
		await expect(input).toHaveValue('Acme');

		await userEvent.click(canvas.getByLabelText('Clear search'));
		await expect(input).toHaveValue('');
	},
};
