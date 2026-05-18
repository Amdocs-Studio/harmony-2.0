import { FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { authApi, config, ErrorResponse, RootState } from '@sdk';
import { feedbackHandlerSlice } from '../modules/feedback-handler/FeedbackHandlerReducer';

type BaseQueryOptions = {
  baseUrl?: string;
  headers?: Record<string, string>;
}

type ExtraOptionsType = {
  ignoreSpinner?: boolean | ((params: string | FetchArgs) => boolean),
  ignoreErrors?: boolean | ((params: string | FetchArgs) => boolean)
}
type BaseQueryImplType = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ExtraOptionsType
>;

// Skip list: endpoint paths that should bypass the auth bootstrap gate
const skipAuthBootstrapPaths: string[] = ['/auth/v1/generateAnonymousToken'];

// Helper to build full path by concatenating parts and normalizing slashes
const buildFullPath = (...parts: string[]): string => {
	return parts
		.filter(Boolean)
		.map((part, index) => {
			// Remove leading/trailing slashes from all parts
			let normalized = part.replace(/^\/+|\/+$/g, '');
			// Add leading slash to first part if it doesn't start with http
			if (index === 0 && !normalized.startsWith('http')) {
				normalized = `/${normalized}`;
			}
			return normalized;
		})
		.join('/');
};

// Single-flight gate for anonymous token bootstrap (promise shared across requests)
let inflightAnonymousTokenPromise: Promise<unknown> | null = null;

const baseQuery = (options?: BaseQueryOptions) => {
	const { baseUrl = '', headers: headersImpl = {} } = options || { baseUrl: '', headers: {} };
	return fetchBaseQuery({
		baseUrl: `${config.apiBaseUrl.replace(/\/$/, '')}/${baseUrl.replace(/^\//, '')}`,
		prepareHeaders: (headers, { getState }) => {
			headers.set('Accept', 'application/json');
			headers.set('Content-Type', 'application/json');
			Object.entries(headersImpl).forEach(([key, value]) =>
				headers.set(key, value)
			);
			// This is where you can add your token to the headers
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set('x-amdocs-token', token);
			}
			return headers;
		},
	});
};

export const baseQueryImpl = (baseQueryParams?: BaseQueryOptions): BaseQueryImplType => async (args, api, extraOptions: ExtraOptionsType) => {

	const evalExtraOption = (key: keyof ExtraOptionsType) => {
		if (!extraOptions) {
			return false;
		}
		if (typeof extraOptions[key] === 'function') {
			return extraOptions[key](args);
		}
		return extraOptions[key];
	};

	const isIgnoreSpinner = evalExtraOption('ignoreSpinner');
	const rawUrl = typeof args === 'string' ? args : (args as FetchArgs)?.url || '';
	try {
		if (!isIgnoreSpinner) {
			api.dispatch(feedbackHandlerSlice.actions.startSpinner(rawUrl));
		}
		// Build full path by concatenating parts (handles slashes properly)

		const fullPath = buildFullPath(
			config.apiBaseUrl,
			baseQueryParams?.baseUrl || '',
			rawUrl
		); // e.g. /ttm/auth/v1/generateAnonymousToken
		const shouldSkip = skipAuthBootstrapPaths.some((p) => fullPath.endsWith(p));

		// Ensure we have a token before any request (unless on the skip list)
		if (!shouldSkip) {
			const stateToken = (api.getState() as RootState).auth.token;
			if (!stateToken) {
				if (!inflightAnonymousTokenPromise) {
					inflightAnonymousTokenPromise = (api.dispatch as any)(
						authApi.endpoints.generateAnonymousToken.initiate(undefined, { fixedCacheKey: 'anon' })
					).unwrap().finally(() => {
						inflightAnonymousTokenPromise = null;
					});
				}
				await inflightAnonymousTokenPromise;
			}
		}

		let argsToUse = args;
		if (typeof args === 'object' && args !== null && 'body' in args) {
			const fetchArgs = args as FetchArgs;
			if (fetchArgs.body && typeof fetchArgs.body === 'object' && 'ignoreSpinner' in fetchArgs.body) {
				const { ignoreSpinner: _, ...restBody } = fetchArgs.body as Record<string, unknown>;
				argsToUse = {
					...fetchArgs,
					body: restBody
				};
			}
		}
		let res = await baseQuery(baseQueryParams)(argsToUse, api, extraOptions);

		// Handle 401 Unauthorized - refresh token and retry
		if (res.error && 'status' in res.error && res.error.status === 401) {
			if (!inflightAnonymousTokenPromise) {
				inflightAnonymousTokenPromise = api.dispatch(
					authApi.endpoints.generateAnonymousToken.initiate(undefined, { fixedCacheKey: 'anon' })
				).unwrap().finally(() => {
					inflightAnonymousTokenPromise = null;
				});
			}
			await inflightAnonymousTokenPromise;

			// Retry the original request with the new token
			res = await baseQuery(baseQueryParams)(argsToUse, api, extraOptions);
		}

		if (res.error && !evalExtraOption('ignoreErrors')) {
			api.dispatch(feedbackHandlerSlice.actions.handleError(res.error as ErrorResponse));
		}
		return res;
	} catch (error) {
		if (!evalExtraOption('ignoreErrors')) {
			api.dispatch(feedbackHandlerSlice.actions.handleError(error as ErrorResponse));
		}
		return { error: error as FetchBaseQueryError };
	} finally {
		if (!isIgnoreSpinner) {
			api.dispatch(feedbackHandlerSlice.actions.stopSpinner(rawUrl));
		}
	}
};