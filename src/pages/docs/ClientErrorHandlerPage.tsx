import {
	DocsPage, H2, P, UL, Pre, Callout, InlineCode, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'concept', label: 'Concept' },
	{ id: 'usage', label: 'Usage' },
	{ id: 'with-error-handler', label: '@withErrorHandler' },
	{ id: 'customization', label: 'Customization' },
	{ id: 'strict-console', label: 'Strict client console errors' },
];

const errorConfig = `{
  "pathToErrorCode": "data.errorCode",
  "handlers": {
    "devicesListFailed_400": {
      "component": "modal",
      "payload": {
        "header": "Error",
        "body": "Error with Fetch Device List"
      }
    },
    "devicesListFailed_206": {
      "level": "component",
      "component": "notification",
      "payload": {
        "type": "danger",
        "header": "deviceGallery.specificErrorHandlerToComponentHeader",
        "body": "deviceGallery.specificErrorHandlerToComponentBody"
      }
    },
    "devicesListFailed_500": {
      "component": "ignore"
    }
  }
}`;

const withErrorHandlerSample = `import withErrorHandler from 'containers/ErrorHandler/withErrorHandler';

@withErrorHandler({
  errorCodes: ['devicesListFailed_206'],
  asComponent: true, // if false, the component is replaced with ErrorComponent by default
})
class DeviceGallery extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchValue: '',
    };
  }

  // ...
}`;

export default function ClientErrorHandlerPage() {
	return (
		<DocsPage
			title="Error Handler"
			description="Catch and react to API errors from a single configuration file."
			toc={toc}
		>
			<section>
				<H2 id="concept">Concept</H2>
				<P>
					Harmony ships an Error Handler mechanism so you can maintain your API error
					responses easily and consistently from one place.
				</P>
				<P>
					Under the configuration folder you will find the{' '}
					<InlineCode>error.config.json</InlineCode> file.
				</P>
				<P>
					<strong>Location:</strong>{' '}
					<InlineCode>src/configurations/error.config.json</InlineCode>
				</P>
				<P>
					The idea is to catch API errors and decide what to do from configuration alone.
					Each time an API fails, it returns a status code and an error code. The key{' '}
					<InlineCode>&lt;errorCode&gt;_&lt;statusCode&gt;</InlineCode> describes how the
					error should be handled.
				</P>
			</section>

			<section>
				<H2 id="usage">Usage</H2>
				<P>A typical error handler configuration looks like this:</P>
				<Pre lang="json" label="error.config.json">{errorConfig}</Pre>

				<UL>
					<li>
						<InlineCode>pathToErrorCode</InlineCode> — path to the error code inside the
						response body.
					</li>
					<li>
						<InlineCode>handlers</InlineCode> — your handlers keyed by{' '}
						<InlineCode>&lt;errorCode&gt;_&lt;statusCode&gt;</InlineCode>.
					</li>
					<li>
						<InlineCode>level</InlineCode> (optional) — when set to{' '}
						<InlineCode>component</InlineCode>, the error is displayed only for specific
						components that opted-in via <InlineCode>withErrorHandler</InlineCode>.
					</li>
					<li>
						<InlineCode>component</InlineCode> — the component type to render for this
						error.
					</li>
					<li>
						<InlineCode>payload</InlineCode> — any payload data passed to the rendered
						component.
					</li>
					<li>
						<InlineCode>ignore</InlineCode> — an <InlineCode>ignore</InlineCode> component
						causes the error handler to do nothing for this failure.
					</li>
				</UL>
				<P>
					In the example above, <InlineCode>devicesListFailed_400</InlineCode> displays a
					modal, while <InlineCode>devicesListFailed_500</InlineCode> is silently ignored.
				</P>
			</section>

			<section>
				<H2 id="with-error-handler">@withErrorHandler</H2>
				<P>
					Sometimes you want to display an error only on a specific component — not through
					a global modal. For that, use the <InlineCode>@withErrorHandler</InlineCode>{' '}
					decorator.
				</P>
				<P>It accepts the following config:</P>
				<UL>
					<li>
						<InlineCode>errorCodes</InlineCode> — array of error codes from the error
						handler configuration file.
					</li>
					<li>
						<InlineCode>asComponent</InlineCode> (optional) — defaults to{' '}
						<InlineCode>false</InlineCode>. When <InlineCode>true</InlineCode>, the
						decorator does not replace the component by default but injects{' '}
						<InlineCode>ErrorComponent</InlineCode> as a prop so you can render it wherever
						you like.
					</li>
				</UL>
				<P>Injected props:</P>
				<UL>
					<li>
						<InlineCode>ErrorComponent</InlineCode> — a component you can render inside
						your decorated component.
					</li>
					<li>
						<InlineCode>errorHandled</InlineCode> — a function that clears the error and
						stops <InlineCode>ErrorComponent</InlineCode> from being passed in.
					</li>
				</UL>
				<Callout type="warning" title="Configuration">
					In the error handler configuration file you must declare these error codes with{' '}
					<InlineCode>&quot;level&quot;: &quot;component&quot;</InlineCode>.
				</Callout>
				<Pre lang="ts">{withErrorHandlerSample}</Pre>
			</section>

			<section>
				<H2 id="customization">Customization</H2>
				<UL>
					<li>
						<strong>Global error handler</strong>:{' '}
						<InlineCode>src/containers/ErrorHandler/index.tsx</InlineCode>
					</li>
					<li>
						<strong>withErrorHandler decorator</strong>:{' '}
						<InlineCode>src/containers/ErrorHandler/withErrorHandler.tsx</InlineCode>
					</li>
				</UL>
				<P>
					This is where the Error Handler &quot;decider&quot; lives. Every time an error
					occurs, it runs through a switch statement that decides which component to render
					and how. Customize it however you like — add your own modal, swap notifications
					for a drawer, or add completely new handler components.
				</P>
			</section>

			<section>
				<H2 id="strict-console">Strict client console errors</H2>
				<P>
					Harmony keeps a strict policy on clean consoles. By default any console error
					redirects the developer to an error page and a toaster is displayed.
				</P>
				<P>
					To turn this behavior off, go to <InlineCode>src/config.ts</InlineCode> and set{' '}
					<InlineCode>STRICT_CONSOLE_ERROR</InlineCode> to <InlineCode>false</InlineCode>.
				</P>
			</section>
		</DocsPage>
	);
}
