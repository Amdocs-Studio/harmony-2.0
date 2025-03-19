import { shoppingCartApi, shoppingCartReducers, shoppingCartConfig } from './modules/shopping-cart';
import { rbaApi, rbaReducers, rbaConfig } from './modules/rba';
import { appApi, appReducers, appConfig } from './modules/app';
import { authApi, authReducers, authConfig } from './modules/auth';
import { feedbackHandlerApi, feedbackHandlerReducers, feedbackHandlerConfig } from './modules/feedback-handler';
import { combineReducers, configureStore, Middleware, PayloadAction } from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch, useSelector } from 'react-redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { flowManagerReducer } from 'redux-flow-manager';
import { CreateFlowManager } from './utils';

const { log } = console;
const getDefaultMiddlewareOptions = {
	serializableCheck: {
		ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		ignoredPaths: [],
		ignoredActionPaths: ['payload.noneSerializablePayload', 'meta.baseQueryMeta']
	},
	immutableCheck: false
};
const reducers = {
	...shoppingCartReducers,
	...rbaReducers,
	...appReducers,
	...authReducers,
	...feedbackHandlerReducers,
	flowManagerFlows: flowManagerReducer
};

const persistSlices: string[] = [];

const middlewares: Middleware[] = [];
if (shoppingCartConfig.withApi) {
	middlewares.push(shoppingCartApi.middleware);
}
if (rbaConfig.withApi) {
	middlewares.push(rbaApi.middleware);
}
if (appConfig.withApi) {
	middlewares.push(appApi.middleware);
}
if (authConfig.withApi) {
	middlewares.push(authApi.middleware);
}
if (feedbackHandlerConfig.withApi) {
	middlewares.push(feedbackHandlerApi.middleware);
}

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;
type PersistedRootState = RootState | RootState & PersistPartial;

const resettableRootReducer = () => (
	state: PersistedRootState | undefined,
	action: PayloadAction<any>,
): PersistedRootState => {
	if (action.type === '@@RESET_STORE') {
		const reducer = rootReducer({}, action);
		setTimeout(() => {
			Promise.all(
				persistSlices.map(async (slice) => {
					log(`Removing persist:${slice}`);
					return storage.removeItem(`persist:${slice}`);
				}),
			).then(() => log('Store has been reset'));
		}, 1000);
		return reducer;
	}
	return rootReducer(state, action);
};

const createStoreInstance = () => {
	const store = configureStore({
		reducer: resettableRootReducer(),
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware(getDefaultMiddlewareOptions).concat(...middlewares),
	});
	const persistor = persistStore(store);
	return { store, persistor };
};
const storeInstance = createStoreInstance();
export const { store, persistor } = storeInstance;
export const flowManager = CreateFlowManager(store);

type Store = typeof store;
export type AppDispatch = Store['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();