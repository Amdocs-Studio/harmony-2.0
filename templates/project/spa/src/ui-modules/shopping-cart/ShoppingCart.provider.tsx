import { createContext, useContext, useMemo } from 'react';
import ShoppingCartMain from './components/ShoppingCart.main';
import { ShoppingCartContextType, ShoppingCartProps } from './ShoppingCart.types';
import { useAppNavigate, useAppSelector, useShoppingCart } from '@sdk';

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export function ShoppingCartProvider(props: ShoppingCartProps) {
	const navigate = useAppNavigate();
	const cartItems = useAppSelector(s => s.shoppingCart.cartItems) || [];
	const { clearCart } = useShoppingCart();
	const onClearCart = () => {
		clearCart();
		navigate('/');
	};
	
	const value = useMemo(() => ({
		...props,
		navigate,
		cartItems,
		onClearCart
	}), [navigate, cartItems, props]);
	
	return (
		<ShoppingCartContext.Provider value={value}>
			<ShoppingCartMain />
		</ShoppingCartContext.Provider>
	);
}

export const useShoppingCartContext = () => useContext(ShoppingCartContext) as ShoppingCartContextType;
