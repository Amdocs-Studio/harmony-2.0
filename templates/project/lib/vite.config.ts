import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import { minify } from 'terser';

function minifyBundles() {
	return {
		name: 'minifyBundles',
		async generateBundle(_unusedOptions: any, bundle: any) {
			for (const key in bundle) {
				if (bundle[key].type == 'chunk' && key.endsWith('.js')) {
					const minifyCode = await minify(bundle[key].code, { sourceMap: false });
					bundle[key].code = minifyCode.code;
				}
			}
			return bundle;
		},
	};
}

export default defineConfig(({ mode }) => {
	const isDev = mode === 'development';
	const isProdEnv = process.env.NODE_ENV === 'production';
	const isWatch = process.env.npm_lifecycle_event === 'watch';
	return {
		plugins: [
			tailwindcss(),
			react({
				babel: {
					plugins: [
						['babel-plugin-react-compiler'],
					],
				},
			}),
			svgr(),
			checker({ typescript: { buildMode: isProdEnv || isWatch } }),
			dts({ rollupTypes: true, tsconfigPath: './tsconfig.app.json' }),
			!isDev && minifyBundles(),
		].filter(Boolean),
		build: {
			sourcemap: isDev,
			lib: {
				entry: resolve(__dirname, 'src/index.ts'),
				name: 'ProjectName',
				fileName: 'project-name',
			},
			rollupOptions: {
				external: ['react', 'react-dom', 'react/jsx-runtime'],
				output: {
					globals: {
						react: 'React',
						'react-dom': 'ReactDOM',
						'react/jsx-runtime': 'jsxRuntime',
					},
				},
			},
		},
	};
});
