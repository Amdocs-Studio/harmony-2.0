import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useTheme, ThemeMode, PaletteName, ThemeDensity, ThemeRadius } from '@sdk';
import { palettes, PaletteShades } from './palettes';
import {
	invertShades,
	shadeKeys,
	themeBackgrounds,
	themeFontFamily,
} from './themeTokens';

const prefersDark = () => typeof window !== 'undefined'
	&& window.matchMedia('(prefers-color-scheme: dark)').matches;

const resolveMode = (mode: ThemeMode, systemDark: boolean): 'light' | 'dark' => {
	if (mode === 'system') {
		return systemDark ? 'dark' : 'light';
	}
	return mode;
};

const applyCssVariables = (
	shades: PaletteShades,
	radius: number,
	mode: 'light' | 'dark',
) => {
	const root = document.documentElement;
	const activeShades = mode === 'dark' ? invertShades(shades) : shades;
	const backgrounds = themeBackgrounds[mode];

	shadeKeys.forEach((key) => {
		root.style.setProperty(`--color-primary-${key}`, activeShades[key]);
	});
	root.style.setProperty('--color-primary', activeShades[800]);
	root.style.setProperty('--app-radius', `${radius}px`);
	root.style.setProperty('--color-background-default', backgrounds.default);
	root.style.setProperty('--color-background-paper', backgrounds.paper);
};

const buildTheme = (
	paletteName: PaletteName,
	radius: ThemeRadius,
	density: ThemeDensity,
	mode: 'light' | 'dark',
) => {
	const shades = palettes[paletteName];
	return createTheme({
		palette: {
			mode,
			primary: {
				light: shades[400],
				main: shades[600],
				dark: shades[800],
				contrastText: '#ffffff',
			},
			background: themeBackgrounds[mode],
		},
		shape: { borderRadius: radius },
		typography: {
			fontFamily: themeFontFamily,
			h1: { fontWeight: 700 },
			h2: { fontWeight: 700 },
			h3: { fontWeight: 600 },
			h4: { fontWeight: 600 },
		},
		components: {
			MuiButton: {
				defaultProps: { size: density === 'compact' ? 'small' : 'medium' },
				styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
			},
			MuiListItemButton: {
				defaultProps: { dense: density === 'compact' },
			},
		},
	});
};

export default function AppThemeProvider({ children }: Readonly<PropsWithChildren>) {
	const { mode, palette, radius, density } = useTheme();
	const [systemDark, setSystemDark] = useState<boolean>(prefersDark);

	useEffect(() => {
		const mql = window.matchMedia('(prefers-color-scheme: dark)');
		const listener = (e: MediaQueryListEvent) => setSystemDark(e.matches);
		mql.addEventListener('change', listener);
		return () => mql.removeEventListener('change', listener);
	}, []);

	const resolved = resolveMode(mode, systemDark);

	useEffect(() => {
		document.documentElement.dataset.theme = resolved;
		document.documentElement.classList.toggle('dark', resolved === 'dark');
		applyCssVariables(palettes[palette], radius, resolved);
	}, [resolved, palette, radius]);

	const theme = useMemo(
		() => buildTheme(palette, radius, density, resolved),
		[palette, radius, density, resolved],
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
