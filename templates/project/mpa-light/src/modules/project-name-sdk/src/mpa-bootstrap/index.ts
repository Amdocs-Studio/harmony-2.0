import { store, persistor } from '../store';
import WidgetBootstrap from './WidgetBootstrap';
export { getDescriptorMessages } from './WidgetBootstrap';

const widgetBootstrap = new WidgetBootstrap(store, persistor);
export const loadWidget = widgetBootstrap.loadWidget.bind(widgetBootstrap);
