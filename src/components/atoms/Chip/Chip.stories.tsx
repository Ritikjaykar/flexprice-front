import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import Chip from './Chip';

type ChipStoryArgs = {
	label: string;
	variant?: 'default' | 'success' | 'warning' | 'failed' | 'info';
	disabled?: boolean;
	onClick?: () => void;
};

const meta: Meta<ChipStoryArgs> = {
	title: 'Atoms/Chip',
	parameters: {
		layout: 'centered',
	},
	args: {
		label: 'Active',
		variant: 'success',
		disabled: false,
		onClick: fn(),
	},
	argTypes: {
		label: { control: 'text' },
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'failed', 'info'],
		},
		disabled: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<ChipStoryArgs>;

export const Default: Story = {
	args: {
		variant: 'default',
	},

	render: (args) => <Chip label={args.label} variant={args.variant} disabled={args.disabled} onClick={args.onClick} />,
};

export const StatusVariants: Story = {
	render: (args) => (
		<div className='flex flex-col gap-5'>
			<div className='flex flex-col gap-2'>
				<p className='text-sm text-muted-foreground'>Controlled preview</p>
				<div>
					<Chip label={args.label} variant={args.variant} disabled={args.disabled} />
				</div>
			</div>

			<div className='flex flex-col gap-2'>
				<p className='text-sm text-muted-foreground'>Common billing statuses</p>
				<div className='flex flex-wrap gap-2'>
					<Chip label='Active' variant='success' icon={<CheckCircle2 />} />
					<Chip label='Draft' variant='default' />
					<Chip label='Pending' variant='warning' icon={<Clock />} />
					<Chip label='Failed' variant='failed' icon={<XCircle />} />
					<Chip label='Synced' variant='info' />
				</div>
			</div>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		label: 'Archived',
		variant: 'default',
		disabled: true,
	},
	render: Default.render,
};

export const ClickInteraction: Story = {
	render: Default.render,
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: /active/i }));
		await expect(args.onClick).toHaveBeenCalled();
	},
};
