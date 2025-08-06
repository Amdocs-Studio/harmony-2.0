import { createApi, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { baseQueryImpl } from '../../services';
import { LoginPayload, User, AUTH_TAG_TYPES } from './AuthTypes';
import config from './AuthConfig';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const authApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl({
		baseUrl: 'v1/auth'
	}),
	tagTypes: Object.keys(AUTH_TAG_TYPES),
	endpoints: (build) => ({
		login: build.mutation<User & { token: string }, LoginPayload>({
			extraOptions: {
				ignoreSpinner: true,
			},
			query(body) {
				return {
					url: 'login',
					method: 'POST',
					body,
				};
			},
			transformResponse(baseQueryReturnValue: User, meta: FetchBaseQueryMeta) {
				const token = meta?.response?.headers.get('X-token') || '';
				return {
					...baseQueryReturnValue,
					token,
				};
			},
		}),
		logout: build.query<void, void>({
			query: () => 'logout',
		}),
	}),
});

export const authApiReducer = persistReducer({
	key: config.apiSliceName,
	storage,
	version: 1,
	whitelist: ['queries', 'mutations']
}, authApi.reducer);
/*

Uncomment this block if you don't need to persist the API reducer

export const authApiReducer = authApi.reducer;

 */