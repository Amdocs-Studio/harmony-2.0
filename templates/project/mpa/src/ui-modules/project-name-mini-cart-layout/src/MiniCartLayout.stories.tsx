import { StoryFn as Story, Meta } from '@storybook/react';
import { MiniCartLayoutDecorator as MiniCartLayout } from './MiniCartLayout.decorator';
import { MiniCartLayoutProps } from './MiniCartLayout.types';

export default {
	title: 'Widgets/MiniCartLayout',
	component: MiniCartLayout,
} as Meta;

export const Default: Story<MiniCartLayoutProps> = () => {
	return (
		<MiniCartLayout pageTitle="some title">
			children here
		</MiniCartLayout>
	);
};
