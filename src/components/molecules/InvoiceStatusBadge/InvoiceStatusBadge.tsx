import { AlertTriangle, Ban, CheckCircle2, Clock, FileText, Undo2 } from 'lucide-react';
import Chip from '@/components/atoms/Chip/Chip';

type InvoiceStatus = 'draft' | 'paid' | 'overdue' | 'void' | 'refunded' | 'pending';

export interface InvoiceStatusBadgeProps {
	status: InvoiceStatus | string;
}

const statusMeta = {
	draft: {
		label: 'Draft',
		variant: 'default',
		icon: FileText,
	},
	paid: {
		label: 'Paid',
		variant: 'success',
		icon: CheckCircle2,
	},
	overdue: {
		label: 'Overdue',
		variant: 'failed',
		icon: AlertTriangle,
	},
	void: {
		label: 'Void',
		variant: 'warning',
		icon: Ban,
	},
	refunded: {
		label: 'Refunded',
		variant: 'info',
		icon: Undo2,
	},
	pending: {
		label: 'Pending',
		variant: 'warning',
		icon: Clock,
	},
} as const;

/**
 * InvoiceStatusBadge converts invoice status strings into FlexPrice-style
 * status chips. Use it in invoice tables, invoice detail pages, and billing
 * activity timelines.
 */
const InvoiceStatusBadge = ({ status }: InvoiceStatusBadgeProps) => {
	const meta = statusMeta[status as InvoiceStatus] ?? {
		label: 'Unknown',
		variant: 'default',
		icon: FileText,
	};

	const Icon = meta.icon;

	return <Chip label={meta.label} variant={meta.variant} icon={<Icon className='size-3.5' />} />;
};

export default InvoiceStatusBadge;
