import { createContext, useContext, useMemo } from 'react';
import ModuleNameMain from './components/ModuleName.main';
import { ModuleNameContextType, ModuleNameProps } from './ModuleName.types';
import { useAppNavigate } from '@sdk';

const ModuleNameContext = createContext<ModuleNameContextType | undefined>(undefined);

export function ModuleNameProvider(props: ModuleNameProps) {
	const navigate = useAppNavigate();

	const value = useMemo(() => ({
		...props,
		navigate,
	}), [navigate, props]);

	return (
		<ModuleNameContext.Provider value={value}>
			<ModuleNameMain />
		</ModuleNameContext.Provider>
	);

}

export const useModuleNameContext = () => useContext(ModuleNameContext) as ModuleNameContextType;