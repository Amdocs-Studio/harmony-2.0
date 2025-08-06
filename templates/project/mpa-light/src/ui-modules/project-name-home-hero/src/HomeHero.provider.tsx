import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { HomeHeroContextType, HomeHeroProps } from './HomeHero.types';
import { useAuth } from '@sdk';
import { navigate } from './HomeHero.i18n';

const HomeHeroContext = createContext<HomeHeroContextType | undefined>(undefined);

export const HomeHeroProvider = ({ children }: PropsWithChildren<HomeHeroProps>) => {
	const { logout, userInfo } = useAuth();
	
	const onLogoutClick = useCallback(() => {
		logout().then(() => {
			navigate('/');
		});
	}, [logout, navigate]);
	
	const value = useMemo(() => ({
		navigate,
		onLogout: onLogoutClick,
		userInfo,
	}), [navigate, onLogoutClick, userInfo]);
	
	return <HomeHeroContext.Provider value={value}>{children}</HomeHeroContext.Provider>;
};

export const useHomeHeroContext = () => useContext(HomeHeroContext) as HomeHeroContextType;