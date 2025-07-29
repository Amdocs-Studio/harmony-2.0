import { NavigatePayloadType, NavigationHandlerType, OutcomeType } from './types';
import commonConfig from '../config';
import { RouterType } from '@sdk';
const { error } = console;

class NavigationHandler implements NavigationHandlerType {
	registeredRoutes: NavigationHandlerType['registeredRoutes'];
  
	router?: RouterType;
  
	constructor() {
		this.registeredRoutes = {};
	}
  
	setRouter(router: RouterType) {
		this.router = router;
	}
  
	registerRoute(widgetId: string, outcomes: OutcomeType) {
		this.registeredRoutes[widgetId] = outcomes;
	}
  
	registerRoutesFromDescriptor(descriptor: any) {
		const outcomes: OutcomeType = {};
		descriptor.outcomes.forEach((outcome: any) => {
			outcomes[outcome.actionId] = {
				type: outcome.actionType,
				value: outcome.defaultValue
			};
		});
		this.registerRoute(descriptor.widgetId, outcomes);
	}
  
	navigateAem = (widgetId: string, actionId: string, payload?: NavigatePayloadType) => {
		const outcomes = this.registeredRoutes[widgetId];
		if (!outcomes) {
			error(`No outcomes found for widgetId: ${widgetId}`);
			return;
		}
		const outcome = outcomes[actionId];
		if (!outcome) {
			error(`No outcome found for actionId: ${actionId}`);
			return;
		}
		let path = outcome.value;
		if (!outcome.external && commonConfig.navigationUrlPattern?.length > 0) {
			path = commonConfig.navigationUrlPattern.replace('{}', path.startsWith('/') ? path.substring(1) : path);
		}
		path = payload?.query ? `${path}?${new URLSearchParams(payload.query).toString()}` : path;
		if (outcome.type === 'navigate') {
			this.navigate(path);
		} else if (outcome.type === 'openinnewwindow') {
			const redirectPath = outcome.value.startsWith('http') ? outcome.value : path;
			window.open(redirectPath);
		} else {
			error(`Unknown outcome type: ${outcome.type}`);
		}
	};
  
	navigate = (path: string, query?: Record<string, any>) => {
		const redirectPath =  query ? `${path}?${new URLSearchParams(query).toString()}` : path;
		if (this.router) {
			this.router.navigate(redirectPath);
		} else {
			window.location.href = redirectPath;
		}
	};
}

let instance: NavigationHandler;
const getNavigationHandler = (router?: RouterType): NavigationHandler => {
	if (!instance) {
		instance = new NavigationHandler();
	}
	if (router && !instance.router) {
		instance.setRouter(router);
	}
	return instance;
};

export default getNavigationHandler;
