import { SdkProvider } from '@sdk';
import Router from './router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { enableMocking } from '../base-modules/project-name-mocks/src';

function App() {
	return (
		<SdkProvider>
			<Router />
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

enableMocking().then(render);