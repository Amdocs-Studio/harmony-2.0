import {
	DocsPage, H2, H3, P, UL, Pre, InlineCode, Callout, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'create-module-by-cli', label: 'Create a module by CLI' },
	{ id: 'ui-module', label: 'UI module', depth: 3 },
	{ id: 'api-module', label: 'API module', depth: 3 },
];

export default function ClientModulesPage() {
	return (
		<DocsPage
			title="Generate Modules"
			description="Scaffold UI and API modules with a single command."
			toc={toc}
		>
			<section>
				<H2 id="overview">Overview</H2>
				<P>
					Harmony lets you create a module with a single command and scaffolds every file
					you need. The module types supported by Harmony are:
				</P>
				<UL>
					<li><InlineCode>ui</InlineCode> — a visible feature widget rendered in the page tree.</li>
					<li><InlineCode>api</InlineCode> — a headless SDK module that exposes state, actions and API endpoints.</li>
				</UL>
			</section>

			<section>
				<H2 id="create-module-by-cli">Create a module by CLI</H2>
				<Pre lang="bash">{'harmony2 add [type] [name]    # Add a new module'}</Pre>

				<H3 id="ui-module">UI module</H3>
				<P>
					When adding a UI module, the CLI creates a folder named after the module inside{' '}
					<InlineCode>src/modules/</InlineCode> and scaffolds the following files:
				</P>
				<UL>
					<li><InlineCode>components/&lt;module-name&gt;.main.tsx</InlineCode> — main business component for the module.</li>
					<li><InlineCode>styles/index.css</InlineCode> — module-scoped styles.</li>
					<li><InlineCode>&lt;module-name&gt;.i18n.ts</InlineCode> — translation entry for the module.</li>
					<li><InlineCode>&lt;module-name&gt;.provider.tsx</InlineCode> — module context provider.</li>
					<li><InlineCode>&lt;module-name&gt;.tsx</InlineCode> — public component re-export.</li>
					<li><InlineCode>&lt;module-name&gt;.types.ts</InlineCode> — types pre-populated with Harmony base types.</li>
					<li><InlineCode>index.ts</InlineCode> — barrel export for the module and its types.</li>
				</UL>
				<P>The generator also wires the module into:</P>
				<UL>
					<li><InlineCode>src/modules/app-intl/Intl.i18n.ts</InlineCode> — main translation file.</li>
					<li><InlineCode>tsconfig.app.json</InlineCode> — TypeScript path aliases.</li>
					<li><InlineCode>vite.config.ts</InlineCode> — Vite alias resolution.</li>
				</UL>

				<H3 id="api-module">API module</H3>
				<P>
					When adding an API module, the CLI creates a folder inside{' '}
					<InlineCode>src/modules/sdk/modules/</InlineCode> and scaffolds the following
					files:
				</P>
				<UL>
					<li><InlineCode>&lt;ModuleName&gt;Api.ts</InlineCode> — endpoints, base query, redux-persist wiring and examples.</li>
					<li><InlineCode>&lt;ModuleName&gt;Config.ts</InlineCode> — slice name, API name and store-related config.</li>
					<li><InlineCode>&lt;ModuleName&gt;Reducer.ts</InlineCode> — initial state, persistence and action handling.</li>
					<li><InlineCode>&lt;ModuleName&gt;Types.ts</InlineCode> — action and state types with examples.</li>
					<li><InlineCode>index.ts</InlineCode> — barrel export for the API module and its types.</li>
					<li><InlineCode>use&lt;ModuleName&gt;.ts</InlineCode> — the module&apos;s main hook.</li>
				</UL>
				<P>It also updates:</P>
				<UL>
					<li><InlineCode>src/modules/sdk/modules/index.ts</InlineCode> — SDK module barrel.</li>
					<li><InlineCode>src/modules/sdk/store.ts</InlineCode> — combined reducers and APIs.</li>
				</UL>

				<Callout type="tip">
					Both generators are idempotent — regenerating an existing module will fail with a
					clear error rather than overwrite your code.
				</Callout>
			</section>
		</DocsPage>
	);
}
