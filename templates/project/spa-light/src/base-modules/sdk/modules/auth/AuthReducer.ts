import { createSlice } from '@reduxjs/toolkit';
import { AuthStateType } from './AuthTypes';
import config from './AuthConfig';
import { authApi } from './AuthApi';
import { persistAppReducer } from '../../utils';
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

const reducer = persistAppReducer<AuthStateType>(authSlice, config.slicePersist?.whitelist || []);

export default reducer;