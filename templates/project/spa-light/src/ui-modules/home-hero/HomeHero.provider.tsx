import { useCallback, useMemo } from 'react';
import HomeHeroMain from './components/HomeHero.main';
import { HomeHeroProps } from './HomeHero.types';
import { useAuth, useAppNavigate } from '@sdk';
import { HomeHeroContext } from './HomeHero.context';

export const HomeHeroProvider = (props: HomeHeroProps) => {
	const { logout, userInfo } = useAuth();
	const navigate = useAppNavigate();
	
	const onLogoutClick = useCallback(() => {
		logout().then(() => {
			navigate('/');
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