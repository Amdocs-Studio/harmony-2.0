import { FormattedMessage as ReactIntlFormattedMessage } from 'react-intl';
import { AppIntlMessageKeys, FormattedMessageProps } from '../Intl.types';

export default function FormattedAppMessage<K extends AppIntlMessageKeys>({ id, values, ...rest }: FormattedMessageProps<K>) {
	return <ReactIntlFormattedMessage id={id} values={values} {...rest} />;
}
