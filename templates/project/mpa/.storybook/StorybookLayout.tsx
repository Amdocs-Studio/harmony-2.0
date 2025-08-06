import { SdkProvider } from '@sdk';
import { FeedbackHandler } from '@feedback-handler';

import '../src/base-modules/project-name-base-styles/src/style.css';

import { PropsWithChildren } from 'react';

export const StorybookLayout = ({ children }: PropsWithChildren<{}>) => {
	return (
		<SdkProvider >
				{children}
				<FeedbackHandler />
		</SdkProvider>
	);
};
