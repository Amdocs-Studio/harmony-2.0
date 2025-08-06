import moduleNameReducer from './ModuleNameReducer';
import { moduleNameApiReducer } from './ModuleNameApi';
export { default as moduleNameReducer } from './ModuleNameReducer';
export { default as moduleNameConfig } from './ModuleNameConfig';
export * from './ModuleNameApi';
export type * from './ModuleNameTypes';
export { useModuleName } from './useModuleName';
export const moduleNameReducers = {
	moduleNameApi: moduleNameApiReducer,
	moduleName: moduleNameReducer
};