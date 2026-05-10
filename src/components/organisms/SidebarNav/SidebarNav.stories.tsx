import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import SidebarNav, { type SidebarNavItem } from './SidebarNav';

const navItems: SidebarNavItem[] = [
	{ label: 'Dashboard', href: '/dashboard', icon: 'home' },
	{ label: 'Plans', href: '/plans', icon: 'plans' },
	{ label: 'Customers', href: '/customers', icon: 'customers' },
	{ label: 'Subscriptions', href: '/subscriptions', icon: 'subscriptions' },
	{ label: 'Invoices', href: '/invoices', icon: 'invoices' },
	{ label: 'Credits', href: '/credits', icon: 'credits' },
	{ label: 'Usage', href: '/usage', icon: 'usage' },
];

const meta: Meta<typeof SidebarNav> = {
	title: 'Organisms/SidebarNav',
	component: SidebarNav,
	parameters: {
		layout: 'centered',
	},
	args: {
		items: navItems,
		activeHref: '/invoices',
		collapsed: false,
		appName: 'FlexPrice',
	},
	argTypes: {
		activeHref: {
			control: 'select',
			options: ['/dashboard', '/plans', '/customers', '/subscriptions', '/invoices', '/credits', '/usage'],
		},
		collapsed: { control: 'boolean' },
		appName: { control: 'text' },
		items: { control: 'object' },
	},
};

export default meta;
type Story = StoryObj<typeof SidebarNav>;

export const Default: Story = {
	args: {
		items: [
			{
				label: 'DASHBOARD',
				href: '/dashboard',
				icon: 'home',
			},
			{
				label: 'Plans',
				href: '/plans',
				icon: 'plans',
			},
			{
				label: 'Customers',
				href: '/customers',
				icon: 'customers',
			},
			{
				label: 'Subscriptions',
				href: '/subscriptions',
				icon: 'subscriptions',
			},
			{
				label: 'Invoices',
				href: '/invoices',
				icon: 'invoices',
			},
			{
				label: 'Credits',
				href: '/credits',
				icon: 'credits',
			},
			{
				label: 'Usage',
				href: '/usage',
				icon: 'usage',
			},
		],

		activeHref: '/subscriptions',
	},
};

export const Collapsed: Story = {
	args: {
		collapsed: true,
	},
};

export const ActiveCustomers: Story = {
	args: {
		activeHref: '/customers',
	},
};

export const NavigationLayout: Story = {
	render: (args) => (
		<div className='flex overflow-hidden rounded-lg border bg-background'>
			<SidebarNav {...args} />
			<main className='w-[620px] p-6'>
				<p className='text-sm font-medium text-muted-foreground'>Current section</p>
				<h2 className='mt-2 text-2xl font-semibold text-foreground'>{navItems.find((item) => item.href === args.activeHref)?.label}</h2>
				<p className='mt-2 text-sm text-muted-foreground'>
					This preview shows the sidebar beside a product workspace without requiring app routing.
				</p>
			</main>
		</div>
	),
};

export const ActiveRouteInteraction: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByRole('link', { name: 'Invoices' })).toHaveAttribute('aria-current', 'page');
	},
};
