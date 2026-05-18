import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from './FeedbackHandlerConfig';
import {
	FeedbackHandlerStateType,
	PushFeedbackPayloadType,
	FeedbackHandlerConfigType,
	ErrorInfoType,
	ErrorResponse,
} from './FeedbackHandlerTypes';
import { persistAppReducer } from '../../utils';
import { errorMappings, commonErrors, ErrorMatchCriteria, ErrorMapping } from './ErrorMappings';

const initialState: FeedbackHandlerStateType = {
	feedbacks: [],
	feedbacksConfig: {},
	downloadFilesStatuses: [],
	closedRequests: [],
	spinnerActions: [],
	errors: [],
	errorInfo: null
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
			const ind = state.spinnerActions.indexOf(action.payload);
			if (ind !== -1) {
				state.spinnerActions.splice(ind, 1);
			}
		},
		clearErrorInfo(state) {
			state.errorInfo = null;
		},
		handleError(state, error: PayloadAction<ErrorResponse>) {
			console.log('Handling error in feedback handler:', error.payload);
			const fetchError = error.payload.data || {};
			const errorInfo: ErrorInfoType = {
				status: fetchError.status || error.payload.status || 500,
				code: fetchError.code,
				message: fetchError.message,
				traceId: fetchError.traceId,
				characteristics: fetchError.characteristics
			};

			if (errorInfo.status === 401 || errorInfo.status === 403) {
				// Do not set error info for 401 and 403 - should navigate to login once we'll have
				return;
			}
			if (errorInfo.status >= 400) {
				const errorMatchCriteria: ErrorMatchCriteria = {
					status: errorInfo.status,
					code: errorInfo.code,
					message: errorInfo.message
				};

				const errorCharacteristicValues = errorInfo.characteristics?.map(c => c.value) || [];

				const matchesErrorByCharacteristics = (mapping: ErrorMapping): boolean => {
					const criteria = mapping.error;
					if (!criteria.message) {
						return false;
					}
					if (errorCharacteristicValues.length === 0) {
						return false;
					}
					const messageMatchesCharacteristic = errorCharacteristicValues.some(
						errorValue => {
							if (mapping.isPartialMatch) {
								return errorValue.includes(criteria.message!);
							}
							return errorValue === criteria.message;
						}
					);
					if (!messageMatchesCharacteristic) {
						return false;
					}
					const statusMatches = !criteria.status || criteria.status === errorMatchCriteria.status;
					const codeMatches = !criteria.code || criteria.code === errorMatchCriteria.code;
					return statusMatches && codeMatches;
				};

				const matchesErrorByMessage = (mapping: ErrorMapping): boolean => {
					const criteria = mapping.error;
					const statusMatches = !criteria.status || criteria.status === errorMatchCriteria.status;
					const codeMatches = !criteria.code || criteria.code === errorMatchCriteria.code;
					if (!criteria.message) {
						return statusMatches && codeMatches;
					}
					const isPartial = mapping.isPartialMatch === true;
					const messageMatches = isPartial
						? errorMatchCriteria.message?.includes(criteria.message) || false
						: criteria.message === errorMatchCriteria.message;
					return statusMatches && codeMatches && messageMatches;
				};

				let matchingMapping: ErrorMapping | undefined;

				matchingMapping = errorMappings.find(matchesErrorByCharacteristics);

				if (!matchingMapping) {
					matchingMapping = errorMappings.find(matchesErrorByMessage);
				}

				if (!matchingMapping) {
					matchingMapping = commonErrors.find(matchesErrorByCharacteristics);
				}

				if (!matchingMapping) {
					matchingMapping = commonErrors.find(matchesErrorByMessage);
				}

				if (!matchingMapping) {
					const fallback500 = commonErrors.find(mapping => mapping.error.status === 500);
					if (fallback500) {
						matchingMapping = fallback500;
					}
				}

				if (matchingMapping) {
					errorInfo.displayedError = matchingMapping.displayedError;
				}

				state.errorInfo = errorInfo;
			}
		},
	}
});

const reducer = persistAppReducer<FeedbackHandlerStateType>(feedbackHandlerSlice, config.slicePersist?.whitelist || []);

export default reducer;