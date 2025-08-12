import {
	RouterProvider,
	createBrowserRouter
} from 'react-router';

import MainLayout from './main-layout';
import { buildRoute, pagesConfig } from './pages-config';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: buildRoute(pagesConfig)
	},
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
