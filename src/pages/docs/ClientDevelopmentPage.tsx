import {
	DocsPage, H2, P, Pre, Callout, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'guidelines', label: 'Guidelines & code guards' },
	{ id: 'eslint-config', label: 'ESLint config' },
];

const eslintConfig = `{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "jsx-a11y",
    "import",
    "prettier",
    "unused-imports",
    "custom-rules"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  "parserOptions": {
    "project": "./tsconfig.json",
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  },
  "rules": {
    "max-lines-per-function": [
      "error",
      { "max": 150, "skipBlankLines": true, "skipComments": true }
    ],
    "max-lines": [
      "error",
      { "max": 400, "skipBlankLines": true, "skipComments": true }
    ],
    "max-depth": "error",
    "max-len": ["error", { "code": 260 }],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
    "curly": ["error", "all"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": false }],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "indent": ["error", "tab", { "SwitchCase": 1 }],
    "no-tabs": ["error", { "allowIndentationTabs": true }],
    "react/self-closing-comp": ["error", { "component": true, "html": true }],
    "react/jsx-key": ["error", { "checkFragmentShorthand": true }],
    "react/jsx-max-props-per-line": [
      "error",
      { "maximum": 1, "when": "multiline" }
    ],
    "react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
    "react/jsx-closing-bracket-location": ["error", "line-aligned"],
    "react/jsx-indent": ["error", "tab"],
    "react/jsx-indent-props": ["error", "tab"],
    "jsx-a11y/alt-text": [2],
    "jsx-a11y/aria-role": [
      2,
      { "allowedInvalidRoles": ["text"], "ignoreNonDOM": true }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
    ],
    "unused-imports/no-unused-imports": "error"
  }
}`;

export default function ClientDevelopmentPage() {
	return (
		<DocsPage
			title="Development Guidelines & Code Guards"
			description="Keep the codebase consistent and catch common mistakes early."
			toc={toc}
		>
			<section>
				<H2 id="guidelines">Guidelines & code guards</H2>
				<P>
					Harmony uses ESLint to maintain code consistency and catch common mistakes early.
					It enforces coding standards and best practices so developers avoid common errors
					and the codebase stays clean and structured.
				</P>
				<P>
					For instance, passing all props downstream to child components is not allowed.
					This rule boosts performance by ensuring components re-render only with the props
					they actually use, preventing unnecessary updates.
				</P>
				<Callout type="note">
					Custom rules live in <code>custom-rules/</code> at the project root. They run as a
					regular ESLint plugin and can be enabled/disabled per-file.
				</Callout>
			</section>

			<section>
				<H2 id="eslint-config">ESLint config</H2>
				<P>
					Below is the default configuration Harmony ships with. You are free to tweak it
					to match your team&apos;s style — any rule you don&apos;t want is a one-line
					change away.
				</P>
				<Pre lang="json" label=".eslintrc.json">{eslintConfig}</Pre>
			</section>
		</DocsPage>
	);
}
