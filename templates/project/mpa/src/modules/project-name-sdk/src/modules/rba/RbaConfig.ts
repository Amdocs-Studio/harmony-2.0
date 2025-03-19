import { ModuleConfigType } from '@sdk';
import { RbaStateType } from './RbaTypes';
import { Slice } from '@reduxjs/toolkit';

export const config: ModuleConfigType<Slice<RbaStateType>> = {
	sliceName: 'rba',
	apiSliceName: 'rbaApi',
	slicePersist: {
		whitelist: ['permissions'],
	},
	apiPersist: true,
	withApi: true,
	withReducer: true,
};

export default config;
