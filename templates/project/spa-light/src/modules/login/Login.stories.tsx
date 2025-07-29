import { StoryFn as Story, Meta } from '@storybook/react';
import Login from './Login';
import { LoginProps } from './Login.types';
export default {
	title: 'Widgets/Login',
	component: Login,
} as Meta;

export const Default: Story<LoginProps> = () => {
	return <Login />;
};
