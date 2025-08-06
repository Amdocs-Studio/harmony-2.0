import HomeHero from './HomeHero';
import descriptor from '../project-name-home-hero.descriptor.json';
import { getConfigHandler, getNavigationHandler, ComponentDecorator } from '@sdk';
import { HomeHeroProps } from './HomeHero.types';

getNavigationHandler().registerRoutesFromDescriptor(descriptor);
getConfigHandler().registerConfigFromDescriptor(descriptor);

export const HomeHeroDecorator = (props: HomeHeroProps) => {
	return (
		<ComponentDecorator descriptor={descriptor}>
			<HomeHero {...props} />
		</ComponentDecorator>
	);
};
