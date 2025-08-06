import { HomeHeroProps } from './HomeHero.types';
import { HomeHeroProvider } from './HomeHero.provider';
import HomeHeroMain from './components/HomeHero.main';
import './styles/index.css';

export default function HomeHero(props: HomeHeroProps) {
	return (
		<HomeHeroProvider {...props}>
			<HomeHeroMain />
		</HomeHeroProvider>
	);
}