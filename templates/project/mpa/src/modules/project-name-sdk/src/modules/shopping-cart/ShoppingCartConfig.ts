import { ModuleConfigType } from '@sdk';
import { ShoppingCartStateType } from './ShoppingCartTypes';
import { Slice } from '@reduxjs/toolkit';

export const config: ModuleConfigType<Slice<ShoppingCartStateType>> = {
	sliceName: 'shoppingCart',
	apiSliceName: 'shoppingCartApi',
	withApi: false,
	withReducer: true,
};

export default config;
