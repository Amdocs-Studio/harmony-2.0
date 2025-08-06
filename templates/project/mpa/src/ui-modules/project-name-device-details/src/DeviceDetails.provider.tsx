import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { DeviceDetailsContextType, DeviceDetailsProps } from './DeviceDetails.types';
import { useAppIntl, useAppSelector } from '@sdk';
import { navigate, messages, getConfig } from './DeviceDetails.i18n';

const DeviceDetailsContext = createContext<DeviceDetailsContextType | undefined>(undefined);

export function DeviceDetailsProvider({ children }: PropsWithChildren<DeviceDetailsProps>) {
	const { formatMessage } = useAppIntl();
	const cartItems = useAppSelector(s => s.shoppingCart.cartItems);

	const value = useMemo(() => ({
		navigate,
		formatMessage,
		messages,
		config: getConfig(),
		cartItems
	}), [navigate, formatMessage]);

	return <DeviceDetailsContext.Provider value={value}>{children}</DeviceDetailsContext.Provider>;

}

export const useDeviceDetailsContext = () => useContext(DeviceDetailsContext) as DeviceDetailsContextType;