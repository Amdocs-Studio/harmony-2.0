import { themeSlice } from './ThemeReducer';
import { useSliceActions } from '../../utils';
import { useAppSelector } from '../../hooks';
import { ThemeStateType } from './ThemeTypes';

export const useTheme = () => {
	const dispatchActions = useSliceActions(themeSlice.actions);
	const state = useAppSelector((s: { theme: ThemeStateType }) => s.theme);
	return {
		...state,
		...dispatchActions,
	};
};
