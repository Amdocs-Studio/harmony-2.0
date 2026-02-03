import { useCallback, useMemo } from 'react';
import HomeHeroMain from './components/HomeHero.main';
import { HomeHeroProps } from './HomeHero.types';
import { useAuth } from '@sdk';
import { navigate } from './HomeHero.i18n';
import { HomeHeroContext } from './HomeHero.context';

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