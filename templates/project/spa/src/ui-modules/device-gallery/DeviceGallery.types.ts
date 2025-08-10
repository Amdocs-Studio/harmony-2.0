import { User, NavigateFunction, Device } from '@sdk';

export type DeviceGalleryContextType = {
	navigate: NavigateFunction
	userInfo?: User
	onDeviceSelect: (device: Device) => void
	devices: Device[]
}

export type DeviceGalleryProps = object