import { User, NavigateFunction, useAppIntl, MessagesType, ConfigType, CartItem } from '@sdk';

export type ShoppingCartContextType = {
	navigate: NavigateFunction
	userInfo?: User
	formatMessage: ReturnType<typeof useAppIntl>['formatMessage']
	messages: MessagesType;
	config: ConfigType;
	cartItems: CartItem[];
	onClearCart: () => void
}

export type ShoppingCartProps = object