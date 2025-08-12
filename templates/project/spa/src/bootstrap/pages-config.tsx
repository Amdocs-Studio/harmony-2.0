import { flowsTypes } from '@flow-manager-config';
import { RouteObject, Outlet } from 'react-router';
import * as uiModules from '@ui-modules';

const modules = uiModules as Record<string, any>;
type PageConfigType = Record<string, {
	widgets: string[];
	children?: PageConfigType;
}>;

export const buildRoute = (pageConfig: PageConfigType): RouteObject[] => {
	const routes: RouteObject[] = [];
	Object.entries(pageConfig).forEach(([path, config], index) => {
		
		const route: RouteObject = {
			path,
			element: config.widgets.map(widget => {
				const Widget =  widget === 'Outlet' ?
					Outlet
					:
					modules[widget];
				return <Widget key={`${widget}-${index}`} />;
			}),
			children: config.children ? buildRoute(config.children) : undefined,
		};
		routes.push(route);
	});
	return routes;
};

export const pagesConfig: PageConfigType = {
	'/': {
		widgets: ['HomeHero']
	},
	'/login': {
		widgets: ['LoginForm']
	},
	'/shop': {
		widgets: ['Outlet'],
		children: {
			[flowsTypes.stepTypes.DEVICE_GALLERY.path]: {
				widgets: ['DeviceGallery']
			},
			[flowsTypes.stepTypes.DEVICE_DETAILS.path]: {
				widgets: ['DeviceDetails']
			},
			[flowsTypes.stepTypes.REVIEW_BASKET.path]: {
				widgets: ['ShoppingCart']
			}
		}
	}
};