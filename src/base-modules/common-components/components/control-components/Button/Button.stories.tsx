import type { Meta, StoryFn as Story } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
	title: 'Common-Components/Control-Components/Button',
	component: Button,
} as Meta;

export const Default: Story<ButtonProps> = (args) => {
	return (
		<div className="flex flex-col gap-3">
			<Button {...args}>Default (primary)</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="tertiary">Tertiary</Button>
			<Button size="small">Small</Button>
			<Button size="large">Large</Button>
		</div>
	);
};
