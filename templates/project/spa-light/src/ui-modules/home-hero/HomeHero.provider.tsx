import { useCallback, useMemo } from 'react';
import HomeHeroMain from './components/HomeHero.main';
import { HomeHeroProps } from './HomeHero.types';
import { useAuth, useAppNavigate } from '@sdk';
import { useAppIntl } from '@msgs';
import { HomeHeroContext } from './HomeHero.context';

export const HomeHeroProvider = (props: HomeHeroProps) => {
	const { logout, userInfo } = useAuth();
	const navigate = useAppNavigate();
	const { formatMessage } = useAppIntl();
	
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
		formatMessage,
	}), [navigate, onLogoutClick, userInfo, formatMessage, props]);
	
	return (
		<HomeHeroContext.Provider value={value}>
			<HomeHeroMain />
		</HomeHeroContext.Provider>
	);
};