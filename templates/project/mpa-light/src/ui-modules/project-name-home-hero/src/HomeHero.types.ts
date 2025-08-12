import { NavigateFunction, User } from '@sdk';

export type HomeHeroContextType = {
	onLogout: () => void;
	navigate: NavigateFunction
	userInfo?: User;
}

export type HomeHeroProps = object