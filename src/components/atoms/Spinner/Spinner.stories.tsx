import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

type SpinnerStoryArgs = {
	size?: number;
	className?: string;
};

const meta: Meta<SpinnerStoryArgs> = {
	title: 'Atoms/Spinner',
	parameters: {
		layout: 'centered',
	},
	args: {
		size: 24,
		className: 'text-slate-700',
	},
	argTypes: {
		size: {
			control: { type: 'number', min: 12, max: 64, step: 4 },
		},
		className: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<SpinnerStoryArgs>;

export const Default: Story = {
	render: (args) => <Spinner size={args.size} className={args.className} />,
};

export const Sizes: Story = {
	render: (args) => (
		<div className='flex flex-col gap-5'>
			<div className='flex flex-col gap-2'>
				<p className='text-sm text-muted-foreground'>Controlled preview</p>
				<Spinner size={args.size} className={args.className} />
			</div>

			<div className='flex flex-col gap-2'>
				<p className='text-sm text-muted-foreground'>Common sizes</p>
				<div className='flex items-center gap-5 text-slate-700'>
					<Spinner size={16} />
					<Spinner size={24} />
					<Spinner size={40} />
				</div>
			</div>
		</div>
	),
};

export const LoadingState: Story = {
	render: (args) => (
		<div className='flex items-center gap-3 rounded-md border bg-background px-4 py-3 text-sm text-muted-foreground'>
			<Spinner size={args.size} className={args.className} />
			<span>Loading invoices...</span>
		</div>
	),
};
