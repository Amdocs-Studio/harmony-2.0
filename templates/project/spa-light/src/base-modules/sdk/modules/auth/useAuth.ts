import { authApi } from './AuthApi';
import { useRba } from '../rba';
import { LoginPayload } from './AuthTypes';
import { handleClearStore } from '../../utils';

export const useAuth = () => {
	const [login, { data: userInfo, reset, ...restLoginData }] = authApi.useLoginMutation({ fixedCacheKey: 'login' });
	const { policies } = useRba();
	const [logout] = authApi.useLazyLogoutQuery();
	const onLogout = async () => {
		await logout();
		reset();
		await handleClearStore();
	};
	const onLogin = async (payload: LoginPayload) => {
		const result = await login(payload);
		await policies();
		return result;
	};
	
	return {
		login: onLogin,
		userInfo,
		resetUserInfo: reset,
		logout: onLogout,
		restLoginData
	};
};