import { User, NavigateFunction, CartItem } from '@sdk';

export type ShoppingCartContextType = {
	navigate: NavigateFunction
	userInfo?: User
	cartItems?: CartItem[]
}

export type ShoppingCartProps = object