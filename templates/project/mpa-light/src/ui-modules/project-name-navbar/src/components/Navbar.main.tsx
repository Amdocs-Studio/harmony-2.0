import { Header } from '@common-components';
import { useNavbarContext } from '../Navbar.provider';

export default function NavbarMain() {
	const { onLogout, userInfo, onBackToHome, onLoginClick } = useNavbarContext();
	return (
		<Header
			onCreateAccount={() => {}}
			onLogin={onLoginClick}
			onLogout={onLogout}
			user={userInfo ? { name: userInfo.name } : undefined}
			onBackToHome={onBackToHome}
		/>
	);
}
