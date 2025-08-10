import React from 'react';
import { Button } from '../../control-components';

export type DeviceCardProps = {
	brand: string;
	description: string;
	images: string[];
	price: number;
	title: string;
	sku: string;
	handleBuyNow?: () => void;
};

export const DeviceCard = (
	{
		brand,
		description,
		images,
		price,
		title,
		sku,
		handleBuyNow,
	}: DeviceCardProps
) => (
	<div className="shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 bg-white flex w-[600px]">
		<div className="w-[500px] h-[300px] flex items-center justify-center bg-gray-100 rounded-tl-xl rounded-bl-xl overflow-hidden">
			<img
				src={images[0]}
				alt={title}
				className="w-full h-full object-cover rounded-tl-xl rounded-bl-xl transition-transform duration-300 transform hover:scale-105"
			/>
		</div>
		<div className="p-4 flex flex-col justify-between">
			<div>
				<div className="flex justify-between items-center mb-2">
					<span className="text-lg font-bold text-gray-800">{title}</span>
					<span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{brand}</span>
				</div>
				<p className="text-gray-600 mb-2 text-sm">{description}</p>
				<div className="flex justify-between items-center mt-4">
					<span className="text-green-600 font-semibold text-base">${price.toFixed(2)}</span>
					<span className="text-xs text-gray-400">SKU: {sku}</span>
				</div>
			</div>
			{handleBuyNow && <div className="mt-4 flex justify-end items-center">
				<Button onClick={handleBuyNow}>Buy now</Button>
			</div>}
			
		</div>
	</div>
);