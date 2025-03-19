import { User, NavigateFunction, CartItem } from '@sdk';

export type DeviceGalleryContextType = {
    navigate: NavigateFunction
    userInfo?: User
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