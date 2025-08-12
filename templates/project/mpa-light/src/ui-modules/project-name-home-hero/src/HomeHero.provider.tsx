import { createContext, useCallback, useContext, useMemo } from 'react';
import HomeHeroMain from './components/HomeHero.main';
import { HomeHeroContextType, HomeHeroProps } from './HomeHero.types';
import { useAuth } from '@sdk';
import { navigate } from './HomeHero.i18n';

const HomeHeroContext = createContext<HomeHeroContextType | undefined>(undefined);

export const HomeHeroProvider = (props: HomeHeroProps) => {
	const { logout, userInfo } = useAuth();
	
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
	}), [navigate, onLogoutClick, userInfo, props]);
	
	return (
		<HomeHeroContext.Provider value={value}>
			<HomeHeroMain />
		</HomeHeroContext.Provider>
	);
};

export const useHomeHeroContext = () => useContext(HomeHeroContext) as HomeHeroContextType;