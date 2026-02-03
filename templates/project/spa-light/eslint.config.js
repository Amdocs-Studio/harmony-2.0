import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import unusedImports from 'eslint-plugin-unused-imports';
import reactHooks from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        '**/dist',
        '**/vite.config.ts',
        '**/node_modules',
        '**/build',
        '**/vite.config.*',
        '**/*.config.js',
        '**/dev-dist',
        '**/public/**',
    ],
}, ...fixupConfigRules(compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
)), {
    plugins: {
        '@typescript-eslint': fixupPluginRules(typescriptEslint),
        'unused-imports': fixupPluginRules(unusedImports),
        'react-hooks': reactHooks,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: 'script',

        parserOptions: {
            projectService: true,
            tsconfigRootDir: __dirname,
        },
    },

    settings: {
        react: {
            version: 'detect',
        },
    },

    rules: {
        '@typescript-eslint/no-duplicate-enum-values': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/ban-types': 'off',
        'import/extensions': 'off',
        'no-debugger': 'off',

        'no-underscore-dangle': ['error', {
            allow: ['__REDUX_DEVTOOLS_EXTENSION__', '_default'],
        }],

        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: ['state'],
        }],

        'max-lines-per-function': ['error', {
            max: 150,
            skipBlankLines: true,
            skipComments: true,
        }],

        'max-lines': ['error', {
            max: 400,
        }],

        'max-depth': 'error',

        'no-multiple-empty-lines': ['error', {
            max: 1,
            maxEOF: 1,
        }],

        'react/sort-comp': ['off'],
        'react/display-name': ['off'],
        'react/prefer-stateless-function': ['off'],
        'import/no-named-as-default': ['off'],
        'arrow-body-style': ['off'],
        'func-names': ['off'],
        'guard-for-in': ['off'],
        'lines-between-class-members': ['off'],
        'jsx-a11y/label-has-associated-control': 'off',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'off',
        'react/jsx-one-expression-per-line': ['off'],
        'class-methods-use-this': ['off'],

        'max-len': ['error', {
            code: 260,
        }],

        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/no-use-before-define': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],

        'no-trailing-spaces': ['error', {
            skipBlankLines: true,
            ignoreComments: true,
        }],

        'react/jsx-props-no-spreadings': ['off'],
        'linebreak-style': 0,
        'global-require': 0,
        'eslint-linebreak-style': [0, 'error', 'windows'],

        indent: ['error', 'tab', {
            SwitchCase: 1,
        }],

        'no-tabs': ['error', {
            allowIndentationTabs: true,
        }],

        'react/jsx-indent-props': ['error', 'tab'],
        'react/jsx-indent': ['error', 'tab'],
        'comma-dangle': ['error', 'only-multiline'],
        'jsx-a11y/alt-text': [2],
        'jsx-a11y/anchor-has-content': [2],
        'jsx-a11y/anchor-is-valid': ['off'],
        'jsx-a11y/aria-props': [2],
        'jsx-a11y/aria-proptypes': [2],

        'jsx-a11y/aria-role': [2, {
            allowedInvalidRoles: ['text'],
            ignoreNonDOM: true,
        }],

        'jsx-a11y/aria-unsupported-elements': [2],
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'jsx-a11y/heading-has-content': [2],
        'jsx-a11y/img-redundant-alt': [2],
        'jsx-a11y/no-access-key': [2],
        'jsx-a11y/no-autofocus': [2],
        'jsx-a11y/no-noninteractive-element-interactions': [2],
        'jsx-a11y/no-noninteractive-tabindex': [2],
        'jsx-a11y/tabindex-no-positive': [2],
        'jsx-a11y/no-static-element-interactions': [2],
        'import/no-extraneous-dependencies': ['off'],
        'react/react-in-jsx-scope': ['off'],

        'react/jsx-max-props-per-line': ['error', {
            maximum: 1,
            when: 'multiline',
        }],

        'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
        curly: ['error', 'all'],

        'brace-style': ['error', '1tbs', {
            allowSingleLine: false,
        }],

        'react/jsx-closing-bracket-location': ['error', 'line-aligned'],

        'react/self-closing-comp': ['error', {
            component: true,
            html: true,
        }],

        'react/jsx-key': ['error', {
            checkFragmentShorthand: true,
        }],

        'comma-spacing': ['error', {
            before: false,
            after: true,
        }],

        'no-extra-semi': 'error',
        '@typescript-eslint/no-unsafe-function-type': 'off',
        quotes: ['error', 'single'],
        'object-curly-spacing': ['error', 'always'],

        '@typescript-eslint/no-unused-vars': ['error', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
        }],

        '@typescript-eslint/no-empty-object-type': ['error', {
            allowObjectTypes: 'always',
        }],

        'arrow-spacing': ['error', {
            before: true,
            after: true,
        }],

        'space-before-blocks': ['error', 'always'],
        semi: ['error', 'always'],

        'space-infix-ops': ['error', {
            int32Hint: false,
        }],

        'unused-imports/no-unused-imports': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
    },
}, {
    files: ['**/*.{c,m,}{t,j}s', '**/*.{t,j}sx'],
}, {
    files: ['**/*{test,spec}.{t,j}s?(x)'],

    languageOptions: {
        globals: {
            ...globals.jest,
        },
    },
}, {
    files: ['**/mocks/**/*.{t,j}s', '**/mocks/**/*.{t,j}sx'],
    rules: {
        'max-lines': 'off',
    },
}];