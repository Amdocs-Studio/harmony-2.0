import { shoppingCartSlice } from './ShoppingCartReducer';
import { useSliceActions } from '../../utils';

export const useShoppingCart = () => {
	const dispatchActions = useSliceActions(shoppingCartSlice.actions);
	return {
		...dispatchActions,
		...shoppingCartSlice.selectors
	};
};
