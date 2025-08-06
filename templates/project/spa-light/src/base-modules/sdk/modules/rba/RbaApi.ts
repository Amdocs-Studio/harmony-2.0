import { baseQueryImpl } from '../../services';
import { createApi } from '@reduxjs/toolkit/query/react';
import config from './RbaConfig';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PoliciesType, RbaStateType } from './RbaTypes.ts';

export const rbaApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl({
		baseUrl: 'v1/rba',
	}),
	tagTypes: ['Rba'],
	endpoints: (build) => ({
		policies: build.query<RbaStateType['permissions'], void>({
			query() {
				return {
					url: '/policies',
					method: 'GET',
				};
			},
			 transformResponse: (response: PoliciesType): RbaStateType['permissions'] => {
				return response.reduce((acc, policy) => {
					return {
						...acc,
						[policy.id]: policy.value,
					};
				}, {} as RbaStateType['permissions']);
			},
		}),
	})
});

export const rbaApiReducer = persistReducer({
	key: config.apiSliceName,
	storage,
	version: 1,
	whitelist: ['queries', 'mutations']
}, rbaApi.reducer);
