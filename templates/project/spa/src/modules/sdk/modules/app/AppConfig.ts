import { ModuleConfigType } from '@sdk';
import { AppStateType } from './AppTypes';
import { Slice } from '@reduxjs/toolkit';

export const config: ModuleConfigType<Slice<AppStateType>> = {
	sliceName: 'app',
	apiSliceName: 'appApi',
	slicePersist: {
		whitelist: ['locale'],
	},
	// apiPersist: true,
	withApi: false,
	withReducer: true,
};

export default config;
