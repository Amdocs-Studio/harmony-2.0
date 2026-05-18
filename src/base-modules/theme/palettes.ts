import type { PaletteName } from '@sdk';

export type PaletteShades = {
	50: string;
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
	950: string;
};

export const palettes: Record<PaletteName, PaletteShades> = {
	indigo: {
		50: '#eef2ff',
		100: '#e0e7ff',
		200: '#c7d2fe',
		300: '#a5b4fc',
		400: '#818cf8',
		500: '#6366f1',
		600: '#4f46e5',
		700: '#4338ca',
		800: '#3730a3',
		900: '#312e81',
		950: '#1e1b4b',
	},
	teal: {
		50: '#f0fdfa',
		100: '#ccfbf1',
		200: '#99f6e4',
		300: '#5eead4',
		400: '#2dd4bf',
		500: '#14b8a6',
		600: '#0d9488',
		700: '#0f766e',
		800: '#115e59',
		900: '#134e4a',
		950: '#042f2e',
	},
	rose: {
		50: '#fff1f2',
		100: '#ffe4e6',
		200: '#fecdd3',
		300: '#fda4af',
		400: '#fb7185',
		500: '#f43f5e',
		600: '#e11d48',
		700: '#be123c',
		800: '#9f1239',
		900: '#881337',
		950: '#4c0519',
	},
	amber: {
		50: '#fffbeb',
		100: '#fef3c7',
		200: '#fde68a',
		300: '#fcd34d',
		400: '#fbbf24',
		500: '#f59e0b',
		600: '#d97706',
		700: '#b45309',
		800: '#92400e',
		900: '#78350f',
		950: '#451a03',
	},
	violet: {
		50: '#f5f3ff',
		100: '#ede9fe',
		200: '#ddd6fe',
		300: '#c4b5fd',
		400: '#a78bfa',
		500: '#8b5cf6',
		600: '#7c3aed',
		700: '#6d28d9',
		800: '#5b21b6',
		900: '#4c1d95',
		950: '#2e1065',
	},
};

export const paletteLabels: Record<PaletteName, string> = {
	indigo: 'Indigo',
	teal: 'Teal',
	rose: 'Rose',
	amber: 'Amber',
	violet: 'Violet',
};

export const paletteOrder: PaletteName[] = ['indigo', 'teal', 'rose', 'amber', 'violet'];
