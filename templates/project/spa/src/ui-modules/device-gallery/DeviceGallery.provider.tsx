import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { DeviceGalleryContextType, DeviceGalleryProps } from './DeviceGallery.types';
import { useAppNavigate, useShoppingCart, Device, shoppingCartApi } from '@sdk';

const DeviceGalleryContext = createContext<DeviceGalleryContextType | undefined>(undefined);

export function DeviceGalleryProvider({ children }: PropsWithChildren<DeviceGalleryProps>) {
	const navigate = useAppNavigate();
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
		navigate,
		onDeviceSelect,
		devices: devices || [],
	}), [navigate, devices]);

	return (
		<DeviceGalleryContext.Provider value={value}>
			{isDevicesLoading && <div>Loading...</div>}
			{isError && <div>Error loading devices</div>}
			{devices && children}
		</DeviceGalleryContext.Provider>
	);

}

export const useDeviceGalleryContext = () => useContext(DeviceGalleryContext) as DeviceGalleryContextType;
