import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import { minify } from 'terser';
import tailwindcss from '@tailwindcss/vite';

const projectRootDir = resolve(__dirname);

export function minifyBundles() {
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
  if (id.includes('/src/ui-modules/')) {
    const [, moduleName] = id.split('src/ui-modules/');
    return moduleName.split('/')[0];
  }
  if (id.includes('/src/base-modules/')) {
    const [, moduleName] = id.split('src/base-modules/');
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
  ],
    resolve: {
      alias: [
        {find: '@sdk', replacement: resolve(projectRootDir, 'src/base-modules/project-name-sdk/src/index.ts')},
        {find: '@feedback-handler', replacement: resolve(projectRootDir, 'src/base-modules/project-name-feedback-handler/src/index.ts')},
        {find: '@common-components', replacement: resolve(projectRootDir, 'src/base-modules/project-name-common-components/src/index.ts')},
        {find: '@pages', replacement: resolve(projectRootDir, 'src/pages/index.ts')},
        {find: '@ui-modules', replacement: resolve(projectRootDir, 'src/ui-modules/index.ts')},
        {find: '@mocks', replacement: resolve(projectRootDir, 'src/base-modules/project-name-mocks/src/index.ts')},
        {find: '@flow-manager-config', replacement: resolve(projectRootDir, 'src/base-modules/flow-manager-config/index.ts')},
    ],
    },
    build: {
      sourcemap: isDev,
      rollupOptions: {
        external: id => id.includes('.mpa-tester'),
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