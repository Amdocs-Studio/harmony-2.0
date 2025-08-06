import DeviceGallery from './DeviceGallery';
import descriptor from '../project-name-device-gallery.descriptor.json';
import { getConfigHandler, getNavigationHandler, ComponentDecorator } from '@sdk';
import { DeviceGalleryProps } from './DeviceGallery.types';

getNavigationHandler().registerRoutesFromDescriptor(descriptor);
getConfigHandler().registerConfigFromDescriptor(descriptor);

export const DeviceGalleryDecorator = (props: DeviceGalleryProps) => {
	return (
		<ComponentDecorator descriptor={descriptor}>
			<DeviceGallery {...props} />
		</ComponentDecorator>
	);
};
