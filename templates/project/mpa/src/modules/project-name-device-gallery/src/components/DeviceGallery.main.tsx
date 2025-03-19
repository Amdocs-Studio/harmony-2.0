import { MiniCartLayout } from '@mini-cart-layout';
import { Device } from '../DeviceGallery.types';
import DeviceCard from './DeviceCard';
import { useDeviceGalleryContext } from '../DeviceGallery.provider';
import devices from './devices-mock-data';

export default function DeviceGalleryMain() {
	const { onDeviceSelect } = useDeviceGalleryContext();
	return (
		<MiniCartLayout
			pageTitle="Device Gallery"
			pageSubTitle="Shop our amazing devices"
		>
			{devices.map((device: Device) => (
				<DeviceCard device={device} key={device.sku} onDeviceSelect={onDeviceSelect}/>
			))}
		</MiniCartLayout>
	);
}
