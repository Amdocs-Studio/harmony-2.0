import { useCallback, useMemo } from 'react';
import NavbarMain from './components/Navbar.main';
import { NavbarProps } from './Navbar.types';
import { useAuth, useAppNavigate } from '@sdk';
import { useAppIntl } from '@msgs';
import { NavbarContext } from './Navbar.context';

export function NavbarProvider(props: NavbarProps) {
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
		onBackToHome: () => navigate('/'),
		formatMessage,
	}), [navigate, onLogoutClick, userInfo, formatMessage, props]);

	return (
		<NavbarContext.Provider value={value}>
			<NavbarMain />
		</NavbarContext.Provider>
	);
}