import { cn } from '@/lib/utils';

export interface MeterProgressProps {
	label: string;
	used: number;
	limit: number;
	unit?: string;
	description?: string;
}

const formatNumber = (value: number) => {
	return new Intl.NumberFormat('en-US').format(value);
};

/**
 * MeterProgress shows usage consumption against a customer's entitlement.
 * Use it for API calls, credits, events, seats, or other metered billing units.
 */
const MeterProgress = ({ label, used, limit, unit = 'units', description }: MeterProgressProps) => {
	const percentage = limit <= 0 ? 0 : Math.min((used / limit) * 100, 100);
	const isOverLimit = limit > 0 && used > limit;
	const remaining = Math.max(limit - used, 0);

	return (
		<section className='w-full rounded-lg border bg-background p-4'>
			<div className='flex items-start justify-between gap-4'>
				<div>
					<p className='text-sm font-medium text-foreground'>{label}</p>
					<p className='mt-1 text-sm text-muted-foreground'>
						{formatNumber(used)} / {formatNumber(limit)} {unit}
					</p>
				</div>

				<span
					className={cn('rounded-md px-2 py-1 text-xs font-medium', isOverLimit ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700')}>
					{isOverLimit ? 'Over limit' : `${formatNumber(remaining)} left`}
				</span>
			</div>

			<div className='mt-4 h-2 overflow-hidden rounded-full bg-muted'>
				<div className={cn('h-full rounded-full', isOverLimit ? 'bg-red-600' : 'bg-green-600')} style={{ width: `${percentage}%` }} />
			</div>

			{description && <p className='mt-3 text-sm text-muted-foreground'>{description}</p>}
		</section>
	);
};

export default MeterProgress;
