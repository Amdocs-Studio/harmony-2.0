import React from 'react';
import clsx from 'clsx';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
	variant?: 'primary' | 'secondary' | 'tertiary';
	label?: string;
	size?: 'small' | 'medium' | 'large';
	disabled?: boolean;
};

export function Button({
	className = '',
	children,
	variant = 'primary',
	label,
	size = 'medium',
	disabled,
	...props
}: ButtonProps) {
	const classes = clsx(
		'font-medium w-fit rounded-lg shadow transition duration-200 focus:outline-none focus:ring-4', {
			'px-3 py-1 text-sm': size === 'small',
			'px-6 py-3 text-base': size === 'medium',
			'px-8 py-4 text-lg': size === 'large',
			'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-300': variant === 'primary' && !disabled,
			'bg-white text-primary-700 border border-primary-600 hover:bg-primary-50 focus:ring-primary-200': variant === 'secondary' && !disabled,
			'bg-transparent text-primary-700 hover:bg-primary-50 focus:ring-primary-100': variant === 'tertiary' && !disabled,
			'bg-gray-300 text-gray-500 border-none cursor-not-allowed': disabled
		},
		className
	);
	return (
		<button
			className={classes}
			disabled={disabled}
			{...props}
		>
			{label || children}
		</button>
	);
}