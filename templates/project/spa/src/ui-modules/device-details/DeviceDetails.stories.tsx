import { StoryFn as Story, Meta } from '@storybook/react';
import DeviceDetails from './DeviceDetails';
import { DeviceDetailsProps } from './DeviceDetails.types';
export default {
	title: 'Widgets/DeviceDetails',
	component: DeviceDetails,
} as Meta;

export const Default: Story<DeviceDetailsProps> = () => {
	return <DeviceDetails />;
};
