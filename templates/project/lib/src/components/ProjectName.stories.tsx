import { StoryFn as Story, Meta } from '@storybook/react';
import ProjectName from './ProjectName';
import { ProjectNameProps } from '../types';

export default {
	title: 'Components/ProjectName',
	component: ProjectName,
} as Meta;

export const Default: Story<ProjectNameProps> = () => {
	return <ProjectName />;
};

export const WithTitle: Story<ProjectNameProps> = () => {
	return <ProjectName title="Custom Title" />;
};
