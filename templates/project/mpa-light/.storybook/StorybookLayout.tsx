import { SdkProvider } from '@sdk';
import { AppIntlProvider } from '@app-intl';
import { FeedbackHandler } from '@feedback-handler';

import '../src/modules/project-name-base-styles/src/style.css';

import { PropsWithChildren } from 'react';

export const StorybookLayout = ({ children }: PropsWithChildren<{}>) => {
	return (
		<SdkProvider >
			<AppIntlProvider >
				{children}
				<FeedbackHandler />
			</AppIntlProvider>
		</SdkProvider>
	);
};
