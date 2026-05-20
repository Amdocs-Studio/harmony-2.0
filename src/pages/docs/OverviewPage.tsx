import { ComponentType } from 'react';
import { Card, CardContent, SvgIconProps, Typography } from '@mui/material';
import { Link } from 'react-router';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import ExtensionIcon from '@mui/icons-material/Extension';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WidgetsIcon from '@mui/icons-material/Widgets';
import TerminalIcon from '@mui/icons-material/Terminal';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BuildIcon from '@mui/icons-material/Build';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TranslateIcon from '@mui/icons-material/Translate';
import LockIcon from '@mui/icons-material/Lock';
import ApiIcon from '@mui/icons-material/Api';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HubIcon from '@mui/icons-material/Hub';
import GavelIcon from '@mui/icons-material/Gavel';
import ArticleIcon from '@mui/icons-material/Article';
import { DocsPage } from '@ui-modules';
import { docsNav, Routes } from '@sdk';

const iconByPath: Record<string, ComponentType<SvgIconProps>> = {
	[Routes.DOCS_GETTING_STARTED]: RocketLaunchIcon,
	[Routes.DOCS_DEVELOP]: CodeIcon,
	[Routes.DOCS_CLIENT]: ExtensionIcon,
	[Routes.DOCS_CLIENT_MAIN_FEATURES]: AutoAwesomeIcon,
	[Routes.DOCS_CLIENT_MODULES]: WidgetsIcon,
	[Routes.DOCS_CLIENT_DEVELOPMENT]: TerminalIcon,
	[Routes.DOCS_CLIENT_FLOW_MANAGER]: AccountTreeIcon,
	[Routes.DOCS_CLIENT_FLOW_MANAGER_ESTABLISHMENT]: BuildIcon,
	[Routes.DOCS_CLIENT_FEEDBACK_HANDLER]: FeedbackIcon,
	[Routes.DOCS_CLIENT_GLOBAL_SPINNER]: AutorenewIcon,
	[Routes.DOCS_CLIENT_MULTILINGUAL]: TranslateIcon,
	[Routes.DOCS_CLIENT_RBA]: LockIcon,
	[Routes.DOCS_CLIENT_REQUESTS]: ApiIcon,
	[Routes.DOCS_CLIENT_STORYBOOK]: AutoStoriesIcon,
	[Routes.DOCS_MCP]: HubIcon,
	[Routes.DOCS_LICENSE]: GavelIcon,
};

export default function OverviewPage() {
	const browseGroups = docsNav.filter((g) => g.title !== 'Introduction');
	return (
		<DocsPage
			title="Overview"
			description="Welcome to the Harmony 2.0 documentation."
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
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					{browseGroups.flatMap((group) =>
						group.items.map((item) => {
							const Icon = iconByPath[item.path] ?? ArticleIcon;
							return (
								<Card
									key={item.path}
									variant="outlined"
									className="hover:shadow-md! transition-shadow! h-full"
								>
									<CardContent className="h-[150px]">
										<Link
											to={item.path}
											className="no-underline text-inherit flex flex-col items gap-3 h-full"
										>
											<div className='flex items-start gap-3'>
												<span
													className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg"
													style={{
														backgroundColor: 'var(--color-primary-50, rgba(99, 102, 241, 0.12))',
														color: 'var(--color-primary, #4338ca)',
													}}
												>
													<Icon fontSize="small" />
												</span>
												<span className="flex flex-col gap-1">
													<Typography variant="overline" className="opacity-60 leading-none!">
														{group.title}
													</Typography>
													<Typography variant="subtitle1" className="font-semibold!">
														{item.label}
													</Typography>
												</span>
											</div>
											
											<span>
												{item.description && (
													<Typography variant="body2" color="text.secondary" className="mt-1!">
														{item.description}
													</Typography>
												)}
											</span>
										</Link>
									</CardContent>
								</Card>
							);
						}),
					)}
				</div>
				<Typography variant="body2" className="mt-6! opacity-70">
					Or jump straight to <Link to={Routes.DOCS_GETTING_STARTED}>Getting Started</Link>.
				</Typography>
			</section>
		</DocsPage>
	);
}
