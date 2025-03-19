import { NavbarProps } from './Navbar.types';
import { NavbarProvider } from './Navbar.provider';
import NavbarMain from './components/Navbar.main';
import './styles/index.css';

export default function Navbar(props: NavbarProps) {
	return (
		<NavbarProvider {...props}>
			<NavbarMain />
		</NavbarProvider>
	);
}