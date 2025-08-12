import { LoginFormProps } from './LoginForm.types';
import { LoginFormProvider } from './LoginForm.provider';
import './styles/index.css';

export default function LoginForm(props: LoginFormProps) {
	return <LoginFormProvider {...props} />;
}