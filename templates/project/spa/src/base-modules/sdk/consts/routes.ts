export const baseRoute = '/';

const pagesRoutes = {
	HOME: '/',
	LOGIN: '/login',
} as const;

const routes = Object.entries(pagesRoutes).reduce((acc, [key, value]) => (
	{ ...acc, [key]: `${baseRoute}${value}` }
), {} as Record<keyof typeof pagesRoutes, string>);

export default routes;