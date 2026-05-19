import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router';
import {
	DocsPage, H2, P, Lead, Pre, TocEntry,
} from '@ui-modules';
import { docsNav } from '@sdk';

const toc: TocEntry[] = [
	{ id: 'client-introduction', label: 'Client introduction' },
	{ id: 'folder-structure', label: 'Folder structure' },
	{ id: 'sdk', label: 'SDK' },
	{ id: 'base-technologies', label: 'Base technologies' },
	{ id: 'in-this-section', label: 'In this section' },
];

const BASE = import.meta.env.BASE_URL;

const technologies = [
	{ name: 'React', href: 'https://react.dev', icon: `${BASE}assets/icon-react.svg` },
	{ name: 'Redux', href: 'https://redux.js.org', icon: `${BASE}assets/icon-redux.svg` },
	{ name: 'Redux Toolkit', href: 'https://redux-toolkit.js.org', icon: `${BASE}assets/icon-redux.svg` },
	{ name: 'TypeScript', href: 'https://www.typescriptlang.org', icon: `${BASE}assets/icon-ts.svg` },
	{ name: 'Tailwind CSS', href: 'https://tailwindcss.com', icon: `${BASE}assets/icon-tailwind.svg` },
	{ name: 'Vite', href: 'https://vite.dev', icon: `${BASE}assets/icon-vite.svg` },
	{ name: 'Node.js', href: 'https://nodejs.org', icon: `${BASE}assets/icon-node.svg` },
	{ name: 'MongoDB', href: 'https://www.mongodb.com', icon: `${BASE}assets/icon-mongo.svg` },
];

const folderTree = `src
  modules
    app-intl
      Intl.i18n.ts
      index.ts
      components
    base-styles
      styles
    common-components
    sdk
      hooks
      modules
        module1
          Module1Api.ts
          Module1Config.ts
          Module1Reducer.ts
          Module1Types.ts
          index.ts
          useModule1.ts
        ...
      services
      utils
      index.ts
    widget1
      components
        widget1.main.tsx
      styles
        index.css
      index.ts
      Widget1.i18n.ts
      Widget1.tsx
      Widget1.types.ts
    widget2
      ...
    <MPA only>-vendors
      src
      index.html
    ...`;

export default function ClientPage() {
	const clientGroup = docsNav.find((g) => g.title === 'Client Extensions');
	return (
		<DocsPage
			title="Client Extensions"
			description="How the client SDK is assembled from composable, opt-in modules."
			toc={toc}
		>
			<section>
				<H2 id="client-introduction">Client introduction</H2>
				<P>
					The client is the front-end half of a Harmony project. It is built with{' '}
					<strong>React</strong>, <strong>TypeScript</strong> and{' '}
					<strong>Redux Toolkit</strong>, bundled with <strong>Vite</strong>, and styled
					with <strong>Tailwind CSS</strong>. MUI is used for primitive components where a
					design system is needed.
				</P>
				<Lead>
					Each feature lives inside a self-contained module so you can opt in to exactly
					what you need and nothing more.
				</Lead>
			</section>

			<section>
				<H2 id="folder-structure">Folder structure</H2>
				<Pre lang="text" label="src/">{folderTree}</Pre>
				<P>
					In a multi-page project, each module is prefixed with the project name — for
					example <code>project-prefix-widget1</code>.
				</P>
			</section>

			<section>
				<H2 id="sdk">SDK</H2>
				<P>
					The SDK layer houses all business logic and API calls while providing shared code
					across modules: hooks, services, utilities, store wiring, typed selectors, and
					opinionated redux-persist helpers.
				</P>
			</section>

			<section>
				<H2 id="base-technologies">Base technologies</H2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
					{technologies.map((t) => (
						<a
							key={t.name}
							href={t.href}
							target="_blank"
							rel="noreferrer"
							className="flex flex-col items-center justify-center gap-2 py-4 rounded-lg border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors text-inherit no-underline"
						>
							<img src={t.icon} alt="" aria-hidden className="h-8 w-8" />
							<span className="text-sm font-medium">{t.name}</span>
						</a>
					))}
				</div>
			</section>

			<section>
				<H2 id="in-this-section">In this section</H2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{clientGroup?.items
						.filter((i) => !i.path.endsWith('/client'))
						.map((item) => (
							<Card key={item.path} variant="outlined" className="hover:shadow-md! transition-shadow!">
								<CardContent>
									<Link to={item.path} className="no-underline text-inherit">
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
						))}
				</div>
			</section>
		</DocsPage>
	);
}
