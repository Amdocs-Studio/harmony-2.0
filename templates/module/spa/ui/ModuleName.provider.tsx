import { useMemo } from 'react';
import ModuleNameMain from './components/ModuleName.main';
import { ModuleNameProps } from './ModuleName.types';
import { useAppNavigate } from '@sdk';
import { useAppIntl } from '@msgs';
import { ModuleNameContext } from './ModuleName.context';

export function ModuleNameProvider(props: ModuleNameProps) {
	const navigate = useAppNavigate();
	const { formatMessage } = useAppIntl();

	const value = useMemo(() => ({
		...props,
		navigate,
		formatMessage,
	}), [navigate, formatMessage, props]);

	return (
		<ModuleNameContext.Provider value={value}>
			<ModuleNameMain />
		</ModuleNameContext.Provider>
	);

}