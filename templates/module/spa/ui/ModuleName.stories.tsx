import { StoryFn as Story, Meta } from '@storybook/react';
import ModuleName from './ModuleName';
import { ModuleNameProps } from '../ModuleName.types';
export default {
	title: 'Widgets/ModuleName',
	component: ModuleName,
} as Meta;

export const Default: Story<ModuleNameProps> = () => {
	return <ModuleName />;
};
