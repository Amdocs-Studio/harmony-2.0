import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { ShoppingCartContextType, ShoppingCartProps } from './ShoppingCart.types';
import { useAppIntl, useAppSelector } from '@sdk';
import { navigate, messages, getConfig } from './ShoppingCart.i18n';

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export function ShoppingCartProvider({ children }: PropsWithChildren<ShoppingCartProps>) {
	const { formatMessage } = useAppIntl();
	const cartItems = useAppSelector(s => s.shoppingCart.cartItems);

	const value = useMemo(() => ({
		navigate,
		formatMessage,
		messages,
		config: getConfig(),
		cartItems
	}), [navigate, formatMessage]);

	return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;

}

export const useShoppingCartContext = () => useContext(ShoppingCartContext) as ShoppingCartContextType;