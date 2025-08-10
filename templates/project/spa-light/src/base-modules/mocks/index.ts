import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const mockServer = setupWorker(...handlers);

export const enableMocking = async () => {
	const { log, error } = console;
	if (window.harmony?.mocksEnabled) {
		return;
	}
	log('Starting mock server...');
	await mockServer.start({
		onUnhandledRequest: 'bypass',
	}).then(() => {
		log('Mock server started');
		window.harmony = window.harmony || {};
		window.harmony.mocksEnabled = true;
	}).catch(() => {
		error('Failed to start mock server');
		window.harmony = window.harmony || {};
		window.harmony.mocksEnabled = false;
	});
	
	return mockServer;
};