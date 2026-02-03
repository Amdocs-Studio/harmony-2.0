import { PropsWithChildren } from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import {  useAppSelector } from '@sdk';
import { useAppMessages } from './useAppIntl';

export default function AppIntlProvider({ children }: Readonly<PropsWithChildren>) {
	const  locale  = useAppSelector(s => s.app.locale);
	const { currentMessages } = useAppMessages();

	return (
		<ReactIntlProvider locale={locale} messages={currentMessages}>
			{children}
		</ReactIntlProvider>
	);
}