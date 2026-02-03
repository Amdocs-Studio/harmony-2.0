import { useMemo } from 'react';
import ModuleNameMain from './components/ModuleName.main';
import { ModuleNameProps } from './ModuleName.types';
import { useAppNavigate } from '@sdk';
import { ModuleNameContext } from './ModuleName.context';

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