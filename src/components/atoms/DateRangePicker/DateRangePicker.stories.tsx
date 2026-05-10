import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import DateRangePicker from './DateRangePicker';

type DateRangePickerStoryArgs = {
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	startDate?: Date;
	endDate?: Date;
	minDate?: Date;
	maxDate?: Date;
};

const meta: Meta<DateRangePickerStoryArgs> = {
	title: 'Atoms/DateRangePicker',
	parameters: {
		layout: 'centered',
	},
	args: {
		title: 'Billing period',
		placeholder: 'Select date range',
		disabled: false,
	},
	argTypes: {
		title: { control: 'text' },
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
		startDate: { control: 'date' },
		endDate: { control: 'date' },
		minDate: { control: 'date' },
		maxDate: { control: 'date' },
	},
};

export default meta;
type Story = StoryObj<DateRangePickerStoryArgs>;

const toDate = (value?: Date | number) => {
	if (!value) return undefined;
	return value instanceof Date ? value : new Date(value);
};

const formatSelectedRange = (startDate?: Date, endDate?: Date) => {
	if (!startDate || !endDate) return 'none';
	return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
};

const ControlledDateRangePicker = (args: DateRangePickerStoryArgs) => {
	const [range, setRange] = useState<{
		startDate?: Date;
		endDate?: Date;
	}>({
		startDate: toDate(args.startDate),
		endDate: toDate(args.endDate),
	});

	return (
		<div className='w-[360px] space-y-3'>
			<DateRangePicker
				title={args.title}
				placeholder={args.placeholder}
				disabled={args.disabled}
				startDate={range.startDate}
				endDate={range.endDate}
				minDate={toDate(args.minDate)}
				maxDate={toDate(args.maxDate)}
				onChange={(dates) => setRange(dates)}
			/>
			<p className='text-sm text-muted-foreground'>Selected range: {formatSelectedRange(range.startDate, range.endDate)}</p>
		</div>
	);
};

export const Default: Story = {
	args: {
		disabled: false,
		startDate: new Date(2026, 4, 8),
		endDate: new Date(2026, 4, 10),
		minDate: new Date(2026, 4, 1),
		maxDate: new Date(2026, 4, 31),
	},

	render: (args) => <ControlledDateRangePicker {...args} />,
};

export const PreselectedRange: Story = {
	args: {
		startDate: new Date(2026, 4, 1),
		endDate: new Date(2026, 4, 10),
	},
	render: (args) => <ControlledDateRangePicker {...args} />,
};

export const Disabled: Story = {
	args: {
		disabled: true,
		startDate: new Date(2026, 4, 1),
		endDate: new Date(2026, 4, 10),
	},
	render: (args) => <ControlledDateRangePicker {...args} />,
};

export const BoundedRange: Story = {
	args: {
		title: 'Invoice window',
		minDate: new Date(2026, 4, 1),
		maxDate: new Date(2026, 4, 31),
	},
	render: (args) => <ControlledDateRangePicker {...args} />,
};

export const ClearInteraction: Story = {
	args: {
		startDate: new Date(2026, 4, 1),
		endDate: new Date(2026, 4, 10),
	},
	render: (args) => <ControlledDateRangePicker {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByText(/selected range:/i)).toBeInTheDocument();
		await userEvent.click(canvas.getByRole('button', { name: 'Clear date range' }));
		await expect(canvas.getByText('Selected range: none')).toBeInTheDocument();
	},
};
