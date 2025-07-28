import { SdkProvider } from '../src/modules/project-name-sdk/src';
import { AppIntlProvider } from '../src/modules/project-name-app-intl/src';

import '../src/modules/project-name-base-styles/src/style.css';

import { PropsWithChildren } from 'react';

export const StorybookLayout = ({ children }: PropsWithChildren<{}>) => {
	return (
		<SdkProvider >
			<AppIntlProvider >
				{children}
			</AppIntlProvider>
		</SdkProvider>
	);
};
