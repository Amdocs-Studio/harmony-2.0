import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { NavbarContextType, NavbarProps } from './Navbar.types';
import { useAuth, useAppNavigate } from '@sdk';

export const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: PropsWithChildren<NavbarProps>) {
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
		onBackToHome: () => navigate('/') }), [navigate, onLogoutClick, userInfo]);

	return <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>;
}

export const useNavbarContext = () => useContext(NavbarContext) as NavbarContextType;