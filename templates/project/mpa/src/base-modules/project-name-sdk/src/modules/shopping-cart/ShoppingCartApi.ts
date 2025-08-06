import { baseQueryImpl } from '../../services';
import { createApi } from '@reduxjs/toolkit/query/react';
import config from './ShoppingCartConfig';

export const shoppingCartApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl({
		baseUrl: 'posts'
	}),
	endpoints: () => ({
	})
});

/*
Uncomment this block if you want to use redux-persist
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const shoppingCartApiReducer = persistReducer({
		key: config.apiSliceName,
		storage,
		version: 1,
		whitelist: ['queries', 'mutations']
	}, shoppingCartApi.reducer)

	*/

export const shoppingCartApiReducer = shoppingCartApi.reducer;