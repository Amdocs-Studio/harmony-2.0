import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { HomeContextType, HomeProps } from './Home.types';
import { useAuth, useAppNavigate } from '@sdk';

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider = ({ children }: PropsWithChildren<HomeProps>) => {
	const { logout, userInfo } = useAuth();
	const navigate = useAppNavigate();

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

	return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => useContext(HomeContext) as HomeContextType;