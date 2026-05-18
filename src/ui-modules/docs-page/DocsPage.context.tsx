import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { DocsPageContextType } from './DocsPage.types';

export type DocsPageRegistry = {
	current: DocsPageContextType | null;
	setCurrent: Dispatch<SetStateAction<DocsPageContextType | null>>;
};

export const DocsPageRegistryContext = createContext<DocsPageRegistry | undefined>(undefined);

export const useDocsPageRegistry = () => {
	const ctx = useContext(DocsPageRegistryContext);
	if (!ctx) {
		throw new Error('useDocsPageRegistry must be used within DocsPageRegistryProvider');
	}
	return ctx;
};

export const useCurrentDocsPage = () => {
	const ctx = useContext(DocsPageRegistryContext);
	return ctx?.current ?? null;
};
