import { PropsWithChildren, useMemo, useState } from 'react';
import { DocsPageRegistryContext } from './DocsPage.context';
import { DocsPageContextType } from './DocsPage.types';

export function DocsPageRegistryProvider({ children }: PropsWithChildren) {
	const [current, setCurrent] = useState<DocsPageContextType | null>(null);
	const value = useMemo(() => ({ current, setCurrent }), [current]);
	return (
		<DocsPageRegistryContext.Provider value={value}>
			{children}
		</DocsPageRegistryContext.Provider>
	);
}
