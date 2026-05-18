import { SdkProvider } from '@sdk';
import { AppThemeProvider } from '@theme';
import Router from './router';
import { AppIntlProvider } from '@msgs';
import { createRoot } from 'react-dom/client';

function App() {
	return (
		<SdkProvider>
			<AppThemeProvider>
				<AppIntlProvider>
					<Router />
				</AppIntlProvider>
			</AppThemeProvider>
		</SdkProvider>
	);
}

const render = () => {
	createRoot(document.getElementById('root')!).render(
		<App />
	);
};

render();
