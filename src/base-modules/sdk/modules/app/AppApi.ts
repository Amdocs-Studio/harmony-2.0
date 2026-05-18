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
import { persistApiReducer } from '../../utils';

export const appApiReducer = persistApiReducer(config.apiSliceName, appApi.reducer);
*/

export const appApiReducer = appApi.reducer;