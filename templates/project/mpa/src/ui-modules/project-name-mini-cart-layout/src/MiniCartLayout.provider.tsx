import { createContext, useContext, useMemo } from 'react';
import { MiniCartLayoutContextType, MiniCartLayoutProps } from './MiniCartLayout.types';
import { useAppIntl, useFlowManagerApi, useAppSelector } from '@sdk';
import { navigate, messages, getConfig } from './MiniCartLayout.i18n';
import MiniCartLayoutMain from './components/MiniCartLayout.main';

const MiniCartLayoutContext = createContext<MiniCartLayoutContextType | undefined>(undefined);

export function MiniCartLayoutProvider({ children, ...rest }: MiniCartLayoutProps) {
	const { formatMessage } = useAppIntl();
	const cartItems = useAppSelector(s => s.shoppingCart.cartItems);
	const { moveToNextStep } = useFlowManagerApi();
	const onMiniCartContinue = async () => {
		moveToNextStep();
	};

	const value = useMemo(() => ({
		...rest,
		navigate,
		formatMessage,
		messages,
		config: getConfig(),
		cartItems,
		onMiniCartContinue
	}), [navigate, formatMessage, cartItems, onMiniCartContinue, rest]);

	return (
		<MiniCartLayoutContext.Provider value={value}>
			<MiniCartLayoutMain>
				{children}
			</MiniCartLayoutMain>
		</MiniCartLayoutContext.Provider>
	);

}

export const useMiniCartLayoutContext = () => useContext(MiniCartLayoutContext) as MiniCartLayoutContextType;