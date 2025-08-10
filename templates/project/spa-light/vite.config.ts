import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import checker from 'vite-plugin-checker';
import { minify } from 'terser';

const projectRootDir = resolve(__dirname);

function minifyBundles() {
  return {
    name: 'minifyBundles',
    async generateBundle(_unusedOptions: any, bundle: any) {
      for (const key in bundle) {
        if (bundle[key].type == 'chunk' && key.endsWith('.js')) {
          console.log('start minify');
          const minifyCode = await minify(bundle[key].code, { sourceMap: false })
          bundle[key].code = minifyCode.code
        }
      }
      return bundle
    },
  }
}

const ROLLUP_COMMON_MODULES = [
  'vite/preload-helper',
  'vite/modulepreload-polyfill',
  'vite/dynamic-import-helper',
  'commonjsHelpers',
  'commonjs-dynamic-modules',
  '__vite-browser-external'
];

const manualChunks = (id: string) => {
  if (id.endsWith('.css')) {
    return 'styles';
  }
  if (id.includes('node_modules') || ROLLUP_COMMON_MODULES.some((commonModule) => id.includes(commonModule))) {
    if (id.includes('/node_modules/@mswjs/')) {
      return 'mock';
    }
    if (id.includes('/node_modules/react-dom/')) {
      return 'vendors-react-dom';
    }
    if (id.toLowerCase().includes('/node_modules/react/')) {
      return 'vendors-react';
    }
    return 'vendors';
  }
  if (id.includes('/src/ui-modules/') && !id.includes('app-intl')) {
    const [, moduleName] = id.split('src/ui-modules/');
    return moduleName.split('/')[0];
  }
}

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isProdEnv = process.env.NODE_ENV === 'production';
	const isWatch = process.env.npm_lifecycle_event === 'watch';
	console.log(`start build with mode: ${mode} and NODE_ENV: ${process.env.NODE_ENV}`);
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
      !isDev && minifyBundles(),
    ].filter(Boolean),
    resolve: {
      alias: [
        {find: '@sdk', replacement: resolve(projectRootDir, 'src/base-modules/sdk')},
        {find: '@feedback-handler', replacement: resolve(projectRootDir, 'src/base-modules/feedback-handler')},
        {find: '@ui-modules', replacement: resolve(projectRootDir, 'src/ui-modules')},
        {find: '@pages', replacement: resolve(projectRootDir, 'src/pages')},
        {find: '@app-intl', replacement: resolve(projectRootDir, 'src/base-modules/app-intl')},
        {find: '@common-components', replacement: resolve('src/base-modules/common-components')},
        {find: '@mocks', replacement: resolve('src/base-modules/mocks')},
      ],
    },
    build: {
      sourcemap: isDev,
      rollupOptions: {
        output: {
          manualChunks,
        },
      }
    },
    server: {
      port: 5001,
    }
  };
});