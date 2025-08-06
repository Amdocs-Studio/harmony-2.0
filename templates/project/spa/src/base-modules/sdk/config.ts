declare global {
	interface Window {
		harmony: any;
	}
}
const config = {
	useMocks: window.harmony?.useMocks || false,
	apiBaseUrl: 'https://jsonplaceholder.typicode.com',
	navigationUrlPattern: window.harmony?.navigationBaseUrl || '',
};

export default config;