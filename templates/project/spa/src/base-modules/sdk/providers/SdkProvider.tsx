import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';

export default function SdkProvider({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<Provider store={store}>
			<PersistGate loading={<div>Loading</div>} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}