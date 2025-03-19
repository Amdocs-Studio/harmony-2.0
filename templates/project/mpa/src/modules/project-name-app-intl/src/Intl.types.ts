import { enMessages, messages } from './Intl.i18n';
import type { IntlFormatters } from 'react-intl';
import type { Props as ReactIntlFormattedMessageProps } from 'react-intl/src/components/message';
import type { ReactNode } from 'react';
import { useAppIntl } from './components/useAppIntl';

export type AppIntlShape = ReturnType<typeof useAppIntl>;
export type FormatMessage = AppIntlShape['formatMessage'];
type Args = Parameters<IntlFormatters['formatMessage']>;
type CombineIntersections<T> = {
    [K in keyof T]: T[K] extends infer O ? { [P in keyof O]: O[P] } : never;
};
export type Merge<T> = {
    [K in keyof T]: T[K];
};
export type SerializableTagType = 'non-serializable callback';
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
type FormatXMLElementFn<T extends ReactNode, R extends ReactNode> = (parts: T[]) => R;
export type TagType = FormatXMLElementFn<ReactNode, ReactNode>;
type ExtractTags<T extends string> = T extends `<${infer TagName}>`
    ? TagName extends `/${infer _}` | `${infer _}/` ? never : [TagName, TagType] // exclude closing and self-closing tags e.g., <br />, <br     >
    : never;

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

export type SplitTags<T extends string, Acc = object> = T extends `${infer _Prefix}<${infer Var}>${infer Suffix}`
    ? SplitTags<Suffix, Acc & { [K in ExtractTags<`<${Var}>`>[0]]: ExtractTags<`<${Var}>`>[1] }>
    : T extends `${infer _Prefix}<${infer Var}>${infer Suffix}`
        ? SplitTags<Suffix, Acc & { [K in ExtractTags<`<${Var}>`>[0]]: ExtractTags<`<${Var}>`>[1] }>
        : Acc;
export type SplitSerializableTags<T extends string, Acc = object> = T extends `${infer _Prefix}<${infer Var}>${infer Suffix}`
    ? SplitSerializableTags<Suffix, Acc & { [K in ExtractTags<`<${Var}>`>[0]]: SerializableTagType }>
    : T extends `${infer _Prefix}<${infer Var}>${infer Suffix}`
        ? SplitSerializableTags<Suffix, Acc & { [K in ExtractTags<`<${Var}>`>[0]]: SerializableTagType }>
        : Acc;
export type SplitVariables<T extends string, Acc = object> = T extends `${infer _Prefix}{${infer Var}}${infer Suffix}`
    ? SplitVariables<Suffix, Acc & { [K in ExtractVariableAndType<`{${Var}}`>[0]]: ExtractVariableAndType<`{${Var}}`>[1] }>
    : T extends `${infer _Prefix}{${infer Var}, ${infer Type}}${infer Suffix}`
        ? SplitVariables<Suffix, Acc & { [K in ExtractVariableAndType<`{${Var}, ${Type}}`>[0]]: ExtractVariableAndType<`{${Var}, ${Type}}`>[1] }>
        : Acc;
export type SplitSerializableVariables<T extends string, Acc = object> = T extends `${infer _Prefix}{${infer Var}}${infer Suffix}`
    ? SplitVariables<Suffix, Acc & { [K in ExtractSerializableVariableAndType<`{${Var}}`>[0]]: ExtractSerializableVariableAndType<`{${Var}}`>[1] }>
    : T extends `${infer _Prefix}{${infer Var}, ${infer Type}}${infer Suffix}`
        ? SplitVariables<Suffix, Acc & { [K in ExtractSerializableVariableAndType<`{${Var}, ${Type}}`>[0]]: ExtractSerializableVariableAndType<`{${Var}, ${Type}}`>[1] }>
        : Acc;

export type MessageValues<T extends string> = Merge<SplitTags<T> & SplitVariables<T>>;
export type ExtractMessageDescriptorValues<T> = CombineIntersections<{
    [Path in FlattenKeys<T>]: NestedPropertyType<T, Path> extends string ? MessageValues<NestedPropertyType<T, Path>> : never;
}>;
export type SerializableMessageValues<T extends string> = Merge<SplitSerializableTags<T> & SplitSerializableVariables<T>>;

export type ExtractSerializableMessageDescriptorValues<T> = CombineIntersections<{
    [Path in FlattenKeys<T>]: NestedPropertyType<T, Path> extends string ? SerializableMessageValues<NestedPropertyType<T, Path>> : never;
}>;

export type Messages = typeof enMessages;
export type MessageValuesMap = ExtractMessageDescriptorValues<Messages>
export type SerializableMessageValuesMap = ExtractSerializableMessageDescriptorValues<Messages>
export type AppIntlMessageKeys = FlattenKeys<Messages>;

export type ConditionalValues<K extends AppIntlMessageKeys> = object extends MessageValuesMap[K]
    ? { values?: MessageValuesMap[K] }
    : { values: MessageValuesMap[K] };

export type FormattedMessageProps<K extends AppIntlMessageKeys> = Omit<ReactIntlFormattedMessageProps<Record<string, ReactNode>>, 'values'> & {
    id: K;
} & ConditionalValues<K>;

export type IntlMessages = typeof messages;
export type Locales = keyof typeof messages;

export type HasKeys<T> = keyof T extends never ? false : true;
export type FormatMessageArgs = [descriptor: Args[0], values?: Record<string, string | number>, opts?: Args[2]];
export type MessageDescriptorType<ID extends AppIntlMessageKeys> = FormatMessageArgs[0] & {
    id?: ID;
};
export type ValuesType<ID extends AppIntlMessageKeys> = ConditionalValues<ID>['values'];
export type OptionsType = FormatMessageArgs[2];

export type TypedFormatMessageArgs<K extends AppIntlMessageKeys> =
    HasKeys<ValuesType<K>> extends true ?
        [descriptor: MessageDescriptorType<K>, values: ValuesType<K>, options?: OptionsType] :
        [descriptor: MessageDescriptorType<K>, values?: ValuesType<K>, options?: OptionsType]
