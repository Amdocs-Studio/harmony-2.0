import { StoryFn as Story, Meta } from '@storybook/react';
import { ShoppingCartDecorator as ShoppingCart } from './ShoppingCart.decorator';
import { ShoppingCartProps } from './ShoppingCart.types';

export default {
	title: 'Widgets/ShoppingCart',
	component: ShoppingCart,
} as Meta;

export const Default: Story<ShoppingCartProps> = () => {
	return <ShoppingCart />;
};
