import { rbaSlice } from './RbaReducer';
import { rbaApi } from './RbaApi';
import { useSliceActions } from '../../utils';

export const useRba = () => {
	const [ policies ] = rbaApi.useLazyPoliciesQuery();
	const dispatchActions = useSliceActions(rbaSlice.actions);
	return {
		...dispatchActions,
		...rbaSlice.selectors,
		policies
	};
};