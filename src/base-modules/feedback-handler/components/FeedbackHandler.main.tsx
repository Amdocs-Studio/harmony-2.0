import { SpinnerWidget } from './Spinner';
import Snackbars from './Snackbars';
import Modals from './Modals';

export default function FeedbackHandlerMain() {
	return (
		<div>
			<SpinnerWidget />
			<Snackbars />
			<Modals />
		</div>
	);
}
