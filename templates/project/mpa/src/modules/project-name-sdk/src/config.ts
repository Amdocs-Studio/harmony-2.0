declare global {
	interface Window {
		harmony: any;
	}
}
const config = {
	useMock: window.harmony?.useMock || false,
	apiBaseUrl: 'https://jsonplaceholder.typicode.com',
	navigationUrlPattern: window.harmony?.navigationBaseUrl || '',
};

export default config;