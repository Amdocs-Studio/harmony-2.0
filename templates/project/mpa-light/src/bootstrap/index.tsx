import { SdkProvider } from '@sdk';
import { Router, router } from './router';
import { AppIntlProvider } from '@app-intl';

function App() {
	return (
		<SdkProvider router={router}>
			<AppIntlProvider>
				<Router />
			</AppIntlProvider>
		</SdkProvider>
	);
}

export default App;