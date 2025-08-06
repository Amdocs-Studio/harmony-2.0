import { store, persistor } from '../store';
import WidgetBootstrap from './WidgetBootstrap';
export { getDescriptorMessages } from './WidgetBootstrap';
export { getConfigHandler } from './ConfigHandler';
export { getNavigationHandler } from './NavigationHandler';
export { ComponentDecorator } from './ComponentDecorator';

const widgetBootstrap = new WidgetBootstrap(store, persistor);
export const loadWidget = widgetBootstrap.loadWidget.bind(widgetBootstrap);
