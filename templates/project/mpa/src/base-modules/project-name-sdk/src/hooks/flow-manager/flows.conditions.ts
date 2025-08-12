import { store } from '../../store';

export const defaultSuccessCondition = async () => {
	return Promise.resolve();
};

export const multipleDevicesCondition = async () => {
	const cartItems = store?.getState()?.shoppingCart?.cartItems;
	if (cartItems?.length > 1) {
		return Promise.resolve();
	}
	return Promise.reject();
};
