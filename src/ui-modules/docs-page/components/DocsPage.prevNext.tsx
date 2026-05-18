import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useLocation } from 'react-router';
import { getPrevNextDocsItems } from '@sdk';

export default function DocsPrevNext() {
	const { pathname } = useLocation();
	const { prev, next } = getPrevNextDocsItems(pathname);

	if (!prev && !next) {
		return null;
	}

	return (
		<nav className="mt-12 pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3">
			<div className="flex-1">
				{prev && (
					<Button
						component={Link}
						to={prev.path}
						startIcon={<ArrowBackIcon />}
						variant="outlined"
						fullWidth
						sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
					>
						<span className="flex flex-col items-start">
							<span className="text-xs opacity-60">Previous</span>
							<span className="font-semibold">{prev.label}</span>
						</span>
					</Button>
				)}
			</div>
			<div className="flex-1">
				{next && (
					<Button
						component={Link}
						to={next.path}
						endIcon={<ArrowForwardIcon />}
						variant="outlined"
						fullWidth
						sx={{ justifyContent: 'flex-end', textAlign: 'right' }}
					>
						<span className="flex flex-col items-end">
							<span className="text-xs opacity-60">Next</span>
							<span className="font-semibold">{next.label}</span>
						</span>
					</Button>
				)}
			</div>
		</nav>
	);
}
