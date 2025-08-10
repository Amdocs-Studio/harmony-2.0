import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { ShoppingCartContextType, ShoppingCartProps } from './ShoppingCart.types';
import { useAppNavigate, useAppSelector } from '@sdk';

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export function ShoppingCartProvider({ children }: PropsWithChildren<ShoppingCartProps>) {
	const navigate = useAppNavigate();
	const cartItems = useAppSelector(s => s.shoppingCart.cartItems) || [];
	
	const value = useMemo(() => ({
		navigate,
		cartItems
	}), [navigate, cartItems]);
	
	return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
	
}

export const useShoppingCartContext = () => useContext(ShoppingCartContext) as ShoppingCartContextType;
