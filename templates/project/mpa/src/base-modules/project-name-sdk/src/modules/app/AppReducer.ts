import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from './AppConfig';
import { AppStateType, UpdateLocalePayloadType, SlicePersistConfig } from '@sdk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState: AppStateType = {
	locale: 'en'
};

export const appSlice = createSlice({
	name: config.sliceName,
	initialState,
	reducers: {
		updateLocale(state, action: PayloadAction<UpdateLocalePayloadType>) {
			state.locale = action.payload.locale;
		},
	}
});

type AppSlice = typeof appSlice;

const persistConfig: SlicePersistConfig<AppSlice> = {
	key: config.sliceName,
	storage,
	whitelist: config.slicePersist?.whitelist || [],
	version: 1
};

const reducer = persistReducer(persistConfig, appSlice.reducer);

export default reducer;