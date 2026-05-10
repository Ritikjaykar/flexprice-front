import { FilePlus2 } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
	title: string;
	description: string;
	actionLabel?: string;
	icon?: React.ReactNode;
	onAction?: () => void;
	className?: string;
}

/**
 * EmptyState provides a consistent first-run or no-results screen for FlexPrice
 * resources such as invoices, customers, plans, and subscriptions.
 */
const EmptyState = ({ title, description, actionLabel, icon, onAction, className }: EmptyStateProps) => {
	return (
		<section className={cn('grid min-h-72 place-items-center rounded-lg border border-dashed bg-background p-8 text-center', className)}>
			<div className='max-w-sm'>
				<div className='mx-auto grid size-12 place-items-center rounded-full bg-muted text-muted-foreground'>
					{icon ?? <FilePlus2 className='size-5' />}
				</div>
				<h2 className='mt-4 text-lg font-semibold text-foreground'>{title}</h2>
				<p className='mt-2 text-sm text-muted-foreground'>{description}</p>
				{actionLabel && (
					<Button className='mt-5' onClick={onAction}>
						{actionLabel}
					</Button>
				)}
			</div>
		</section>
	);
};

export default EmptyState;
