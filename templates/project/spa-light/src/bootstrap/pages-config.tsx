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
};