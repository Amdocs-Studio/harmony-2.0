import {
	Drawer,
	IconButton,
	Typography,
	ToggleButton,
	ToggleButtonGroup,
	Slider,
	Button,
	Box,
	Divider,
	Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import clsx from 'clsx';
import { useTheme, ThemeMode, ThemeDensity, ThemeRadius, PaletteName } from '@sdk';
import { palettes, paletteLabels, paletteOrder } from '@theme';
import { useThemeCustomizer } from './ThemeCustomizer.context';

const radiusOptions: ThemeRadius[] = [0, 4, 8, 12, 16];

export default function ThemeCustomizer() {
	const { open, setOpen } = useThemeCustomizer();
	const {
		mode, palette, radius, density,
		setMode, setPalette, setRadius, setDensity, resetTheme,
	} = useTheme();

	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={() => setOpen(false)}
			PaperProps={{ sx: { width: 340 } }}
		>
			<Box className="flex items-center justify-between px-4 py-3">
				<Typography variant="h6" className="!font-semibold">Customize</Typography>
				<IconButton size="small" onClick={() => setOpen(false)} aria-label="Close customizer">
					<CloseIcon fontSize="small" />
				</IconButton>
			</Box>
			<Divider />
			<Box className="flex flex-col gap-6 px-4 py-5">
				<section>
					<Typography variant="overline" className="!block !mb-2 opacity-70">Mode</Typography>
					<ToggleButtonGroup
						exclusive
						fullWidth
						size="small"
						value={mode}
						onChange={(_, v: ThemeMode | null) => v && setMode({ mode: v })}
					>
						<ToggleButton value="light"><LightModeIcon fontSize="small" className="mr-1.5" />Light</ToggleButton>
						<ToggleButton value="system"><SettingsBrightnessIcon fontSize="small" className="mr-1.5" />System</ToggleButton>
						<ToggleButton value="dark"><DarkModeIcon fontSize="small" className="mr-1.5" />Dark</ToggleButton>
					</ToggleButtonGroup>
				</section>

				<section>
					<Typography variant="overline" className="!block !mb-2 opacity-70">Primary color</Typography>
					<div className="flex items-center gap-3">
						{paletteOrder.map((name) => {
							const selected = palette === name;
							return (
								<Tooltip key={name} title={paletteLabels[name]}>
									<button
										type="button"
										aria-label={paletteLabels[name]}
										onClick={() => setPalette({ palette: name as PaletteName })}
										className={clsx(
											'h-8 w-8 rounded-full border-2 transition-transform',
											selected
												? 'border-black dark:border-white scale-110'
												: 'border-transparent hover:scale-105',
										)}
										style={{ backgroundColor: palettes[name][600] }}
									/>
								</Tooltip>
							);
						})}
					</div>
				</section>

				<section>
					<Typography variant="overline" className="!block !mb-2 opacity-70">
						Border radius ({radius}px)
					</Typography>
					<Slider
						value={radius}
						onChange={(_, v) => setRadius({ radius: v as ThemeRadius })}
						step={null}
						marks={radiusOptions.map((v) => ({ value: v, label: `${v}` }))}
						min={0}
						max={16}
					/>
				</section>

				<section>
					<Typography variant="overline" className="!block !mb-2 opacity-70">Density</Typography>
					<ToggleButtonGroup
						exclusive
						fullWidth
						size="small"
						value={density}
						onChange={(_, v: ThemeDensity | null) => v && setDensity({ density: v })}
					>
						<ToggleButton value="comfortable">Comfortable</ToggleButton>
						<ToggleButton value="compact">Compact</ToggleButton>
					</ToggleButtonGroup>
				</section>

				<Divider />

				<Button
					variant="outlined"
					color="inherit"
					startIcon={<RestartAltIcon />}
					onClick={() => resetTheme()}
				>
					Reset to defaults
				</Button>
			</Box>
		</Drawer>
	);
}
