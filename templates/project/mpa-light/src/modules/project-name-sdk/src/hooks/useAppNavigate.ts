import { NavigateFunction } from '../types';
import getNavigationHandler from '../mpa-bootstrap/NavigationHandler.ts';

const useAppNavigate = (): NavigateFunction => {
	return getNavigationHandler().navigate;
};

export default useAppNavigate;