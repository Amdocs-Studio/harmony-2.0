import { SdkProvider } from '@sdk';
import { AppIntlProvider } from '@app-intl';
import { MemoryRouter } from 'react-router';
import { FeedbackHandler } from '@feedback-handler';

import '../src/modules/base-styles/style.css';

import { PropsWithChildren } from 'react';

export const StorybookLayout = ({ children }: PropsWithChildren<{}>) => {
	return (
		<MemoryRouter>
			<SdkProvider>
				<AppIntlProvider >
					{children}
					<FeedbackHandler />
				</AppIntlProvider>
			</SdkProvider>
		</MemoryRouter>
	);
};
