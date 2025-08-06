import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { NavbarContextType, NavbarProps } from './Navbar.types';
import { useAppIntl, useAuth } from '@sdk';
import { navigate, messages, getConfig } from './Navbar.i18n';

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: PropsWithChildren<NavbarProps>) {
	const { formatMessage } = useAppIntl();
	const { logout, userInfo } = useAuth();
	const onLogoutClick = useCallback(() => {
		logout().then(() => {
			navigate('navigateToHome');
		});
	}, [logout, navigate]);
	
	const onLoginClick = () => navigate('navigateToLogin');

	const value = useMemo(() => ({
		navigate,
		formatMessage,
		messages,
		config: getConfig(),
		onLogout: onLogoutClick,
		onLoginClick,
		userInfo,
		onBackToHome: () => navigate('navigateToHome'),
	}), [navigate, formatMessage]);

	return <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>;

}

export const useNavbarContext = () => useContext(NavbarContext) as NavbarContextType;