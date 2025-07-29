import { NavigateFunction } from '@sdk';

export type OutcomeType = Record<string, { type: string; value: string, external?: boolean }>;

export type NavigatePayloadType = {
    query?: Record<string, string>;
};

export interface NavigationHandlerType {
    registeredRoutes: Record<string, OutcomeType>;
    registerRoutesFromDescriptor: (descriptor: any) => void;
    registerRoute: (widgetId: string, outcomes: OutcomeType) => void;
    navigateAem: (widgetId: string, route: string, payload?: NavigatePayloadType) => void;
    navigate: NavigateFunction
}