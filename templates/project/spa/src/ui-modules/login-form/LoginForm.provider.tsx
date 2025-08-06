import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { LoginFormContextType, LoginFormProps } from './LoginForm.types';
import { useAppNavigate, useAuth } from '@sdk';

const LoginFormContext = createContext<LoginFormContextType | undefined>(undefined);

export function LoginFormProvider({ children }: PropsWithChildren<LoginFormProps>) {
	const navigate = useAppNavigate();
	const { login } = useAuth();
	
	const value = useMemo(() => ({
		navigate,
		login
	}), [navigate]);
	
	return <LoginFormContext.Provider value={value}>{children}</LoginFormContext.Provider>;
	
}

export const useLoginFormContext = () => useContext(LoginFormContext) as LoginFormContextType;