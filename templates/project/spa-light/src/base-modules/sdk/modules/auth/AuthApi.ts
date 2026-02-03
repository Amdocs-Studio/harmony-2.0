import { createApi, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { baseQueryImpl } from '../../services';
import { LoginPayload, User, AUTH_TAG_TYPES } from './AuthTypes';
import config from './AuthConfig';
import { persistApiReducer } from '../../utils';

export const authApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl({
		baseUrl: 'auth/v1'
	}),
	tagTypes: Object.keys(AUTH_TAG_TYPES),
	endpoints: (build) => ({
		login: build.mutation<User & { token: string }, LoginPayload>({
			query(body) {
				return {
					url: 'login',
					method: 'POST',
					body,
				};
			},
			transformResponse(baseQueryReturnValue: User, meta: FetchBaseQueryMeta) {
				const token = meta?.response?.headers.get('x-amdocs-token') || '';
				return {
					...baseQueryReturnValue,
					token,
				};
			},
		}),
		generateAnonymousToken: build.mutation<{ token: string }, void>({
			extraOptions: {
				ignoreSpinner: true,
			},
			query() {
				return {
					url: 'generateAnonymousToken',
					method: 'POST',
				};
			},
			transformResponse(_baseQueryReturnValue: unknown, meta: FetchBaseQueryMeta) {
				const token = meta?.response?.headers.get('x-amdocs-token') || '';
				return { token };
			},
		}),
		logout: build.query<void, void>({
			query: () => 'logout',
		}),
	}),
});

export const authApiReducer = persistApiReducer(config.apiSliceName, authApi.reducer);
