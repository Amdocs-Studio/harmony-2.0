import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from './RbaConfig';
import { RbaStateType, SlicePersistConfig } from '@sdk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rbaApi } from './RbaApi.ts';
import { RBAStatus } from './RbaConsts.ts';

const initialState: RbaStateType = {};

export const rbaSlice = createSlice({
	name: config.sliceName,
	initialState,
	reducers: {
		// For manual overrides
		setPermissions(state, action: PayloadAction<{ [key: string]: RBAStatus }>) {
			state.permissions = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			rbaApi.endpoints.policies.matchFulfilled,
			(state, { payload }) => {
				state.permissions = payload;
			},
		);
	},
	selectors: {
		getPermissions: state => state.permissions,
	}
});

const persistConfig: SlicePersistConfig<typeof rbaSlice> = {
	key: config.sliceName,
	storage,
	whitelist: config.slicePersist?.whitelist || [],
	version: 1
};

const reducer = persistReducer(persistConfig, rbaSlice.reducer);
export default reducer;