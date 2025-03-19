import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router';

import { Home } from '@home';
import MainLayout from './main-layout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ path: '/', element: <Home /> },
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
