import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { ModuleNameContextType, ModuleNameProps } from './ModuleName.types';
import { useAppIntl } from '@sdk';
import { navigate, messages, getConfig } from './ModuleName.i18n';

const ModuleNameContext = createContext<ModuleNameContextType | undefined>(undefined);

export function ModuleNameProvider({ children }: PropsWithChildren<ModuleNameProps>) {
	const { formatMessage } = useAppIntl();

	const value = useMemo(() => ({
		navigate,
		formatMessage,
		messages,
		config: getConfig()
	}), [navigate, formatMessage]);

	return <ModuleNameContext.Provider value={value}>{children}</ModuleNameContext.Provider>;

}

export const useModuleNameContext = () => useContext(ModuleNameContext) as ModuleNameContextType;