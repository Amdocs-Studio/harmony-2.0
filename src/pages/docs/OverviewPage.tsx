import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router';
import { DocsPage, TocEntry } from '@ui-modules';
import { docsNav, Routes } from '@sdk';

const toc: TocEntry[] = [
	{ id: 'what-is-harmony', label: 'What is Harmony 2.0?' },
	{ id: 'explore', label: 'Explore the docs' },
];

export default function OverviewPage() {
	const browseGroups = docsNav.filter((g) => g.title !== 'Introduction');
	return (
		<DocsPage
			title="Overview"
			description="Welcome to the Harmony 2.0 documentation."
			toc={toc}
		>
			<section>
				<Typography variant="h5" component="h2" id="what-is-harmony" className="font-semibold! mb-2!">
					What is Harmony 2.0?
				</Typography>
				<Typography variant="body1">
					Harmony 2.0 is an npx-based CLI that scaffolds production-ready React + Redux Toolkit
					applications. It bundles opinionated conventions, a modular SDK, and a rich
					developer experience so teams can start building features on day one instead of
					wiring up tooling.
				</Typography>
			</section>

			<section>
				<Typography variant="h5" component="h2" id="explore" className="font-semibold! mb-4!">
					Explore the docs
				</Typography>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{browseGroups.flatMap((group) =>
						group.items.map((item) => (
							<Card key={item.path} variant="outlined" className="hover:shadow-md! transition-shadow!">
								<CardContent>
									<Link to={item.path} className="no-underline text-inherit">
										<Typography variant="overline" className="opacity-60">
											{group.title}
										</Typography>
										<Typography variant="subtitle1" className="font-semibold!">
											{item.label}
										</Typography>
										{item.description && (
											<Typography variant="body2" color="text.secondary" className="mt-1!">
												{item.description}
											</Typography>
										)}
									</Link>
								</CardContent>
							</Card>
						)),
					)}
				</div>
				<Typography variant="body2" className="mt-6! opacity-70">
					Or jump straight to <Link to={Routes.DOCS_GETTING_STARTED}>Getting Started</Link>.
				</Typography>
			</section>
		</DocsPage>
	);
}
