import { ReactNode } from 'react';

export type TocEntry = {
	id: string;
	label: string;
	depth?: 2 | 3;
};

export type DocsPageProps = {
	title: string;
	description?: string;
	toc?: TocEntry[];
	children: ReactNode;
};

export type DocsPageContextType = {
	title: string;
	toc: TocEntry[];
};
