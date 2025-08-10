import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { DeviceDetailsContextType, DeviceDetailsProps } from './DeviceDetails.types';
import { useAppNavigate, useAppSelector } from '@sdk';

const DeviceDetailsContext = createContext<DeviceDetailsContextType | undefined>(undefined);

export function DeviceDetailsProvider({ children }: PropsWithChildren<DeviceDetailsProps>) {
	const navigate = useAppNavigate();
	const cartItems = useAppSelector(s => s.shoppingCart.cartItems) || [];
	const value = useMemo(() => ({
		navigate,
		cartItems,
	}), [navigate, cartItems]);
	
	return <DeviceDetailsContext.Provider value={value}>{children}</DeviceDetailsContext.Provider>;
	
}

export const useDeviceDetailsContext = () => useContext(DeviceDetailsContext) as DeviceDetailsContextType;
