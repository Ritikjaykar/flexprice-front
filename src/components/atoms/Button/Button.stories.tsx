import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { ArrowRight, Plus } from 'lucide-react';
import { Button } from './index';

type ButtonStoryArgs = {
	label: string;
	variant?: 'default' | 'black' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	size?: 'default' | 'sm' | 'lg' | 'icon' | 'xs';
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: () => void;
};

const meta: Meta<ButtonStoryArgs> = {
	title: 'Atoms/Button',
	parameters: {
		layout: 'centered',
	},
	args: {
		label: 'Create plan',
		variant: 'default',
		size: 'default',
		isLoading: false,
		disabled: false,
		onClick: fn(),
	},
	argTypes: {
		label: { control: 'text' },
		variant: {
			control: 'select',
			options: ['default', 'black', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
		},
		size: {
			control: 'select',
			options: ['default', 'sm', 'lg', 'icon', 'xs'],
		},
		isLoading: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Default: Story = {
	render: (args) => (
		<Button variant={args.variant} size={args.size} isLoading={args.isLoading} disabled={args.disabled} onClick={args.onClick}>
			{args.label}
		</Button>
	),
};

export const Variants: Story = {
	args: {
		variant: 'default',
		size: 'default',
	},

	render: (args) => (
		<div className='flex flex-col gap-5'>
			<div className='flex flex-col gap-2'>
				<p className='text-sm text-muted-foreground'>Controlled preview</p>
				<div>
					<Button variant={args.variant} size={args.size} disabled={args.disabled} isLoading={args.isLoading}>
						{args.label}
					</Button>
				</div>
			</div>

			<div className='flex flex-col gap-2'>
				<p className='text-sm text-muted-foreground'>Common FlexPrice actions</p>
				<div className='flex flex-wrap gap-3'>
					<Button>Create plan</Button>
					<Button variant='outline'>Export CSV</Button>
					<Button variant='secondary'>Save draft</Button>
					<Button variant='ghost'>Cancel</Button>
					<Button variant='destructive'>Delete invoice</Button>
				</div>
			</div>
		</div>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<div className='flex flex-col gap-5'>
			<div className='flex flex-col gap-2'>
				<p className='text-sm text-muted-foreground'>Controlled preview</p>
				<div>
					<Button variant={args.variant} size={args.size} disabled={args.disabled} isLoading={args.isLoading}>
						{args.label}
					</Button>
				</div>
			</div>

			<div className='flex flex-col gap-2'>
				<p className='text-sm text-muted-foreground'>Available sizes</p>
				<div className='flex items-center gap-3'>
					<Button size='xs'>Extra small</Button>
					<Button size='sm'>Small</Button>
					<Button size='default'>Default</Button>
					<Button size='lg'>Large</Button>
				</div>
			</div>
		</div>
	),
};

export const WithIcons: Story = {
	args: {
		size: 'default',
		variant: 'outline',
	},

	render: (args) => (
		<div className='flex gap-3'>
			<Button variant={args.variant} size={args.size} prefixIcon={<Plus />}>
				Add customer
			</Button>
			<Button variant='outline' size={args.size} suffixIcon={<ArrowRight />}>
				Continue
			</Button>
		</div>
	),
};

export const Loading: Story = {
	args: {
		label: 'Saving',
		isLoading: true,
	},
	render: Default.render,
};

export const ClickInteraction: Story = {
	render: Default.render,
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: /create plan/i }));
		await expect(args.onClick).toHaveBeenCalled();
	},
};
