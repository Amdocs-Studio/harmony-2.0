import ShoppingCart from './ShoppingCart';
import descriptor from '../project-name-shopping-cart.descriptor.json';
import { getConfigHandler, getNavigationHandler, ComponentDecorator } from '@sdk';
import { ShoppingCartProps } from './ShoppingCart.types';

getNavigationHandler().registerRoutesFromDescriptor(descriptor);
getConfigHandler().registerConfigFromDescriptor(descriptor);

export const ShoppingCartDecorator = (props: ShoppingCartProps) => {
	return (
		<ComponentDecorator descriptor={descriptor}>
			<ShoppingCart {...props} />
		</ComponentDecorator>
	);
};
