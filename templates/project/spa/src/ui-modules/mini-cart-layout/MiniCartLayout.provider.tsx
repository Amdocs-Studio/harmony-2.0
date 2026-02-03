import React, { useMemo } from 'react';
import { MiniCartLayoutProps } from './MiniCartLayout.types';
import MiniCartLayoutMain from './components/MiniCartLayout.main';
import { useAppNavigate, useFlowManagerApi, useAppSelector } from '@sdk';
import { MiniCartLayoutContext } from './MiniCartLayout.context';

export function MiniCartLayoutProvider({ children, ...rest }: MiniCartLayoutProps) {
	const navigate = useAppNavigate();
	const cartItems = useAppSelector(s => s.shoppingCart.cartItems) || [];
	const { moveToNextStep } = useFlowManagerApi(navigate);
	
	const value = useMemo(() => {
		const onMiniCartContinue = async () => {
			return moveToNextStep();
		};
		return {
			...rest,
			navigate,
			cartItems,
			onMiniCartContinue,
		};
	}, [navigate, children, cartItems, moveToNextStep, rest]);
	
	return (
		<MiniCartLayoutContext.Provider value={value}>
			<MiniCartLayoutMain>
				{children}
			</MiniCartLayoutMain>
		</MiniCartLayoutContext.Provider>
	);
	
}
