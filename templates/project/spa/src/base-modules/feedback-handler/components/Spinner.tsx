import { useFeedbackHandlerContext } from '../FeedbackHandler.provider';

const Loading = () => {
	return (
		<svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
			<circle cx="26" cy="26" r="24" stroke="#414141" strokeWidth="3" fill="none"/>
			<path d="M26 2C33.108 2 39.4943 5.09 43.8889 10" stroke="#FF52A3" strokeWidth="3" strokeLinecap="round"/>
		</svg>
	);
};

export function SpinnerWidget() {
	const { isSpinnerActive } = useFeedbackHandlerContext();
	if (!isSpinnerActive) {
		return <div />;
	}
	return (
		<div className="fixed left-0 right-0 top-0 bottom-0 z-[1000] flex items-center justify-center bg-[#0000006b]">
			<Loading />
		</div>
	);
}