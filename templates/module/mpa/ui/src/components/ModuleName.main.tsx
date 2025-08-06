import { Button } from '@common-components';
import { useModuleNameContext } from '../ModuleName.provider';

export default function ModuleNameMain() {
	const { navigate, formatMessage, messages } = useModuleNameContext();
	return (
		<div>
			{formatMessage(messages.moduleNameTitle)} main view
			<Button onClick={() => navigate('navigateToHome')} label='Go to home' />
		</div>
	);
}
