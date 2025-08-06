import descriptor from '../project-name-shopping-cart.descriptor.json';
import { getDescriptorMessages, getNavigationHandler, getConfigHandler, NavigatePayloadType, NavigateFunction } from '@sdk';
import pkg from '../package.json';

export const navigate: NavigateFunction = (path: string, payload?: NavigatePayloadType) => getNavigationHandler().navigate(pkg.name, path, payload);

export const messages = getDescriptorMessages(descriptor);

export const getConfig = () => getConfigHandler().getConfig(pkg.name);
