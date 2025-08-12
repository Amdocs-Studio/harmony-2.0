import { createContext, useCallback, useContext, useMemo } from 'react';
import HomeHeroMain from './components/HomeHero.main';
import { HomeHeroContextType, HomeHeroProps } from './HomeHero.types';
import { useAuth, useFlowManagerApi } from '@sdk';
import { navigate } from './HomeHero.i18n';
import { flowsTypes, TypesConfig } from '@flow-manager-config';

const HomeHeroContext = createContext<HomeHeroContextType | undefined>(undefined);

export const HomeHeroProvider = (props: HomeHeroProps) => {
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
		...props,
		navigate,
		onLogout: onLogoutClick,
		userInfo,
		onStartBuyFlow
	}), [navigate, onLogoutClick, userInfo, props]);
	
	return (
		<HomeHeroContext.Provider value={value}>
			<HomeHeroMain />
		</HomeHeroContext.Provider>
	);
};

export const useHomeHeroContext = () => useContext(HomeHeroContext) as HomeHeroContextType;