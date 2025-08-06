import type { MessagesType } from '@sdk';

export type OutcomeType = Record<string, { type: string; value: string, external?: boolean }>;

export type NavigatePayloadType = {
    query?: Record<string, string>;
};

export type NavigateFunction = (actionIt: string, payload?: NavigatePayloadType) => void;

export interface NavigationHandlerType {
    registeredRoutes: Record<string, OutcomeType>;
    registeredMessages: Record<string, MessagesType>;
    registerRoutesFromDescriptor: (descriptor: any) => void;
    registerRoute: (widgetId: string, outcomes: OutcomeType) => void;
    registerMessages: (widgetId: string, messages: MessagesType) => void;
    navigate: (widgetId: string, route: string, payload?: NavigatePayloadType) => void;
    getMessages: (widgetId: string) => MessagesType;
}

export type ConfigType = Record<string, string | number | boolean>;
export interface ConfigHandlerType {
    registeredConfig: Record<string, ConfigType>;
    registerConfig: (widgetId: string, configParams: ConfigType) => void;
    registerConfigFromDescriptor: (descriptor: any) => void;
    getConfig: (widgetId: string) => ConfigType;
    
}