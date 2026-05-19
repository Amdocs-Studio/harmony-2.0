import { lazy, Suspense, ComponentType } from 'react';
import { Navigate, RouteObject } from 'react-router';
import { Routes } from '@sdk';

type LazyLoader = () => Promise<{ default: ComponentType }>;

const pageLoaders: Record<string, LazyLoader> = {
	LandingPage: () => import('@pages/landing').then(m => ({ default: m.LandingPage })),
	OverviewPage: () => import('@pages/docs').then(m => ({ default: m.OverviewPage })),
	GettingStartedPage: () => import('@pages/docs').then(m => ({ default: m.GettingStartedPage })),
	DevelopWithHarmonyPage: () => import('@pages/docs').then(m => ({ default: m.DevelopWithHarmonyPage })),
	ClientPage: () => import('@pages/docs').then(m => ({ default: m.ClientPage })),
	ClientMainFeaturesPage: () => import('@pages/docs').then(m => ({ default: m.ClientMainFeaturesPage })),
	ClientModulesPage: () => import('@pages/docs').then(m => ({ default: m.ClientModulesPage })),
	ClientDevelopmentPage: () => import('@pages/docs').then(m => ({ default: m.ClientDevelopmentPage })),
	ClientFlowManagerPage: () => import('@pages/docs').then(m => ({ default: m.ClientFlowManagerPage })),
	ClientFlowManagerEstablishmentPage: () => import('@pages/docs').then(m => ({ default: m.ClientFlowManagerEstablishmentPage })),
	ClientFeedbackHandlerPage: () => import('@pages/docs').then(m => ({ default: m.ClientFeedbackHandlerPage })),
	ClientGlobalSpinnerPage: () => import('@pages/docs').then(m => ({ default: m.ClientGlobalSpinnerPage })),
	ClientMultilingualPage: () => import('@pages/docs').then(m => ({ default: m.ClientMultilingualPage })),
	ClientRbaPage: () => import('@pages/docs').then(m => ({ default: m.ClientRbaPage })),
	ClientRequestsPage: () => import('@pages/docs').then(m => ({ default: m.ClientRequestsPage })),
	ClientStorybookPage: () => import('@pages/docs').then(m => ({ default: m.ClientStorybookPage })),
	McpPage: () => import('@pages/docs').then(m => ({ default: m.McpPage })),
	LicensePage: () => import('@pages/docs').then(m => ({ default: m.LicensePage })),
};

const lazyElement = (pageName: string) => {
	const LazyPage = lazy(pageLoaders[pageName]);
	return (
		<Suspense fallback={<div className="p-10 opacity-60">Loading…</div>}>
			<LazyPage />
		</Suspense>
	);
};

export const landingRoutes: RouteObject[] = [
	{ index: true, element: lazyElement('LandingPage') },
];

export const docsRoutes: RouteObject[] = [
	{ index: true, element: lazyElement('OverviewPage') },
	{ path: 'getting-started', element: lazyElement('GettingStartedPage') },
	{ path: 'develop-with-harmony', element: lazyElement('DevelopWithHarmonyPage') },
	{
		path: 'extensions/client',
		children: [
			{ index: true, element: lazyElement('ClientPage') },
			{ path: 'main-features', element: lazyElement('ClientMainFeaturesPage') },
			{ path: 'modules', element: lazyElement('ClientModulesPage') },
			{ path: 'development', element: lazyElement('ClientDevelopmentPage') },
			{ path: 'flow-manager', element: lazyElement('ClientFlowManagerPage') },
			{ path: 'flow-manager-establishment', element: lazyElement('ClientFlowManagerEstablishmentPage') },
			{ path: 'feedback-handler', element: lazyElement('ClientFeedbackHandlerPage') },
			{ path: 'error-handler', element: <Navigate to={Routes.DOCS_CLIENT_FEEDBACK_HANDLER} replace /> },
			{ path: 'global-spinner', element: lazyElement('ClientGlobalSpinnerPage') },
			{ path: 'multilingual', element: lazyElement('ClientMultilingualPage') },
			{ path: 'rba', element: lazyElement('ClientRbaPage') },
			{ path: 'requests', element: lazyElement('ClientRequestsPage') },
			{ path: 'storybook', element: lazyElement('ClientStorybookPage') },
		],
	},
	{ path: 'integrations/mcp', element: lazyElement('McpPage') },
	{ path: 'license', element: lazyElement('LicensePage') },
];

// Export Routes helper-compatible shape in case other code still imports it
export { Routes };
