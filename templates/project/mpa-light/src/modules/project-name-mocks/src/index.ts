import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const mockServer = setupWorker(...handlers);

export const enableMocking = async () => {
	if (window.harmony?.mocksEnabled) {
		return;
	}
	console.log('Starting mock server...');
	await mockServer.start({
		onUnhandledRequest: 'bypass',
	}).then(() => {
		console.log('Mock server started');
		window.harmony = window.harmony || {};
		window.harmony.mocksEnabled = true;
	}).catch(() => {
		console.error('Failed to start mock server');
		window.harmony = window.harmony || {};
		window.harmony.mocksEnabled = false;
	});
	
	return mockServer;
};