import { createContext, useContext, useMemo } from 'react';
import LoginFormMain from './components/LoginForm.main';
import { LoginFormContextType, LoginFormProps } from './LoginForm.types';
import { useAppIntl, useAuth, LoginPayload } from '@sdk';
import { navigate, messages, getConfig } from './LoginForm.i18n';

const LoginFormContext = createContext<LoginFormContextType | undefined>(undefined);

export function LoginFormProvider(props: LoginFormProps) {
	const { formatMessage } = useAppIntl();
	const { login } = useAuth();
	const config = getConfig();
	const onLogin = (payload: LoginPayload) => {
		login(payload).then(() => navigate('navigateToHome'));
	};
	
	const value = useMemo(() => ({
		...props,
		navigate,
		formatMessage,
		messages,
		config,
		login: onLogin,
	}), [navigate, formatMessage, messages, config, login, props]);

	return (
		<LoginFormContext.Provider value={value}>
			<LoginFormMain />
		</LoginFormContext.Provider>
	);
}

export const useLoginFormContext = () => useContext(LoginFormContext) as LoginFormContextType;