import { baseQueryImpl } from '../../services';
import { createApi } from '@reduxjs/toolkit/query/react';
import config from './ShoppingCartConfig';
import { Device } from './ShoppingCartTypes';
import { persistApiReducer } from '../../utils';

export const shoppingCartApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl({
		baseUrl: 'v1/shopping-cart'
	}),
	endpoints: (builder) => ({
		getDevices: builder.query<Device[], void>({
			query: () => 'devices',
		}),
	})
});

export const shoppingCartApiReducer = persistApiReducer(config.apiSliceName, shoppingCartApi.reducer);
