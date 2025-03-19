import { feedbackHandlerSlice } from './FeedbackHandlerReducer';
import { feedbackHandlerApi } from './FeedbackHandlerApi';
import { useSliceActions } from '../../utils';

export const useFeedbackHandler = () => {
	const dispatchActions = useSliceActions(feedbackHandlerSlice.actions);
	const { useLoadConfigQuery, useLazyLoadConfigQuery } = feedbackHandlerApi;
	const [loadConfig] = useLazyLoadConfigQuery();
	return {
		...dispatchActions,
		useLoadConfigQuery,
		loadConfig,
	};
};
