import { Slice } from '@reduxjs/toolkit';
import { createPersistedEndpointsTransform } from './utils';
import { PersistConfig } from 'redux-persist';
import { TypedUseSelectorHook } from 'react-redux';
import { createBrowserRouter } from 'react-router';

export type EndpointNames<Api> = Api extends { endpoints: infer Endpoints }
	? keyof Endpoints
	: never;

export type Selectors<TState> = {
	[K in keyof TState as `select${Capitalize<string & K>}` | (string & {})]: Parameters<TypedUseSelectorHook<TState>>[0]; // NOSONAR
};

export type SlicePersistConfig<S extends Slice> = Omit<PersistConfig<ReturnType<S['reducer']>>, 'whitelist' | 'key'> & {
	whitelist: (keyof ReturnType<S['reducer']>)[];
	key: S['name'];
};

export type ApiPersistConfig<T extends { reducerPath: string }> = Omit<PersistConfig<any>, 'key' | 'transforms'> & {
	key: T['reducerPath'];
	transforms: ReturnType<typeof createPersistedEndpointsTransform<T>>[];
};

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

export type DispatchActions<ACTIONS extends Record<string, unknown>> = {
	[K in keyof ACTIONS]: ACTIONS[K] extends (...args: infer P) => unknown
		? (...args: P) => void
		: never
}

export type ModuleConfigType<S extends Slice> = {
	sliceName: string;
	apiSliceName: string;
	slicePersist?: {
		whitelist: SlicePersistConfig<S>['whitelist']
	}
	apiPersist?: boolean;
	withApi: boolean;
	withReducer: boolean;
}

export type DescriptorType = {
	displayName: string;
	widgetId: string;
	widgetCategory: string;
	widgetDomain: string;
	widgetSalesChannel: string;
	widgetDescription: string;
	topicName: string;
	behaviorParams: Array<{
		groupId: string;
		itemId: string;
		displayName: string;
		type: string;
		description: string;
		defaultValue: boolean;
	}>;
	outcomes: Array<{
		displayName: string;
		description: string;
		actionId: string;
		groupId: string;
		actionType: string;
		defaultValue: string;
	}>;
	content: Array<{
		groupId: string;
		itemId: string;
		displayName: string;
		description: string;
		defaultValue: string;
	}>;
	groups: Array<{
		groupId: string;
		displayName: string;
	}>;
	initializationParams: Array<{
		itemId: string;
		displayName: string;
		type: string;
		description: string;
		defaultValue: string;
		enableUrlInput: boolean;
	}>;
	stateParams: Array<{
		itemId: string;
		displayName: string;
		type: string;
		description: string;
		defaultValue: boolean;
	}>;
};

export type MessageType = { id: string; defaultMessage: string };

export type MessagesType = Record<string, MessageType>;

export type RouterType = ReturnType<typeof createBrowserRouter>;