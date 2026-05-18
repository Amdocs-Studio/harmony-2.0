import { Button, Card, CardContent, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link } from 'react-router';
import { Routes } from '@sdk';
import { LandingHero } from '@ui-modules';

const BASE = import.meta.env.BASE_URL;

const features = [
	{
		title: 'Best Practice',
		description: 'Predefined scripts that let you deliver your app as fast as you can.',
		icon: `${BASE}assets/best-practice.svg`,
	},
	{
		title: 'Static Typing',
		description: 'TypeScript built-in with a pre-defined rule-set for safer code.',
		icon: `${BASE}assets/typing.svg`,
	},
	{
		title: 'Real-Time Dispatching',
		description: 'Dispatch Redux actions across clients via WebSockets out of the box.',
		icon: `${BASE}assets/real-time.svg`,
	},
	{
		title: 'Multilingual',
		description: 'Easy to add and support multiple languages with react-intl.',
		icon: `${BASE}assets/multi-lang.svg`,
	},
	{
		title: 'Authentication',
		description: 'Ready-to-use auth mechanism wired into the SDK.',
		icon: `${BASE}assets/user.svg`,
	},
	{
		title: 'Modular Architecture',
		description: 'Opinionated ui-modules structure with Storybook and MSW ready.',
		icon: `${BASE}assets/best-practice.svg`,
	},
];

export default function LandingPage() {
	const snippet = 'npx harmony2 create';
	return (
		<>
			<LandingHero />

			<section className="max-w-6xl mx-auto px-6 py-20">
				<div className="text-center mb-12">
					<Typography variant="overline" className="!tracking-widest opacity-70">
						What&apos;s inside
					</Typography>
					<Typography variant="h4" component="h2" className="!font-bold !mt-2">
						Everything you need, nothing you don&apos;t
					</Typography>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{features.map((f) => (
						<Card key={f.title} variant="outlined" className="!transition-shadow hover:!shadow-md">
							<CardContent className="flex flex-col gap-3">
								<img src={f.icon} alt="" className="h-10 w-10" aria-hidden />
								<Typography variant="h6" className="!font-semibold">
									{f.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{f.description}
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section className="max-w-4xl mx-auto px-6 py-16">
				<Card
					variant="outlined"
					className="!rounded-2xl"
					sx={{ backgroundColor: 'var(--color-primary-50, #eef2ff)' }}
				>
					<CardContent className="flex flex-col items-center text-center gap-4 !p-10">
						<Typography variant="overline" className="!tracking-widest opacity-70">
							Quick start
						</Typography>
						<Typography variant="h5" className="!font-bold">
							Create a new Harmony project in one command
						</Typography>
						<code
							className="inline-flex items-center gap-3 px-5 py-3 rounded-lg font-mono text-sm"
							style={{
								backgroundColor: 'rgba(0,0,0,0.06)',
							}}
						>
							<span className="opacity-60">$</span>
							<span>{snippet}</span>
							<button
								type="button"
								aria-label="Copy command"
								onClick={() => navigator.clipboard?.writeText(snippet)}
								className="p-1 rounded hover:bg-black/10"
							>
								<ContentCopyIcon fontSize="inherit" />
							</button>
						</code>
						<Button
							component={Link}
							to={Routes.DOCS_GETTING_STARTED}
							variant="contained"
							size="large"
							endIcon={<ArrowForwardIcon />}
							className="!mt-2"
						>
							Get started in 5 minutes
						</Button>
					</CardContent>
				</Card>
			</section>

			<footer className="border-t border-black/10 dark:border-white/10 mt-10">
				<div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-70">
					<div>Copyright (c) 2025 Amdocs Experience & Digital Engineering Studio.</div>
					<div className="flex items-center gap-6">
						<Link to={Routes.DOCS} className="hover:underline">Docs</Link>
						<Link to={Routes.DOCS_LICENSE} className="hover:underline">License</Link>
					</div>
				</div>
			</footer>
		</>
	);
}
