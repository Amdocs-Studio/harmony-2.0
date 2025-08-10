import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { ShoppingCartContextType, ShoppingCartProps } from './ShoppingCart.types';
import { useAppIntl, useAppSelector, useShoppingCart } from '@sdk';
import { navigate, messages, getConfig } from './ShoppingCart.i18n';

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export function ShoppingCartProvider({ children }: PropsWithChildren<ShoppingCartProps>) {
	const { formatMessage } = useAppIntl();
	const { clearCart } = useShoppingCart();
	const cartItems = useAppSelector(s => s.shoppingCart.cartItems);

	const onClearCart = () => {
		clearCart();
		navigate('navigateToHome');
	};
	
	const value = useMemo(() => ({
		navigate,
		formatMessage,
		messages,
		config: getConfig(),
		cartItems,
		onClearCart
	}), [navigate, formatMessage, cartItems, onClearCart]);

	return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;

}

export const useShoppingCartContext = () => useContext(ShoppingCartContext) as ShoppingCartContextType;