import { StoryFn as Story, Meta } from '@storybook/react';
import MiniCartLayout from './MiniCartLayout';
import { MiniCartLayoutProps } from './MiniCartLayout.types';
export default {
	title: 'Widgets/MiniCartLayout',
	component: MiniCartLayout,
} as Meta;

export const Default: Story<MiniCartLayoutProps> = () => {
	return <MiniCartLayout pageTitle="Some page title" />;
};
