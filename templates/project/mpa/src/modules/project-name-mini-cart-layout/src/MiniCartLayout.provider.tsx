import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MiniCartLayoutContextType, MiniCartLayoutProps } from './MiniCartLayout.types';
import { useAppNavigate, useFlowManagerApi, useShoppingCart } from '@sdk';

const MiniCartLayoutContext = createContext<MiniCartLayoutContextType | undefined>(undefined);

export function MiniCartLayoutProvider({ children, ...rest }: PropsWithChildren<MiniCartLayoutProps>) {
	const navigate = useAppNavigate();
	const { getCartItems } = useShoppingCart();
	const { moveToNextStep } = useFlowManagerApi(navigate);
	const cartItems = useSelector(getCartItems) ?? [];
	const onMiniCartContinue = async () => {
		moveToNextStep();
	};

	const value = useMemo(() => ({
		navigate,
		children: children as React.ReactNode,
		cartItems,
		onMiniCartContinue,
		...rest
	}), [navigate, children, cartItems]);

	return <MiniCartLayoutContext.Provider value={value}>{children}</MiniCartLayoutContext.Provider>;

}

export const useMiniCartLayoutContext = () => useContext(MiniCartLayoutContext) as MiniCartLayoutContextType;
