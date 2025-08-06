import { DescriptorType, MessagesType, NavigatePayloadType, NavigationHandlerType, OutcomeType, RouterType } from '@sdk';
import commonConfig from '../config';

const { error } = console;

class NavigationHandler implements NavigationHandlerType {
	registeredRoutes: NavigationHandlerType['registeredRoutes'];
	
	registeredMessages: NavigationHandlerType['registeredMessages'];
	
	router?: RouterType;
	
	constructor() {
		this.registeredRoutes = {};
		this.registeredMessages = {};
	}
	
	setRouter(router: RouterType) {
		this.router = router;
	}
	
	registerRoute(widgetId: string, outcomes: OutcomeType) {
		this.registeredRoutes[widgetId] = outcomes;
	}
	
	registerMessages(widgetId: string, messages: MessagesType) {
		this.registeredMessages[widgetId] = messages;
	}
	
	registerRoutesFromDescriptor(descriptor: DescriptorType) {
		const outcomes: OutcomeType = {};
		const localMessage: MessagesType = {};
		descriptor.outcomes.forEach((outcome: any) => {
			outcomes[outcome.actionId] = {
				type: outcome.actionType,
				value: outcome.defaultValue
			};
		});
		if (descriptor.content) {
			descriptor.content.forEach(({ itemId, defaultValue }) => {
				localMessage[itemId] = { defaultMessage: defaultValue, id: itemId };
			});
		}
		this.registerMessages(descriptor.widgetId, localMessage);
		this.registerRoute(descriptor.widgetId, outcomes);
	}
	
	getMessages(widgetId: string): MessagesType {
		return this.registeredMessages[widgetId];
	}
	
	navigate(widgetId: string, actionId: string, payload?: NavigatePayloadType) {
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
			path = commonConfig.navigationUrlPattern.replace('{}', path.charAt(0) == '/' ? path.substring(1) : path);
		}
		path = payload?.query ? `${path}?${new URLSearchParams(payload.query).toString()}` : path;
		if (outcome.type === 'navigate') {
			const redirectPath = outcome.value.startsWith('http') ? outcome.value : path;
			window.location.href = redirectPath;
		} else if (outcome.type === 'openinnewwindow') {
			const redirectPath = outcome.value.startsWith('http') ? outcome.value : path;
			window.open(redirectPath);
		} else {
			error(`Unknown outcome type: ${outcome.type}`);
		}
	}
}

let instance: NavigationHandler;
export const getNavigationHandler = (router?: RouterType): NavigationHandler => {
	if (!instance) {
		instance = new NavigationHandler();
	}
	if (router && !instance.router) {
		instance.setRouter(router);
	}
	return instance;
};
