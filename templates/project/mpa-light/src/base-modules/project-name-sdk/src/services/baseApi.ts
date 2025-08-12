import { FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { RootState, config } from '@sdk';

const { log } = console;
type BaseQueryOptions = {
  baseUrl?: string;
  headers?: Record<string, string>;
}

type ExtraOptionsType = {
  ignoreSpinner?: boolean
}
type BaseQueryImplType = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>;

const waitForMocks = async () => {
	return new Promise((resolve) => {
		console.log('Waiting for mocks to be enabled...', config.useMocks, window.harmony?.mocksEnabled);
		if (!config.useMocks || window.harmony?.mocksEnabled) {
			resolve(true);
		}
		setInterval(() => {
			if (window.harmony?.mocksEnabled) {
				resolve(true);
			}
		}, 500);
	});
};

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

export const baseQueryImpl = (baseQueryParams?: BaseQueryOptions): BaseQueryImplType  => async (args, api, extraOptions: ExtraOptionsType) => {
	await waitForMocks();
	log('baseQueryImpl', args, api, extraOptions);
	return baseQuery(baseQueryParams)(args, api, extraOptions);
};