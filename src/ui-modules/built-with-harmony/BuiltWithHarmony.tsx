import { useState } from 'react';

const GITHUB_URL = 'https://github.com/Amdocs-Studio/harmony-2.0';
const BASE = import.meta.env.BASE_URL;

const COLLAPSED_WIDTH = 48; // px — matches stamp diameter (h-12 / w-12)
const EXPANDED_WIDTH = 232; // px — pill width on hover/focus
const ROLL_DEGREES = 720; // 2 full rotations per hover toggle (always rolls left)
const ROLL_DURATION_MS = 700; // must match the width/right transition duration

export default function BuiltWithHarmony() {
	const [hovered, setHovered] = useState(false);
	const [rotationDeg, setRotationDeg] = useState(0);

	const handleEnter = () => {
		setHovered(true);
		setRotationDeg((d) => d - ROLL_DEGREES);
	};
	const handleLeave = () => {
		setHovered(false);
		setRotationDeg((d) => d - ROLL_DEGREES);
	};

	return (
		<a
			href={GITHUB_URL}
			target="_blank"
			rel="noreferrer"
			aria-label="Built with Harmony 2.0"
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			onFocus={handleEnter}
			onBlur={handleLeave}
			className="
				fixed bottom-5 right-5 z-1200
				h-12 rounded-full
				bg-white dark:bg-neutral-900
				ring-1 ring-black/10 dark:ring-white/15
				shadow-lg shadow-black/20
				overflow-hidden
				no-underline text-inherit
				motion-reduce:transition-none
				print:hidden
			"
			style={{
				width: hovered ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
				transition: `width ${ROLL_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
			}}
		>
			<span
				aria-hidden
				className="
					absolute top-0
					h-12 w-12 rounded-full
					grid place-items-center
				"
				style={{
					right: hovered ? `${EXPANDED_WIDTH - COLLAPSED_WIDTH}px` : 0,
					backgroundImage:
						'conic-gradient(from 0deg,#6366f1,#14b8a6,#f43f5e,#f59e0b,#8b5cf6,#6366f1)',
					transform: `rotate(${rotationDeg}deg)`,
					transition: `right ${ROLL_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${ROLL_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
				}}
			>
				<span
					className="
						h-[42px] w-[42px] rounded-full
						bg-white dark:bg-neutral-900
						grid place-items-center
						ring-1 ring-black/5 dark:ring-white/10
					"
				>
					<img
						src={`${BASE}assets/harmony-logo-black-small.svg`}
						alt=""
						aria-hidden
						className="h-5 w-auto dark:hidden"
					/>
					<img
						src={`${BASE}assets/harmony-logo-white-small.svg`}
						alt=""
						aria-hidden
						className="h-5 w-auto hidden dark:block"
					/>
				</span>
			</span>

			<span
				className="
					absolute top-0 bottom-0
					flex items-center justify-center
					text-sm font-semibold whitespace-nowrap
					pointer-events-none select-none
				"
				style={{
					left: `${COLLAPSED_WIDTH}px`,
					right: 0,
					opacity: hovered ? 1 : 0,
					transform: `translateX(${hovered ? '0' : '8px'})`,
					transition:
						'opacity 280ms ease-out, transform 380ms cubic-bezier(0.22, 1, 0.36, 1)',
					transitionDelay: hovered ? '380ms' : '0ms',
				}}
			>
				<span className="opacity-75">Built with&nbsp;</span>
				<span
					className="font-bold tracking-tight"
					style={{
						backgroundImage:
							'linear-gradient(90deg, #6366f1, #8b5cf6, #f43f5e, #f59e0b)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
					}}
				>
					Harmony 2.0
				</span>
			</span>
		</a>
	);
}
