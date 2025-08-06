import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DeviceDetailsContextType, DeviceDetailsProps } from './DeviceDetails.types';
import { useAppNavigate, useShoppingCart } from '@sdk';

const DeviceDetailsContext = createContext<DeviceDetailsContextType | undefined>(undefined);

export function DeviceDetailsProvider({ children }: PropsWithChildren<DeviceDetailsProps>) {
	const navigate = useAppNavigate();
	const { getCartItems } = useShoppingCart();
	const cartItems = useSelector(getCartItems) ?? [];
	const value = useMemo(() => ({
		navigate,
		cartItems,
	}), [navigate, cartItems]);
	
	return <DeviceDetailsContext.Provider value={value}>{children}</DeviceDetailsContext.Provider>;
	
}

export const useDeviceDetailsContext = () => useContext(DeviceDetailsContext) as DeviceDetailsContextType;
