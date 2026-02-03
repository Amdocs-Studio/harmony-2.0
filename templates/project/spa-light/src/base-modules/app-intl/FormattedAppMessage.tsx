import type { ComponentProps } from 'react';
import { FormattedMessage as ReactIntlFormattedMessage } from 'react-intl';
import { ExtractMessageDescriptorValues, ExtractSerializableMessageDescriptorValues, FlattenKeys } from './MessagesTypes';
import enMessages from './en';

type ReactIntlFormattedMessageProps = ComponentProps<typeof ReactIntlFormattedMessage>;

type Messages = typeof enMessages;
export type MessageValuesMap = ExtractMessageDescriptorValues<Messages>
export type SerializableMessageValuesMap = ExtractSerializableMessageDescriptorValues<Messages>
export type AppIntlMessageKeys = FlattenKeys<Messages>;

export type ConditionalValues<K extends AppIntlMessageKeys> = {} extends MessageValuesMap[K]
	? { values?: MessageValuesMap[K] }
	: { values: MessageValuesMap[K] };

type FormattedMessageProps<K extends AppIntlMessageKeys> = Omit<ReactIntlFormattedMessageProps, 'values'> & {
	id: K;
} & ConditionalValues<K>;

export default function FormattedAppMessage<K extends AppIntlMessageKeys>({ id, values, ...rest }: FormattedMessageProps<K>) {
	return <ReactIntlFormattedMessage id={id} values={values} {...rest} />;
}