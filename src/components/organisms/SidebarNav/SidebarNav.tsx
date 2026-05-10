import { BarChart3, CreditCard, FileText, Gauge, Home, Package, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarNavItem {
	label: string;
	href: string;
	icon: keyof typeof sidebarIcons;
}

export interface SidebarNavProps {
	items: SidebarNavItem[];
	activeHref: string;
	collapsed?: boolean;
	appName?: string;
	className?: string;
}

const sidebarIcons = {
	home: Home,
	plans: Package,
	customers: Users,
	subscriptions: CreditCard,
	invoices: FileText,
	credits: Gauge,
	usage: BarChart3,
};

/**
 * SidebarNav provides the primary product navigation for FlexPrice-style
 * billing workflows. It supports active route highlighting and a collapsed
 * icon-only mode for dense layouts.
 */
const SidebarNav = ({ items, activeHref, collapsed = false, appName = 'FlexPrice', className }: SidebarNavProps) => {
	return (
		<aside className={cn('h-[560px] border-r bg-background p-3', collapsed ? 'w-20' : 'w-64', className)}>
			<div className={cn('mb-5 flex h-10 items-center px-2 font-semibold text-foreground', collapsed && 'justify-center px-0')}>
				{collapsed ? 'FP' : appName}
			</div>

			<nav className='grid gap-1'>
				{items.map((item) => {
					const Icon = sidebarIcons[item.icon];
					const active = item.href === activeHref;

					return (
						<a
							key={item.href}
							href={item.href}
							aria-current={active ? 'page' : undefined}
							title={collapsed ? item.label : undefined}
							className={cn(
								'flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors',
								active ? 'bg-[#092E44] text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
								collapsed && 'justify-center px-0',
							)}>
							<Icon className='size-4 shrink-0' />
							{!collapsed && <span>{item.label}</span>}
						</a>
					);
				})}
			</nav>
		</aside>
	);
};

export default SidebarNav;
