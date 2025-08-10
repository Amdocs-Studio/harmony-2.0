import { SdkProvider } from '@sdk';
import Router from './router';
import { AppIntlProvider } from '@app-intl';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

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

render();