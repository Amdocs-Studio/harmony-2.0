import { createTransform, persistReducer } from 'redux-persist';
import { DispatchActions, EndpointNames } from '@sdk';
import { useAppDispatch, persistor, store } from '../store';
import { Reducer, Slice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';

// transform persisted endpoint responses before reaching the store
export const createPersistedEndpointsTransform = <T>(persistedEndpoints: EndpointNames<T>[]) => {
	return createTransform(
		// transform state on its way to being serialized and persisted.
		(inboundState: any, key: keyof EndpointNames<T>) => {
			if (key === 'queries' || key === 'mutations') {
				return Object.keys(inboundState).reduce((state, currentKey) => {
					if (persistedEndpoints.includes(currentKey as EndpointNames<T>)) {
						state[currentKey] = inboundState[currentKey];
					}
					return state;
				}, {} as any);
			}
			return inboundState;
		},
		// transform state being rehydrated
		(outboundState: any) => {
			return outboundState;
		},
		// reducers to be transformed
		{ whitelist: ['queries', 'mutations'] }
	);
};

export const useSliceActions = <T extends Record<string, unknown>>(action: T): DispatchActions<T> => {
	const dispatch = useAppDispatch();
	return Object.keys(action).reduce((acc, actionKey) => {
		return {
			...acc,
			[actionKey]: (...args: any[]) => dispatch((action as any)[actionKey](...args)),
		};
	}, {} as DispatchActions<T>);
};

export const persistApiReducer = (key: string, reducer: Reducer) => persistReducer({
	key,
	storage,
	version: 1,
	whitelist: ['queries', 'mutations']
}, reducer);

export const persistAppReducer = <T>(slice: Slice, whitelist: string[]) => {
	const config = {
		key: slice.reducerPath,
		storage,
		version: 1,
		whitelist,
	};
	return persistReducer<T>(config, slice.reducer);
};

export const handleClearStore = async () => {
	try {
		await persistor.purge();
		store.dispatch({ type: '@@RESET_STORE' });
		console.log('Persisted state cleared successfully.');
	} catch (error) {
		console.error('Error clearing persisted state:', error);
	}
};