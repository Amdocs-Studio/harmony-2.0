import { FeedbackHandlerProps } from './FeedbackHandler.types';
import { FeedbackHandlerProvider } from './FeedbackHandler.provider';
import FeedbackHandlerMain from './components/FeedbackHandler.main';
import './styles/index.css';

export default function FeedbackHandler(props: FeedbackHandlerProps) {
	return (
		<FeedbackHandlerProvider {...props}>
			<FeedbackHandlerMain />
		</FeedbackHandlerProvider>
	);
}