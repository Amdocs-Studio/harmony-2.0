import { createContext, useContext, useMemo } from 'react';
import DeviceDetailsMain from './components/DeviceDetails.main';
import { DeviceDetailsContextType, DeviceDetailsProps } from './DeviceDetails.types';
import { useAppNavigate, useAppSelector } from '@sdk';

const DeviceDetailsContext = createContext<DeviceDetailsContextType | undefined>(undefined);

export function DeviceDetailsProvider(props: DeviceDetailsProps) {
	const navigate = useAppNavigate();
	const cartItems = useAppSelector(s => s.shoppingCart.cartItems) || [];
	const value = useMemo(() => ({
		...props,
		navigate,
		cartItems,
	}), [navigate, cartItems, props]);
	
	return (
		<DeviceDetailsContext.Provider value={value}>
			<DeviceDetailsMain />
		</DeviceDetailsContext.Provider>
	);
}

export const useDeviceDetailsContext = () => useContext(DeviceDetailsContext) as DeviceDetailsContextType;
