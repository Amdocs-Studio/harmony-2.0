import { User, NavigateFunction, useAppIntl, MessagesType, ConfigType, CartItem } from '@sdk';
import { PropsWithChildren } from 'react';

export type MiniCartLayoutContextType = MiniCartLayoutProps & {
	navigate: NavigateFunction
	userInfo?: User
	formatMessage: ReturnType<typeof useAppIntl>['formatMessage']
	messages: MessagesType;
	config: ConfigType;
	cartItems?: CartItem[];
	onMiniCartContinue: () => void;
}

export type MiniCartLayoutProps = PropsWithChildren<{
	pageTitle: string;
	pageSubTitle?: string;
}>;