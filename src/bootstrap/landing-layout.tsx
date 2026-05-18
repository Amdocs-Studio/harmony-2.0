import { Outlet } from 'react-router';
import { FeedbackHandler } from '@feedback-handler';
import { ThemeCustomizer, ThemeCustomizerProvider } from '@ui-modules';
import { DocsTopBar } from '@ui-modules';
import { DocsPageRegistryProvider } from '@ui-modules';
import '../base-modules/base-styles/style.css';

export default function LandingLayout() {
	return (
		<ThemeCustomizerProvider>
			<DocsPageRegistryProvider>
				<div className="min-h-screen flex flex-col">
					<DocsTopBar />
					<main className="flex-1 pt-12">
						<Outlet />
					</main>
					<FeedbackHandler />
					<ThemeCustomizer />
				</div>
			</DocsPageRegistryProvider>
		</ThemeCustomizerProvider>
	);
}
