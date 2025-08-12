import { createContext, useContext, useMemo } from 'react';
import ModuleNameMain from './components/ModuleName.main';
import { ModuleNameContextType, ModuleNameProps } from './ModuleName.types';
import { useAppIntl } from '@sdk';
import { navigate, messages, getConfig } from './ModuleName.i18n';

const ModuleNameContext = createContext<ModuleNameContextType | undefined>(undefined);

export function ModuleNameProvider(props: ModuleNameProps) {
	const { formatMessage } = useAppIntl();

	const value = useMemo(() => ({
		...props,
		navigate,
		formatMessage,
		messages,
		config: getConfig()
	}), [navigate, formatMessage, props]);

	return (
		<ModuleNameContext.Provider value={value}>
			<ModuleNameMain />
		</ModuleNameContext.Provider>
	);
}

export const useModuleNameContext = () => useContext(ModuleNameContext) as ModuleNameContextType;