import { User, NavigateFunction, CartItem } from '@sdk';

export type ShoppingCartContextType = {
	navigate: NavigateFunction
	userInfo?: User
	cartItems?: CartItem[];
	onClearCart: () => void;
}

export type ShoppingCartProps = object