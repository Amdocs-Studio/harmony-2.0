import { User, NavigateFunction, LoginPayload } from '@sdk';

export type LoginFormContextType = {
	navigate: NavigateFunction
	userInfo?: User;
	login: (payload: LoginPayload) => void;
}

export type LoginFormProps = object