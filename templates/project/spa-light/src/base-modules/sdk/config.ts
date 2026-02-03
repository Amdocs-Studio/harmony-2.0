import type { Store } from '@reduxjs/toolkit';
import type { Persistor } from 'redux-persist';

declare global {
	interface Window {
		harmony: {
			config?: {
				useMocks?: boolean;
				baseUrl?: string;
				buildNumber?: string;
				release?: string;
			};
			sdk?: {
				store?: Store;
				persistor?: Persistor;
			};
			useMocks?: boolean;
			baseUrl?: string;
			mocksEnabled?: boolean;
		};
		// @ts-expect-error - loaded in runtime for map
		$?: typeof import('jquery');
	}
}

/*
To use the config.ts file, you need to set the VITE_USE_MOCKS and VITE_API_BASE_URL environment variables.
For example, in the .env.development file, you can set:
VITE_USE_MOCKS=true
VITE_API_BASE_URL=https://app.harmony.com/ttm
*/
let localConfig: { useMocks?: boolean; baseUrl?: string } | undefined;
if (import.meta.env.DEV) {
	const useMocksEnv = import.meta.env.VITE_USE_MOCKS;
	const baseUrlEnv = import.meta.env.VITE_API_BASE_URL;

	localConfig = {
		useMocks: useMocksEnv === 'true' || useMocksEnv === true,
		baseUrl: baseUrlEnv,
	};
}

const config = {
	useMocks: localConfig?.useMocks ?? window.harmony?.useMocks ?? false,
	apiBaseUrl: localConfig?.baseUrl ?? window.harmony?.baseUrl ?? '/online-shop/ttm',
	buildNumber: '%TSA_BUILD_NUMBER%',
	release: '%TSA_RELEASE_VERSION%',
};

window.harmony = {
	...window.harmony,
	config,
};

export default config;