import { StoryFn as Story, Meta } from '@storybook/react';
import Home from './Home';
import { HomeProps } from './Home.types';

export default {
	title: 'Widgets/Home',
	component: Home,
} as Meta;

export const Default: Story<HomeProps> = () => {
	return <Home />;
};
