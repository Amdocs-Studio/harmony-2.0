declare global {
	interface Window {
		harmony: any;
	}
}
const config = {
	useMocks: window.harmony?.useMocks || false,
	apiBaseUrl: 'https://jsonplaceholder.typicode.com',
	navigationUrlPattern: window.harmony?.navigationBaseUrl || '',
	PROD_HOST: 'https://mycoolapp.com',
};

export default config;