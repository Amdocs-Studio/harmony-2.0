import { LoginFormProps } from './LoginForm.types';
import { LoginFormProvider } from './LoginForm.provider';
import LoginFormMain from './components/LoginForm.main';
import './styles/index.css';

export default function LoginForm(props: LoginFormProps) {
	return (
		<LoginFormProvider {...props}>
			<LoginFormMain />
		</LoginFormProvider>
	);
}