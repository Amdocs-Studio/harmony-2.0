import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { DeviceGalleryContextType, DeviceGalleryProps } from './DeviceGallery.types';
import { useAppIntl, useShoppingCart, CartItem } from '@sdk';
import { navigate, messages, getConfig } from './DeviceGallery.i18n';

const DeviceGalleryContext = createContext<DeviceGalleryContextType | undefined>(undefined);

export function DeviceGalleryProvider({ children }: PropsWithChildren<DeviceGalleryProps>) {
	const { formatMessage } = useAppIntl();
	const { addItemToCart } = useShoppingCart();
	const onDeviceSelect = (cartItem: CartItem) => addItemToCart({ cartItem });

	const value = useMemo(() => ({
		navigate,
		formatMessage,
		messages,
		config: getConfig(),
		onDeviceSelect
	}), [navigate, formatMessage]);

	return <DeviceGalleryContext.Provider value={value}>{children}</DeviceGalleryContext.Provider>;

}

export const useDeviceGalleryContext = () => useContext(DeviceGalleryContext) as DeviceGalleryContextType;