import { StoryFn as Story, Meta } from '@storybook/react';
import HomeHero from './HomeHero';
import { HomeHeroProps } from './HomeHero.types';

export default {
	title: 'Widgets/HomeHero',
	component: HomeHero,
} as Meta;

export const Default: Story<HomeHeroProps> = () => {
	return <HomeHero />;
};
