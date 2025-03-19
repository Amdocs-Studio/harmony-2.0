import { User, NavigateFunction, CartItem } from '@sdk';

export type DeviceDetailsContextType = {
    navigate: NavigateFunction
    userInfo?: User
    cartItems?: CartItem[]
}

export type DeviceDetailsProps = object