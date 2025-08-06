import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { LoginFormContextType, LoginFormProps } from './LoginForm.types';
import { useAppIntl, useAuth } from '@sdk';
import { navigate, messages, getConfig } from './LoginForm.i18n';

const LoginFormContext = createContext<LoginFormContextType | undefined>(undefined);

export function LoginFormProvider({ children }: PropsWithChildren<LoginFormProps>) {
	const { formatMessage } = useAppIntl();
	const { login } = useAuth();
	const config = getConfig();

	const value = useMemo(() => ({
		navigate,
		formatMessage,
		messages,
		config,
		login,
	}), [navigate, formatMessage, messages, config, login]);

	return <LoginFormContext.Provider value={value}>{children}</LoginFormContext.Provider>;

}

export const useLoginFormContext = () => useContext(LoginFormContext) as LoginFormContextType;