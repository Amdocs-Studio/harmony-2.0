import { moduleNameSlice } from './ModuleNameReducer';
import { useSliceActions } from '../../utils';

export const useModuleName = () => {
	const dispatchActions = useSliceActions(moduleNameSlice.actions);
	return {
		...dispatchActions,
	};
};