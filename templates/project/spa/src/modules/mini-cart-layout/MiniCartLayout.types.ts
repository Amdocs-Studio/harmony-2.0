import { User, NavigateFunction, CartItem } from '@sdk';
import React from 'react';

export type MiniCartLayoutContextType = {
    navigate: NavigateFunction
    userInfo?: User
    pageTitle?: string;
    pageSubTitle?: string;
    children: React.ReactNode
    cartItems?: CartItem[];
    onMiniCartContinue: () => void;
}

export type MiniCartLayoutProps = any;
