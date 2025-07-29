import { PropsWithChildren } from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import {  Utils, useAppSelector } from '@sdk';
import { messages } from '../Intl.i18n';
import { Locales } from '../Intl.types';

const { flattenObject } = Utils;

export default function AppIntlProvider({ children }: Readonly<PropsWithChildren>) {
	const  locale  = useAppSelector(s => s.app.locale);
	return (
		<ReactIntlProvider locale={locale as Locales} messages={flattenObject(messages[locale as Locales])}>
			{children}
		</ReactIntlProvider>
	);
}