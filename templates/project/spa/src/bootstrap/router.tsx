import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router';

import { Home } from '@home';
import { DeviceGallery  } from '@device-gallery';
import { DeviceDetails } from '@device-details';
import { ShoppingCart } from '@shopping-cart';
import MainLayout from './main-layout';
import { flowsTypes } from '@config';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: flowsTypes.stepTypes.DEVICE_GALLERY.path, element: <DeviceGallery /> },
			{ path: flowsTypes.stepTypes.DEVICE_DETAILS.path, element: <DeviceDetails /> },
			{ path: flowsTypes.stepTypes.REVIEW_BASKET.path, element: <ShoppingCart /> },
		],
	},
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
