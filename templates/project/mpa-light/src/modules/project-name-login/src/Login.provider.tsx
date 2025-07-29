import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { LoginContextType, LoginProps } from './Login.types';
import { useAppNavigate, useAuth } from '@sdk';

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: PropsWithChildren<LoginProps>) {
	const navigate = useAppNavigate();
	const { login } = useAuth();

	const value = useMemo(() => ({
		navigate,
		login
	}), [navigate]);

	return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;

}

export const useLoginContext = () => useContext(LoginContext) as LoginContextType;