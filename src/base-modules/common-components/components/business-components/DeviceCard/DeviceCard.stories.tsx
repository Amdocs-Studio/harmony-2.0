import type { Meta, StoryFn as Story } from '@storybook/react';

import { DeviceCard, DeviceCardProps } from './DeviceCard';

export default {
	title: 'Common-Components/Business-Components/DeviceCard',
	component: DeviceCard,
} as Meta;

export const Default: Story<DeviceCardProps> = (args) => {
	const dummyDevices: DeviceCardProps[] = [
		{
			'brand': 'Apple',
			'sku': 'Apple1',
			'description': 'The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it\'s an older model, it still provides a reliable user experience.',
			'images': [
				'https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png',
				'https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/2.png',
				'https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/3.png'
			],
			'price': 199.99,
			'title': 'iPhone 5s'
		},
		{
			'brand': 'Apple',
			'sku': 'Apple2',
			'description': 'The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.',
			'images': [
				'https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/1.png',
				'https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/2.png',
				'https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/3.png'
			],
			'price': 299.99,
			'title': 'iPhone 6'
		},
	];
	return (
		<div className="flex flex-col gap-3">
			{dummyDevices.map((device, index) => (
				<DeviceCard
					{...device}
					{...args}
					key={index}
					handleBuyNow={() => alert(`Buying ${device.title}`)}
				/>
			))}
		</div>
	);
};
