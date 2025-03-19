import { defineConfig } from 'vite'
import { resolve } from "path";
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

const projectRootDir = resolve(__dirname);

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
  if (id.includes('/src/modules/') && !id.includes('project-name-app-intl')) {
    const [, moduleName] = id.split('src/modules/');
    return moduleName.split('/')[0];
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    svgr(),
  ],
  resolve: {
    alias: [
      {find: '@shopping-cart', replacement: resolve(projectRootDir, 'src/modules/project-name-shopping-cart/src/index.ts')},
      {find: '@mini-cart-layout', replacement: resolve(projectRootDir, 'src/modules/project-name-mini-cart-layout/src/index.ts')},
      {find: '@device-gallery', replacement: resolve(projectRootDir, 'src/modules/project-name-device-gallery/src/index.ts')},
      {find: '@device-details', replacement: resolve(projectRootDir, 'src/modules/project-name-device-details/src/index.ts')},
      {find: '@sdk', replacement: resolve(projectRootDir, 'src/modules/project-name-sdk/src/index.ts')},
      {find: '@feedback-handler', replacement: resolve(projectRootDir, 'src/modules/project-name-feedback-handler/src/index.ts')},
      {find: '@home', replacement: resolve(projectRootDir, 'src/modules/project-name-home/src/index.ts')},
      {find: '@navbar', replacement: resolve(projectRootDir, 'src/modules/project-name-navbar/src/index.ts')},
      {find: '@app-intl', replacement: resolve(projectRootDir, 'src/modules/project-name-app-intl/src/index.ts')},
      {find: '@common-components', replacement: resolve(projectRootDir, 'src/modules/project-name-common-components/src/index.ts')},
      {find: '@config', replacement: resolve(projectRootDir, 'src/config')},
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks
      },
    }
  },
  server: {
    port: 5001,
  }
})
