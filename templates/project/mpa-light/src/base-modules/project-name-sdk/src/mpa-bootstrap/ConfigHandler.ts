import { ConfigHandlerType, ConfigType } from './types';
import type { DescriptorType } from '@sdk';
import config from '../config';

const PROD_HOST = config.PROD_HOST;

class ConfigHandler implements ConfigHandlerType {
	registeredConfig: ConfigHandlerType['registeredConfig'];

	constructor() {
		this.registeredConfig = {};
	}

	registerConfig(widgetId: string, configParams: ConfigType) {
		this.registeredConfig[widgetId] = {
			...configParams,
			widgetId,
		};
	}

	registerConfigFromDescriptor(descriptor: DescriptorType) {
		const localConfig: ConfigType = {};
		if (descriptor.behaviorParams) {
			descriptor.behaviorParams.forEach((param) => {
				const urlParams = new URLSearchParams(window.location.search);
				if (window.location.host !== PROD_HOST && param.type === 'boolean' && urlParams.has(param.itemId)) {
					localConfig[param.itemId] = urlParams.get(param.itemId) === 'true';
				} else {
					localConfig[param.itemId] = param.defaultValue;
				}
			});
		}
		this.registerConfig(descriptor.widgetId, localConfig);
	}

	getConfig(widgetId: string): ConfigType {
		return this.registeredConfig[widgetId];
	}
}

let instance: ConfigHandler;
export const getConfigHandler = (): ConfigHandler => {
	if (!instance) {
		instance = new ConfigHandler();
	}
	return instance;
};
