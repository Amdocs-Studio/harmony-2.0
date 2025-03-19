import { SpinnerWidget } from './Spinner';
import Snackbars from './Snackbars';
import Modals from './Modals';
import { useFeedbackHandlerContext } from '../FeedbackHandler.provider';

export default function FeedbackHandlerMain() {
	const { useLoadConfigQuery } = useFeedbackHandlerContext();
	const { isLoading } = useLoadConfigQuery();
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
