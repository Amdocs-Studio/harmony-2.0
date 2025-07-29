import feedbackHandlerReducer from './FeedbackHandlerReducer';
import { feedbackHandlerApiReducer } from './FeedbackHandlerApi';
export { default as feedbackHandlerReducer } from './FeedbackHandlerReducer';
export { default as feedbackHandlerConfig } from './FeedbackHandlerConfig';
export * from './FeedbackHandlerApi';
export type * from './FeedbackHandlerTypes';
export { useFeedbackHandler } from './useFeedbackHandler';
export const feedbackHandlerReducers = {
	feedbackHandlerApi: feedbackHandlerApiReducer,
	feedbackHandler: feedbackHandlerReducer
};