export type CartAddItemActionPayloadType = {
	cartItem: CartItem;
};

export interface ShoppingCartStateType {
	cartItems: CartItem[];
}

export interface CartItem {
	id: string;
	name: string;
	price: number;
	sku: string;
}
