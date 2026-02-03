import { PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

export type Merge<T> = {
	[K in keyof T]: T[K];
};

export type HasKeys<T> = keyof T extends never ? false : true;

export type HasProperties<T, P extends PropertyKey> = {
	[K in P]: K extends keyof T ? true : false
}[P] extends true ? true : false;

export type ExtractPlaceholders<T extends string> =
	T extends `${infer _Start}{${infer Key}}${infer Rest}`
		? Key | ExtractPlaceholders<Rest>
		: never;

export type FlattenKeys<T> = T extends object
	? { [K in keyof T]: K extends string
		? T[K] extends object
			? `${K}.${FlattenKeys<T[K]>}`
			: K
		: never
	}[keyof T]
	: never;

export type NestedPropertyType<T, Path extends FlattenKeys<T>> =
	Path extends `${infer FirstKey}.${infer RemainingPath}`
		? FirstKey extends keyof T
			? RemainingPath extends FlattenKeys<T[FirstKey]> // Check if RemainingPath is a valid flattened key for the sub-object
				? NestedPropertyType<T[FirstKey], RemainingPath>
				: never
			: never
		: Path extends keyof T
			? T[Path]
			: never;

export type FlattenObject<T> = {
	[P in FlattenKeys<T>]: NestedPropertyType<T, P>
};

type CombineIntersections<T> = {
	[K in keyof T]: T[K] extends infer O ? { [P in keyof O]: O[P] } : never;
};

export type SerializableMessageValueTypes = string | number;
type ExtractVariableAndType<T extends string> = T extends `{${infer Var}, ${infer Type}}`
	? [Var, Type extends 'number' ? number : ReactNode]
	: T extends `{${infer Var}}`
		? [Var, ReactNode]
		: never;
type ExtractSerializableVariableAndType<T extends string> = T extends `{${infer Var}, ${infer Type}}`
	? [Var, Type extends 'number' ? number : string]
	: T extends `{${infer Var}}`
		? [Var, string]
		: never;

type FormatXMLElementFn<T extends ReactNode, R extends ReactNode> = (parts: T[]) => R;
export type TagType = FormatXMLElementFn<ReactNode, ReactNode>;
export type SerializableTagType = 'non-serializable callback';

type ExtractTags<T extends string> = T extends `<${infer TagName}>`
	? TagName extends `/${infer _}` | `${infer _}/` ? never : [TagName, TagType] // exclude closing and self-closing tags e.g., <br />, <br     >
	: never;

type SplitVariables<T extends string, Acc = {}> = T extends `${infer _Prefix}{${infer Var}}${infer Suffix}`
	? SplitVariables<Suffix, Acc & { [K in ExtractVariableAndType<`{${Var}}`>[0]]: ExtractVariableAndType<`{${Var}}`>[1] }>
	: T extends `${infer _Prefix}{${infer Var}, ${infer Type}}${infer Suffix}`
		? SplitVariables<Suffix, Acc & { [K in ExtractVariableAndType<`{${Var}, ${Type}}`>[0]]: ExtractVariableAndType<`{${Var}, ${Type}}`>[1] }>
		: Acc;
type SplitSerializableVariables<T extends string, Acc = {}> = T extends `${infer _Prefix}{${infer Var}}${infer Suffix}`
	? SplitVariables<Suffix, Acc & { [K in ExtractSerializableVariableAndType<`{${Var}}`>[0]]: ExtractSerializableVariableAndType<`{${Var}}`>[1] }>
	: T extends `${infer _Prefix}{${infer Var}, ${infer Type}}${infer Suffix}`
		? SplitVariables<Suffix, Acc & { [K in ExtractSerializableVariableAndType<`{${Var}, ${Type}}`>[0]]: ExtractSerializableVariableAndType<`{${Var}, ${Type}}`>[1] }>
		: Acc;

type SplitTags<T extends string, Acc = {}> = T extends `${infer _Prefix}<${infer Var}>${infer Suffix}`
	? SplitTags<Suffix, Acc & { [K in ExtractTags<`<${Var}>`>[0]]: ExtractTags<`<${Var}>`>[1] }>
	: T extends `${infer _Prefix}<${infer Var}>${infer Suffix}`
		? SplitTags<Suffix, Acc & { [K in ExtractTags<`<${Var}>`>[0]]: ExtractTags<`<${Var}>`>[1] }>
		: Acc;
type SplitSerializableTags<T extends string, Acc = {}> = T extends `${infer _Prefix}<${infer Var}>${infer Suffix}`
	? SplitSerializableTags<Suffix, Acc & { [K in ExtractTags<`<${Var}>`>[0]]: SerializableTagType }>
	: T extends `${infer _Prefix}<${infer Var}>${infer Suffix}`
		? SplitSerializableTags<Suffix, Acc & { [K in ExtractTags<`<${Var}>`>[0]]: SerializableTagType }>
		: Acc;

export type MessageValues<T extends string> = Merge<SplitTags<T> & SplitVariables<T>>;
export type SerializableMessageValues<T extends string> = Merge<SplitSerializableTags<T> & SplitSerializableVariables<T>>;

export type ExtractMessageDescriptorValues<T> = CombineIntersections<{
	[Path in FlattenKeys<T>]: NestedPropertyType<T, Path> extends string ? MessageValues<NestedPropertyType<T, Path>> : never;
}>;
export type ExtractSerializableMessageDescriptorValues<T> = CombineIntersections<{
	[Path in FlattenKeys<T>]: NestedPropertyType<T, Path> extends string ? SerializableMessageValues<NestedPropertyType<T, Path>> : never;
}>;

type ContainsNumber<T> = T extends number ? true : never;
type CheckForNumberUnion<T> = T extends any ? ContainsNumber<T> : never;
type UnionContainsNumber<T> = true extends CheckForNumberUnion<T> ? true : false;
export type NoNumberTypeKeys<T> = UnionContainsNumber<keyof T> extends true ? never : T;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type NonSerializableActionPayload<T> = PayloadAction<{ nonSerializablePayload: T }>;
