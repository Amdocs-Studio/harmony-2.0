import { createContext, useContext } from 'react';
import { LoginFormContextType } from './LoginForm.types';

export const LoginFormContext = createContext<LoginFormContextType | undefined>(undefined);

export const useLoginFormContext = () => useContext(LoginFormContext) as LoginFormContextType;
