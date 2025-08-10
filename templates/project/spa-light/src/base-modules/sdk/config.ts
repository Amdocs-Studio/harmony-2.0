declare global {
	interface Window {
		harmony: any;
	}
}
const config = {
	useMocks: window.harmony?.useMocks || false,
	apiBaseUrl: 'https://project-name.com',
	navigationUrlPattern: window.harmony?.navigationBaseUrl || '',
	PROD_HOST: 'https://mycoolapp.com',
};

export default config;