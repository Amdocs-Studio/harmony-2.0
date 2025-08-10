import { User, NavigateFunction, useAppIntl, MessagesType, ConfigType, Device } from '@sdk';

export type DeviceGalleryContextType = {
	navigate: NavigateFunction
	userInfo?: User
	formatMessage: ReturnType<typeof useAppIntl>['formatMessage']
	messages: MessagesType;
	config: ConfigType;
	onDeviceSelect: (device: Device) => void
	devices: Device[]
}

export type DeviceGalleryProps = object