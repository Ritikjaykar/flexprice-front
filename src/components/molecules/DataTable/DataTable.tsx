import { useMemo, useRef, useState, type ReactNode } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Button } from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner/Spinner';
import { cn } from '@/lib/utils';

export interface DataTableColumn<TData> {
	key: keyof TData;
	header: string;
	sortable?: boolean;
	width?: string;
	render?: (row: TData) => ReactNode;
}

export interface DataTableProps<TData extends { id: string }> {
	columns: DataTableColumn<TData>[];
	rows: TData[];
	loading?: boolean;
	emptyTitle?: string;
	emptyDescription?: string;
	pageSize?: number;
	virtualized?: boolean;
	estimateRowHeight?: number;
	height?: number;
}

/**
 * DataTable displays billing records such as customers, invoices, and subscriptions.
 * It supports sorting, loading and empty states, pagination, and optional virtualized
 * rendering for large datasets.
 */
const DataTable = <TData extends { id: string }>({
	columns,
	rows,
	loading = false,
	emptyTitle = 'No records found',
	emptyDescription = 'Try changing your filters or creating a new record.',
	pageSize = 10,
	virtualized = false,
	estimateRowHeight = 48,
	height = 420,
}: DataTableProps<TData>) => {
	const [sortKey, setSortKey] = useState<keyof TData | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [page, setPage] = useState(1);
	const parentRef = useRef<HTMLDivElement>(null);

	const sortedRows = useMemo(() => {
		const nextRows = [...rows];

		if (!sortKey) return nextRows;

		return nextRows.sort((first, second) => {
			const firstValue = String(first[sortKey] ?? '');
			const secondValue = String(second[sortKey] ?? '');
			return sortDirection === 'asc' ? firstValue.localeCompare(secondValue) : secondValue.localeCompare(firstValue);
		});
	}, [rows, sortDirection, sortKey]);

	const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
	const paginatedRows = virtualized ? sortedRows : sortedRows.slice((page - 1) * pageSize, page * pageSize);

	const rowVirtualizer = useVirtualizer({
		count: sortedRows.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => estimateRowHeight,
		overscan: 8,
	});

	const handleSort = (key: keyof TData) => {
		if (sortKey === key) {
			setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'));
			return;
		}

		setSortKey(key);
		setSortDirection('asc');
	};

	if (loading) {
		return (
			<div className='w-full rounded-lg border bg-background p-4'>
				<div className='mb-4 flex items-center gap-2 text-sm text-muted-foreground'>
					<Spinner size={16} />
					Loading table data...
				</div>
				<div className='space-y-2'>
					{Array.from({ length: 6 }).map((_, index) => (
						<div key={index} className='h-10 animate-pulse rounded-md bg-muted' />
					))}
				</div>
			</div>
		);
	}

	if (rows.length === 0) {
		return (
			<div className='grid min-h-56 place-items-center rounded-lg border border-dashed bg-background p-8 text-center'>
				<div>
					<p className='font-medium text-foreground'>{emptyTitle}</p>
					<p className='mt-1 text-sm text-muted-foreground'>{emptyDescription}</p>
				</div>
			</div>
		);
	}

	const renderHeader = () => (
		<div
			className='grid border-b bg-muted/40 text-xs font-medium uppercase text-muted-foreground'
			style={{ gridTemplateColumns: columns.map((column) => column.width ?? '1fr').join(' ') }}>
			{columns.map((column) => (
				<div key={String(column.key)} className='px-4 py-3'>
					{column.sortable ? (
						<button className='inline-flex items-center gap-1 hover:text-foreground' onClick={() => handleSort(column.key)}>
							{column.header}
							<span className='text-[10px]'>{sortKey === column.key ? (sortDirection === 'asc' ? 'ASC' : 'DESC') : 'SORT'}</span>
						</button>
					) : (
						column.header
					)}
				</div>
			))}
		</div>
	);

	const renderRow = (row: TData) => (
		<div
			key={row.id}
			className='grid border-b last:border-b-0 hover:bg-muted/30'
			style={{ gridTemplateColumns: columns.map((column) => column.width ?? '1fr').join(' ') }}>
			{columns.map((column) => (
				<div key={String(column.key)} className='px-4 py-3 text-sm text-foreground'>
					{column.render ? column.render(row) : String(row[column.key] ?? '')}
				</div>
			))}
		</div>
	);

	return (
		<div className='w-full overflow-hidden rounded-lg border bg-background'>
			{renderHeader()}

			{virtualized ? (
				<div ref={parentRef} className='overflow-auto' style={{ height }}>
					<div className='relative w-full' style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
						{rowVirtualizer.getVirtualItems().map((virtualRow) => {
							const row = sortedRows[virtualRow.index];

							return (
								<div key={row.id} className={cn('absolute left-0 top-0 w-full')} style={{ transform: `translateY(${virtualRow.start}px)` }}>
									{renderRow(row)}
								</div>
							);
						})}
					</div>
				</div>
			) : (
				<div>{paginatedRows.map(renderRow)}</div>
			)}

			{!virtualized && (
				<div className='flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground'>
					<span>
						Page {page} of {totalPages}
					</span>
					<div className='flex gap-2'>
						<Button variant='outline' size='sm' disabled={page === 1} onClick={() => setPage((current) => current - 1)}>
							Previous
						</Button>
						<Button variant='outline' size='sm' disabled={page === totalPages} onClick={() => setPage((current) => current + 1)}>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DataTable;
