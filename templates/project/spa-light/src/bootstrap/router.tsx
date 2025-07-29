import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router';

import { Home } from '@home';
import { Login } from '@login';
import MainLayout from './main-layout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: 'login', element: <Login /> }
		],
	},
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
