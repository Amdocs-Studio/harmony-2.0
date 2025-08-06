import MiniCartLayout from './MiniCartLayout';
import descriptor from '../project-name-mini-cart-layout.descriptor.json';
import { getConfigHandler, getNavigationHandler, ComponentDecorator } from '@sdk';
import { MiniCartLayoutProps } from './MiniCartLayout.types';

getNavigationHandler().registerRoutesFromDescriptor(descriptor);
getConfigHandler().registerConfigFromDescriptor(descriptor);

export const MiniCartLayoutDecorator = (props: MiniCartLayoutProps) => {
	return (
		<ComponentDecorator descriptor={descriptor}>
			<MiniCartLayout {...props} />
		</ComponentDecorator>
	);
};
