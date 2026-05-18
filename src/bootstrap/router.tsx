import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router';

import LandingLayout from './landing-layout';
import DocsLayout from './docs-layout';
import { landingRoutes, docsRoutes } from './pages-config';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingLayout />,
		children: landingRoutes,
	},
	{
		path: '/docs',
		element: <DocsLayout />,
		children: docsRoutes,
	},
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
