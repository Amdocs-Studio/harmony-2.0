import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router';

import { Home, Login } from '@pages';
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
