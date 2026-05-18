import {
	DocsPage, H2, H3, P, Lead, UL, Pre, Callout, InlineCode, TocEntry,
} from '@ui-modules';

const creationCli = `# Browse the CLI
npx harmony2

# Create a new project
npx harmony2 create

# Create with a name and target location
npx harmony2 create <my-app> <location>
# <my-app> is the project name (optional)
# <location> is the target folder (optional)`;

const toc: TocEntry[] = [
	{ id: 'introduction', label: 'Introduction' },
	{ id: 'creation', label: 'Creation' },
	{ id: 'installation', label: 'Installation' },
	{ id: 'execution', label: 'Execution' },
	{ id: 'run-the-project', label: 'Run the project', depth: 3 },
	{ id: 'run-storybook', label: 'Run Storybook', depth: 3 },
];

export default function GettingStartedPage() {
	return (
		<DocsPage
			title="Getting Started"
			description="Create, install and run your first Harmony 2.0 project."
			toc={toc}
		>
			<section>
				<H2 id="introduction">Introduction</H2>
				<Callout type="tip" title="How to read Harmony Documentation">
					Harmony Documentation is built step by step to make it easy for you to get started
					and understand the full framework. Follow the <strong>Next</strong> button at the
					bottom of each page to keep going.
				</Callout>
				<P>
					Harmony is a starter-kit for fast onboarding when developing web applications, with
					a focus on React, Redux and Node.js. Harmony suggests new features and improves
					your flexibility by letting you plug in customized features.
				</P>
				<Lead>
					Harmony Boilerplate focuses on performance and best practices so you can build the
					most up-to-date web application from day one.
				</Lead>
			</section>

			<section>
				<H2 id="creation">Creation</H2>
				<P>
					To create a Harmony-based project, use the Harmony CLI. It presents a menu that
					lets you choose between a Single Page Application (SPA) or a Multi Page
					Application (MPA), and asks for the information required to scaffold the project.
				</P>
				<Pre lang="bash">{creationCli}</Pre>
				<P>
					When you run <InlineCode>create</InlineCode>, the CLI walks you through selecting
					SPA or MPA, naming the project, and optionally installing dependencies for you.
				</P>
			</section>

			<section>
				<H2 id="installation">Installation</H2>
				<P>
					If the CLI did not run <InlineCode>npm install</InlineCode> automatically, enter
					the newly created folder and install the dependencies:
				</P>
				<Pre lang="bash">{'cd <my-app>\nnpm install'}</Pre>
			</section>

			<section>
				<H2 id="execution">Execution</H2>

				<H3 id="run-the-project">Run the project</H3>
				<P>Development mode — hot reload, mocks enabled:</P>
				<Pre lang="bash">{'npm start'}</Pre>
				<P>Production build — optimized bundle:</P>
				<Pre lang="bash">{'npm run build'}</Pre>

				<H3 id="run-storybook">Run Storybook</H3>
				<P>Every UI module comes with a story out of the box.</P>
				<Pre lang="bash">{'npm run storybook'}</Pre>

				<Callout type="tip" title="You're ready">
					Congratulations — your first Harmony web app is running. Next, explore how to
					develop your webapp easily with all the built-in features.
				</Callout>

				<UL>
					<li>The CLI also supports <InlineCode>harmony2 add [type] [name]</InlineCode> to
						scaffold new modules inside an existing project.</li>
					<li>Default scripts include <InlineCode>start</InlineCode>,{' '}
						<InlineCode>build</InlineCode>, <InlineCode>lint</InlineCode>,{' '}
						<InlineCode>storybook</InlineCode> and <InlineCode>test</InlineCode>.</li>
				</UL>
			</section>
		</DocsPage>
	);
}
