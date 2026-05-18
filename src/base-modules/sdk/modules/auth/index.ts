import authReducer from './AuthReducer';
import { authApiReducer } from './AuthApi';
export { default as authReducer } from './AuthReducer';
export { default as authConfig } from './AuthConfig';
export * from './AuthApi';
export type * from './AuthTypes';
export { useAuth } from './useAuth';
export const authReducers = {
	authApi: authApiReducer,
	auth: authReducer
};