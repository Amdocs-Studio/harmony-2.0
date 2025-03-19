import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { RouterType } from '../types';
import getNavigationHandler from '../mpa-bootstrap/NavigationHandler';

export default function SdkProvider({ children, router }: Readonly<{ children: ReactNode, router?: RouterType }>) {
	if (router) {
		getNavigationHandler().setRouter(router);
	}
	return (
		<Provider store={store}>
			<PersistGate loading={<div>Loading</div>} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}