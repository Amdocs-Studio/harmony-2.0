import { useMemo } from 'react';
import { MiniCartLayoutProps } from './MiniCartLayout.types';
import { useAppIntl, useFlowManagerApi, useAppSelector } from '@sdk';
import { navigate, messages, getConfig } from './MiniCartLayout.i18n';
import MiniCartLayoutMain from './components/MiniCartLayout.main';
import { MiniCartLayoutContext } from './MiniCartLayout.context';

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