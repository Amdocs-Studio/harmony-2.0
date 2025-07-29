import { AppIntlMessageKeys } from './Intl.types';

export const getExactTypedKeyList = <T extends AppIntlMessageKeys[]>(keys: T) => keys;
