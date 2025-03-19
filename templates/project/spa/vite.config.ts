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
  if (id.includes('/src/modules/') && !id.includes('app-intl')) {
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
      {find: '@mini-cart-layout', replacement: resolve(projectRootDir, 'src/modules/mini-cart-layout')},
      {find: '@shopping-cart', replacement: resolve(projectRootDir, 'src/modules/shopping-cart')},
      {find: '@device-details', replacement: resolve(projectRootDir, 'src/modules/device-details')},
      {find: '@device-gallery', replacement: resolve(projectRootDir, 'src/modules/device-gallery')},
      {find: '@sdk', replacement: resolve(projectRootDir, 'src/modules/sdk')},
      {find: '@feedback-handler', replacement: resolve(projectRootDir, 'src/modules/feedback-handler')},
      {find: '@home', replacement: resolve(projectRootDir, 'src/modules/home')},
      {find: '@navbar', replacement: resolve(projectRootDir, 'src/modules/navbar')},
      {find: '@app-intl', replacement: resolve(projectRootDir, 'src/modules/app-intl')},
      {find: '@common-components', replacement: resolve('src/modules/common-components')},
      {find: '@config', replacement: resolve(projectRootDir, 'src/config')},
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    }
  },
  server: {
    port: 5001,
  }
})
