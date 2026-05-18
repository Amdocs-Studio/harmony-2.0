import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ReactNode, useEffect, useState } from 'react';
import { enableMocking } from '@mocks';
import config from '../config.ts';

export default function SdkProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [mockEnabled, setMockEnabled] = useState<boolean>(false);
	useEffect(() => {
		if (config.useMocks && !mockEnabled) {
			enableMocking().then(() => setMockEnabled(true));
		} else {
			setMockEnabled(true);
		}
	}, []);
	if (!mockEnabled) {
		return;
	}
	return (
		<Provider store={store}>
			<PersistGate loading={<div>Loading</div>} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}