import { StoryFn as Story, Meta } from '@storybook/react';
import ShoppingCart from './ShoppingCart';
import { ShoppingCartProps } from './ShoppingCart.types';
export default {
	title: 'Widgets/ShoppingCart',
	component: ShoppingCart,
} as Meta;

export const Default: Story<ShoppingCartProps> = () => {
	return <ShoppingCart />;
};
