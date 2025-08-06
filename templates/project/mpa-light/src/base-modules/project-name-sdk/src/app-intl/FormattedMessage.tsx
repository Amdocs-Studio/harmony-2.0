import { FormattedMessage as RIFormattedMessage } from 'react-intl';

export default function FormattedMessage(props: any = {}) {
	const { id = 'missing key', defaultMessage = 'missing key', ...rest } = props;
	return (
		<RIFormattedMessage id={id} defaultMessage={defaultMessage} {...rest} />
	);
}
