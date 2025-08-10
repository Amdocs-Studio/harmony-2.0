import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from './ShoppingCartConfig';
import { ShoppingCartStateType, CartAddItemActionPayloadType } from '@sdk';
import { persistAppReducer } from '../../utils';

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
		removeItemFromCart(state, action: PayloadAction<string>) {
			const sku = action.payload;
			state.cartItems = state.cartItems.filter(item => item.sku !== sku);
		},
		clearCart(state) {
			state.cartItems = [];
		},
	},
	selectors: {
		getCartItems: state => state.cartItems,
	}
});

const reducer = persistAppReducer<ShoppingCartStateType>(shoppingCartSlice, config.slicePersist?.whitelist || []);

export default reducer;
