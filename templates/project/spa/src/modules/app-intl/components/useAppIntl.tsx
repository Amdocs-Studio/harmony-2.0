import { useIntl as useReactIntl } from 'react-intl';
import { AppIntlMessageKeys, TypedFormatMessageArgs } from '../Intl.types';
import { useCallback } from 'react';

export const useAppIntl = () => {
	const { formatMessage, ...rest } = useReactIntl();

	const typedFormatMessage = useCallback(<K extends AppIntlMessageKeys>(...args: TypedFormatMessageArgs<K>) => {
		const [descriptor, values, options] = args;
		return formatMessage(descriptor, values, options);
	}, [formatMessage]);

	return {
		...rest,
		formatMessage: typedFormatMessage,
	}
};
