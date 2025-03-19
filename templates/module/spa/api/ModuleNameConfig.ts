import { ModuleConfigType } from '@sdk';
import { ModuleNameStateType } from './ModuleNameTypes'
import { Slice } from '@reduxjs/toolkit';

export const config: ModuleConfigType<Slice<ModuleNameStateType>> = {
	sliceName: 'moduleName',
	apiSliceName: 'moduleNameApi',
	// slicePersist: {
	// whitelist: [],
	// },
	// apiPersist: true,
	withApi: true,
	withReducer: true,
};

export default config;
