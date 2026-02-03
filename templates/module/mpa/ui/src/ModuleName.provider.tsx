import { useMemo } from 'react';
import ModuleNameMain from './components/ModuleName.main';
import { ModuleNameProps } from './ModuleName.types';
import { useAppIntl } from '@sdk';
import { navigate, messages, getConfig } from './ModuleName.i18n';
import { ModuleNameContext } from './ModuleName.context';

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