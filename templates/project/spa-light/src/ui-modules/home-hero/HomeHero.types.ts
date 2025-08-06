import { User, NavigateFunction } from '@sdk';

export type HomeHeroContextType = {
	navigate: NavigateFunction
	userInfo?: User
}

export type HomeHeroProps = object