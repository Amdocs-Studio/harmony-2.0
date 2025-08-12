import { NavbarProps } from './Navbar.types';
import { NavbarProvider } from './Navbar.provider';
import './styles/index.css';

export default function Navbar(props: NavbarProps) {
	return <NavbarProvider {...props} />;
}