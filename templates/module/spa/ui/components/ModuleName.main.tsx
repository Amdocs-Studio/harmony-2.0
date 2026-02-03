import { Button } from '@common-components';
import { Messages } from '@msgs';
import { useModuleNameContext } from '../ModuleName.context';

export default function ModuleNameMain() {
	const { navigate, formatMessage } = useModuleNameContext();
	return (
		<div>
			ModuleName main view
			<Button onClick={() => navigate('/')} label={formatMessage(Messages.Common.goToHome)} />
		</div>
	);
}
