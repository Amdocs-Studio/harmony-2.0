import Routes from './routes';

export type NavItem = {
	label: string;
	path: string;
	description?: string;
};

export type NavGroup = {
	title: string;
	items: NavItem[];
};

export const docsNav: NavGroup[] = [
	{
		title: 'Introduction',
		items: [
			{ label: 'Overview', path: Routes.DOCS, description: 'What Harmony 2.0 is and why it exists' },
		],
	},
	{
		title: 'Guides',
		items: [
			{ label: 'Getting Started', path: Routes.DOCS_GETTING_STARTED, description: 'Create your first Harmony project' },
			{ label: 'Develop with Harmony', path: Routes.DOCS_DEVELOP, description: 'Day-to-day development workflow' },
		],
	},
	{
		title: 'Client Extensions',
		items: [
			{ label: 'Overview', path: Routes.DOCS_CLIENT, description: 'Client extension architecture' },
			{ label: 'Main Features', path: Routes.DOCS_CLIENT_MAIN_FEATURES, description: 'Mobile-first layouts, SEO and production defaults' },
			{ label: 'Modules', path: Routes.DOCS_CLIENT_MODULES, description: 'Generate UI and API modules with the CLI' },
			{ label: 'Development', path: Routes.DOCS_CLIENT_DEVELOPMENT, description: 'Code guards and ESLint configuration' },
			{ label: 'Flow Manager', path: Routes.DOCS_CLIENT_FLOW_MANAGER, description: 'Drive multi-step flows with a state machine' },
			{ label: 'Flow Manager Establishment', path: Routes.DOCS_CLIENT_FLOW_MANAGER_ESTABLISHMENT, description: 'Install and wire the flow manager from scratch' },
			{ label: 'Feedback Handler', path: Routes.DOCS_CLIENT_FEEDBACK_HANDLER, description: 'Spinner, snackbars, modals and API error mapping from one module' },
			{ label: 'Global Spinner', path: Routes.DOCS_CLIENT_GLOBAL_SPINNER, description: 'Automatic loading state for pending requests' },
			{ label: 'Multilingual', path: Routes.DOCS_CLIENT_MULTILINGUAL, description: 'Translate your app with react-intl' },
			{ label: 'RBA', path: Routes.DOCS_CLIENT_RBA, description: 'Role-based access control and the RBAC component' },
			{ label: 'Requests', path: Routes.DOCS_CLIENT_REQUESTS, description: 'RTK Query, shared base query and the API module convention' },
			{ label: 'Storybook', path: Routes.DOCS_CLIENT_STORYBOOK, description: 'Document components and containers with stories' },
		],
	},
	{
		title: 'Integrations',
		items: [
			{ label: 'MCP Server', path: Routes.DOCS_MCP, description: 'Drive Harmony from any MCP-capable agent' },
		],
	},
	{
		title: 'Reference',
		items: [
			{ label: 'License', path: Routes.DOCS_LICENSE },
		],
	},
];

export const flatDocsNav: NavItem[] = docsNav.flatMap((g) => g.items);

export const findDocsNavIndex = (path: string) =>
	flatDocsNav.findIndex((i) => i.path === path);

export const getPrevNextDocsItems = (path: string) => {
	const idx = findDocsNavIndex(path);
	if (idx === -1) {
		return { prev: undefined, next: undefined };
	}
	return {
		prev: idx > 0 ? flatDocsNav[idx - 1] : undefined,
		next: idx < flatDocsNav.length - 1 ? flatDocsNav[idx + 1] : undefined,
	};
};
