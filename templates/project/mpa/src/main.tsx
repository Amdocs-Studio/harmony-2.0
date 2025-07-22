import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './bootstrap';
import { config } from '@sdk';
import { mockServer } from './modules/project-name-mocks/src';

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

enableMocking().then(() => {
	window.harmony = window.harmony || {};
	window.harmony.mocksEnabled = true;
	render();
});