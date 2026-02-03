import { useMemo } from 'react';
import DeviceDetailsMain from './components/DeviceDetails.main';
import { DeviceDetailsProps } from './DeviceDetails.types';
import { useAppIntl, useAppSelector } from '@sdk';
import { navigate, messages, getConfig } from './DeviceDetails.i18n';
import { DeviceDetailsContext } from './DeviceDetails.context';

export function DeviceDetailsProvider(props: DeviceDetailsProps) {
	const { formatMessage } = useAppIntl();
	const cartItems = useAppSelector(s => s.shoppingCart.cartItems) || [];

	const value = useMemo(() => ({
		...props,
		navigate,
		formatMessage,
		messages,
		config: getConfig(),
		cartItems
	}), [navigate, formatMessage, cartItems, props]);

	return (
		<DeviceDetailsContext.Provider value={value}>
			<DeviceDetailsMain />
		</DeviceDetailsContext.Provider>
	);
}