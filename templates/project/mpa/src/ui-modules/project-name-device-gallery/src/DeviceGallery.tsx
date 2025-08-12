import { DeviceGalleryProps } from './DeviceGallery.types';
import { DeviceGalleryProvider } from './DeviceGallery.provider';
import './styles/index.css';

export default function DeviceGallery(props: DeviceGalleryProps) {
	return <DeviceGalleryProvider {...props} />;
}