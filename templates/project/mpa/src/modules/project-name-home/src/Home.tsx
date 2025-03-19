import { HomeProps } from './Home.types';
import { HomeProvider } from './Home.provider';
import HomeMain from './components/Home.main';
import './styles/index.css';

export default function Home(props: HomeProps) {
	return (
		<HomeProvider {...props}>
			<HomeMain />
		</HomeProvider>
	);
}