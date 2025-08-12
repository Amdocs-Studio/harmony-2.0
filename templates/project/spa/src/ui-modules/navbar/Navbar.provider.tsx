import { createContext, useCallback, useContext, useMemo } from 'react';
import NavbarMain from './components/Navbar.main';
import { NavbarContextType, NavbarProps } from './Navbar.types';
import { useAuth, useAppNavigate } from '@sdk';

export const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider(props: NavbarProps) {
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
		onBackToHome: () => navigate('/')
	}), [navigate, onLogoutClick, userInfo, props]);

	return (
		<NavbarContext.Provider value={value}>
			<NavbarMain />
		</NavbarContext.Provider>
	);
}

export const useNavbarContext = () => useContext(NavbarContext) as NavbarContextType;