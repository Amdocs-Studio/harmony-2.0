export type ThemeMode = 'light' | 'dark' | 'system';

export type PaletteName = 'indigo' | 'teal' | 'rose' | 'amber' | 'violet';

export type ThemeDensity = 'comfortable' | 'compact';

export type ThemeRadius = 0 | 4 | 8 | 12 | 16;

export type ThemeStateType = {
	mode: ThemeMode;
	palette: PaletteName;
	radius: ThemeRadius;
	density: ThemeDensity;
};

export type SetModePayloadType = { mode: ThemeMode };
export type SetPalettePayloadType = { palette: PaletteName };
export type SetRadiusPayloadType = { radius: ThemeRadius };
export type SetDensityPayloadType = { density: ThemeDensity };
