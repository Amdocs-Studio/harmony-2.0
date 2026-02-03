import { useMemo } from 'react';
import DeviceGalleryMain from './components/DeviceGallery.main';
import { DeviceGalleryProps } from './DeviceGallery.types';
import { useAppIntl, useShoppingCart, Device, shoppingCartApi } from '@sdk';
import { navigate, messages, getConfig } from './DeviceGallery.i18n';
import { DeviceGalleryContext } from './DeviceGallery.context';

export function DeviceGalleryProvider(props: DeviceGalleryProps) {
	const { formatMessage } = useAppIntl();
	const { addItemToCart } = useShoppingCart();
	const { data: devices, isLoading: isDevicesLoading, isError } = shoppingCartApi.useGetDevicesQuery();
	const onDeviceSelect = (device: Device) => addItemToCart({
		cartItem: {
			sku: device.sku,
			name: device.title,
			price: device.price,
			id: device.sku,
		}
	});

	const value = useMemo(() => ({
		...props,
		navigate,
		formatMessage,
		messages,
		config: getConfig(),
		onDeviceSelect,
		devices: devices || [],
	}), [navigate, formatMessage, devices, props]);

	return (
		<DeviceGalleryContext.Provider value={value}>
			{isDevicesLoading && <div>Loading...</div>}
			{isError && <div>Error loading devices</div>}
			{devices && <DeviceGalleryMain />}
		</DeviceGalleryContext.Provider>
	);

}