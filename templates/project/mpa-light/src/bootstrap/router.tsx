import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router';

import { Home } from '@home';
import MainLayout from './main-layout';
import { Login } from '@login';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: 'login', element: <Login /> }
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
