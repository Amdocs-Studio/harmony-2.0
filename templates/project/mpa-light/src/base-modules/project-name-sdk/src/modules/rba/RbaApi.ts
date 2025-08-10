import { baseQueryImpl } from '../../services';
import { createApi } from '@reduxjs/toolkit/query/react';
import config from './RbaConfig';
import { PoliciesType, RbaStateType } from './RbaTypes.ts';
import { persistApiReducer } from '../../utils';

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

export const rbaApiReducer = persistApiReducer(config.apiSliceName, rbaApi.reducer);

