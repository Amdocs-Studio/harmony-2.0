import { baseQueryImpl } from '../../services';
import { createApi } from '@reduxjs/toolkit/query/react';
import config from './FeedbackHandlerConfig';
import { persistApiReducer } from '../../utils';

export const feedbackHandlerApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl(),
	endpoints: (build) => ({
		loadConfig: build.query<void, void>({
			query: () => 'feedback-config',
		})
	}),
});

export const feedbackHandlerApiReducer = persistApiReducer(config.apiSliceName, feedbackHandlerApi.reducer);