import {
	DocsPage, H2, H3, P, Lead, UL, Callout, InlineCode, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'flow-data', label: 'Flow data' },
	{ id: 'working-in-a-project', label: 'Working in a project' },
	{ id: 'daily-workflow', label: 'Daily workflow' },
];

export default function DevelopWithHarmonyPage() {
	return (
		<DocsPage
			title="Develop with Harmony"
			description="How data flows through a Harmony app and what the day-to-day workflow looks like."
			toc={toc}
		>
			<section>
				<H2 id="flow-data">Flow data</H2>
				<P>
					Harmony builds on top of the classic Redux architecture and layers a few features
					on top — the feedback handler, the flow manager, RBA, and an opinionated SDK.
					Components dispatch actions, reducers update slices, selectors (via{' '}
					<InlineCode>useAppSelector</InlineCode>) read state back into the view, and side
					effects live in RTK Query endpoints.
				</P>
				<Lead>
					For a deep dive into each feature, follow the <strong>Client Extensions</strong>{' '}
					section in the sidebar.
				</Lead>
			</section>

			<section>
				<H2 id="working-in-a-project">Working in a project</H2>
				<P>Every generated project follows the same layout:</P>
				<UL>
					<li><InlineCode>src/base-modules</InlineCode> — SDK, common components, mocks,
						app-intl, base styles.</li>
					<li><InlineCode>src/ui-modules</InlineCode> — feature widgets following the 6-file
						module convention.</li>
					<li><InlineCode>src/bootstrap</InlineCode> — app entry, router, layouts, pages
						config.</li>
					<li><InlineCode>src/pages</InlineCode> — thin route-level components (optional).
					</li>
				</UL>

				<H3 id="daily-workflow">Daily workflow</H3>
				<UL>
					<li>
						Scaffold a new widget: <InlineCode>npx harmony2 add ui my-widget</InlineCode>.
					</li>
					<li>
						Scaffold a new API module:{' '}
						<InlineCode>npx harmony2 add api my-api</InlineCode>.
					</li>
					<li>
						Start the dev server with <InlineCode>npm start</InlineCode> — MSW intercepts
						all registered requests so you can develop offline.
					</li>
					<li>
						Document components with <InlineCode>npm run storybook</InlineCode>.
					</li>
					<li>
						Keep the console clean — the feedback handler treats runtime errors as blocking
						by default.
					</li>
				</UL>

				<Callout type="note">
					The generator adds new modules to <InlineCode>tsconfig.app.json</InlineCode>,{' '}
					<InlineCode>vite.config.ts</InlineCode> and the i18n index so imports via{' '}
					<InlineCode>@ui-modules</InlineCode> / <InlineCode>@sdk</InlineCode> keep working
					without manual wiring.
				</Callout>
			</section>
		</DocsPage>
	);
}
