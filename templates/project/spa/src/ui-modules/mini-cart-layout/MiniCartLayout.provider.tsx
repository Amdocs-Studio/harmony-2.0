import React, { createContext, useContext, useMemo } from 'react';
import { MiniCartLayoutContextType, MiniCartLayoutProps } from './MiniCartLayout.types';
import MiniCartLayoutMain from './components/MiniCartLayout.main';
import { useAppNavigate, useFlowManagerApi, useShoppingCart } from '@sdk';
import { useSelector } from 'react-redux';

const MiniCartLayoutContext = createContext<MiniCartLayoutContextType | undefined>(undefined);

export function MiniCartLayoutProvider({ children, ...rest }: MiniCartLayoutProps) {
	const navigate = useAppNavigate();
	const { getCartItems } = useShoppingCart();
	const cartItems = useSelector(getCartItems) ?? [];
	const { moveToNextStep } = useFlowManagerApi(navigate);
	
	const value = useMemo(() => {
		const onMiniCartContinue = async () => {
			moveToNextStep();
		};
		return {
			navigate,
			cartItems,
			onMiniCartContinue,
			...rest
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

export const useMiniCartLayoutContext = () => useContext(MiniCartLayoutContext) as MiniCartLayoutContextType;
