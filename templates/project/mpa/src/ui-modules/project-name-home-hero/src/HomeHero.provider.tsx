import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { HomeHeroContextType, HomeHeroProps } from './HomeHero.types';
import { useAuth, useFlowManagerApi } from '@sdk';
import { navigate } from './HomeHero.i18n';
import { flowsTypes, TypesConfig } from '@flow-manager-config';

const HomeHeroContext = createContext<HomeHeroContextType | undefined>(undefined);

export const HomeHeroProvider = ({ children }: PropsWithChildren<HomeHeroProps>) => {
	const { logout, userInfo } = useAuth();
	const { startFlow } = useFlowManagerApi();
	
	const onStartBuyFlow = async () => {
		startFlow(flowsTypes.flowTypes.COP, (flowsTypes as TypesConfig).stepTypes.DEVICE_GALLERY.name, true);
	};
	
	const onLogoutClick = useCallback(() => {
		logout().then(() => {
			navigate('navigateToHome');
		});
	}, [logout, navigate]);
	
	const value = useMemo(() => ({
		navigate,
		onLogout: onLogoutClick,
		userInfo,
		onStartBuyFlow,
	}), [navigate, onLogoutClick, userInfo]);
	
	return <HomeHeroContext.Provider value={value}>{children}</HomeHeroContext.Provider>;
};

export const useHomeHeroContext = () => useContext(HomeHeroContext) as HomeHeroContextType;