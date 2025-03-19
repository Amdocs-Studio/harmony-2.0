import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ShoppingCartContextType, ShoppingCartProps } from './ShoppingCart.types';
import { useAppNavigate, useShoppingCart } from '@sdk';

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export function ShoppingCartProvider({ children }: PropsWithChildren<ShoppingCartProps>) {
	const navigate = useAppNavigate();
	const { getCartItems } = useShoppingCart();
	const cartItems = useSelector(getCartItems) ?? [];

	const value = useMemo(() => ({
		navigate,
		cartItems
	}), [navigate, cartItems]);

	return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;

}

export const useShoppingCartContext = () => useContext(ShoppingCartContext) as ShoppingCartContextType;
