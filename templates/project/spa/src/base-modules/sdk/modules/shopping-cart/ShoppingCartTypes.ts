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

export interface Device {
	brand: string;
	description: string;
	images: string[];
	price: number;
	title: string;
	sku: string;
}