import ReactDOM from 'react-dom/client';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { getNavigationHandler } from './NavigationHandler';
import { SdkProvider } from '../providers';
import type { DescriptorType } from '../types';

const { log, error } = console;

type PropsType = Record<string, any>;

type MessageType = Record<string, { id: string; defaultMessage: string }>;

declare global {
	interface Window extends PropsType {
		harmony: any;
	}
}

export const getDescriptorMessages = (
	descriptor: DescriptorType,
): MessageType => {
	const descriptorMessages: MessageType = {};
	descriptor.content.forEach(({ itemId, defaultValue }) => {
		descriptorMessages[itemId] = {
			id: itemId,
			defaultMessage: defaultValue,
		};
	});
	return descriptorMessages;
};

export default class WidgetBootstrap {
	store: any;

	persistor: any;

	constructor(store: any, persistor: any) {
		this.store = store;
		this.persistor = persistor;
	}

	createWidget(
		widgetId: string,
		widgetName: string,
		domPlaceHolder: string,
		properties: PropsType,
	) {
		const WidgetObj = window[widgetId][widgetName];
		const { providerMessages, ...props } = properties;
		log({ providerMessages, widgetProps: props });
		getNavigationHandler().registerRoute(widgetId, props.outcomes);

		const domElement = document.getElementById(domPlaceHolder);
		if (!domElement) {
			error(`can't find element with id ${domPlaceHolder}`);
			return;
		}
		const hideComponent = props?.config?.displayComponent === false;
		ReactDOM.createRoot(domElement).render(
			<SdkProvider>
				<IntlProvider locale={'en'} messages={providerMessages}>
					{!hideComponent && <WidgetObj {...props} />}
				</IntlProvider>
			</SdkProvider>
		);
	}

	static generateProps(
		widgetProps: PropsType,
		appConfig: PropsType,
		widgetInstanceId: string,
	) {
		const props = { instanceId: widgetInstanceId, config: {} };
		let widgetInitProps = {};

		// Creating this config in order to support old widgets of UXF 1.5
		const prevWidgetsConfig = {
			PROXY_SERVER: {
				baseURL: appConfig?.oldBaseURL,
			},
			RP_SERVER: {
				baseURL: appConfig?.oldBaseURL,
			},
		};

		if (widgetProps?.config) {
			props.config = { ...prevWidgetsConfig, ...widgetProps.config };
		} else {
			props.config = prevWidgetsConfig;
		}
		const { initProps, ...restWidgetProps } = widgetProps || {};
		if (initProps) {
			widgetInitProps = initProps;
		}

		return { ...restWidgetProps, ...props, ...widgetInitProps };
	}

	loadWidget(
		widgetId: string,
		widgetName: string,
		domPlaceHolder: string,
		origWidgetProps: PropsType = {},
		appConfig: PropsType = {},
	) {
		const descriptorName = `${widgetName}Descriptor`;
		if (!window[widgetId]?.[widgetName]) {
			error(`Widget ${widgetId} with name ${widgetName} is not defined in the window object.`);
			return;
		}
		if (!window[widgetId]?.[descriptorName]) {
			error(`Widget ${widgetId} with name ${widgetName} does not have a descriptor defined in the window object.`);
			return;
		}
		window.harmony.config = { ...appConfig };
		const widgetProps = origWidgetProps;

		log('widgetProps', { ...widgetProps });

		const descriptor = window[widgetId]?.[descriptorName] as DescriptorType;
		const { behaviorParams, content, outcomes: descriptorOutcomes } = descriptor;
		const descriptorMessages = getDescriptorMessages(descriptor);
		const providerMessages: Record<string, string> = {};
		content.forEach(
			(descriptorMessage: { itemId: string; defaultValue: string }) => {
				const { itemId, defaultValue } = descriptorMessage;
				providerMessages[itemId] = defaultValue;
			},
		);
		widgetProps.descriptorMessages = descriptorMessages;
		widgetProps.outcomes = widgetProps.outcomes || {};
		descriptorOutcomes.forEach(
			(outcome: {
				actionId: string;
				actionType: string;
				defaultValue: string;
			}) => {
				const { actionId, actionType, defaultValue } = outcome;
				if (!widgetProps.outcomes[actionId]) {
					widgetProps.outcomes[actionId] = {
						type: actionType,
						value: defaultValue,
					};
				}
			},
		);
		
		widgetProps.config = widgetProps.config || {};
		behaviorParams.forEach(({ itemId, defaultValue }) => {
			if (!widgetProps.config[itemId]) {
				widgetProps.config[itemId] = defaultValue;
			}
		},
		);
		
		widgetProps.providerMessages = {
			...providerMessages,
			...widgetProps.messages,
		};
		widgetProps.descriptor = {
			outcomes:  widgetProps.outcomes,
		};
		
		const props = WidgetBootstrap.generateProps(
			widgetProps,
			appConfig,
			widgetName,
		);
		
		this.createWidget(widgetId, widgetName, domPlaceHolder, props);
	}
}
