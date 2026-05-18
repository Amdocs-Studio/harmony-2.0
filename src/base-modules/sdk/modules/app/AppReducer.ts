import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from './AppConfig';
import { AppStateType, UpdateLocalePayloadType } from '@sdk';
import { persistAppReducer } from '../../utils';

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

const reducer = persistAppReducer<AppStateType>(appSlice, config.slicePersist?.whitelist || []);

export default reducer;