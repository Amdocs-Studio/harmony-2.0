import { lazy, Suspense, ComponentType } from 'react';
import { RouteObject, Outlet } from 'react-router';
import { Routes } from '@sdk';

type PageConfigType = Record<string, {
	widgets: string[];
	children?: PageConfigType;
}>;

// Map widget names to their lazy-loaded components
const lazyModules: Record<string, () => Promise<{ default: ComponentType }>> = {
	HomeHero: () => import('../ui-modules/home-hero').then(m => ({ default: m.HomeHero })),
	LoginForm: () => import('../ui-modules/login-form').then(m => ({ default: m.LoginForm })),
};

const getLazyComponent = (name: string) => lazy(lazyModules[name]);

const createPage = (route: string, widgets: string[], children?: PageConfigType) => ({
	[route]: { widgets, children }
});

export const buildRoute = (pageConfig: PageConfigType): RouteObject[] => {
	const routes: RouteObject[] = [];
	Object.entries(pageConfig).forEach(([path, config], index) => {
		const route: RouteObject = {
			path,
			element: (
				<Suspense fallback={<div />}>
					{config.widgets.map(widget => {
						if (widget === 'Outlet') {
							return <Outlet key={`outlet-${index}`} />;
						}
						const LazyWidget = getLazyComponent(widget);
						return <LazyWidget key={`${widget}-${index}`} />;
					})}
				</Suspense>
			),
			children: config.children ? buildRoute(config.children) : undefined,
		};
		routes.push(route);
	});
	return routes;
};

export const pagesConfig: PageConfigType = {
	...createPage(Routes.HOME, ['HomeHero']),
	...createPage(Routes.LOGIN, ['LoginForm']),
	/* Nested page example
	...createPage(Routes.CHECKOUT, ['CheckoutWrapper'], {
		...createPage(Routes.CHECKOUT_PERSONAL_INFORMATION, ['CustomerInformation']),
		...createPage(Routes.CHECKOUT_CUSTOMER_ADDRESS, ['CustomerAddress']),
	}),
	*/
};