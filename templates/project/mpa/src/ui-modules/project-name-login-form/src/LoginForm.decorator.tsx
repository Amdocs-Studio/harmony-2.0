import LoginForm from './LoginForm';
import descriptor from '../project-name-login-form.descriptor.json';
import { getConfigHandler, getNavigationHandler, ComponentDecorator } from '@sdk';
import { LoginFormProps } from './LoginForm.types.ts';

getNavigationHandler().registerRoutesFromDescriptor(descriptor);
getConfigHandler().registerConfigFromDescriptor(descriptor);

export const LoginFormDecorator = (props: LoginFormProps) => {
	return (
		<ComponentDecorator descriptor={descriptor}>
			<LoginForm {...props} />
		</ComponentDecorator>
	);
};
