import type { Meta, StoryObj } from '@storybook/react';

import { Header } from './Header';

const meta: Meta<typeof Header> = {
	title: 'Example/Header',
	component: Header,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
	args: {
		// Add props for the LoggedIn state here
	},
};

export const LoggedOut: Story = {
	args: {
		// Add props for the LoggedOut state here
	},
};
