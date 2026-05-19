import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router';
import { docsNav } from '@sdk';
import clsx from 'clsx';

export default function DocsSidebar() {
	const { pathname } = useLocation();

	return (
		<nav aria-label="Documentation" className="px-4 py-6">
			{docsNav.map((group) => (
				<div key={group.title} className="mb-6">
					<Typography
						variant="overline"
						className="block! px-3! mb-2! text-xs! tracking-widest! opacity-60"
					>
						{group.title}
					</Typography>
					<List dense disablePadding>
						{group.items.map((item) => {
							const active = pathname === item.path;
							return (
								<ListItemButton
									key={item.path}
									component={Link}
									to={item.path}
									selected={active}
									className={clsx('rounded-md! mb-0.5!', active && 'font-semibold!')}
								>
									<ListItemText
										primary={item.label}
										primaryTypographyProps={{
											className: active ? 'font-semibold!' : undefined,
										}}
									/>
								</ListItemButton>
							);
						})}
					</List>
				</div>
			))}
		</nav>
	);
}
