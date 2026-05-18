import type { IntlFormatters } from 'react-intl';
import { useIntl as useReactIntl } from 'react-intl';
import { useCallback, useMemo } from 'react';
import { HasKeys } from './MessagesTypes';
import { AppIntlMessageKeys, ConditionalValues } from './FormattedAppMessage';
import { flattenObject } from './helper';
import { Locales, messages } from './messages';
import { useAppSelector } from '@sdk';

type FormatMessageArgs = [
  descriptor: Args[0],
  values?: Record<string, string | number>,
  opts?: Args[2],
];
type MessageDescriptorType<ID extends AppIntlMessageKeys> =
  FormatMessageArgs[0] & {
    id?: ID;
  };
type ValuesType<ID extends AppIntlMessageKeys> = ConditionalValues<ID>['values'];
type OptionsType = FormatMessageArgs[2];

type TypedFormatMessageArgs<K extends AppIntlMessageKeys> =
  HasKeys<ValuesType<K>> extends true
    ? [
        descriptor: MessageDescriptorType<K>,
        values: ValuesType<K>,
        options?: OptionsType,
      ]
    : [
        descriptor: MessageDescriptorType<K>,
        values?: ValuesType<K>,
        options?: OptionsType,
      ];

export const useAppIntl = () => {
	const { formatMessage, ...rest } = useReactIntl();

	const typedFormatMessage = useCallback(
    <K extends AppIntlMessageKeys>(...args: TypedFormatMessageArgs<K>) => {
    	const [descriptor, values, options] = args;
    	return formatMessage(descriptor, values, options);
    },
    [formatMessage],
	);

	return {
		...rest,
		formatMessage: typedFormatMessage
	};
};

type Args = Parameters<IntlFormatters['formatMessage']>;

export type AppIntlShape = ReturnType<typeof useAppIntl>;
export type FormatMessageType = AppIntlShape['formatMessage'];

export const useAppMessages = () => {
	const locale  = useAppSelector(s => s.app.locale);
	const currentMessages = useMemo(
		() => flattenObject(messages[locale as Locales]),
		[locale]
	);
	return {
		currentMessages
	};
};