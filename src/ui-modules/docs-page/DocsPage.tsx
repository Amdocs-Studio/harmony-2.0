import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { DocsPageProps } from './DocsPage.types';
import { useDocsPageRegistry } from './DocsPage.context';
import DocsBreadcrumbs from './components/DocsPage.breadcrumbs';
import DocsPrevNext from './components/DocsPage.prevNext';

export default function DocsPage({ title, description, toc = [], children }: DocsPageProps) {
	const { setCurrent } = useDocsPageRegistry();

	useEffect(() => {
		setCurrent({ title, toc });
		return () => setCurrent(null);
	}, [title, toc, setCurrent]);

	return (
		<article className="docs-page">
			<DocsBreadcrumbs />
			<header className="mb-8">
				<Typography variant="h3" component="h1" className="!font-bold !mb-2">
					{title}
				</Typography>
				{description && (
					<Typography variant="subtitle1" color="text.secondary">
						{description}
					</Typography>
				)}
			</header>
			<div className="docs-prose flex flex-col gap-6">
				{children}
			</div>
			<DocsPrevNext />
		</article>
	);
}
