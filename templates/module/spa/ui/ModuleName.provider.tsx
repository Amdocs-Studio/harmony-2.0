import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { ModuleNameContextType, ModuleNameProps } from './ModuleName.types';
import { useAppNavigate } from '@sdk';

const ModuleNameContext = createContext<ModuleNameContextType | undefined>(undefined);

export function ModuleNameProvider({ children }: PropsWithChildren<ModuleNameProps>) {
	const navigate = useAppNavigate();

	const value = useMemo(() => ({
		navigate,
	}), [navigate]);

	return <ModuleNameContext.Provider value={value}>{children}</ModuleNameContext.Provider>;

}

export const useModuleNameContext = () => useContext(ModuleNameContext) as ModuleNameContextType;