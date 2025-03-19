import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { HomeContextType, HomeProps } from './Home.types';
import { useAuth, useAppNavigate, useFlowManagerApi } from '@sdk';
import { flowsTypes, TypesConfig } from '@config';

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider = ({ children }: PropsWithChildren<HomeProps>) => {
	const { logout, userInfo } = useAuth();
	const navigate = useAppNavigate();
	const { startFlow } = useFlowManagerApi(navigate);

	const onLogoutClick = useCallback(() => {
		logout().then(() => {
			navigate('/');
		});
	}, [logout, navigate]);

	const onStartBuyFlow = async () => {
		startFlow(flowsTypes.flowTypes.COP, (flowsTypes as TypesConfig).stepTypes.DEVICE_GALLERY.name, true);
	};

	const value = useMemo(() => ({
		navigate,
		onLogout: onLogoutClick,
		userInfo,
		onStartBuyFlow
	}), [navigate, onLogoutClick, userInfo]);

	return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => useContext(HomeContext) as HomeContextType;