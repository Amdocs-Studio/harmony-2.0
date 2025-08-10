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
	// tags: ['autodocs'],
	decorators: [
		(Story, {title, name}) => (
			<StorybookLayout title={title} name={name} >
				<Story />
			</StorybookLayout>
		),
	],
};

export default preview;
