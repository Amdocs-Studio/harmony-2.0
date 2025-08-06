import { User, NavigateFunction, useAppIntl, MessagesType, ConfigType, CartItem } from '@sdk';

export type DeviceGalleryContextType = {
	navigate: NavigateFunction
	userInfo?: User
	formatMessage: ReturnType<typeof useAppIntl>['formatMessage']
	messages: MessagesType;
	config: ConfigType;
	onDeviceSelect: (device: CartItem) => void
}

export interface Device {
	brand: string;
	description: string;
	images: string[];
	price: number;
	title: string;
	sku: string;
}

export type DeviceGalleryProps = object