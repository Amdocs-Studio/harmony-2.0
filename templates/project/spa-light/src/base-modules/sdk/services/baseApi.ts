import { FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { RootState, config } from '@sdk';

const { log } = console;
type BaseQueryOptions = {
  baseUrl?: string;
  headers?: Record<string, string>;
}
const baseQuery = (options?: BaseQueryOptions) => {
	const { baseUrl = '', headers: headersImpl = {} } = options || { baseUrl: '', headers: {} };
	return fetchBaseQuery({
		baseUrl: `${config.apiBaseUrl.replace(/\/$/, '')}/${baseUrl.replace(/^\//, '')}`,
		prepareHeaders: (headers, { getState }) => {
			headers.set('Accept', 'application/json');
			Object.entries(headersImpl).forEach(([key, value]) =>
				headers.set(key, value)
			);
			// This is where you can add your token to the headers
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			return headers;
		},

	});
};

type ExtraOptionsType = {
  ignoreSpinner?: boolean
}
type BaseQueryImplType = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>;
export const baseQueryImpl = (baseQueryParams?: BaseQueryOptions): BaseQueryImplType  => async (args, api, extraOptions: ExtraOptionsType) => {
	log('baseQueryImpl', args, api, extraOptions);
	if (!extraOptions?.ignoreSpinner) {
		// start spinner
		// api.dispatch(startSpinner(api.endpoint));
	}
	const result = await baseQuery(baseQueryParams)(args, api, extraOptions);
	if (!extraOptions?.ignoreSpinner) {
		// stop spinner
		// api.dispatch(stopSpinner(api.endpoint));
	}
	return result;
};