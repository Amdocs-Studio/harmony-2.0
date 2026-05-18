import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from './ThemeConfig';
import { persistAppReducer } from '../../utils';
import {
	SetDensityPayloadType,
	SetModePayloadType,
	SetPalettePayloadType,
	SetRadiusPayloadType,
	ThemeStateType,
} from './ThemeTypes';

const initialState: ThemeStateType = {
	mode: 'system',
	palette: 'indigo',
	radius: 8,
	density: 'comfortable',
};

export const themeSlice = createSlice({
	name: config.sliceName,
	initialState,
	reducers: {
		setMode(state, action: PayloadAction<SetModePayloadType>) {
			state.mode = action.payload.mode;
		},
		setPalette(state, action: PayloadAction<SetPalettePayloadType>) {
			state.palette = action.payload.palette;
		},
		setRadius(state, action: PayloadAction<SetRadiusPayloadType>) {
			state.radius = action.payload.radius;
		},
		setDensity(state, action: PayloadAction<SetDensityPayloadType>) {
			state.density = action.payload.density;
		},
		resetTheme() {
			return initialState;
		},
	},
});

const reducer = persistAppReducer<ThemeStateType>(
	themeSlice,
	config.slicePersist?.whitelist || [],
	'local',
);

export default reducer;
