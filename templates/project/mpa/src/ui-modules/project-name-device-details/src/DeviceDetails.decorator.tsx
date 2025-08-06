import DeviceDetails from './DeviceDetails';
import descriptor from '../project-name-device-details.descriptor.json';
import { getConfigHandler, getNavigationHandler, ComponentDecorator } from '@sdk';
import { DeviceDetailsProps } from './DeviceDetails.types';

getNavigationHandler().registerRoutesFromDescriptor(descriptor);
getConfigHandler().registerConfigFromDescriptor(descriptor);

export const DeviceDetailsDecorator = (props: DeviceDetailsProps) => {
	return (
		<ComponentDecorator descriptor={descriptor}>
			<DeviceDetails {...props} />
		</ComponentDecorator>
	);
};
