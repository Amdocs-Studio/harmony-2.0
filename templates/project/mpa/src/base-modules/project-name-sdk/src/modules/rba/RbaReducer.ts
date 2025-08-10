import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from './RbaConfig';
import { RbaStateType } from '@sdk';
import { rbaApi } from './RbaApi.ts';
import { RBAStatus } from './RbaConsts.ts';
import { persistAppReducer } from '../../utils';

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

const reducer = persistAppReducer<RbaStateType>(rbaSlice, config.slicePersist?.whitelist || []);
export default reducer;