import { useFeedbackHandlerContext } from '../FeedbackHandler.provider';

export default function Snackbars() {
	const { snackbars } = useFeedbackHandlerContext();
	if (!snackbars.length) {
		return null;
	}
	return (
		<div className="feedback-handler fixed left-1/2 top-[100px] z-[10000]">
			{snackbars.map(({ id } /*, ...sbProps}, index */) => (
				// <Snackbar key={id} id={id} index={index} {...sbProps} />
				<div key={id}>
					snackbar here
				</div>
			))}
		</div>
	);
}