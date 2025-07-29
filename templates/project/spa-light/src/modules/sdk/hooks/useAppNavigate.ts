import { useNavigate as useSPANavigate } from 'react-router';
import { NavigateFunction } from '@sdk';

const useAppNavigate = (): NavigateFunction =>  {
	return useSPANavigate();
};

export default useAppNavigate;