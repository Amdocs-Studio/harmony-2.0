import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }: UserConfig) => {
	const isDev = mode === 'development';
	const fileName = 'project-name-vendors';
	console.log({ isDev });
	return {
		plugins: [
			react(),
		],
		define: !isDev ? {} : {
			'process.env': { ENV_MODE: 'production' },
		},
		mode,
		build: {
			minify: !isDev,
			rollupOptions: {
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
