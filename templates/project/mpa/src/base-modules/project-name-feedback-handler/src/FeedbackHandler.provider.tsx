import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import {
	FeedbackForDisplayType,
	FeedbackHandlerContextType,
	FeedbackHandlerProps
} from './FeedbackHandler.types';
import {
	useAuth,
	PushFeedbackPayloadType,
	FeedbackConfigType,
	FeedbackHandlerStateType, useFeedbackHandler, useAppSelector
} from '@sdk';

const FeedbackHandlerContext = createContext<FeedbackHandlerContextType | undefined>(undefined);

const replaceValues = (
	feedback: PushFeedbackPayloadType,
	handleClose: (fbCode: string) => void,
	feedbackConfig: FeedbackConfigType,
): FeedbackForDisplayType => {
	let message = feedbackConfig.message;
	let title = feedbackConfig.title;
	if (feedback.values) {
		Object.entries(feedback.values).forEach(([key, value]) => {
			message = message.replace(`{${key}}`, value);
			title = title.replace(`{${key}}`, value);
		});
	}
	return {
		...feedbackConfig,
		id: feedback.code,
		message,
		title,
		onDismiss: () => handleClose(feedback.code),
	};
};

const mapComponentProps = (
	props: { feedbacks: FeedbackHandlerStateType['feedbacks']; feedbacksConfig: FeedbackHandlerStateType['feedbacksConfig'], removeFeedback: (fbCode: string) => void },
) => {
	const { feedbacks, feedbacksConfig, removeFeedback } = props;
	
	return feedbacks.reduce((acc, fb) => {
		const feedbackConfig = feedbacksConfig[fb.code];
		if (!feedbackConfig) {
			return acc;
		}
		const feedbackForDisplay = replaceValues(fb, removeFeedback, feedbackConfig);
		acc[`${feedbackConfig.feedbackType}s`].push(feedbackForDisplay);
		return acc;
	}, { snackbars: [], modals: [] } as { snackbars: FeedbackForDisplayType[], modals: FeedbackForDisplayType[] });
};

export function FeedbackHandlerProvider({ children }: PropsWithChildren<FeedbackHandlerProps>) {
	const { userInfo } = useAuth();
	const useFeedbackActions = useFeedbackHandler();
	const { removeFeedback } = useFeedbackActions;
	const spinnerActions = useAppSelector(s => s.feedbackHandler.spinnerActions);
	const feedbacks = useAppSelector(s => s.feedbackHandler.feedbacks);
	const feedbacksConfig = useAppSelector(s => s.feedbackHandler.feedbacksConfig);
	const isSpinnerActive = spinnerActions.length > 0;
	const { snackbars, modals } = mapComponentProps({ feedbacks, feedbacksConfig, removeFeedback });
	
	const value = useMemo(() => ({
		isSpinnerActive,
		userInfo,
		snackbars,
		modals,
		...useFeedbackActions,
	}), [isSpinnerActive, userInfo, snackbars, modals, useFeedbackActions]);
	
	return <FeedbackHandlerContext.Provider value={value}>{children}</FeedbackHandlerContext.Provider>;
}

export const useFeedbackHandlerContext = () => useContext(FeedbackHandlerContext) as FeedbackHandlerContextType;