import { PropsWithChildren, useEffect, useState } from 'react';
import { SdkProvider, config } from '@sdk';
import { FeedbackHandler } from '@feedback-handler';
import { enableMocking } from '@mocks';

import '../src/base-modules/project-name-base-styles/src/style.css';

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
	const [mockEnabled, setMockEnabled] = useState<boolean>(false);
	useEffect(() => {
		if (config.useMocks) {
			enableMocking().then(() => setMockEnabled(true));
		} else {
			setMockEnabled(true);
		}
	}, []);
	if (!mockEnabled) {
		return;
	}
	return (
		<SdkProvider>
			<StoryWrapper title={title} name={name}>
				{children}
			</StoryWrapper>
			<FeedbackHandler />
		</SdkProvider>
	);
};
