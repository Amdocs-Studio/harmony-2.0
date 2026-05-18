import { Button, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router';
import { Routes } from '@sdk';

const techStack = [
	{ name: 'React', icon: '/assets/icon-react.svg' },
	{ name: 'Redux Toolkit', icon: '/assets/icon-redux.svg' },
	{ name: 'TypeScript', icon: '/assets/icon-ts.svg' },
	{ name: 'Tailwind CSS', icon: '/assets/icon-tailwind.svg' },
	{ name: 'Vite', icon: '/assets/icon-vite.svg' },
	{ name: 'Node.js', icon: '/assets/icon-node.svg' },
];

const GITHUB_URL = 'https://github.com/harmony-framework/harmony-boilerplate';

export default function LandingHero() {
	return (
		<section className="relative overflow-hidden">
			<div
				className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none"
				style={{
					backgroundImage: 'url(/assets/top-bg-grid.svg)',
					backgroundSize: 'cover',
					backgroundPosition: 'top',
				}}
				aria-hidden
			/>
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						'radial-gradient(ellipse 80% 50% at 50% 0%, var(--color-primary-200, #c7d2fe) 0%, transparent 60%)',
					opacity: 0.55,
				}}
				aria-hidden
			/>

			<div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
				<Chip
					label="Amdocs Experience & Digital Engineering Studio"
					variant="outlined"
					size="small"
					className="!mb-6"
				/>
				<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
					<span
						style={{
							backgroundImage:
								'linear-gradient(90deg, var(--color-primary-700, #4338ca), var(--color-primary-400, #818cf8))',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
						}}
					>
						Harmony 2.0
					</span>
					<br />
					<span>Production-ready React, out of the box</span>
				</h1>
				<p className="max-w-2xl mx-auto text-lg md:text-xl opacity-80 mb-10 leading-relaxed">
					A batteries-included starter-kit for fast onboarding into React + Redux web apps.
					Opinionated, modular, and focused on performance and best practices.
				</p>

				<div className="flex items-center justify-center flex-wrap gap-3 mb-16">
					<Button
						component={Link}
						to={Routes.DOCS}
						variant="contained"
						size="large"
						endIcon={<ArrowForwardIcon />}
					>
						Read the Docs
					</Button>
					<Button
						component="a"
						href={GITHUB_URL}
						target="_blank"
						rel="noreferrer"
						variant="outlined"
						size="large"
						startIcon={<GitHubIcon />}
						color="inherit"
					>
						GitHub
					</Button>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-80">
					{techStack.map((t) => (
						<div key={t.name} className="flex items-center gap-2 text-sm">
							<img src={t.icon} alt="" className="h-5 w-5" aria-hidden />
							<span>{t.name}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
