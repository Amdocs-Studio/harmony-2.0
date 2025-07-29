import { Header } from '@common-components';
import { useNavbarContext } from '../Navbar.provider';

export default function NavbarMain() {
	const { navigate, onLogout, userInfo, onBackToHome } = useNavbarContext();
	return (
		<Header
			onCreateAccount={() => {}}
			onLogin={() => navigate('/login')}
			onLogout={onLogout}
			user={userInfo ? { name: userInfo.name } : undefined}
			onBackToHome={onBackToHome}
		/>
	);
}
