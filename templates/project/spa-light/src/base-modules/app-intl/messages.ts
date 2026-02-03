import enMessages from './en';
import { createMessagesObject } from './helper';

export type MessagesStructure = MatchStructure<typeof enMessages, typeof enMessages>;

export const localesList = ['en'] as const;
export type Locales = typeof localesList[number];
export const messages: { [key in Locales]: MessagesStructure } = {
	en: enMessages
};

export const Messages = createMessagesObject(enMessages);

type MatchStructure<T, U> = {
	[K in keyof T]: K extends keyof U ? MatchStructure<T[K], U[K]> : never;
};
