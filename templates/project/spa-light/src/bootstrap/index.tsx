import { SdkProvider } from '@sdk';
import Router from './router';
import { AppIntlProvider } from '@msgs';
import { createRoot } from 'react-dom/client';

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
		<App />
	);
};

render();