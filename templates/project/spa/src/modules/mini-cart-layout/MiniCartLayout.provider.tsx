import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { MiniCartLayoutContextType, MiniCartLayoutProps } from './MiniCartLayout.types';
import { useAppNavigate, useFlowManagerApi, useShoppingCart } from '@sdk';
import { useSelector } from 'react-redux';

const MiniCartLayoutContext = createContext<MiniCartLayoutContextType | undefined>(undefined);

export function MiniCartLayoutProvider({ children, ...rest }: PropsWithChildren<MiniCartLayoutProps>) {
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
			children: children as React.ReactNode,
			cartItems,
			onMiniCartContinue,
			...rest
		};
	}, [navigate, children, cartItems, moveToNextStep, rest]);

	return <MiniCartLayoutContext.Provider value={value}>{children}</MiniCartLayoutContext.Provider>;

}

export const useMiniCartLayoutContext = () => useContext(MiniCartLayoutContext) as MiniCartLayoutContextType;
