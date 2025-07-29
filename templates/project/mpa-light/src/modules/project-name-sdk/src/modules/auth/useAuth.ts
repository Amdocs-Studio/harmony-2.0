import { useDispatch } from 'react-redux';
import { authApi } from './AuthApi';

export const useAuth = () => {
	const [login, { data: userInfo, reset, ...restLoginData }] = authApi.useLoginMutation({ fixedCacheKey: 'login' });
	const [logout] = authApi.useLazyLogoutQuery();
	const dispatch = useDispatch();
	const onLogout = async () => {
		await logout();
		await reset();
		dispatch({ type: '@@RESET_STORE' });
	};
	return {
		login,
		userInfo,
		resetUserInfo: reset,
		logout: onLogout,
		restLoginData
	};
};