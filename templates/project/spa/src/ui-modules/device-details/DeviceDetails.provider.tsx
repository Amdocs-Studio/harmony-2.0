import { useMemo } from 'react';
import DeviceDetailsMain from './components/DeviceDetails.main';
import { DeviceDetailsProps } from './DeviceDetails.types';
import { useAppNavigate, useAppSelector } from '@sdk';
import { DeviceDetailsContext } from './DeviceDetails.context';

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
