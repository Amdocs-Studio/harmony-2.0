import { SdkProvider } from '@sdk';
import Router from './router';
import { AppIntlProvider } from '@app-intl';

function App() {
	return (
		<SdkProvider>
			<AppIntlProvider>
				<Router />
			</AppIntlProvider>
		</SdkProvider>
	);
}

export default App;