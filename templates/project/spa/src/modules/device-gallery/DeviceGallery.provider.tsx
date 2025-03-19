import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { DeviceGalleryContextType, DeviceGalleryProps } from './DeviceGallery.types';
import { CartItem, useAppNavigate, useShoppingCart } from '@sdk';

const DeviceGalleryContext = createContext<DeviceGalleryContextType | undefined>(undefined);

export function DeviceGalleryProvider({ children }: PropsWithChildren<DeviceGalleryProps>) {
	const navigate = useAppNavigate();
	const { addItemToCart } = useShoppingCart();
	const onDeviceSelect = (cartItem: CartItem) => addItemToCart({ cartItem });

	const value = useMemo(() => ({
		navigate,
		onDeviceSelect
	}), [navigate, onDeviceSelect]);

	return <DeviceGalleryContext.Provider value={value}>{children}</DeviceGalleryContext.Provider>;

}

export const useDeviceGalleryContext = () => useContext(DeviceGalleryContext) as DeviceGalleryContextType;
