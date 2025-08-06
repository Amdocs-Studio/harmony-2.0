import { config, SdkProvider } from '@sdk';
import Router from './router';
import { AppIntlProvider } from '@app-intl';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { mockServer } from '../mocks/browser.ts';

function App() {
	return (
		<SdkProvider>
			<AppIntlProvider>
				<Router />
			</AppIntlProvider>
		</SdkProvider>
	);
}

const render = () => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
};

async function enableMocking() {
	if (!config.useMocks) {
		return;
	}
	return mockServer.start({
		onUnhandledRequest: 'bypass',
	});
}

enableMocking().then(render);