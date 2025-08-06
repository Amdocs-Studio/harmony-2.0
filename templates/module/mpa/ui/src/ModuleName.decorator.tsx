import ModuleName from './ModuleName';
import descriptor from '../project-name-module-name.descriptor.json';
import { getConfigHandler, getNavigationHandler, ComponentDecorator } from '@sdk';
import { ModuleNameProps } from './ModuleName.types';

getNavigationHandler().registerRoutesFromDescriptor(descriptor);
getConfigHandler().registerConfigFromDescriptor(descriptor);

export const ModuleNameDecorator = (props: ModuleNameProps) => {
	return (
		<ComponentDecorator descriptor={descriptor}>
			<ModuleName {...props} />
		</ComponentDecorator>
	);
};
