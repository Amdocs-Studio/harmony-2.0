import { create, themes, ThemeVars } from '@storybook/theming';

const baseTheme: ThemeVars = {
	...themes.dark,
	// base: "dark",
	brandTitle: 'Project Name',
	brandUrl: 'https://your-domain.com',
	brandImage: 'harmony-with-text-white.svg',
	//
	colorPrimary: '#3ABFF8',
	colorSecondary: '#6419E6',
	//
	// // UI
	appBg: '#222630',
	appContentBg: '#191D24',
	appBorderColor: '#323945',

	// Text Colors
	textColor: '#A6ADBA',

	// Toolbar default and active colors
	barTextColor: '#A6ADBA',
	barSelectedColor: '#C3D0EA',
	barBg: '#191D24',
};

export default create(baseTheme);
