import { cn } from '@/lib/utils';

export interface PricingTier {
	from: number;
	to?: number;
	unitAmountCents: number;
}

export interface PricingTierTableProps {
	title?: string;
	description?: string;
	tiers: PricingTier[];
	currency?: string;
	pricingModel?: 'tiered' | 'graduated' | 'flat';
	className?: string;
}

const formatCurrency = (cents: number, currency: string) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		maximumFractionDigits: 4,
	}).format(cents / 100);
};

/**
 * PricingTierTable explains tiered or graduated usage pricing in a compact table.
 * Use it when customers need to understand unit ranges and prices before a plan
 * or subscription is created.
 */
const PricingTierTable = ({
	title = 'Pricing tiers',
	description,
	tiers,
	currency = 'USD',
	pricingModel = 'tiered',
	className,
}: PricingTierTableProps) => {
	return (
		<section className={cn('overflow-hidden rounded-lg border bg-background', className)}>
			<div className='border-b px-4 py-3'>
				<div className='flex items-start justify-between gap-4'>
					<div>
						<h2 className='text-sm font-semibold text-foreground'>{title}</h2>
						{description && <p className='mt-1 text-sm text-muted-foreground'>{description}</p>}
					</div>
					<span className='rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize text-muted-foreground'>{pricingModel}</span>
				</div>
			</div>

			<table className='w-full text-sm'>
				<thead className='bg-muted/40 text-left text-xs uppercase text-muted-foreground'>
					<tr>
						<th className='px-4 py-3 font-medium'>Starting unit</th>
						<th className='px-4 py-3 font-medium'>Ending unit</th>
						<th className='px-4 py-3 font-medium'>Price per unit</th>
					</tr>
				</thead>
				<tbody className='divide-y'>
					{tiers.map((tier) => (
						<tr key={`${tier.from}-${tier.to ?? 'more'}`} className='hover:bg-muted/30'>
							<td className='px-4 py-3 text-foreground'>{tier.from.toLocaleString()}</td>
							<td className='px-4 py-3 text-foreground'>{tier.to?.toLocaleString() ?? 'and above'}</td>
							<td className='px-4 py-3 text-foreground'>{formatCurrency(tier.unitAmountCents, currency)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
};

export default PricingTierTable;
