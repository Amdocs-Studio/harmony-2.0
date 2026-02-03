import { useCallback, useMemo } from 'react';
import NavbarMain from './components/Navbar.main';
import { NavbarProps } from './Navbar.types';
import { useAppIntl, useAuth } from '@sdk';
import { navigate, messages, getConfig } from './Navbar.i18n';
import { NavbarContext } from './Navbar.context';

export function NavbarProvider(props: NavbarProps) {
	const { formatMessage } = useAppIntl();
	const { logout, userInfo } = useAuth();
	const onLogoutClick = useCallback(() => {
		logout().then(() => {
			navigate('navigateToHome');
		});
	}, [logout, navigate]);
	
	const onLoginClick = () => navigate('navigateToLogin');

	const value = useMemo(() => ({
		...props,
		navigate,
		formatMessage,
		messages,
		config: getConfig(),
		onLogout: onLogoutClick,
		onLoginClick,
		userInfo,
		onBackToHome: () => navigate('navigateToHome'),
	}), [navigate, formatMessage, props]);

	return (
		<NavbarContext.Provider value={value}>
			<NavbarMain />
		</NavbarContext.Provider>
	);
}