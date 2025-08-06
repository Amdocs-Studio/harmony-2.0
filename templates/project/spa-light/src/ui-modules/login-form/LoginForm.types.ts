import { User, NavigateFunction, useAuth } from '@sdk';

export type LoginFormContextType = {
	navigate: NavigateFunction
	userInfo?: User;
	login: ReturnType <typeof useAuth>['login']
}

export type LoginFormProps = object