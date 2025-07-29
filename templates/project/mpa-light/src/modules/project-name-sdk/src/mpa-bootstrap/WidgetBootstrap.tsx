import ReactDOM from 'react-dom/client';
import React from 'react';
import { IntlProvider } from 'react-intl';
import getNavigationHandler from './NavigationHandler';
import { SdkProvider } from '../providers';

const { log, error } = console;

type PropsType = Record<string, any>;

type DescriptorType = Record<string, string>;

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
	Object.entries(descriptor).forEach(([key, value]) => {
		descriptorMessages[key] = {
			id: key,
			defaultMessage: value,
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
		if (
			!window[widgetId]?.[widgetName] || !window[widgetId]?.descriptor
		) {
			error(
				`can't find window.harmony or window.harmony.widgets or window.harmony.widgets[${widgetId}]`,
			);
			return;
		}
		window.harmony.config = { ...appConfig };
		const widgetProps = origWidgetProps;

		log('widgetProps', { ...widgetProps });

		const descriptor = window[widgetId].descriptor;
		const { behaviorParams = [], content = [], outcomes: descriptorOutcomes = [] } = descriptor;
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
		behaviorParams.forEach(
			(param: {
				itemId: string;
				defaultValue: string;
			}) => {
				const { itemId, defaultValue } = param;
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
			outcomes: widgetProps.outcomes,
		};

		const props = WidgetBootstrap.generateProps(
			widgetProps,
			appConfig,
			widgetId,
		);

		this.createWidget(widgetId, widgetName, domPlaceHolder, props);
	}
}
