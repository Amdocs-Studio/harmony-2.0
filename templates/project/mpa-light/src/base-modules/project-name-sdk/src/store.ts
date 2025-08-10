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
import { useDispatch, useSelector } from 'react-redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';

const getDefaultMiddlewareOptions = {
	serializableCheck: {
		ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		ignoredPaths: [],
		ignoredActionPaths: ['payload.noneSerializablePayload', 'meta.baseQueryMeta']
	},
	immutableCheck: false
};
const reducers = {
	...rbaReducers,
	...appReducers,
	...authReducers,
	...feedbackHandlerReducers,
};

const middlewares: Middleware[] = [];
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
		return rootReducer(undefined, action);
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

type Store = typeof store;
export type AppDispatch = Store['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();