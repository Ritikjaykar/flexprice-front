import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
	value?: string;
	placeholder?: string;
	debounceMs?: number;
	disabled?: boolean;
	onSearch: (value: string) => void;
}

/**
 * SearchBar provides debounced text search for tables such as customers,
 * invoices, plans, and subscriptions. Use it when filtering should wait until
 * the user pauses typing.
 */
const SearchBar = ({ value = '', placeholder = 'Search', debounceMs = 300, disabled = false, onSearch }: SearchBarProps) => {
	const [draft, setDraft] = useState(value);

	useEffect(() => {
		const timer = window.setTimeout(() => {
			onSearch(draft);
		}, debounceMs);

		return () => window.clearTimeout(timer);
	}, [debounceMs, draft, onSearch]);

	const handleClear = () => {
		setDraft('');
		onSearch('');
	};

	return (
		<div
			className={cn(
				'flex h-9 w-full items-center gap-2 rounded-md border bg-background px-3 text-sm',
				disabled && 'cursor-not-allowed opacity-50',
			)}>
			<Search className='size-4 text-muted-foreground' />
			<input
				value={draft}
				placeholder={placeholder}
				disabled={disabled}
				onChange={(event) => setDraft(event.target.value)}
				className='min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed'
			/>
			{draft && !disabled && (
				<button
					type='button'
					aria-label='Clear search'
					className='rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground'
					onClick={handleClear}>
					<X className='size-4' />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
