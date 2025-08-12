import { SdkProvider } from '@sdk';
import Router, { router } from './router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { enableMocking } from '@mocks';

function App() {
	return (
		<SdkProvider router={router}>
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