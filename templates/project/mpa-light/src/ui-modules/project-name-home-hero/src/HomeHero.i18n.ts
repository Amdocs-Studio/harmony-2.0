import descriptor from '../project-name-home-hero.descriptor.json';
import { getDescriptorMessages, getNavigationHandler, getConfigHandler } from '@sdk';
import pkg from '../package.json';

export const navigate = (path: string) => getNavigationHandler().navigate(pkg.name, path);

export const messages = getDescriptorMessages(descriptor);

export const getConfig = () => getConfigHandler().getConfig(pkg.name);
