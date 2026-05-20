import { Link } from 'react-router';
import { Routes } from '@sdk';
import {
	DocsPage, H2, H3, P, UL, Pre, Callout, InlineCode, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'concept', label: 'Concept' },
	{ id: 'setup', label: 'Setup' },
	{ id: 'api-error-handling', label: 'API error handling' },
	{ id: 'error-mappings', label: 'ErrorMappings.ts', depth: 3 },
	{ id: 'user-feedback', label: 'User feedback (snackbars & modals)' },
	{ id: 'opt-out', label: 'Per-endpoint opt-out' },
	{ id: 'customization', label: 'Customization' },
];

const mountSnippet = `// src/bootstrap/docs-layout.tsx
import { FeedbackHandler } from '@feedback-handler';

export default function DocsLayout() {
	return (
		<ThemeCustomizerProvider>
			{/* ... layout chrome ... */}
			<FeedbackHandler />
		</ThemeCustomizerProvider>
	);
}`;

const errorMappingSnippet = `// src/base-modules/sdk/modules/feedback-handler/ErrorMappings.ts
export const errorMappings: ErrorMapping[] = [
	{
		error: {
			status: 400,
			message: 'Order ID is already cancelled.',
		},
		displayedError: {
			title: 'Order Canceled',
			description: 'This order has been canceled and is no longer available for tracking.',
			showMoveHomeButton: true,
		},
	},
];

// Generic HTTP-status fallbacks. Touch only when required.
export const commonErrors: ErrorMapping[] = [
	{
		error: { status: 500 },
		displayedError: {
			title: 'Something went wrong.',
			description: 'Please refresh the page or try again later.',
			showMoveHomeButton: true,
		},
	},
];`;

const pushFeedbackSnippet = `import { useFeedbackHandler } from '@sdk';

export function PaymentButton() {
	const { pushFeedback } = useFeedbackHandler();

	const onClick = async () => {
		const ok = await pay();
		pushFeedback({
			code: ok ? 'payment_success' : 'payment_failed',
			values: { amount: '49.99' },
		});
	};

	return <button onClick={onClick}>Pay</button>;
}`;

const feedbacksConfigSnippet = `// Returned by GET {apiBaseUrl}/feedback-config
{
  "payment_success": {
    "title": "Payment received",
    "message": "We charged you {amount}. Thanks!",
    "type": "success",
    "position": "top-center",
    "feedbackType": "snackbar",
    "timeout": 6000
  },
  "payment_failed": {
    "title": "Payment failed",
    "message": "We could not charge {amount}. Try again.",
    "type": "error",
    "position": "top-center",
    "feedbackType": "modal"
  }
}`;

const ignoreErrorsSnippet = `getSilentThing: build.query<Thing, string>({
	extraOptions: { ignoreErrors: true, ignoreSpinner: true },
	query: (id) => ({ url: '/thing', params: { id } }),
}),
// Both options can also be a function of the request args
healthCheck: build.query<void, void>({
	extraOptions: {
		ignoreErrors: (args) => typeof args === 'object' && args.url.endsWith('/health'),
	},
	query: () => '/health',
}),`;

const ConceptSection = () => (
	<section>
		<H2 id="concept">Concept</H2>
		<P>
			The <InlineCode>@feedback-handler</InlineCode> module is the single place
			Harmony 2.0 uses to react to anything that happens while talking to a server.
			It owns three responsibilities:
		</P>
		<UL>
			<li>
				<strong>Global spinner</strong> — automatic loading state for every in-flight
				RTK Query request.
			</li>
			<li>
				<strong>API error handling</strong> — every non-2xx response is matched against{' '}
				<InlineCode>ErrorMappings.ts</InlineCode> and surfaced through Redux.
			</li>
			<li>
				<strong>User feedback</strong> — programmatic snackbars and modals triggered
				with <InlineCode>pushFeedback</InlineCode>.
			</li>
		</UL>
		<P>
			The module is split into two layers. The <strong>SDK layer</strong>{' '}
			(<InlineCode>src/base-modules/sdk/modules/feedback-handler</InlineCode>) owns the
			Redux slice, the RTK Query API and the error-to-display mappings. The{' '}
			<strong>UI layer</strong>{' '}
			(<InlineCode>src/base-modules/feedback-handler</InlineCode>) owns the{' '}
			<InlineCode>&lt;FeedbackHandler /&gt;</InlineCode> component that renders the
			spinner, snackbars and modals.
		</P>
	</section>
);

const SetupSection = () => (
	<section>
		<H2 id="setup">Setup</H2>
		<P>
			Mount <InlineCode>&lt;FeedbackHandler /&gt;</InlineCode> once in each layout that
			needs to display feedback. It expects the SDK store to already be provided by an
			upstream <InlineCode>&lt;SdkProvider /&gt;</InlineCode>:
		</P>
		<Pre lang="tsx" label="docs-layout.tsx">{mountSnippet}</Pre>
		<P>
			In a generated project this is already wired in{' '}
			<InlineCode>src/bootstrap/docs-layout.tsx</InlineCode> and{' '}
			<InlineCode>src/bootstrap/landing-layout.tsx</InlineCode> — you only need to mount
			it manually when adding a new top-level layout.
		</P>
	</section>
);

const ApiErrorHandlingSection = () => (
	<section>
		<H2 id="api-error-handling">API error handling</H2>
		<P>
			Every RTK Query request goes through the shared{' '}
			<InlineCode>baseQueryImpl</InlineCode>{' '}
			(see <Link to={Routes.DOCS_CLIENT_REQUESTS}>Requests</Link>). When the server returns
			a non-2xx response, the base query dispatches{' '}
			<InlineCode>feedbackHandlerSlice.actions.handleError</InlineCode> with the raw error
			payload.
		</P>
		<P>
			The <InlineCode>handleError</InlineCode> reducer skips <InlineCode>401</InlineCode>{' '}
			and <InlineCode>403</InlineCode> (those will route to login once auth is wired) and
			otherwise picks a matching entry from <InlineCode>ErrorMappings.ts</InlineCode>, in
			this priority order:
		</P>
		<UL>
			<li>App-specific <InlineCode>errorMappings</InlineCode> matched by characteristics.</li>
			<li>App-specific <InlineCode>errorMappings</InlineCode> matched by status / code / message.</li>
			<li>Generic <InlineCode>commonErrors</InlineCode> matched by characteristics.</li>
			<li>Generic <InlineCode>commonErrors</InlineCode> matched by status / code / message.</li>
			<li>Fallback to the <InlineCode>commonErrors</InlineCode> entry for status <InlineCode>500</InlineCode>.</li>
		</UL>
		<P>
			The matched <InlineCode>displayedError</InlineCode> is stored on{' '}
			<InlineCode>state.feedbackHandler.errorInfo</InlineCode> so a component can read it
			via <InlineCode>useAppSelector</InlineCode> and render an error page or modal.
		</P>

		<H3 id="error-mappings">ErrorMappings.ts</H3>
		<P>
			Two arrays live side by side in{' '}
			<InlineCode>src/base-modules/sdk/modules/feedback-handler/ErrorMappings.ts</InlineCode>:
		</P>
		<UL>
			<li>
				<InlineCode>errorMappings</InlineCode> — application-specific rules. This is
				where you add new entries.
			</li>
			<li>
				<InlineCode>commonErrors</InlineCode> — generic HTTP-status fallbacks
				(<InlineCode>400</InlineCode>, <InlineCode>404</InlineCode>,{' '}
				<InlineCode>405</InlineCode>, <InlineCode>408</InlineCode>,{' '}
				<InlineCode>500</InlineCode>, <InlineCode>503</InlineCode>). Treat as defaults;
				change only when required.
			</li>
		</UL>
		<Pre lang="ts" label="ErrorMappings.ts">{errorMappingSnippet}</Pre>
		<P>
			Set <InlineCode>isPartialMatch: true</InlineCode> on a mapping to switch{' '}
			<InlineCode>message</InlineCode> and <InlineCode>characteristics</InlineCode>{' '}
			matching from strict equality to <InlineCode>String.prototype.includes</InlineCode>.
			Use it sparingly — partial matches can silently swallow unrelated errors.
		</P>
	</section>
);

const UserFeedbackSection = () => (
	<section>
		<H2 id="user-feedback">User feedback (snackbars & modals)</H2>
		<P>
			Snackbars and modals are driven by a separate queue, not by{' '}
			<InlineCode>errorInfo</InlineCode>. Push a feedback entry by code; the handler
			looks up its display config and renders the right component.
		</P>
		<Pre lang="tsx" label="PaymentButton.tsx">{pushFeedbackSnippet}</Pre>
		<P>
			The display config for each <InlineCode>code</InlineCode> lives in{' '}
			<InlineCode>state.feedbackHandler.feedbacksConfig</InlineCode>. The mock server
			returns it from <InlineCode>GET {'{apiBaseUrl}'}/feedback-config</InlineCode>:
		</P>
		<Pre lang="json" label="feedback-config response">{feedbacksConfigSnippet}</Pre>
		<UL>
			<li>
				<InlineCode>feedbackType</InlineCode> — <InlineCode>snackbar</InlineCode> or{' '}
				<InlineCode>modal</InlineCode>.
			</li>
			<li>
				<InlineCode>type</InlineCode> — <InlineCode>success</InlineCode>,{' '}
				<InlineCode>error</InlineCode>, <InlineCode>warning</InlineCode> or{' '}
				<InlineCode>info</InlineCode>.
			</li>
			<li>
				<InlineCode>values</InlineCode> on <InlineCode>pushFeedback</InlineCode> are
				interpolated into <InlineCode>{'{placeholder}'}</InlineCode> tokens in{' '}
				<InlineCode>title</InlineCode> and <InlineCode>message</InlineCode>.
			</li>
		</UL>
	</section>
);

const OptOutSection = () => (
	<section>
		<H2 id="opt-out">Per-endpoint opt-out</H2>
		<P>
			When an endpoint should run silently — health checks, background polling,
			anonymous-token bootstrap — opt out of the spinner, the error pipeline, or both
			via <InlineCode>extraOptions</InlineCode> on the endpoint definition:
		</P>
		<Pre lang="ts">{ignoreErrorsSnippet}</Pre>
		<P>
			See <Link to={Routes.DOCS_CLIENT_REQUESTS}>Requests → Extra options</Link> for the
			full type signature.
		</P>
	</section>
);

const CustomizationSection = () => (
	<section>
		<H2 id="customization">Customization</H2>
		<UL>
			<li>
				<strong>Add new API error mappings</strong>:{' '}
				<InlineCode>src/base-modules/sdk/modules/feedback-handler/ErrorMappings.ts</InlineCode>.
			</li>
			<li>
				<strong>Change the spinner, snackbars or modals UI</strong>:{' '}
				<InlineCode>src/base-modules/feedback-handler/components/</InlineCode>.
			</li>
			<li>
				<strong>Bridge Redux to UI</strong>:{' '}
				<InlineCode>src/base-modules/feedback-handler/FeedbackHandler.provider.tsx</InlineCode>{' '}
				exposes everything the components read through{' '}
				<InlineCode>useFeedbackHandlerContext()</InlineCode>.
			</li>
			<li>
				<strong>Trigger feedback from anywhere</strong>: call{' '}
				<InlineCode>useFeedbackHandler()</InlineCode> from a component or dispatch the
				slice actions directly from a thunk.
			</li>
		</UL>
		<Callout type="note">
			<InlineCode>handleError</InlineCode> writes the matched{' '}
			<InlineCode>displayedError</InlineCode> into{' '}
			<InlineCode>state.feedbackHandler.errorInfo</InlineCode>, but no component reads it
			yet. The error page or modal that consumes <InlineCode>errorInfo</InlineCode> is
			left to each application to build.
		</Callout>
	</section>
);

export default function ClientFeedbackHandlerPage() {
	return (
		<DocsPage
			title="Feedback Handler"
			description="Catch API errors, drive the global spinner, and surface user feedback from one module."
			toc={toc}
		>
			<ConceptSection />
			<SetupSection />
			<ApiErrorHandlingSection />
			<UserFeedbackSection />
			<OptOutSection />
			<CustomizationSection />
		</DocsPage>
	);
}
