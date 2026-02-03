import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const mockServer = setupWorker(...handlers);

export const enableMocking = async () => {
	const { log, error } = console;

	// Check if useMocks is disabled - skip entirely
	if (!window.harmony?.useMocks) {
		return;
	}

	// If mocks were previously enabled (e.g., before HMR), reset the flag
	if (window.harmony?.mocksEnabled) {
		log('HMR detected, restarting mock server...');
		window.harmony.mocksEnabled = false;
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