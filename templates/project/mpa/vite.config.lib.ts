import path, {resolve} from "path";
import { defineConfig } from 'vite'
import { minify } from "terser";
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

const projectRootDir = resolve(__dirname);

const isExternal = (id: string) => {
  return !id.startsWith(".") &&
    !id.includes('@ui-modules') &&
    !id.includes('xstate') &&
    !path.isAbsolute(id);
}

const getIsExternal = (id: string, name: string) => {
  if (name === 'ProjectNameMocks') {
    return id.includes('@sdk');
  }
  return isExternal(id);
}

function minifyBundles() {
  return {
    name: "minifyBundles",
    async generateBundle(_unusedOptions: any, bundle: any) {
      for (const key in bundle) {
        if (bundle[key].type === 'chunk' && key.endsWith('.js')) {
          console.log('start minify');
          const minifyCode = await minify(bundle[key].code, { sourceMap: false })
          bundle[key].code = minifyCode.code
        }
      }
      return bundle
    },
  }
}

const styleBuildConfig = (input: string, output: string) => ({
  emptyOutDir: true,
  rollupOptions: {
    input: input,
    output: {
      assetFileNames: `${output}[extname]`,
    }
  }
})

export const getBaseConfig = ({ entry, fileName, name }: {entry: string; fileName: string; name: string}) =>
  defineConfig(({ mode }) => {
    const isProduction = mode !== 'development';
    console.log({ isProduction });
    return {
      mode,
      define: {
        'process.env': { ENV_MODE: mode },
        global: "window",
      },
      resolve: {
        alias: [
          {find: '@sdk', replacement: resolve(projectRootDir, 'src/base-modules/project-name-sdk/src/index.ts')},
          {find: '@ui-modules', replacement: resolve(projectRootDir, 'src/ui-modules/index.ts')},
        ],
      },
      build: name === 'BaseStyles' ? styleBuildConfig(entry, fileName) : {
        emptyOutDir: true,
        minify: isProduction,
        sourcemap: !isProduction,
        target: ['ESNext'],
        lib: {
          entry,
          fileName: (format: string) => format === 'es' ? `${fileName}.js` : `${fileName}.umd.js`,
          name
        },
        rollupOptions: {
          external: (id) => getIsExternal(id, name),
          output: {
            // manualChunks: false,
            assetFileNames: () => `${fileName}[extname]`, // Generates asset file names.
            inlineDynamicImports: true,
            chunkFileNames: `[name].js`,
            globals: (id: string) => {
              const globals: Record<string, string> = {
                react: "ProjectNameVendors.React",
                'react-redux': 'ProjectNameVendors.ReactRedux',
                'react-router-dom': 'ProjectNameVendors.ReactRouterDOM',
                'react/jsx-runtime': 'ProjectNameVendors.jsxRuntime',
                'react-dom': 'ProjectNameVendors.ReactDOM',
                'react-dom/client': 'ProjectNameVendors.ReactDOMClient',
                'react-intl': 'ProjectNameVendors.ReactIntl',
                '@reduxjs/toolkit': 'ProjectNameVendors.ReduxToolkit',
                "redux": "ProjectNameVendors.Redux",
                "redux-persist": "ProjectNameVendors.ReduxPersist",
                'redux-persist/integration/react': 'ProjectNameVendors.ReduxPersistReact',
                "redux-persist/lib/storage/session": "ProjectNameVendors.ReduxPersistSessionStorage",
                "@mui/material/styles": "ProjectNameVendors.MaterialUIStyles",
                "@mui/material": "ProjectNameVendors.MaterialUI",
                "@mui/icons-material": "ProjectNameVendors.MaterialUIIcons",
                "clsx": "ProjectNameVendors.Clsx",
                "tailwind-merge": "ProjectNameVendors.TailwindMerge",
                "recharts": "ProjectNameVendors.Recharts",
                "@reduxjs/toolkit/query/react": "ProjectNameVendors.ReduxToolkitQueryReact",

                "@common-components": "ProjectNameCommonComponents",
                "@sdk": "ProjectNameSDK",
                '@mocks': "ProjectNameMocks"
              }
              if (Object.keys(globals).includes(id)) {
                return globals[id];
              } else if (id.startsWith('@mui/material/styles/')) {
                return id.replace('@mui/material/styles/', 'ProjectNameVendors.MaterialUIStyles.')
              } else if (id.startsWith('@mui/icons-material')) {
                return id.replace('@mui/icons-material/', 'ProjectNameVendors.MaterialUIIcons.')
              } else if (id.startsWith('@mui/material')) {
                return id.replace('@mui/material/', 'ProjectNameVendors.MaterialUI.')
              }
              return id;
            },
          },
        }
      },
      plugins: [
        tailwindcss(),
        svgr({
          svgrOptions: {},
        }),
        isProduction && minifyBundles(),
      ].filter(Boolean),
    }
  });
