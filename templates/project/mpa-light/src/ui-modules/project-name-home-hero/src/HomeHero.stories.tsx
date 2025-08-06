import { StoryFn as Story, Meta } from '@storybook/react';
import { HomeHeroDecorator as HomeHero } from './HomeHero.decorator';
import { HomeHeroProps } from './HomeHero.types';

export default {
	title: 'Widgets/HomeHero',
	component: HomeHero,
} as Meta;

export const Default: Story<HomeHeroProps> = () => {
	return <HomeHero />;
};
