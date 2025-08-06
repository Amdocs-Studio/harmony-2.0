import { StoryFn as Story, Meta } from '@storybook/react';
import LoginForm from './LoginForm';
import { LoginFormProps } from './LoginForm.types';

export default {
	title: 'Widgets/LoginForm',
	component: LoginForm,
} as Meta;

export const Default: Story<LoginFormProps> = () => {
	return <LoginForm />;
};
