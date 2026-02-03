import { MiniCartLayout } from '@ui-modules';
import { useDeviceGalleryContext } from '../DeviceGallery.context';
import { DeviceCard } from '@common-components';

export default function DeviceGalleryMain() {
	const { onDeviceSelect, devices } = useDeviceGalleryContext();
	return (
		<MiniCartLayout
			pageTitle="Device Gallery"
			pageSubTitle="Shop our amazing devices"
		>
			{devices.map((device) => (
				<DeviceCard key={device.sku} {...device} handleBuyNow={() => onDeviceSelect(device)}/>
			))}
		</MiniCartLayout>
	);
}
