import type { Meta, StoryFn as Story } from '@storybook/react';

import { Header, HeaderProps } from './Header';

export default {
	title: 'Common-Components/Business-Components/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta;

export const Default: Story<HeaderProps> = () => {
	return (
		<Header
			onBackToHome={() => alert('Back to Home clicked')}
			onCreateAccount={() => alert('Create Account clicked')}
			onLogin={() => alert('Login clicked')}
			onLogout={() => alert('Logout clicked')}
		/>
	);
};
