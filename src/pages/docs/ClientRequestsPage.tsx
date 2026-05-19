import { Link } from 'react-router';
import { Routes } from '@sdk';
import { DocsPage, H2, H3, P, Lead, UL, Pre, Callout, DocsTable, InlineCode, ExtLink, TocEntry } from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'anatomy-of-an-api-module', label: 'Anatomy of an API module' },
	{ id: 'module-config', label: 'Module config', depth: 3 },
	{ id: 'api-slice', label: 'API slice', depth: 3 },
	{ id: 'module-hook', label: 'Module hook', depth: 3 },
	{ id: 'base-query', label: 'The shared base query' },
	{ id: 'base-url-resolution', label: 'Base URL resolution', depth: 3 },
	{ id: 'auth-token', label: 'Auth token bootstrap', depth: 3 },
	{ id: 'error-handling', label: 'Error handling', depth: 3 },
	{ id: 'spinner', label: 'Global spinner', depth: 3 },
	{ id: 'extra-options', label: 'Extra options' },
	{ id: 'persistence', label: 'Persisting endpoint data' },
	{ id: 'environment-config', label: 'Environment configuration' },
];

const appApiSnippet = `// src/base-modules/sdk/modules/app/AppApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryImpl } from '../../services';
import config from './AppConfig';

export const appApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl(),
	tagTypes: ['App'],
	endpoints: () => ({}),
});

// Toggle this wrapper if you want redux-persist for the whole API cache.
export const appApiReducer = appApi.reducer;`;

const authApiSnippet = `// src/base-modules/sdk/modules/auth/AuthApi.ts
import { createApi, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { baseQueryImpl } from '../../services';
import { LoginPayload, User, AUTH_TAG_TYPES } from './AuthTypes';
import config from './AuthConfig';
import { persistApiReducer } from '../../utils';

export const authApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl({ baseUrl: 'auth/v1' }),
	tagTypes: Object.keys(AUTH_TAG_TYPES),
	endpoints: (build) => ({
		login: build.mutation<User & { token: string }, LoginPayload>({
			query: (body) => ({ url: 'login', method: 'POST', body }),
			transformResponse: (baseQueryReturnValue: User, meta: FetchBaseQueryMeta) => ({
				...baseQueryReturnValue,
				token: meta?.response?.headers.get('x-amdocs-token') ?? '',
			}),
		}),
		generateAnonymousToken: build.mutation<{ token: string }, void>({
			extraOptions: { ignoreSpinner: true },
			query: () => ({ url: 'generateAnonymousToken', method: 'POST' }),
			transformResponse: (_: unknown, meta: FetchBaseQueryMeta) => ({
				token: meta?.response?.headers.get('x-amdocs-token') ?? '',
			}),
		}),
		logout: build.query<void, void>({ query: () => 'logout' }),
	}),
});

export const authApiReducer = persistApiReducer(config.apiSliceName, authApi.reducer);`;

const configSnippet = `// src/base-modules/sdk/modules/auth/AuthConfig.ts
import { ModuleConfigType } from '@sdk';
import { Slice } from '@reduxjs/toolkit';
import { AuthStateType } from './AuthTypes';

export const config: ModuleConfigType<Slice<AuthStateType>> = {
	sliceName: 'auth',
	apiSliceName: 'authApi',
	apiPersist: true,
	withApi: true,
	withReducer: false,
};

export default config;`;

const useAuthSnippet = `// src/base-modules/sdk/modules/auth/useAuth.ts
import { authApi } from './AuthApi';
import { useRba } from '../rba';
import { LoginPayload } from './AuthTypes';
import { handleClearStore } from '../../utils';

export const useAuth = () => {
	const [login, { data: userInfo, reset, ...restLoginData }] =
		authApi.useLoginMutation({ fixedCacheKey: 'login' });
	const { policies } = useRba();
	const [logout] = authApi.useLazyLogoutQuery();

	const onLogout = async () => {
		await logout();
		reset();
		await handleClearStore();
	};

	const onLogin = async (payload: LoginPayload) => {
		const result = await login(payload);
		await policies();
		return result;
	};

	return { login: onLogin, userInfo, resetUserInfo: reset, logout: onLogout, restLoginData };
};`;

const storeSnippet = `// src/base-modules/sdk/store.ts
const reducers = { ...rbaReducers, ...appReducers, ...authReducers, ...feedbackHandlerReducers, ...themeReducers };

const middlewares: Middleware[] = [];
if (rbaConfig.withApi) middlewares.push(rbaApi.middleware);
if (appConfig.withApi) middlewares.push(appApi.middleware);
if (authConfig.withApi) middlewares.push(authApi.middleware);
if (feedbackHandlerConfig.withApi) middlewares.push(feedbackHandlerApi.middleware);`;

const extraOptionsType = `type ExtraOptionsType = {
	ignoreSpinner?: boolean | ((params: string | FetchArgs) => boolean);
	ignoreErrors?: boolean | ((params: string | FetchArgs) => boolean);
};`;

const extraOptionsUsage = `generateAnonymousToken: build.mutation<{ token: string }, void>({
	extraOptions: { ignoreSpinner: true },
	query: () => ({ url: 'generateAnonymousToken', method: 'POST' }),
}),
// ignoreErrors can also be a function of the request args
getSilentThing: build.query<Thing, string>({
	extraOptions: { ignoreErrors: (args) => typeof args === 'object' && args.url.endsWith('/health') },
	query: (id) => ({ url: '/thing', params: { id } }),
}),`;

const envSnippet = `# .env.development
VITE_USE_MOCKS=true
VITE_API_BASE_URL=https://app.harmony.com/ttm`;

const persistTransformSnippet = `// Only persist specific endpoints from an API slice
import { createPersistedEndpointsTransform } from '../../utils';
import type { ApiPersistConfig } from '@sdk';

const persistConfig: ApiPersistConfig<typeof rbaApi> = {
	key: rbaApi.reducerPath,
	storage,
	version: 1,
	transforms: [createPersistedEndpointsTransform<typeof rbaApi>(['policies'])],
};`;

const componentUsage = `import { useAuth } from '@sdk';

const LoginForm = () => {
	const { login, restLoginData } = useAuth();
	const onSubmit = async (values: LoginPayload) => await login(values);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<button disabled={restLoginData.isLoading}>Sign in</button>
		</form>
	);
};`;

const OverviewSection = () => (
	<section>
		<H2 id="overview">Overview</H2>
		<P>
			Harmony 2.0 does not ship a hand-rolled HTTP client. Every network call goes through{' '}
			<ExtLink href="https://redux-toolkit.js.org/rtk-query/overview">
				RTK Query
			</ExtLink>{' '}
			with a single shared <InlineCode>baseQueryImpl</InlineCode> that takes care of the base
			URL, authentication, the global spinner, and error reporting.
		</P>
		<Lead>
			You almost never need to talk to <code>fetch</code> or <code>axios</code> directly —
			you describe the endpoints on an API slice and consume the auto-generated hooks.
		</Lead>
		<P>Every API module lives in <InlineCode>src/base-modules/sdk/modules/&lt;name&gt;/</InlineCode> and follows the Harmony 6-file convention:</P>
		<UL>
			<li><InlineCode>&lt;Name&gt;Config.ts</InlineCode> — slice/API names, persistence flags.</li>
			<li><InlineCode>&lt;Name&gt;Types.ts</InlineCode> — state, payloads, tag enums.</li>
			<li><InlineCode>&lt;Name&gt;Api.ts</InlineCode> — the <InlineCode>createApi</InlineCode> slice with endpoints.</li>
			<li><InlineCode>&lt;Name&gt;Reducer.ts</InlineCode> — the optional plain slice (only when <InlineCode>withReducer</InlineCode> is true).</li>
			<li><InlineCode>use&lt;Name&gt;.ts</InlineCode> — domain hook that composes the generated RTK Query hooks with business rules.</li>
			<li><InlineCode>index.ts</InlineCode> — barrel export.</li>
		</UL>
	</section>
);

const AnatomySection = () => (
	<section>
		<H2 id="anatomy-of-an-api-module">Anatomy of an API module</H2>
		<P>Let&apos;s walk through the generated <InlineCode>auth</InlineCode> module as a reference.</P>

		<H3 id="module-config">Module config</H3>
		<P>
			<InlineCode>ModuleConfigType</InlineCode> controls how the module is wired into the
			store:
		</P>
		<Pre lang="ts" label="AuthConfig.ts">{configSnippet}</Pre>
		<UL>
			<li><InlineCode>apiSliceName</InlineCode> is used both as <InlineCode>reducerPath</InlineCode> and as the persist key.</li>
			<li><InlineCode>withApi</InlineCode>: when <InlineCode>true</InlineCode>, the store adds the RTK Query middleware to the chain.</li>
			<li><InlineCode>withReducer</InlineCode>: enables a plain slice alongside the API slice (used for local UI state like theme).</li>
			<li><InlineCode>apiPersist</InlineCode>: when <InlineCode>true</InlineCode>, the API cache is wrapped with <InlineCode>persistApiReducer</InlineCode>.</li>
			<li><InlineCode>slicePersist.whitelist</InlineCode>: keys to persist on the plain slice.</li>
		</UL>

		<H3 id="api-slice">API slice</H3>
		<P>
			The simplest API module has no endpoints yet and just exposes a default base query:
		</P>
		<Pre lang="ts" label="AppApi.ts">{appApiSnippet}</Pre>
		<P>
			A real module adds endpoints with <InlineCode>build.query</InlineCode> and{' '}
			<InlineCode>build.mutation</InlineCode>, and opts in to{' '}
			<InlineCode>persistApiReducer</InlineCode> when the cache should survive reloads:
		</P>
		<Pre lang="ts" label="AuthApi.ts">{authApiSnippet}</Pre>
		<Callout type="tip">
			Notice how <InlineCode>baseQueryImpl</InlineCode> accepts an optional{' '}
			<InlineCode>{'{ baseUrl: \'auth/v1\' }'}</InlineCode>. The final URL is{' '}
			<InlineCode>config.apiBaseUrl + baseUrl + endpoint.url</InlineCode> with duplicate slashes
			normalized.
		</Callout>

		<H3 id="module-hook">Module hook</H3>
		<P>
			Instead of importing generated hooks directly, each module exposes a{' '}
			<InlineCode>use&lt;Name&gt;</InlineCode> hook that bundles business rules —{' '}
			<InlineCode>fixedCacheKey</InlineCode>s, side-effects, store resets, etc.:
		</P>
		<Pre lang="ts" label="useAuth.ts">{useAuthSnippet}</Pre>
		<P>Consuming the module from a component looks like this:</P>
		<Pre lang="tsx" label="LoginForm.tsx">{componentUsage}</Pre>
	</section>
);

const BaseQuerySection = () => (
	<section>
		<H2 id="base-query">The shared base query</H2>
		<P>
			<InlineCode>baseQueryImpl</InlineCode> (in{' '}
			<InlineCode>src/base-modules/sdk/services/baseApi.ts</InlineCode>) is a thin wrapper
			around RTK Query&apos;s <InlineCode>fetchBaseQuery</InlineCode>. It does four things
			for you on every request.
		</P>

		<H3 id="base-url-resolution">Base URL resolution</H3>
		<P>
			The effective URL is built from three parts, with slashes normalized automatically:
		</P>
		<UL>
			<li>
				<InlineCode>config.apiBaseUrl</InlineCode> — comes from{' '}
				<InlineCode>VITE_API_BASE_URL</InlineCode> in dev or{' '}
				<InlineCode>window.harmony.baseUrl</InlineCode> at runtime.
			</li>
			<li>
				<InlineCode>baseUrl</InlineCode> — optional per-module prefix passed to{' '}
				<InlineCode>baseQueryImpl({'{ baseUrl }'})</InlineCode>.
			</li>
			<li>
				<InlineCode>endpoint.url</InlineCode> — the path on the endpoint definition.
			</li>
		</UL>

		<H3 id="auth-token">Auth token bootstrap</H3>
		<P>
			Every request automatically attaches the <InlineCode>x-amdocs-token</InlineCode>{' '}
			header from <InlineCode>state.auth.token</InlineCode>. If no token exists yet, the base
			query <em>blocks</em> the request until{' '}
			<InlineCode>authApi.generateAnonymousToken</InlineCode> resolves — using a single-flight
			promise so concurrent requests share the same bootstrap call.
		</P>
		<P>
			On a <InlineCode>401</InlineCode>, the same bootstrap is re-run and the request is
			retried exactly once.
		</P>
		<Callout type="note">
			Endpoints on the <InlineCode>skipAuthBootstrapPaths</InlineCode> list (currently{' '}
			<InlineCode>/auth/v1/generateAnonymousToken</InlineCode>) skip this gate to avoid
			infinite recursion.
		</Callout>

		<H3 id="error-handling">Error handling</H3>
		<P>
			When a request returns a non-2xx status, the base query dispatches{' '}
			<InlineCode>feedbackHandlerSlice.actions.handleError</InlineCode> with the error
			payload. It is mapped to a toaster, modal or page based on{' '}
			<InlineCode>ErrorMappings.ts</InlineCode>; opt out per endpoint with{' '}
			<InlineCode>extraOptions.ignoreErrors</InlineCode>. See the{' '}
			<Link to={Routes.DOCS_CLIENT_FEEDBACK_HANDLER}>Feedback Handler</Link> page for the full flow.
		</P>

		<H3 id="spinner">Global spinner</H3>
		<P>
			Before each request the base query dispatches{' '}
			<InlineCode>startSpinner(url)</InlineCode>; after it completes (success or failure) it
			dispatches <InlineCode>stopSpinner(url)</InlineCode>. The pending-task count drives the
			global spinner UI. Opt out per endpoint with{' '}
			<InlineCode>extraOptions.ignoreSpinner</InlineCode>.
		</P>
	</section>
);

const ExtraOptionsSection = () => (
	<section>
		<H2 id="extra-options">Extra options</H2>
		<P>
			Every endpoint can customize the base-query behavior via{' '}
			<InlineCode>extraOptions</InlineCode>:
		</P>
		<Pre lang="ts">{extraOptionsType}</Pre>
		<DocsTable
			columns={[
				{ key: 'option', header: 'Option', className: 'font-mono whitespace-nowrap text-xs' },
				{ key: 'type', header: 'Type', className: 'font-mono whitespace-nowrap text-xs' },
				{ key: 'description', header: 'Description' },
			]}
			rows={[
				{ option: 'ignoreSpinner', type: 'boolean | (args) => boolean', description: 'Skip start/stopSpinner dispatches for this endpoint.' },
				{ option: 'ignoreErrors', type: 'boolean | (args) => boolean', description: 'Skip dispatching feedback-handler errors for this endpoint.' },
			]}
		/>
		<P>
			Both options can be a function of the fetch args — useful when one endpoint has a mix
			of critical and silent calls.
		</P>
		<Pre lang="ts">{extraOptionsUsage}</Pre>
	</section>
);

const PersistenceSection = () => (
	<section>
		<H2 id="persistence">Persisting endpoint data</H2>
		<P>
			RTK Query caches live inside the Redux store, so you can persist them via{' '}
			<InlineCode>redux-persist</InlineCode>. Harmony ships two helpers:
		</P>
		<UL>
			<li>
				<InlineCode>persistApiReducer(key, reducer)</InlineCode> — persists{' '}
				<InlineCode>queries</InlineCode> and <InlineCode>mutations</InlineCode> to session
				storage. Turn it on by exporting{' '}
				<InlineCode>persistApiReducer(config.apiSliceName, myApi.reducer)</InlineCode>.
			</li>
			<li>
				<InlineCode>createPersistedEndpointsTransform&lt;Api&gt;(endpointNames)</InlineCode>{' '}
				— selectively persist only the endpoints you list. Wire it with an{' '}
				<InlineCode>ApiPersistConfig</InlineCode>.
			</li>
		</UL>
		<Pre lang="ts">{persistTransformSnippet}</Pre>

		<P>All API middlewares are opt-in via the module config:</P>
		<Pre lang="ts" label="store.ts">{storeSnippet}</Pre>
	</section>
);

const EnvSection = () => (
	<section>
		<H2 id="environment-config">Environment configuration</H2>
		<P>The base query reads two values from <InlineCode>sdk/config.ts</InlineCode>:</P>
		<UL>
			<li>
				<InlineCode>apiBaseUrl</InlineCode> — <InlineCode>VITE_API_BASE_URL</InlineCode>{' '}
				(dev) or <InlineCode>window.harmony.baseUrl</InlineCode> (runtime injection). Falls
				back to the bundled default.
			</li>
			<li>
				<InlineCode>useMocks</InlineCode> — <InlineCode>VITE_USE_MOCKS</InlineCode> (dev) or{' '}
				<InlineCode>window.harmony.useMocks</InlineCode>. MSW intercepts every RTK Query
				request when this is <InlineCode>true</InlineCode>, so you can develop offline.
			</li>
		</UL>
		<Pre lang="bash" label=".env.development">{envSnippet}</Pre>
		<Callout type="tip">
			Because every request flows through <InlineCode>baseQueryImpl</InlineCode>, flipping{' '}
			<InlineCode>VITE_USE_MOCKS=true</InlineCode> is enough to switch the entire app to
			mocked data — no per-endpoint changes required.
		</Callout>
	</section>
);

export default function ClientRequestsPage() {
	return (
		<DocsPage
			title="Requests"
			description="How Harmony 2.0 handles HTTP with RTK Query, a shared base query, and the 6-file module convention."
			toc={toc}
		>
			<OverviewSection />
			<AnatomySection />
			<BaseQuerySection />
			<ExtraOptionsSection />
			<PersistenceSection />
			<EnvSection />
		</DocsPage>
	);
}
