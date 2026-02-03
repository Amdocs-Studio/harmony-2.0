import { useCallback, useMemo } from 'react';
import HomeHeroMain from './components/HomeHero.main';
import { HomeHeroProps } from './HomeHero.types';
import { useAuth, useAppNavigate, useFlowManagerApi } from '@sdk';
import { flowsTypes, TypesConfig } from '@flow-manager-config';
import { HomeHeroContext } from './HomeHero.context';

export const HomeHeroProvider = (props: HomeHeroProps) => {
	const { logout, userInfo } = useAuth();
	const navigate = useAppNavigate();
	const { startFlow } = useFlowManagerApi(navigate);
	
	const onLogoutClick = useCallback(() => {
		logout().then(() => {
			navigate('/');
		});
	}, [logout, navigate]);
	
	const onStartBuyFlow = async () => {
		return startFlow(flowsTypes.flowTypes.COP, (flowsTypes as TypesConfig).stepTypes.DEVICE_GALLERY.name, true);
	};
	
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