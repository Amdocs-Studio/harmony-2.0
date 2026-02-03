import { useMemo } from 'react';
import LoginFormMain from './components/LoginForm.main';
import { LoginFormProps } from './LoginForm.types';
import { useAppNavigate, useAuth, LoginPayload } from '@sdk';
import { LoginFormContext } from './LoginForm.context';

export function LoginFormProvider(props: LoginFormProps) {
	const navigate = useAppNavigate();
	const { login } = useAuth();
	const onLogin = (payload: LoginPayload) => {
		login(payload).then(() => navigate('/'));
	};
	
	const value = useMemo(() => ({
		...props,
		navigate,
		login: onLogin,
	}), [navigate, props]);
	
	return (
		<LoginFormContext.Provider value={value}>
			<LoginFormMain />
		</LoginFormContext.Provider>
	);
}