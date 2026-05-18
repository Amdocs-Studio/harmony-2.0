import { ModuleConfigType } from '@sdk';
import { Slice } from '@reduxjs/toolkit';
import { ThemeStateType } from './ThemeTypes';

export const config: ModuleConfigType<Slice<ThemeStateType>> = {
	sliceName: 'theme',
	apiSliceName: 'themeApi',
	slicePersist: {
		whitelist: ['mode', 'palette', 'radius', 'density'],
	},
	withApi: false,
	withReducer: true,
};

export default config;
