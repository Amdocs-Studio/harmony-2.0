import { createSlice } from '@reduxjs/toolkit';
import { AuthStateType } from './AuthTypes';
import config from './AuthConfig';
import { SlicePersistConfig } from '@sdk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from './AuthApi';
const initialState: AuthStateType = {
	token: '',
	user: undefined
};

export const authSlice = createSlice({
	name: config.sliceName,
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload: { token, ...user } }) => {
				state.token = token;
				state.user = user;
			},
		);
	},
});

type AuthSlice = typeof authSlice;

const persistConfig: SlicePersistConfig<AuthSlice> = {
	key: config.sliceName,
	storage,
	whitelist: config.slicePersist?.whitelist || [],
	version: 1
};

const reducer = persistReducer(persistConfig, authSlice.reducer);

export default reducer;