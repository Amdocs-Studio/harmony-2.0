import { baseQueryImpl } from '../../services';
import { createApi } from '@reduxjs/toolkit/query/react';
import config from './FeedbackHandlerConfig';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const feedbackHandlerApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl(),
	endpoints: (build) => ({
		loadConfig: build.query<void, void>({
			query: () => 'feedback-config',
		})
	}),
});

export const feedbackHandlerApiReducer = persistReducer({
	key: config.apiSliceName,
	storage,
	version: 1,
	whitelist: ['queries', 'mutations']
}, feedbackHandlerApi.reducer);
/*

Uncomment this block if you don't need to persist the API reducer

export const feedbackHandlerApiReducer = feedbackHandlerApi.reducer;

 */