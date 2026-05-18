import type { PaletteShades } from './palettes';

export const shadeKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export type ShadeKey = (typeof shadeKeys)[number];

export const themeBackgrounds = {
	light: { default: '#ffffff', paper: '#ffffff' },
	dark: { default: '#0b0d12', paper: '#131722' },
} as const;

export const themeFontFamily =
	'Montserrat, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif';

/** Flip light shades for dark surfaces so utilities like `text-primary-700` stay readable. */
export const invertShades = (shades: PaletteShades): PaletteShades => ({
	50: shades[950],
	100: shades[900],
	200: shades[800],
	300: shades[700],
	400: shades[600],
	500: shades[500],
	600: shades[400],
	700: shades[300],
	800: shades[200],
	900: shades[100],
	950: shades[50],
});

export const cssVarNames = {
	primary: '--color-primary',
	appRadius: '--app-radius',
	backgroundDefault: '--color-background-default',
	backgroundPaper: '--color-background-paper',
	primaryShade: (key: ShadeKey) => `--color-primary-${key}` as const,
} as const;
