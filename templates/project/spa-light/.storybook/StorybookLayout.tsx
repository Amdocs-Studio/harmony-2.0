import { PropsWithChildren } from 'react';
import { SdkProvider } from '@sdk';
import { AppIntlProvider } from '@msgs';
import { MemoryRouter } from 'react-router';
import { FeedbackHandler } from '@feedback-handler';

import '../src/base-modules/base-styles/style.css';

type StoryWrapperProps = PropsWithChildren<{
	title: string;
	name: string;
}>;

export const StoryWrapper = ({ title, name, children }: StoryWrapperProps) => (
	<div className="w-full h-full mt-8 p-6 bg-white rounded-lg shadow border border-gray-100">
		<header className="mb-4">
			<h1 className="text-2xl font-bold text-primary mb-1">Project Name</h1>
			<div className="text-lg font-semibold text-gray-800">{title}</div>
			<div className="text-sm text-gray-500">Story: {name}</div>
		</header>
		<div>{children}</div>
	</div>
);

export const StorybookLayout = ({ children, title, name }: StoryWrapperProps) => {
	return (
		<MemoryRouter>
			<SdkProvider>
				<AppIntlProvider >
					<StoryWrapper title={title} name={name}>
						{children}
					</StoryWrapper>
					<FeedbackHandler />
				</AppIntlProvider>
			</SdkProvider>
		</MemoryRouter>
	);
};
