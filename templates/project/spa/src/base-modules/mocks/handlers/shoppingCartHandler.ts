import { MockHandlerType } from '../types.ts';
import { config, Device } from '@sdk';
import { HttpResponse } from 'msw';

const devices: Device[] = [
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
	{
		'brand': 'Apple',
		'sku': 'Apple3',
		'description': 'The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.',
		'images': [
			'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/1.png',
			'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/2.png',
			'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/3.png'
		],
		'price': 1099.99,
		'title': 'iPhone 13 Pro'
	},
	{
		'brand': 'Apple',
		'sku': 'Apple4',
		'description': 'The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.',
		'images': [
			'https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/1.png',
			'https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/2.png',
			'https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/3.png'
		],
		'price': 899.99,
		'title': 'iPhone X'
	},
	{
		'brand': 'Samsung',
		'sku': 'Samsung1',
		'description': 'The Samsung Galaxy S7 is a flagship smartphone known for its sleek design and advanced features. It features a high-resolution display, powerful camera, and robust performance.',
		'images': [
			'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S7/1.png',
			'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S7/2.png',
			'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S7/3.png'
		],
		'price': 299.99,
		'title': 'Samsung Galaxy S7'
	},
	{
		'brand': 'Samsung',
		'sku': 'Samsung2',
		'description': 'The Samsung Galaxy S8 is a premium smartphone with an Infinity Display, offering a stunning visual experience. It boasts advanced camera capabilities and cutting-edge technology.',
		'images': [
			'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S8/1.png',
			'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S8/2.png',
			'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S8/3.png'
		],
		'price': 499.99,
		'title': 'Samsung Galaxy S8'
	},
	{
		'brand': 'Samsung',
		'sku': 'Samsung3',
		'description': 'The Samsung Galaxy S10 is a flagship device featuring a dynamic AMOLED display, versatile camera system, and powerful performance. It represents innovation and excellence in smartphone technology.',
		'images': [
			'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S10/1.png',
			'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S10/2.png',
			'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S10/3.png'
		],
		'price': 699.99,
		'title': 'Samsung Galaxy S10'
	}
];

export const shoppingCart: MockHandlerType[] = [
	{
		url: `${config.apiBaseUrl}/v1/shopping-cart/devices`,
		resolver: () => {
			return HttpResponse.json(devices);
		}
	},
];