import { User, NavigateFunction, FeedbackConfigType, useFeedbackHandler } from '@sdk';

export type FeedbackHandlerContextType = {
    isSpinnerActive: boolean;
    navigate: NavigateFunction;
    userInfo?: User;
    snackbars: FeedbackForDisplayType[];
    modals: FeedbackForDisplayType[];
} & ReturnType<typeof useFeedbackHandler>;

export type FeedbackHandlerProps = object

export type FeedbackForDisplayType = FeedbackConfigType & {
    id: string;
    onDismiss: () => void;
};