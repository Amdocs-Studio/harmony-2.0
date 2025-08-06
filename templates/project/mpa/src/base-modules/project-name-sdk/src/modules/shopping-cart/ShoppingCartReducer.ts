import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from './ShoppingCartConfig';
import { ShoppingCartStateType, CartAddItemActionPayloadType } from '@sdk';

const initialState: ShoppingCartStateType = {
	cartItems: []
};

export const shoppingCartSlice = createSlice({
	name: config.sliceName,
	initialState,
	reducers: {
		addItemToCart(state, action: PayloadAction<CartAddItemActionPayloadType>) {
			const { cartItem } = action.payload;
			state.cartItems = [...state.cartItems, cartItem];
		},
	},
	selectors: {
		getCartItems: state => state.cartItems,
	}
});

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { SlicePersistConfig } from '@sdk';
const persistConfig: SlicePersistConfig<typeof shoppingCartSlice> = {
	key: config.sliceName,
	storage,
	whitelist: config.slicePersist?.whitelist || [],
	version: 1
};

const reducer = persistReducer(persistConfig, shoppingCartSlice.reducer);

export default reducer;
