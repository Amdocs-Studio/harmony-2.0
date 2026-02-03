import { useMemo } from 'react';
import ShoppingCartMain from './components/ShoppingCart.main';
import { ShoppingCartProps } from './ShoppingCart.types';
import { useAppNavigate, useAppSelector, useShoppingCart } from '@sdk';
import { ShoppingCartContext } from './ShoppingCart.context';

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
