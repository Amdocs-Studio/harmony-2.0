import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Drawer } from '@mui/material';
import clsx from 'clsx';
import { FeedbackHandler } from '@feedback-handler';
import {
	DocsSidebar,
	DocsToc,
	DocsTopBar,
	DocsPageRegistryProvider,
	ThemeCustomizer,
	ThemeCustomizerProvider,
	BuiltWithHarmony,
	useCurrentDocsPage,
} from '@ui-modules';
import '../base-modules/base-styles/style.css';

function DocsLayoutBody() {
	const current = useCurrentDocsPage();
	const hasToc = Boolean(current?.toc.length);

	return (
		<div className="flex flex-1 pt-12">
			<aside className="docs-sidebar-scroll w-72 shrink-0 border-r border-black/10 dark:border-white/10 hidden lg:block sticky top-12 h-[calc(100vh-3rem)] overflow-y-auto">
				<DocsSidebar />
			</aside>

			<main
				className={clsx(
					'flex-1 min-w-0 px-4 md:px-8 py-10 w-full',
					hasToc && 'mx-auto max-w-3xl',
				)}
			>
				<Outlet />
			</main>

			{hasToc && (
				<aside className="w-60 shrink-0 hidden xl:block sticky top-12 h-[calc(100vh-3rem)] overflow-y-auto px-4 py-10">
					<DocsToc />
				</aside>
			)}
		</div>
	);
}

export default function DocsLayout() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		// Only auto-scroll on real page changes, not on in-page hash navigation
		if (window.location.hash) {
			return;
		}
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
	}, [pathname]);

	return (
		<ThemeCustomizerProvider>
			<DocsPageRegistryProvider>
				<div className="min-h-screen flex flex-col">
					<DocsTopBar onOpenMobileSidebar={() => setMobileOpen(true)} />

					<Drawer
						open={mobileOpen}
						onClose={() => setMobileOpen(false)}
						PaperProps={{ sx: { width: 288 } }}
						ModalProps={{ keepMounted: true }}
						className="lg:hidden!"
					>
						<div className="docs-sidebar-scroll pt-12 h-full overflow-y-auto">
							<DocsSidebar />
						</div>
					</Drawer>

					<DocsLayoutBody />

					<FeedbackHandler />
					<ThemeCustomizer />
					<BuiltWithHarmony />
				</div>
			</DocsPageRegistryProvider>
		</ThemeCustomizerProvider>
	);
}
