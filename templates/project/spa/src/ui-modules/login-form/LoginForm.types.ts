import { User, NavigateFunction, LoginPayload } from '@sdk';
import { FormatMessageType } from '@msgs';

export type LoginFormContextType = {
	navigate: NavigateFunction
	userInfo?: User;
	login: (payload: LoginPayload) => void;
	formatMessage: FormatMessageType
}

export type LoginFormProps = object