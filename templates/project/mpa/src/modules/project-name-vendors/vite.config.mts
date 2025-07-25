import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { minifyBundles } from '../../../vite.config.ts';

export default defineConfig(({ mode }: UserConfig) => {
	const isDev = mode === 'development';
	const fileName = 'project-name-vendors';
	console.log({ isDev });
	return {
		plugins: [
			react(),
			!isDev && minifyBundles(),
		],
		define: !isDev ? {} : {
			'process.env': { ENV_MODE: 'production' },
		},
		mode,
		build: {
			minify: !isDev,
			rollupOptions: {
				input: resolve(__dirname, 'src/index.ts'),
				output: {
					chunkFileNames: `[name].js`,
					entryFileNames: 'project-name-vendors.umd.js'
				}
			},
		},
		lib: !isDev ? {} : {
			entry: 'src/index.ts',
			fileName: (format: string) => format === 'es' ? `${fileName}.js` : `${fileName}.umd.js`,
			name: 'ProjectNameVendors',
			formats: ['umd'],
		},
	};
});
