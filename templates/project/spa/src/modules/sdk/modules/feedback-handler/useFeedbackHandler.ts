import { feedbackHandlerSlice } from './FeedbackHandlerReducer';
import { useSliceActions } from '../../utils';

export const useFeedbackHandler = () => {
	const dispatchActions = useSliceActions(feedbackHandlerSlice.actions);
	return {
		...dispatchActions,
	};
};
