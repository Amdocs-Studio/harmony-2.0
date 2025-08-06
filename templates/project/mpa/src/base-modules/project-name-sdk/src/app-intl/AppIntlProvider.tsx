import { PropsWithChildren } from 'react';
import { IntlProvider as ReactIntlProvider, IntlConfig } from 'react-intl';
import { useAppSelector } from '@sdk';

type AppIntlProviderProps = PropsWithChildren<Omit<IntlConfig, 'locale'>>;

export default function AppIntlProvider({ children, ...rest }: Readonly<AppIntlProviderProps>) {
	const  locale  = useAppSelector(s => s.app.locale);
	return (
		<ReactIntlProvider locale={locale} {...rest}>
			{children}
		</ReactIntlProvider>
	);
}