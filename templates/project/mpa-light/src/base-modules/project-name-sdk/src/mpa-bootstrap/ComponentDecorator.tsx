import { PropsWithChildren } from 'react';
import { AppIntlProvider, DescriptorType } from '@sdk';

export const ComponentDecorator = ({
	children,
	descriptor,
}: PropsWithChildren<{
	descriptor: DescriptorType;
	props?: any
}>) => {
	const { content } = descriptor;
	const providerMessages: Record<string, string> = {};
	content.forEach(({ itemId, defaultValue }) => {
		providerMessages[itemId] = defaultValue;
	});

	return (
		<AppIntlProvider messages={providerMessages}>
			{children}
		</AppIntlProvider>
	);
};
