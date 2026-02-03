import {
	RouterProvider,
	createBrowserRouter
} from 'react-router';

import MainLayout from './main-layout';
import { buildRoute, pagesConfig } from './pages-config';
import { baseRoute } from '@sdk';

const router = createBrowserRouter([
	{
		path: baseRoute,
		element: <MainLayout />,
		children: buildRoute(pagesConfig)
	},
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
