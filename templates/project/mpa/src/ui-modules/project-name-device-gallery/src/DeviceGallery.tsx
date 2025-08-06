import { DeviceGalleryProps } from './DeviceGallery.types';
import { DeviceGalleryProvider } from './DeviceGallery.provider';
import DeviceGalleryMain from './components/DeviceGallery.main';
import './styles/index.css';

export default function DeviceGallery(props: DeviceGalleryProps) {
	return (
		<DeviceGalleryProvider {...props}>
			<DeviceGalleryMain />
		</DeviceGalleryProvider>
	);
}