import { NavigateFunction, User } from '@sdk';

export type HomeHeroContextType = {
	onLogout: () => void;
	navigate: NavigateFunction
	userInfo?: User;
	onStartBuyFlow: () => void;
}

export type HomeHeroProps = object