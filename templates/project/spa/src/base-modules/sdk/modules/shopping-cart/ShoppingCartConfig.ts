import { ModuleConfigType } from '@sdk';
import { ShoppingCartStateType } from './ShoppingCartTypes';
import { Slice } from '@reduxjs/toolkit';

export const config: ModuleConfigType<Slice<ShoppingCartStateType>> = {
	sliceName: 'shoppingCart',
	apiSliceName: 'shoppingCartApi',
	// slicePersist: {
	// whitelist: [],
	// },
	// apiPersist: true,
	withApi: true,
	withReducer: true,
};

export default config;
