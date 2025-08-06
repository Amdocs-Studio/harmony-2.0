import {
	RouterProvider,
	createBrowserRouter,
	Outlet,
} from 'react-router';

import { Home, Login, DeviceGalleryPage, DeviceDetailsPage, ShoppingCartPage } from '@pages';
import MainLayout from './main-layout';
import { flowsTypes } from '@flow-manager-config';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: 'login', element: <Login /> },
			{ path: 'shop', element: <Outlet />, children: [
				{ path: flowsTypes.stepTypes.DEVICE_GALLERY.path, element: <DeviceGalleryPage /> },
				{ path: flowsTypes.stepTypes.DEVICE_DETAILS.path, element: <DeviceDetailsPage /> },
				{ path: flowsTypes.stepTypes.REVIEW_BASKET.path, element: <ShoppingCartPage /> },
			]
			}
		],
	},
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
