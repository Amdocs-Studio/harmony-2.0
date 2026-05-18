import {
	DocsPage, H2, P, Pre, InlineCode, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'concept', label: 'Concept' },
	{ id: 'ignore-list', label: 'Ignore list' },
	{ id: 'customization', label: 'Customization' },
];

const ignoreList = `{
  "ignoreList": [
    "http://.*:5555/devices"
  ]
}`;

const customizationSnippet = `import * as React from 'react';
import 'react-redux-spinner/dist/react-redux-spinner.css';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { Spinner } from 'react-redux-spinner'; // swap with your own Spinner
import Localization from 'containers/Localization';
import ErrorHandler from 'containers/ErrorHandler';

interface IProps {
  children: any;
}

class App extends React.Component<IProps> {
  render() {
    return (
      <>
        <ErrorHandler />
        <Spinner config={{}} />
        <Localization />
        {this.props.children}
      </>
    );
  }
}

export default baseConnect(App, () => ({}), {});`;

export default function ClientGlobalSpinnerPage() {
	return (
		<DocsPage
			title="Global Spinner"
			description="Automatic loading state while requests are in-flight."
			toc={toc}
		>
			<section>
				<H2 id="concept">Concept</H2>
				<P>
					While performing API calls you usually want the page to indicate that a load is
					in progress — that is what the global spinner is for. Harmony does it
					automatically without any effort on your part.
				</P>
				<P>
					Any time there is a pending request on the network, the global spinner is
					displayed. In Redux terms: any time the network task count is greater than 1, the
					<InlineCode>pendingTask</InlineCode> slice reflects that and the spinner is
					rendered.
				</P>
				<P>
					Of course, some API calls shouldn&apos;t block the screen and shouldn&apos;t
					count towards the global spinner. Read on to see how to customize that.
				</P>
			</section>

			<section>
				<H2 id="ignore-list">Ignore list</H2>
				<P>
					<strong>Location:</strong>{' '}
					<InlineCode>src/configurations/spinner.config.json</InlineCode>
				</P>
				<P>
					In that file you can add any regex to be ignored. Any URL matching the list will
					be skipped by the global spinner.
				</P>
				<Pre lang="json" label="spinner.config.json">{ignoreList}</Pre>
			</section>

			<section>
				<H2 id="customization">Customization</H2>
				<P>
					<strong>Location:</strong>{' '}
					<InlineCode>src/routes/App.tsx</InlineCode>
				</P>
				<P>
					This file uses a standard spinner component. You can replace it with any spinner
					you like and decide when to display it based on the value of{' '}
					<InlineCode>pendingTask</InlineCode>.
				</P>
				<Pre lang="tsx" label="App.tsx">{customizationSnippet}</Pre>
			</section>
		</DocsPage>
	);
}
