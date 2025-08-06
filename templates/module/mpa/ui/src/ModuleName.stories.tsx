import { StoryFn as Story, Meta } from '@storybook/react';
import { ModuleNameDecorator as ModuleName } from './ModuleName.decorator';
import { ModuleNameProps } from './ModuleName.types';

export default {
	title: 'Widgets/ModuleName',
	component: ModuleName,
} as Meta;

export const Default: Story<ModuleNameProps> = () => {
	return <ModuleName />;
};
