import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type TrendDirection = 'up' | 'down' | 'flat';

export interface MetricCardProps {
	label: string;
	value: string;
	trend?: string;
	trendDirection?: TrendDirection;
	description?: string;
}

const trendStyles: Record<TrendDirection, string> = {
	up: 'text-green-700 bg-green-50',
	down: 'text-red-700 bg-red-50',
	flat: 'text-muted-foreground bg-muted',
};

const trendIcons = {
	up: ArrowUpRight,
	down: ArrowDownRight,
	flat: ArrowRight,
};

/**
 * MetricCard displays a compact dashboard KPI such as MRR, active customers,
 * invoice count, or usage volume. Use it when a number needs quick comparison
 * against the previous period.
 */
const MetricCard = ({ label, value, trend, trendDirection = 'flat', description }: MetricCardProps) => {
	const TrendIcon = trendIcons[trendDirection];

	return (
		<section className='rounded-lg border bg-background p-4 shadow-sm'>
			<div className='flex items-start justify-between gap-4'>
				<div>
					<p className='text-sm font-medium text-muted-foreground'>{label}</p>
					<p className='mt-2 text-2xl font-semibold tracking-tight text-foreground'>{value}</p>
				</div>

				{trend && (
					<span className={cn('inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium', trendStyles[trendDirection])}>
						<TrendIcon className='size-3' />
						{trend}
					</span>
				)}
			</div>

			{description && <p className='mt-3 text-sm text-muted-foreground'>{description}</p>}
		</section>
	);
};

export default MetricCard;
