import { ReactNode, ReactElement } from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';

export function useAppIntl() {
	const { formatMessage, ...rest } = useIntl();
	
	type MessageFormatPrimitiveValue = string | number | boolean | null | undefined
	function formatMessageWithDefault(
		descriptor: MessageDescriptor,
		values?: Record<string, MessageFormatPrimitiveValue>
	): string
	function formatMessageWithDefault(
		descriptor: MessageDescriptor,
		values?: Record<string, MessageFormatPrimitiveValue | ReactElement>
	): string | ReactNode[] {
		const { id = 'no-id', defaultMessage = 'no-message' } = descriptor || {};
		return formatMessage({ id, defaultMessage }, values);
	}
	return {
		formatMessage: formatMessageWithDefault,
		...rest
	};
}