import { ModuleConfigType } from '@sdk';
import { Slice } from '@reduxjs/toolkit';
import { AuthStateType } from './AuthTypes';

export const config: ModuleConfigType<Slice<AuthStateType>> = {
	sliceName: 'auth',
	apiSliceName: 'authApi',
	apiPersist: true,
	withApi: true,
	withReducer: false,

};

export default config;
