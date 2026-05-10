import type { Meta, StoryObj } from '@storybook/react';
import { Info } from 'lucide-react';
import Tooltip from './Tooltip';

type TooltipStoryArgs = {
	content: string;
	side?: 'top' | 'right' | 'bottom' | 'left';
	delayDuration?: number;
};

const meta: Meta<TooltipStoryArgs> = {
	title: 'Atoms/Tooltip',
	parameters: {
		layout: 'centered',
	},
	args: {
		content: 'Metered usage is calculated from events received during the billing period.',
		side: 'top',
		delayDuration: 200,
	},
	argTypes: {
		content: { control: 'text' },
		side: {
			control: 'select',
			options: ['top', 'right', 'bottom', 'left'],
		},
		delayDuration: {
			control: { type: 'number', min: 0, max: 1000, step: 100 },
		},
	},
};

export default meta;
type Story = StoryObj<TooltipStoryArgs>;

export const Default: Story = {
	render: (args) => (
		<div className='flex min-h-64 min-w-96 items-center justify-center p-16'>
			<Tooltip content={args.content} side={args.side} delayDuration={args.delayDuration}>
				<button className='inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm'>
					<Info className='size-4' />
					Usage calculation
				</button>
			</Tooltip>
		</div>
	),
};

export const Sides: Story = {
	render: (args) => (
		<div className='flex min-h-96 min-w-[520px] flex-col items-center justify-center gap-8 p-16'>
			<div className='flex flex-col items-center gap-2'>
				<p className='text-sm text-muted-foreground'>Controlled preview</p>
				<Tooltip content={args.content} side={args.side} delayDuration={args.delayDuration}>
					<button className='inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm'>
						<Info className='size-4' />
						Hover me
					</button>
				</Tooltip>
			</div>

			<div className='grid grid-cols-2 gap-x-28 gap-y-10'>
				{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
					<Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
						<button className='rounded-md border bg-background px-3 py-2 text-sm'>{side}</button>
					</Tooltip>
				))}
			</div>
		</div>
	),
};

export const Delayed: Story = {
	args: {
		delayDuration: 700,
		content: 'This tooltip waits before opening.',
	},
	render: Default.render,
};
