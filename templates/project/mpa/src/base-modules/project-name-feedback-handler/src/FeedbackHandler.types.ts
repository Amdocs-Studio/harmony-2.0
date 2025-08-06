import { User, FeedbackConfigType, useFeedbackHandler } from '@sdk';

export type FeedbackHandlerContextType = {
	isSpinnerActive: boolean;
	userInfo?: User;
	snackbars: FeedbackForDisplayType[];
	modals: FeedbackForDisplayType[];
} & ReturnType<typeof useFeedbackHandler>;

export type FeedbackHandlerProps = object

export type FeedbackForDisplayType = FeedbackConfigType & {
	id: string;
	onDismiss: () => void;
};