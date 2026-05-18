import { FlattenObject } from './MessagesTypes';

export function flattenObject<T>(
	obj: T,
	parentKey: string = '',
): FlattenObject<T> {
	const  flatObject: Record<string, any> = {};
	for (const key in obj) {
		const fullKey = parentKey ? `${parentKey}.${key}` : key;
		if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
			Object.assign(flatObject, flattenObject(obj[key], fullKey));
		} else {
			flatObject[fullKey] = obj[key];
		}
	}
	return flatObject as FlattenObject<T>;
}

type CreateMessagesObject<T, Prefix extends string = ''> = {
	[K in keyof T]: T[K] extends object
		? T[K] extends string
			? { id: Prefix extends '' ? K & string : `${Prefix}.${K & string}` }
			: CreateMessagesObject<T[K], Prefix extends '' ? K & string : `${Prefix}.${K & string}`>
		: { id: Prefix extends '' ? K & string : `${Prefix}.${K & string}` };
};

export function createMessagesObject<T extends Record<string, any>>(
	obj: T,
	parentKey: string = '',
): CreateMessagesObject<T> {
	const result: Record<string, any> = {};
	for (const key in obj) {
		const fullKey = parentKey ? `${parentKey}.${key}` : key;
		if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
			result[key] = createMessagesObject(obj[key], fullKey);
		} else {
			result[key] = { id: fullKey };
		}
	}
	return result as CreateMessagesObject<T>;
}

