import Navbar from './Navbar';
import descriptor from '../project-name-navbar.descriptor.json';
import { getConfigHandler, getNavigationHandler, ComponentDecorator } from '@sdk';
import { NavbarProps } from './Navbar.types.ts';

getNavigationHandler().registerRoutesFromDescriptor(descriptor);
getConfigHandler().registerConfigFromDescriptor(descriptor);

export const NavbarDecorator = (props: NavbarProps) => {
	return (
		<ComponentDecorator descriptor={descriptor}>
			<Navbar {...props} />
		</ComponentDecorator>
	);
};
