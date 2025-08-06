import { User, NavigateFunction, CartItem } from '@sdk';
import { PropsWithChildren } from 'react';

export type MiniCartLayoutContextType = MiniCartLayoutProps & {
	navigate: NavigateFunction
	userInfo?: User
	cartItems?: CartItem[];
	onMiniCartContinue: () => void;
}

export type MiniCartLayoutProps = PropsWithChildren<{
	pageTitle: string;
	pageSubTitle?: string;
}>;
