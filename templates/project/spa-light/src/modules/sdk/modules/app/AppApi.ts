import { baseQueryImpl } from '../../services';
import { createApi } from '@reduxjs/toolkit/query/react';
import config from './AppConfig';

export const appApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl(),
	tagTypes: ['App'],
	endpoints: () => ({

	})
});

/*

Uncomment this block if you want to use redux-persist
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

export const appApiReducer = persistReducer({
	key: config.apiSliceName,
	storage,
	version: 1,
	whitelist: ['queries', 'mutations']
}, appApi.reducer)

 */

export const appApiReducer = appApi.reducer;