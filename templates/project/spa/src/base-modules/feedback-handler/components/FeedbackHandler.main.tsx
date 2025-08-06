import { SpinnerWidget } from './Spinner';
import Snackbars from './Snackbars';
import Modals from './Modals';
import { feedbackHandlerApi } from '@sdk';

export default function FeedbackHandlerMain() {
	const { isLoading } = feedbackHandlerApi.useLoadConfigQuery();
	if (isLoading) {
		return <SpinnerWidget />;
	}
	return (
		<div>
			<SpinnerWidget />
			<Snackbars />
			<Modals />
		</div>
	);
}
