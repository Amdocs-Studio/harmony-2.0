import { StoryFn as Story, Meta } from '@storybook/react';
import { DeviceDetailsDecorator as DeviceDetails } from './DeviceDetails.decorator';
import { DeviceDetailsProps } from './DeviceDetails.types';

export default {
	title: 'Widgets/DeviceDetails',
	component: DeviceDetails,
} as Meta;

export const Default: Story<DeviceDetailsProps> = () => {
	return <DeviceDetails />;
};
