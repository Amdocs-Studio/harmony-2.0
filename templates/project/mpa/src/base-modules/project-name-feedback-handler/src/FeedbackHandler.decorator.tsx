import FeedbackHandler from './FeedbackHandler';
import descriptor from '../project-name-feedback-handler.descriptor.json';
import { getConfigHandler, getNavigationHandler, ComponentDecorator } from '@sdk';
import { FeedbackHandlerProps } from './FeedbackHandler.types';

getNavigationHandler().registerRoutesFromDescriptor(descriptor);
getConfigHandler().registerConfigFromDescriptor(descriptor);

export const FeedbackHandlerDecorator = (props: FeedbackHandlerProps) => {
	return (
		<ComponentDecorator descriptor={descriptor}>
			<FeedbackHandler {...props} />
		</ComponentDecorator>
	);
};
