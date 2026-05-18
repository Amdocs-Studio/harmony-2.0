import { ModuleConfigType } from '@sdk';
import { FeedbackHandlerStateType } from './FeedbackHandlerTypes';
import { Slice } from '@reduxjs/toolkit';

export const config: ModuleConfigType<Slice<FeedbackHandlerStateType>> = {
	sliceName: 'feedbackHandler',
	apiSliceName: 'feedbackHandlerApi',
	slicePersist: {
		whitelist: ['feedbacksConfig'],
	},
	withApi: true,
	withReducer: true,
};

export default config;
