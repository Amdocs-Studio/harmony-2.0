import { StoryFn as Story, Meta } from '@storybook/react';
import Navbar from './Navbar';
import { NavbarProps } from './Navbar.types';

export default {
	title: 'Widgets/Navbar',
	component: Navbar,
} as Meta;

export const Default: Story<NavbarProps> = () => {
	return <Navbar />;
};
