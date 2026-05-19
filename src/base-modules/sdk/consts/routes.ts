export const baseRoute = '';

const pagesRoutes = {
	LANDING: '/',
	DOCS: '/docs',
	DOCS_GETTING_STARTED: '/docs/getting-started',
	DOCS_DEVELOP: '/docs/develop-with-harmony',
	DOCS_CLIENT: '/docs/extensions/client',
	DOCS_CLIENT_MAIN_FEATURES: '/docs/extensions/client/main-features',
	DOCS_CLIENT_MODULES: '/docs/extensions/client/modules',
	DOCS_CLIENT_DEVELOPMENT: '/docs/extensions/client/development',
	DOCS_CLIENT_FLOW_MANAGER: '/docs/extensions/client/flow-manager',
	DOCS_CLIENT_FLOW_MANAGER_ESTABLISHMENT: '/docs/extensions/client/flow-manager-establishment',
	DOCS_CLIENT_FEEDBACK_HANDLER: '/docs/extensions/client/feedback-handler',
	DOCS_CLIENT_GLOBAL_SPINNER: '/docs/extensions/client/global-spinner',
	DOCS_CLIENT_MULTILINGUAL: '/docs/extensions/client/multilingual',
	DOCS_CLIENT_RBA: '/docs/extensions/client/rba',
	DOCS_CLIENT_REQUESTS: '/docs/extensions/client/requests',
	DOCS_CLIENT_STORYBOOK: '/docs/extensions/client/storybook',
	DOCS_MCP: '/docs/integrations/mcp',
	DOCS_LICENSE: '/docs/license',
} as const;

const routes = Object.entries(pagesRoutes).reduce((acc, [key, value]) => (
	{ ...acc, [key]: `${baseRoute}${value}` }
), {} as Record<keyof typeof pagesRoutes, string>);

export default routes;
