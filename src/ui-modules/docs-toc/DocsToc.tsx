import { useEffect, useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import { useCurrentDocsPage } from '../docs-page';
import clsx from 'clsx';

// Approx height of the sticky top bar; any heading whose top has crossed this
// line is considered "scrolled past". The active entry is the last one past it.
const TOP_OFFSET = 96;

function useActiveHeading(ids: string[]) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const idsKey = useMemo(() => ids.join('|'), [ids]);

	useEffect(() => {
		const list = idsKey ? idsKey.split('|') : [];
		if (!list.length) {
			return;
		}

		const computeActive = () => {
			let current: string | null = list[0] ?? null;
			for (const id of list) {
				const el = document.getElementById(id);
				if (!el) {
					continue;
				}
				const top = el.getBoundingClientRect().top;
				if (top - TOP_OFFSET <= 0) {
					current = id;
				} else {
					break;
				}
			}
			// If the user has hit the bottom of the page, force the last entry active.
			const atBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
			if (atBottom) {
				current = list[list.length - 1] ?? current;
			}
			setActiveId(current);
		};

		computeActive();
		window.addEventListener('scroll', computeActive, { passive: true });
		window.addEventListener('resize', computeActive);
		return () => {
			window.removeEventListener('scroll', computeActive);
			window.removeEventListener('resize', computeActive);
		};
	}, [idsKey]);

	return activeId;
}

export default function DocsToc() {
	const current = useCurrentDocsPage();
	const ids = useMemo(() => current?.toc.map((e) => e.id) ?? [], [current]);
	const activeId = useActiveHeading(ids);

	if (!current || !current.toc.length) {
		return null;
	}

	return (
		<nav aria-label="On this page" className="text-sm">
			<Typography
				variant="overline"
				className="block! mb-3! text-xs! tracking-widest! opacity-60"
			>
				On this page
			</Typography>
			<ul className="flex flex-col gap-1 border-l border-black/10 dark:border-white/10">
				{current.toc.map((entry) => {
					const isActive = entry.id === activeId;
					return (
						<li key={entry.id}>
							<a
								href={`#${entry.id}`}
								aria-current={isActive ? 'location' : undefined}
								className={clsx(
									'block pl-3 py-1 -ml-px border-l transition-colors',
									entry.depth === 3 && 'pl-6 text-xs',
									isActive
										? 'border-primary-600 text-primary-700 dark:text-primary-300 font-medium'
										: clsx(
											'border-transparent',
											'hover:border-primary-600 hover:text-primary-700',
											'dark:hover:text-primary-300',
											entry.depth === 3 && 'opacity-80',
										),
								)}
							>
								{entry.label}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
