import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import config from './FeedbackHandlerConfig';
import {
	FeedbackHandlerStateType,
	PushFeedbackPayloadType,
	FeedbackHandlerConfigType,
	RESTCallAction
} from './FeedbackHandlerTypes';
import { persistAppReducer } from '../../utils';

const initialState: FeedbackHandlerStateType = {
	feedbacks: [],
	feedbacksConfig: {},
	downloadFilesStatuses: [],
	closedRequests: [],
	spinnerActions: [],
	errors: []
};

const spinnerBlackListEndpoints = [
	'someEndpoint'
];

const isRESTCallAction = (action: RESTCallAction) => {
	return !spinnerBlackListEndpoints.includes(action.meta?.arg?.endpointName) && (
		action.type.endsWith('/executeQuery/pending') ||
    action.type.endsWith('/executeQuery/fulfilled') ||
    action.type.endsWith('/executeQuery/rejected') ||
    action.type.endsWith('/executeMutation/pending') ||
    action.type.endsWith('/executeMutation/fulfilled') ||
    action.type.endsWith('/executeMutation/rejected'));
};

const isErrorRESTCall = (action: Action) => {
	return action.type.endsWith('/executeQuery/rejected') ||
    action.type.endsWith('/executeMutation/rejected');
};

export const feedbackHandlerSlice = createSlice({
	name: config.sliceName,
	initialState,
	reducers: {
		pushFeedback(state, action: PayloadAction<PushFeedbackPayloadType>) {
			state.feedbacks.push(action.payload);
		},
		removeFeedback(state, action: PayloadAction<string>) {
			state.feedbacks = state.feedbacks.filter(f => f.code !== action.payload);
		},
		updateConfig(state, action: PayloadAction<FeedbackHandlerConfigType>) {
			state.feedbacksConfig = action.payload;
		},
		startSpinner(state, action: PayloadAction<string>) {
			state.spinnerActions.push(action.payload);
		},
		stopSpinner(state, action: PayloadAction<string>) {
			state.spinnerActions = state.spinnerActions.filter(a => a !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(isRESTCallAction, (state, action: RESTCallAction) => {
			if (action.type.endsWith('pending')) {
				state.spinnerActions.push(action.meta.requestId);
			} else {
				state.spinnerActions = state.spinnerActions.filter(a => a !== action.meta.requestId);
			}
		}).addMatcher(isErrorRESTCall, (state, action: RESTCallAction) => {
			state.spinnerActions = state.spinnerActions.filter(a => a !== action.meta.requestId);
			//TODO - add error handling
		});
	}
});

const reducer = persistAppReducer<FeedbackHandlerStateType>(feedbackHandlerSlice, config.slicePersist?.whitelist || []);

export default reducer;