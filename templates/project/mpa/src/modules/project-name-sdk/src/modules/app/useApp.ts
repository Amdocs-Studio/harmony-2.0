import { appSlice } from './AppReducer';
import { useSliceActions } from '../../utils';

export const useApp = () => {
	const dispatchActions = useSliceActions(appSlice.actions);
	return {
		...dispatchActions,
	};
};
