import themeReducer from './ThemeReducer';
export { default as themeReducer } from './ThemeReducer';
export { default as themeConfig } from './ThemeConfig';
export type * from './ThemeTypes';
export { useTheme } from './useTheme';
export const themeReducers = {
	theme: themeReducer,
};
