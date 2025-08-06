import { StoryFn as Story, Meta } from '@storybook/react';
import DeviceGallery from './DeviceGallery';
import { DeviceGalleryProps } from './DeviceGallery.types';
export default {
	title: 'Widgets/DeviceGallery',
	component: DeviceGallery,
} as Meta;

export const Default: Story<DeviceGalleryProps> = () => {
	return <DeviceGallery />;
};
