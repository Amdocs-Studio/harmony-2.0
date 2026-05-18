import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router';
import { Routes, flatDocsNav } from '@sdk';

export default function DocsBreadcrumbs() {
	const { pathname } = useLocation();
	const parts = pathname.split('/').filter(Boolean);

	const crumbs: Array<{ label: string; to?: string }> = [{ label: 'Docs', to: Routes.DOCS }];

	if (parts.length > 1) {
		let acc = '';
		parts.forEach((p, idx) => {
			if (idx === 0) {
				acc = `/${p}`;
				return;
			}
			acc = `${acc}/${p}`;
			const match = flatDocsNav.find((n) => n.path === acc);
			const label = match?.label ?? p.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
			const isLast = idx === parts.length - 1;
			crumbs.push({ label, to: isLast ? undefined : acc });
		});
	}

	return (
		<Breadcrumbs aria-label="breadcrumb" className="mb-2">
			{crumbs.map((c, i) => c.to ? (
				<MuiLink key={c.to + i} component={Link} to={c.to} underline="hover" color="inherit">
					{c.label}
				</MuiLink>
			) : (
				<Typography key={c.label + i} color="text.primary">{c.label}</Typography>
			))}
		</Breadcrumbs>
	);
}
