import type { Preview } from '@storybook/react';
import { StorybookLayout } from './StorybookLayout';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<StorybookLayout >
				<Story />
			</StorybookLayout>
		),
	],
};

export default preview;
