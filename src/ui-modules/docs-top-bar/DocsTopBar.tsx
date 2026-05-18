import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Tooltip,
	Box,
	Button,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import TuneIcon from '@mui/icons-material/Tune';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from 'react-router';
import { Routes, useTheme } from '@sdk';
import { useThemeCustomizer } from '../theme-customizer';

type Props = {
	onOpenMobileSidebar?: () => void;
};

const GITHUB_URL = 'https://github.com/Amdocs-Studio/harmony-2.0';

export default function DocsTopBar({ onOpenMobileSidebar }: Props) {
	const { mode, setMode } = useTheme();
	const { setOpen } = useThemeCustomizer();

	const resolved = mode === 'system'
		? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
		: mode;

	const toggleMode = () => setMode({ mode: resolved === 'dark' ? 'light' : 'dark' });

	return (
		<AppBar
			position="fixed"
			color="default"
			elevation={0}
			sx={{
				backdropFilter: 'saturate(180%) blur(8px)',
				backgroundColor: 'rgba(255,255,255,0.72)',
				'.dark &': { backgroundColor: 'rgba(13,17,23,0.72)' },
				borderBottom: '1px solid',
				borderColor: 'divider',
			}}
		>
			<Toolbar variant="dense" className="gap-2">
				{onOpenMobileSidebar && (
					<IconButton
						edge="start"
						aria-label="Open navigation"
						onClick={onOpenMobileSidebar}
						className="mr-1! lg:hidden!"
						size="small"
					>
						<MenuIcon />
					</IconButton>
				)}
				<Link to={Routes.LANDING} className="flex items-center gap-2 no-underline text-inherit">
					<img src={`${import.meta.env.BASE_URL}assets/harmony-logo-black-small.svg`} alt="Harmony" className="h-6 w-auto dark:hidden" />
					<img src={`${import.meta.env.BASE_URL}assets/harmony-logo-white-small.svg`} alt="Harmony" className="h-6 w-auto hidden dark:block" />
					<Typography variant="subtitle1" className="font-bold! tracking-tight!">
						Harmony <span className="opacity-60">2.0</span>
					</Typography>
				</Link>

				<Box className="flex-1" />

				<Button component={Link} to={Routes.DOCS} size="small" color="inherit">Docs</Button>

				<Tooltip title="GitHub">
					<IconButton
						component="a"
						href={GITHUB_URL}
						target="_blank"
						rel="noreferrer"
						size="small"
						aria-label="GitHub"
					>
						<GitHubIcon fontSize="small" />
					</IconButton>
				</Tooltip>

				<Tooltip title={`Switch to ${resolved === 'dark' ? 'light' : 'dark'} mode`}>
					<IconButton size="small" onClick={toggleMode} aria-label="Toggle theme">
						{resolved === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
					</IconButton>
				</Tooltip>

				<Tooltip title="Customize">
					<IconButton size="small" onClick={() => setOpen(true)} aria-label="Open customizer">
						<TuneIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			</Toolbar>
		</AppBar>
	);
}
