import { LoginProps } from './Login.types';
import { LoginProvider } from './Login.provider';
import LoginMain from './components/Login.main';
import './styles/index.css';

export default function Login(props: LoginProps) {
	return (
		<LoginProvider {...props}>
			<LoginMain />
		</LoginProvider>
	);
}