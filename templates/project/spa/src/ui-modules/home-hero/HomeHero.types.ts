import { NavigateFunction, User } from '@sdk';
import { FormatMessageType } from '@msgs';

export type HomeHeroContextType = {
	onLogout: () => void;
	navigate: NavigateFunction
	userInfo?: User
	formatMessage: FormatMessageType
}

export type HomeHeroProps = object