import { User, NavigateFunction, useAppIntl, MessagesType, ConfigType, CartItem } from '@sdk';

export type DeviceDetailsContextType = {
	navigate: NavigateFunction
	userInfo?: User
	formatMessage: ReturnType<typeof useAppIntl>['formatMessage']
	messages: MessagesType;
	config: ConfigType;
	cartItems?: CartItem[]
}

export type DeviceDetailsProps = object