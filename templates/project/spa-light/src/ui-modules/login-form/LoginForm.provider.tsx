import { createContext, useContext, useMemo } from 'react';
import LoginFormMain from './components/LoginForm.main';
import { LoginFormContextType, LoginFormProps } from './LoginForm.types';
import { useAppNavigate, useAuth, LoginPayload } from '@sdk';

const LoginFormContext = createContext<LoginFormContextType | undefined>(undefined);

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

export const useLoginFormContext = () => useContext(LoginFormContext) as LoginFormContextType;